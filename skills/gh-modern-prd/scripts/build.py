#!/usr/bin/env python3
"""Build a gh-modern-prd bundle: plan.html (+ index.html, flows.html, options.html).

Usage:
  python3 build.py <data_dir> <out_dir> [--repo <GlobalyOS-V2 checkout>] [--check]

<data_dir> holds the feature's data files:
  prd.js      required  DOC, STATUS, SECTIONS            -> plan.html
  screens.js  optional  add(...) screen calls            -> index.html (and thumbnails in plan.html)
  flows.js    optional  X (extra step screens) + F flows -> flows.html
  options.js  optional  opt(...) alternatives + OPT      -> options.html
--repo   refresh the 3D rail icons + logo from <repo> origin/main instead of the bundled snapshot.
--check  render every page in headless Chrome and fail on a JS error or an empty page.
--shot   also save a 1800px-wide full-page screenshot of each page to <out_dir>/_shots/<page>.png, tiled as <page>-N.png past 16000px (look at them:
         --check cannot see layout bugs).
"""
import base64, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PAGES = [  # (template, output, data file that enables it, nav label)
    ("plan.html", "plan.html", "prd.js", "Plan + status"),
    ("index.html", "index.html", "screens.js", "Screens"),
    ("flows.html", "flows.html", "flows.js", "User flows"),
    ("options.html", "options.html", "options.js", "Options"),
]


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def rail_from_repo(repo):
    def git(*a):
        return subprocess.run(["git", "-C", repo, *a], check=True, capture_output=True).stdout
    names = git("ls-tree", "--name-only", "origin/main", "apps/web/src/assets/rail/").decode().split()
    out = ["const RAIL={"]
    for n in names:
        b64 = base64.b64encode(git("show", f"origin/main:{n}")).decode()
        out.append(f"'{os.path.basename(n)[:-4]}':'data:image/png;base64,{b64}',")
    out.append("};")
    logo = base64.b64encode(git("show", "origin/main:apps/web/src/assets/globalyos-icon.png")).decode()
    out.append(f"const LOGO='data:image/png;base64,{logo}';")
    return "\n".join(out)


def main(argv):
    repo = None
    if "--repo" in argv:
        i = argv.index("--repo")
        if i + 1 >= len(argv):
            sys.exit("--repo needs a path")
        repo = argv[i + 1]
        argv = argv[:i] + argv[i + 2:]
    args = [a for a in argv if not a.startswith("--")]
    if len(args) != 2:
        sys.exit(__doc__)
    data_dir, out_dir = args
    if not os.path.isfile(os.path.join(data_dir, "prd.js")):
        sys.exit(f"missing {data_dir}/prd.js (DOC, STATUS, SECTIONS are required)")
    os.makedirs(out_dir, exist_ok=True)
    css = read(os.path.join(ROOT, "assets", "base.css"))
    shell = read(os.path.join(ROOT, "assets", "shell.js"))
    rail = rail_from_repo(repo) if repo else read(os.path.join(ROOT, "assets", "rail.js"))
    present = [p for p in PAGES if os.path.isfile(os.path.join(data_dir, p[2]))]
    nav = ",".join(f'["{o}","{label}"]' for _, o, _, label in present)
    pages_js = (f"const PAGES=[{nav}];\n"
                "function navHtml(cur){return PAGES.map(([h,t])=>`<a class=\"${h===cur?'on':''}\" href=\"${h}\">${t}</a>`).join('');}")
    # Every page loads every data file it has, in dependency order (flows reuse screens via SCR).
    order = ["prd.js", "screens.js", "flows.js", "options.js"]
    data = "\n".join(read(os.path.join(data_dir, f)) for f in order if os.path.isfile(os.path.join(data_dir, f)))
    built = []
    for tpl, out, _, _ in present:
        page = read(os.path.join(ROOT, "templates", tpl))
        for marker, value in (("/*CSS*/", css), ("/*RAIL*/", rail), ("/*SHELL*/", shell), ("/*PAGES*/", pages_js), ("/*DATA*/", data)):
            if marker not in page:
                sys.exit(f"template {tpl} lost its {marker} marker")
            page = page.replace(marker, value, 1)
        path = os.path.join(out_dir, out)
        with open(path, "w", encoding="utf-8") as f:
            f.write(page)
        built.append(path)
    for p in built:
        print(p)
    if "--check" in argv:
        check(built)
    if "--shot" in argv:
        shot(built, out_dir)


def chrome_bin():
    mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    return mac if os.path.exists(mac) else "google-chrome"


# Wide enough for the Screens sidebar plus a 1360px mockup; Chrome can't capture taller than ~16k px.
SHOT_W, SHOT_MAX_H = 1800, 16000


def page_height(path):
    dom = subprocess.run([chrome_bin(), "--headless=new", "--disable-gpu", f"--window-size={SHOT_W},1000",
                          "--virtual-time-budget=6000", "--dump-dom", "file://" + os.path.abspath(path)],
                         capture_output=True, text=True).stdout
    m = re.search(r'data-h="(\d+)"', dom)
    if not m:
        sys.exit(f"screenshot: {path} did not stamp its height (did the page script fail?)")
    return int(m.group(1))


def shot(paths, out_dir):
    d = os.path.join(out_dir, "_shots")
    os.makedirs(d, exist_ok=True)
    for p in paths:
        stem = os.path.basename(p).replace(".html", "")
        for old in os.listdir(d):
            if old == f"{stem}.png" or old.startswith(f"{stem}-"):
                os.remove(os.path.join(d, old))
        # Measure the page at this width (data-h), then capture all of it; a page taller than Chrome's
        # limit comes out as tiles <page>-1.png, <page>-2.png … (the page scrolls to #y=<offset>).
        height = page_height(p)
        tiles = range(0, height, SHOT_MAX_H)
        for i, y in enumerate(tiles, 1):
            png = os.path.join(d, f"{stem}.png" if len(tiles) == 1 else f"{stem}-{i}.png")
            r = subprocess.run([chrome_bin(), "--headless=new", "--disable-gpu", "--hide-scrollbars",
                                f"--window-size={SHOT_W},{min(SHOT_MAX_H, height - y)}", "--virtual-time-budget=6000",
                                f"--screenshot={png}", "file://" + os.path.abspath(p) + (f"#y={y}" if y else "")],
                               capture_output=True)
            if r.returncode != 0 or not os.path.exists(png):
                sys.exit(f"screenshot failed for {p} (chrome exit {r.returncode})")
            print("shot", png)


def check(paths):
    chrome = chrome_bin()
    bad = False
    for p in paths:
        r = subprocess.run([chrome, "--headless=new", "--disable-gpu", "--virtual-time-budget=6000",
                            "--enable-logging=stderr", "--v=0", "--dump-dom", "file://" + os.path.abspath(p)],
                           capture_output=True, text=True)
        errs = [l for l in r.stderr.splitlines() if "Uncaught" in l]
        # Every template ends by stamping how many screens / phases / flows it rendered. A missing or zero
        # stamp means the renderer died or the data produced nothing; page size alone can't tell (CSS+JS are big).
        m = re.search(r'data-rendered="(\d+)"', r.stdout)
        rendered = int(m.group(1)) if m else 0
        fail = bool(errs) or rendered == 0
        print(f"{'FAIL' if fail else 'ok  '} {os.path.basename(p)} rendered={rendered}" + (f" {errs[0][:160]}" if errs else ""))
        bad |= fail
    if bad:
        sys.exit(1)


if __name__ == "__main__":
    main(sys.argv[1:])
