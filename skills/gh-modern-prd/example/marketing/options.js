/* ---------- shared email content ---------- */
function emailDoc({sel='',hov='',width=560,dark=false,mobile=false}={}){
 const w=mobile?300:width,bg=dark?'#1e1f23':'#fff',fg=dark?'#e8e8ea':'#1d2433',ft=dark?'#2a2b30':'#f6f6f4',hd=dark?'#9cc3ec':'#0f3d63';
 const b=(id,l,inner)=>`<div class="blk ${sel===id?'sel':''} ${hov===id?'hov':''}" data-l="${l}">${inner}</div>`;
 return `<div style="background:${bg};color:${fg};width:${w}px;margin:0 auto;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,.12);overflow:hidden;font-size:${mobile?12:13}px">
 ${b('hdr','Header',`<div style="padding:14px 22px;display:flex;align-items:center;gap:8px;border-bottom:1px solid ${dark?'#333':'#eee'}"><div style="width:24px;height:24px;border-radius:6px;background:#0f3d63"></div><b style="font-family:Space Grotesk;color:${hd}">Acme Learning</b></div>`)}
 ${b('hero','Image',`<div style="height:${mobile?100:140}px;background:linear-gradient(135deg,#0f3d63,#2f6f9f 60%,#f08a4b);display:flex;align-items:flex-end;padding:14px 22px;color:#fff;font:600 ${mobile?15:20}px Space Grotesk">Open day · Sat 9 Nov</div>`)}
 ${b('text','Text',`<div style="padding:16px 22px"><h3 style="font-size:${mobile?16:19}px;color:${hd};margin:0 0 6px">Come see campus on 9 November</h3><div style="line-height:1.55">Hi Priya, tour the new library, sit in on a class and meet our tutors. Lunch from the student café is on us.</div></div>`)}
 ${b('btn','Button',`<div style="padding:0 22px 16px"><span style="display:inline-block;background:#f08a4b;color:#fff;padding:9px 18px;border-radius:8px;font-weight:600">Book your spot</span></div>`)}
 ${b('event','Event card',`<div style="margin:0 22px 16px;border:1px solid ${dark?'#333':'#e6e6e6'};border-radius:8px;display:flex;gap:10px;padding:10px"><div style="width:44px;text-align:center;border-radius:6px;background:${ft};padding:4px 0"><div style="font-size:10px;color:#f08a4b;font-weight:700">NOV</div><b style="font-size:17px">9</b></div><div><b>Open day 2026</b><div style="opacity:.7;font-size:12px">10:00–15:00 · 12 King St, Sydney</div></div></div>`)}
 ${b('ftr','Footer',`<div style="padding:12px 22px;background:${ft};font-size:11px;opacity:.75">Acme Learning · 12 King St, Sydney NSW 2000 · <u>Preferences</u> · <u>Unsubscribe</u></div>`)}
 </div>`;
}
const BLOCKS=[['file','Text'],['img','Image'],['arrow','Button'],['grid','Columns'],['x','Divider'],['share','Social'],['monitor','Video'],['cal','Event card'],['tag','Product'],['clock','Countdown'],['file','HTML'],['users','Speakers']];
function etop(extra=''){return `<div class="etop"><span class="btn g sm">←</span><span class="nm">November open day</span><span class="crumb">› Design</span><span class="chip">Draft · saved 10:41</span><div class="sp"></div>${extra}<div class="tabs"><span class="on">Visual</span><span>HTML</span></div><span class="btn sm g">↶</span><span class="btn sm g">↷</span><span class="btn sm">Send test</span><span class="btn sm p">Save and close</span></div>`;}
const scr=(inner,ov='')=>`<div class="frame"><div class="scroll"><div class="screen">${inner}${ov}</div></div></div>`;
const O=[];const opt=(id,title,tag,html,notes)=>O.push({id,title,tag,html,notes});

/* E1 three-pane refined */
opt('e1','Three-pane, refined','Closest to today',scr(`${etop(`<span class="chip ok">Brand kit: Acme</span><span class="btn sm ai">${ic('spark')}AI</span><div class="tabs"><span class="on">${ic('monitor')}</span><span>${ic('phone')}</span></div>`)}
<div class="ebody">
 <div class="epanel" style="width:250px;border-right-width:1px">
  <div class="tabs"><span class="on">Blocks</span><span>Sections</span><span>Saved</span><span>Brand</span></div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">${BLOCKS.map(([i,n])=>`<div class="tile">${ic(i)}${n}</div>`).join('')}</div>
  <div class="grp">From your org</div>
  <div class="tile" style="flex-direction:row;justify-content:flex-start;padding:8px">${ic('cal')}Expo 2026 (event)</div>
  <div class="tile" style="flex-direction:row;justify-content:flex-start;padding:8px">${ic('file')}Saved footer</div>
 </div>
 <div class="ecanvas">${emailDoc({sel:'text',hov:'btn'})}</div>
 <div class="epanel" style="width:300px;border-left-width:1px">
  <div style="display:flex;align-items:center"><b>Text</b><div class="sp"></div><span class="muted small">${ic('copy')} ${ic('x')}</span></div>
  <div class="ul"><span class="on">Content</span><span>Style</span><span>Visibility</span></div>
  <div class="fld"><label>Heading</label><div class="in small">Come see campus on 9 November</div></div>
  <div class="fld"><label>Body</label><div class="in small" style="height:70px;align-items:flex-start">Hi {{first_name|there}}, tour the new library…</div></div>
  <div class="fld"><label>Font</label><div class="in small">Brand body (Arial) ${ic('chev')}</div></div>
  <div class="fld"><label>Colour</label><div style="display:flex;gap:6px">${['#0f3d63','#2f6f9f','#f08a4b','#1d2433','#ffffff'].map(c=>`<span class="sw" style="background:${c}"></span>`).join('')}</div></div>
  <div class="fld"><label>Padding</label><div class="in small">16 · 22</div></div>
 </div>
</div>`),{Layout:'Blocks/Sections/Saved/Brand on the left, canvas in the middle, properties on the right. Today\'s EmailBuilder + SectionLibrary, tidied up.',Good:'Familiar to anyone who\'s used Mailchimp. Smallest build, because it reuses the existing components.',Weak:'Three busy columns. The email has only about 560px of room, and the brand kit is just one tab among four.'});

/* E2 document mode */
opt('e2','Document mode','Write like a doc',scr(`${etop(`<span class="btn sm ai">${ic('spark')}AI</span><div class="tabs"><span class="on">${ic('monitor')}</span><span>${ic('phone')}</span></div>`)}
<div class="ebody"><div class="ecanvas" style="background:hsl(var(--background));display:flex;justify-content:center;padding-top:30px">
 <div style="position:relative">${emailDoc({sel:'text',width:620})}
  <div class="ftb" style="top:248px;left:120px"><span><b>B</b></span><span><i>I</i></span><span><u>U</u></span><span>🔗</span><span>{{ }}</span><span style="background:hsl(var(--background)/.15)">${ic('spark','style="width:13px;height:13px"')} Rewrite</span></div>
  <div class="slash" style="top:418px;left:30px"><div class="muted small" style="padding:4px 8px">Insert a block</div>${[['cal','Event card','Pick from your events'],['arrow','Button',''],['img','Image','Upload or generate'],['grid','Columns',''],['tag','Product','From your catalogue']].map(([i,n,d],k)=>`<div class="${k===0?'on':''}">${ic(i)}<span>${n}</span><span class="sp"></span><span class="muted small">${d}</span></div>`).join('')}</div>
  <div style="position:absolute;top:410px;left:-34px;color:hsl(var(--muted-fg))" class="mono">/</div>
 </div>
 <div style="position:absolute;right:20px;bottom:20px;display:flex;flex-direction:column;gap:8px;align-items:flex-end">
  <div class="card" style="padding:10px;width:230px"><div class="small" style="display:flex;align-items:center"><b>Brand kit</b><span class="sp"></span><span class="chip ok">On</span></div><div style="display:flex;gap:5px;margin-top:6px">${['#0f3d63','#2f6f9f','#f08a4b','#1d2433'].map(c=>`<span class="sw" style="background:${c}"></span>`).join('')}</div><div class="muted small" style="margin-top:4px">Georgia / Arial · logo · footer</div></div>
  <span class="btn sm">${ic('grid')}Outline</span>
 </div>
</div></div>`),{Layout:'No side panels. The email sits on a clean page; type "/" to insert a block, select text for a floating toolbar, click a block for a small popover. The brand kit is a floating card.',Good:'Fastest for text-heavy newsletters and announcements. Feels like Notion or Beehiiv. Least intimidating for staff who aren\'t designers.',Weak:'Less control over layout and spacing. Multi-column designs are harder. Needs a new slash menu and popover components.'});

/* E3 AI co-pilot */
opt('e3','AI co-pilot','Describe it, then refine',scr(`${etop(`<span class="chip ok">Brand kit: Acme</span><div class="tabs"><span class="on">${ic('monitor')}</span><span>${ic('phone')}</span></div>`)}
<div class="ebody">
 <div class="epanel" style="width:420px;border-right-width:1px;padding:0">
  <div style="padding:12px 16px;border-bottom:1px solid hsl(var(--border));font:600 15px Space Grotesk;display:flex;gap:8px;align-items:center">${ic('spark','style="color:hsl(var(--chart-4))"')}AI writer <span class="chip ai">uses your brand voice</span></div>
  <div style="flex:1;padding:14px 16px;display:flex;flex-direction:column;gap:10px">
   <div class="msg me">Invite Expo attendees to open day on 9 Nov. Mention free lunch and the new library. Friendly, short.</div>
   <div class="msg ai">Done. I used your Open day invite layout, pulled the date and venue from the <b>Open day 2026</b> event, and kept it under 90 words.</div>
   <div class="cs"><div class="row"><b>Changed</b><span>Hero, heading, body, button "Book your spot"</span></div><div class="row"><b>Added</b><span>Event card (Open day 2026)</span></div><div class="row"><b>Subject ideas</b><span>"Lunch's on us: open day, 9 Nov" · "Come see the new library"</span></div><div style="display:flex;gap:6px;margin-top:8px"><span class="btn sm p">Keep</span><span class="btn sm">Undo</span></div></div>
   <div class="msg me">Make the button more urgent</div>
   <div class="msg ai small">Changed to "Save my spot: 40 left". Apply?</div>
  </div>
  <div style="border-top:1px solid hsl(var(--border));padding:12px 16px;display:flex;flex-direction:column;gap:8px"><div class="chips"><span>Shorter</span><span>Translate to Hindi</span><span>Add speakers</span><span>Check spam words</span></div><div class="in" style="height:56px;align-items:flex-start;color:hsl(var(--muted-fg))">Ask for a change, or click any block to edit it yourself…</div></div>
 </div>
 <div class="ecanvas">${emailDoc({sel:'btn'})}<div style="position:absolute;left:50%;transform:translateX(150px);top:300px" class="card small" ><b>Button</b><div class="in small" style="margin-top:4px">Save my spot: 40 left</div><div style="display:flex;gap:4px;margin-top:6px"><span class="btn sm p">Apply</span><span class="btn sm">Edit myself</span></div></div></div>
</div>`),{Layout:'The left half is the Events-style AI panel (change-set, Keep/Undo, suggestion chips). The right half is the live email; clicking any block still lets you edit it by hand.',Good:'Gets a non-designer from blank to on-brand in a minute. Reuses the assistant core from Events.',Weak:'Each change costs AI credits. Precise layout work still needs the manual tools, so it pairs best with E1 or E4 behind a toggle.'});

/* E4 section outline */
opt('e4','Section outline + brand panel','Best for long emails',scr(`${etop(`<span class="btn sm ai">${ic('spark')}AI</span><div class="tabs"><span class="on">${ic('monitor')}</span><span>${ic('phone')}</span></div>`)}
<div class="ebody">
 <div class="epanel" style="width:250px;border-right-width:1px">
  <div style="display:flex;align-items:center"><b>Sections</b><div class="sp"></div><span class="btn sm">${ic('plus')}Add</span></div>
  ${[['Header','#0f3d63',0],['Hero image','linear-gradient(135deg,#0f3d63,#f08a4b)',0],['Heading + text','hsl(var(--muted))',1],['Button','#f08a4b',0],['Event card','hsl(var(--muted))',0],['Footer','hsl(var(--muted))',0]].map(([n,c,on])=>`<div class="outl ${on?'on':''}"><span class="muted">⋮⋮</span><span class="mt" style="background:${c}"></span>${n}<span class="sp"></span>${ic('eye','style="width:13px;height:13px;opacity:.5"')}</div>`).join('')}
  <div class="tile" style="border-style:dashed;flex-direction:row;justify-content:center">${ic('plus')}Section from library</div>
 </div>
 <div class="ecanvas">${emailDoc({sel:'text'})}</div>
 <div class="epanel" style="width:310px;border-left-width:1px">
  <div class="tabs"><span>Content</span><span>Style</span><span class="on">Brand kit</span></div>
  <div style="display:flex;gap:10px;align-items:center"><div style="width:40px;height:40px;border-radius:8px;background:#0f3d63"></div><div class="small"><b>Acme Learning</b><div class="muted">Logo from Organization</div></div></div>
  <div class="grp">Colours</div><div style="display:flex;gap:6px">${[['#0f3d63','Primary'],['#2f6f9f','Secondary'],['#f08a4b','Accent'],['#1d2433','Text']].map(([c,n])=>`<div style="text-align:center;font-size:10.5px" class="muted"><span class="sw" style="background:${c};width:34px;height:34px;display:block;margin-bottom:2px"></span>${n}</div>`).join('')}</div>
  <div class="grp">Fonts</div><div class="in small">Headings: Georgia</div><div class="in small">Body: Arial</div>
  <div class="grp">Buttons</div><div style="display:flex;gap:6px"><span style="background:#f08a4b;color:#fff;border-radius:8px;padding:5px 10px;font-size:12px">Rounded</span><span style="border:1px solid #f08a4b;color:#f08a4b;border-radius:2px;padding:5px 10px;font-size:12px">Square</span></div>
  <div class="banner info small">${ic('check')}<div>This email matches your brand kit. <u>Re-apply to all sections</u></div></div>
 </div>
</div>`),{Layout:'Left: an outline of sections with thumbnails. Drag to reorder, hide or duplicate. Centre: the canvas. Right: Content / Style / Brand kit tabs.',Good:'Easy to move whole sections around in long newsletters. The brand kit is always one click away and can re-apply itself across the email. Blocks open from the "Add" button.',Weak:'A new outline component to build. Single blocks are one level deeper (open a section, then edit the block).'});

/* E5 preview & QA */
opt('e5','Preview and checks','See every inbox while you edit',scr(`${etop(`<span class="chip ok">Brand kit: Acme</span><span class="btn sm ai">${ic('spark')}AI</span>`)}
<div class="ebody">
 <div class="epanel" style="width:64px;border-right-width:1px;align-items:center;padding:10px 6px">${BLOCKS.slice(0,8).map(([i])=>`<span class="btn sm g" style="padding:7px">${ic(i)}</span>`).join('')}</div>
 <div class="ecanvas" style="display:flex;flex-direction:column;gap:10px">
  <div style="display:flex;gap:8px;align-items:center"><div class="tabs"><span class="on">Gmail</span><span>Outlook</span><span>Apple Mail</span></div><div class="tabs"><span class="on">Light</span><span>Dark</span></div><div class="sp"></div><span class="muted small">Edits apply to both previews</span></div>
  <div style="display:flex;gap:18px;align-items:flex-start;justify-content:center">
   <div><div class="muted small" style="margin-bottom:4px">${ic('monitor','style="width:12px;height:12px"')} Desktop · 600px</div>${emailDoc({sel:'event',width:520})}</div>
   <div><div class="muted small" style="margin-bottom:4px">${ic('phone','style="width:12px;height:12px"')} Mobile · dark</div><div style="border:7px solid hsl(var(--foreground)/.85);border-radius:26px;overflow:hidden;width:314px;height:560px;background:#1e1f23">${emailDoc({mobile:true,dark:true,sel:'event'})}</div></div>
  </div>
 </div>
 <div class="epanel qa" style="width:290px;border-left-width:1px">
  <b style="font-size:14px">Checks</b>
  <div class="check"><span class="dot ok"></span><div>Spam words: none found</div></div>
  <div class="check"><span class="dot ok"></span><div>All 3 links work · UTM added</div></div>
  <div class="check"><span class="dot warn"></span><div><b>Hero image has no alt text.</b> <u>Write it with AI</u></div></div>
  <div class="check"><span class="dot ok"></span><div>Size 68 KB (Gmail clips at 102 KB)</div></div>
  <div class="check"><span class="dot warn"></span><div><b>Dark mode:</b> logo is dark on dark. <u>Use light logo</u></div></div>
  <div class="check"><span class="dot ok"></span><div>Brand kit: colours and fonts match</div></div>
  <div class="check"><span class="dot ok"></span><div>Unsubscribe + address in footer</div></div>
  <div class="grp" style="margin-top:6px">Selected: Event card</div>
  <div class="in small">Event: Open day 2026 ${ic('chev')}</div><div class="in small">Show: date, time, venue</div>
 </div>
</div>`),{Layout:'Desktop and mobile/dark previews side by side, both editable. Inbox switcher (Gmail, Outlook, Apple), a block rail on the left, and a live Checks panel on the right.',Good:'Catches broken dark mode, missing alt text, Gmail clipping and spam words before you send, the things that hurt deliverability. Strong fit with the pre-send checks in M3.',Weak:'Less room to edit. Inbox previews are our approximation (real-client rendering would need a paid service such as Litmus).'});


const OPT={title:'Email editor: 5 options',eyebrow:'M7 alternatives',
 intro:'The editor is a full-screen route today (<span class="mono">CampaignDesignEditorPage</span>, <span class="mono">withLayout={false}</span>). All five options keep the blocks, sections, Visual/HTML switch and start picker, and add the brand kit and the ✦ AI panel. Same email in each, so you compare layouts, not content.',
 cmp:[['Build effort','Small','Medium','Medium (reuses Events AI)','Medium','Medium'],['Best for','Designed promos','Newsletters, updates','Non-designers, speed','Long newsletters','Deliverability-minded teams'],['Brand kit','Tab','Floating card','Applied by AI','Always-open tab','Checked live'],['Space for the email','560px','620px, centred','~600px','560px','Two previews'],['Learning curve','Low','Lowest','Lowest','Low','Medium']],
 pick:'<b>Picked (23 Oct):</b> E4 as the base (section outline + brand kit panel), with E3\'s AI panel behind the ✦ AI button and E5\'s checks as a tab in the right panel.'};
