/* ===================== 0. IA ===================== */
add('Overview','ia','What moves where','Information architecture','CHANGED',`<div class="ia">
 <div class="col"><h4>Today (origin/main)</h4>
  <div class="grp">Marketing menu</div><ul><li>Campaigns (tabs: Email · WhatsApp · SMS)</li><li>Forms</li><li>WhatsApp → Overview, Inbox link, Templates, Campaigns, Contacts, <span class="del">Sequences</span>, <span class="del">Automations</span>, Flows, Settings</li></ul>
  <div class="grp" style="margin-top:10px">WhatsApp is connected in 3 places</div><ul><li>Marketing › WhatsApp › Settings (<span class="mono small">wa_accounts</span>)</li><li>Inbox › Channels (<span class="mono small">inbox_channels</span>, Embedded Signup)</li><li>Settings › Inbox</li></ul>
  <div class="grp" style="margin-top:10px">Automations</div><ul><li>Send email works</li><li>Send WhatsApp template · Send SMS · Push: "coming soon" (step fails)</li></ul>
  <div class="grp" style="margin-top:10px">Email</div><ul><li>Bring your own Resend key; no credits</li><li>Settings › Domains = web hostnames only</li></ul>
 </div>
 <div class="arrow">→</div>
 <div class="col"><h4>Proposed</h4>
  <div class="grp">Marketing menu</div><ul><li><b>Overview</b> (new)</li><li><b>Campaigns</b>: Email · WhatsApp · SMS, one list, one builder per channel</li><li><b>Social</b> (new): Calendar · Posts · Engage · Analytics</li><li><b>Audiences</b> (new): lists, segments, consent per channel (absorbs WhatsApp Contacts)</li><li><b>Templates</b>: Email · WhatsApp (incl. Flows) · SMS</li><li><b>Forms</b> (unchanged)</li><li><b>Reports</b> (new)</li><li><b>Settings</b>: sending defaults, brand kit, topics, deliverability</li></ul>
  <div class="grp" style="margin-top:10px">Connect once, in Settings</div><ul><li><b>Domains</b>: email sending + web hub (+ Domain Connect)</li><li><b>Channels</b> (new): WhatsApp numbers, SMS numbers, social accounts, Messenger/Telegram. One record, used by Inbox, Marketing, Automations and Events</li><li><b>Credits</b> (new): Email, WhatsApp and SMS wallets</li></ul>
  <div class="grp" style="margin-top:10px">Automations</div><ul><li>Send email, Send WhatsApp template and Send SMS all work, and use wallets</li><li>Old /crm/whatsapp/sequences and /automations links redirect to Automations</li></ul>
 </div></div>`,{Redirects:'Every /crm/whatsapp/* route redirects to its new home, so bookmarks and links in old emails keep working.',Data:'wa_accounts and inbox_channels(whatsapp) merge into one channel connection. wa_sequences rows convert to automations (one-off migration, reviewed per org).'});

/* ===================== Settings ===================== */
add('Settings: connect once','s1','Domains: one place for email + websites','Settings › Domains','CHANGED',setApp('Domains',`
${ph('Domains','Connect a domain once. It sends your email and hosts your public sites.',`<span class="muted small">1 of 2 domains · Pro</span><span class="btn p">${ic('plus')}Connect a domain</span>`)}
<div class="tc"><table class="t">
 <tr><th>Domain</th><th>Status</th><th>Email sending</th><th>Web hub</th><th>Own subdomains</th><th>Health</th><th></th></tr>
 <tr><td><b>acme.com</b><div class="muted small">Connected 12 Oct by Amit R.</div></td><td><span class="chip ok">${ic('check','style="width:12px;height:12px"')}Verified</span></td><td><span class="chip ok">Sending</span><div class="muted small">hello@ · events@ · news@</div></td><td><span class="mono small">hub.acme.com</span><div class="muted small">/support · /book</div></td><td><span class="mono small">events.acme.com</span></td><td><b class="up">96</b></td><td><span class="btn sm">Manage</span></td></tr>
</table></div>
<div class="g2">
 <div class="card"><h4>${ic('mail')}What a connected domain gives you</h4>
  <div class="check"><span class="dot ok"></span><div><b>Email from you@acme.com</b><div class="muted small">Campaigns, automations, event emails, support replies and invoices all go out from your domain.</div></div></div>
  <div class="check"><span class="dot ok"></span><div><b>One web hub</b><div class="muted small">hub.acme.com/support, /events and /book, live after one record.</div></div></div>
  <div class="check"><span class="dot ok"></span><div><b>Give any site its own address</b><div class="muted small">For example events.acme.com. The hub path redirects to it.</div></div></div></div>
 <div class="card"><h4>${ic('send')}Fallback sender</h4><div class="muted small" style="margin-bottom:8px">Used before a domain is verified, and by projects that don't have one.</div><div class="in mono">Acme Learning &lt;acme@mail.globalyos.com&gt;</div><div class="hint" style="margin-top:12px">${ic('lock','style="width:12px;height:12px"')} Enterprise: send through your own Resend account. <u>Set up</u></div></div>
</div>`),{Today:'Settings › Domains lists web hostnames only. Email domains live in Resend BYOK. Both become children of one connected domain.'});

add('Settings: connect once','s2','Connect a domain: DNS, with automatic setup','Settings › Domains › Connect','NEW',setApp('Domains',`${ph('Domains','')}<div class="card" style="height:300px"></div>`,`<div class="ov"><div class="dlg" style="width:860px">
 <div class="dlg-h"><div><h3>Set up DNS for acme.com</h3><div class="muted small">acme.com's DNS is at <b>Cloudflare</b>.</div></div><div class="sp"></div>${ic('x')}</div>
 <div class="dlg-b">
  <div class="steps"><span class="done"><b>✓</b>Domain</span><i></i><span class="on"><b>2</b>DNS records</span><i></i><span><b>3</b>Verify</span></div>
  <div class="card" style="display:flex;gap:14px;align-items:center;outline:2px solid hsl(var(--primary))"><div style="width:40px;height:40px;border-radius:10px;background:#f38020;display:grid;place-items:center;color:#fff">${ic('zap')}</div><div style="flex:1"><b>Set up automatically with Cloudflare</b><div class="muted small">Sign in to Cloudflare and approve. Cloudflare adds the records itself, and we never see your password.</div></div><span class="btn p">Connect Cloudflare ${ic('ext')}</span></div>
  <div class="grp">Or add these records yourself</div>
  <div class="tc"><table class="t rec">
   <tr><th>Used for</th><th>Type</th><th>Name</th><th>Value</th><th>Status</th><th></th></tr>
   <tr><td style="font-family:Geist">DKIM</td><td>TXT</td><td>resend._domainkey</td><td class="v">p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC…</td><td><span class="chip warn">Waiting</span></td><td>${ic('copy')}</td></tr>
   <tr><td style="font-family:Geist">Bounces</td><td>MX</td><td>send</td><td class="v">feedback-smtp.ap-northeast-1.amazonses.com</td><td><span class="chip warn">Waiting</span></td><td>${ic('copy')}</td></tr>
   <tr><td style="font-family:Geist">SPF</td><td>TXT</td><td>send</td><td class="v">v=spf1 include:amazonses.com ~all</td><td><span class="chip ok">Found</span></td><td>${ic('copy')}</td></tr>
   <tr><td style="font-family:Geist">DMARC</td><td>TXT</td><td>_dmarc</td><td class="v">v=DMARC1; p=none</td><td><span class="chip ok">Already set</span></td><td>${ic('copy')}</td></tr>
   <tr><td style="font-family:Geist">Web hub</td><td>CNAME</td><td>hub</td><td class="v">tenants.globalyos.com</td><td><span class="chip warn">Waiting</span></td><td>${ic('copy')}</td></tr>
  </table></div>
 </div>
 <div class="dlg-f"><span class="btn sm">${ic('mail')}Email these to my IT person</span><div class="sp"></div><span class="btn">Back</span><span class="btn p">I've added them, check now</span></div>
</div></div>`),{'Domain Connect':'Shown when the DNS provider supports our template (Cloudflare, GoDaddy and others). Otherwise only the manual list appears.',Step1:'Step 1 (not drawn again): the domain name, what it powers (email, web hub), and the bounce subdomain send.acme.com.'});

add('Settings: connect once','s3','Channels: connect WhatsApp, SMS and social once','Settings › Channels','NEW',setApp('Channels',`
${ph('Channels','Connect each account once. Inbox, Marketing, Automations and Events all use it.',`<span class="btn p">${ic('plus')}Connect a channel</span>`)}
<div class="tc"><table class="t">
 <tr><th>Channel</th><th>Account</th><th>Status</th><th>Used by</th><th>Project</th><th></th></tr>
 <tr><td><span class="net wa">W</span> WhatsApp</td><td>+61 2 8000 1234 · Acme Learning<div class="muted small">Meta Business: Acme Pty Ltd · quality <span class="up">High</span> · tier 10k/day</div></td><td><span class="chip ok">Connected</span></td><td><span class="chip">Inbox</span> <span class="chip">Campaigns</span> <span class="chip">Automations</span> <span class="chip">Events</span></td><td>All</td><td><span class="btn sm">Manage</span></td></tr>
 <tr><td>${ic('sms')} SMS</td><td>+61 480 000 111 (Twilio)<div class="muted small">Sender ID "ACME" for one-way sends</div></td><td><span class="chip ok">Connected</span></td><td><span class="chip">Inbox</span> <span class="chip">Campaigns</span> <span class="chip">Automations</span></td><td>All</td><td><span class="btn sm">Manage</span></td></tr>
 <tr><td><span class="net fb">f</span> Facebook Page</td><td>Acme Learning</td><td><span class="chip ok">Connected</span></td><td><span class="chip">Social</span> <span class="chip">Inbox (DMs)</span></td><td>All</td><td><span class="btn sm">Manage</span></td></tr>
 <tr><td><span class="net ig">ig</span> Instagram</td><td>@acmelearning</td><td><span class="chip ok">Connected</span></td><td><span class="chip">Social</span> <span class="chip">Inbox (DMs)</span></td><td>All</td><td><span class="btn sm">Manage</span></td></tr>
 <tr><td><span class="net li">in</span> LinkedIn Page</td><td>Acme Learning</td><td><span class="chip warn">Reconnect: token expires in 5 days</span></td><td><span class="chip">Social</span></td><td>All</td><td><span class="btn sm">Reconnect</span></td></tr>
 <tr><td><span class="net tk">T</span> TikTok</td><td class="muted">Not connected</td><td></td><td></td><td></td><td><span class="btn sm">Connect</span></td></tr>
 <tr><td><span class="net xx">X</span> X</td><td class="muted">Not connected</td><td></td><td></td><td></td><td><span class="btn sm">Connect</span></td></tr>
 <tr><td>${ic('mail')} Email</td><td>acme.com · support@acme.com forwarding</td><td><span class="chip ok">Verified</span></td><td><span class="chip">Everything</span></td><td>All</td><td><span class="btn sm">Open Domains</span></td></tr>
</table></div>
<div class="banner info">${ic('share')}<div>WhatsApp used to be connected in three places: Marketing › WhatsApp › Settings, Inbox › Channels and Settings › Inbox. Those pages now link here.</div></div>`),{Merge:'One channel_connections record per account. Inbox reads it for conversations, Campaigns and Automations for sending, Events for registrant messages.',Project:'Project scoping stays: a connection can be limited to a project, the same way the CRM project switcher works today.',Telephony:'Buying numbers stays in Settings › Telephony. Channels shows each number\'s SMS capability and where it\'s used.'});

add('Settings: connect once','s4','Connect WhatsApp (one flow)','Settings › Channels › Connect › WhatsApp','NEW',setApp('Channels',`${ph('Channels','')}<div class="card" style="height:300px"></div>`,`<div class="ov"><div class="dlg" style="width:620px">
 <div class="dlg-h"><div><h3>Connect WhatsApp</h3><div class="muted small">Uses Meta's Embedded Signup. Takes about 3 minutes.</div></div><div class="sp"></div>${ic('x')}</div>
 <div class="dlg-b">
  <div class="steps"><span class="done"><b>✓</b>Meta sign-in</span><i></i><span class="done"><b>✓</b>Business + number</span><i></i><span class="on"><b>3</b>Where to use it</span></div>
  <div class="card" style="display:flex;gap:12px;align-items:center"><span class="net wa" style="width:32px;height:32px;font-size:13px">W</span><div style="flex:1"><b>+61 2 8000 1234</b><div class="muted small">Acme Learning · verified business · display name approved</div></div><span class="chip ok">Ready</span></div>
  <div class="grp">Use this number for</div>
  ${[['Inbox conversations','Replies from customers land in Support › Inbox'],['Marketing campaigns','Template broadcasts from Marketing › Campaigns'],['Automations','Send WhatsApp template steps'],['Events','Tickets, reminders and registrant messages']].map(([a,b])=>`<div style="display:flex;gap:10px;align-items:center"><span class="cb on"></span><div><b style="font-size:13px">${a}</b><div class="muted small">${b}</div></div></div>`).join('')}
  <div class="fld"><label>Project</label><div class="in">All projects ${ic('chev')}</div></div>
 </div>
 <div class="dlg-f"><div class="sp"></div><span class="btn">Back</span><span class="btn p">Finish</span></div>
</div></div>`),{Replaces:'WhatsAppConnectionForm (manual token) and the Inbox Embedded Signup collapse into this one flow. The manual token path stays behind "Advanced" for BSP setups.'});

add('Settings: connect once','s5','Credits: Email, WhatsApp and SMS wallets','Settings › Credits','NEW',setApp('Credits',`
${ph('Credits','Prepaid wallets for messages sent to lists. System emails are free.',`<span class="btn">${ic('dl')}Export</span>`)}
<div class="g3">
 ${[['mail','Email','41,250','8,000 reserved · 63,400 used this month','70','',''],['wa','WhatsApp','3,200','600 reserved · marketing messages, priced per country','45','',''],['sms','SMS','180','Low: an automation is paused waiting for credits','6','bad','Top up']].map(([i,n,v,d,w,c,b])=>`<div class="card"><h4>${ic(i)}${n}</h4><div style="font:600 26px Space Grotesk">${v}</div><div class="bar ${c}" style="margin:6px 0"><i style="width:${w}%"></i></div><div class="muted small">${d}</div><div style="margin-top:10px;display:flex;gap:6px"><span class="btn sm ${b?'p':''}">${ic('plus')}${b||'Buy'}</span><span class="btn sm g">Auto top-up off</span></div></div>`).join('')}
</div>
<div class="card"><h4>Buy WhatsApp credits</h4><div class="muted small" style="margin-bottom:10px">1 credit = 1 marketing message. Utility and service messages cost less. Rates by country: <u>see table</u></div>
 <div class="g4">${[['1,000','$45'],['5,000','$200'],['20,000','$720'],['100,000','$3,200']].map(([n,p],i)=>`<div class="card" style="${i===1?'outline:2px solid hsl(var(--primary))':''}"><b style="font:600 17px Space Grotesk">${n}</b><div class="muted small">messages · valid 12 months</div><div style="font:600 19px Space Grotesk;margin:6px 0">${p}</div><span class="btn sm ${i===1?'p':''}" style="width:100%;justify-content:center">Buy</span></div>`).join('')}</div></div>
<div class="tc"><table class="t"><tr><th>Date</th><th>Wallet</th><th>What</th><th>Detail</th><th class="n">Credits</th></tr>
 <tr><td>23 Oct 10:02</td><td>Email</td><td><span class="chip info">Reserved</span></td><td>Campaign "November open day" · 5,200 recipients</td><td class="n">−5,200</td></tr>
 <tr><td>23 Oct 09:40</td><td>SMS</td><td><span class="chip warn">Paused</span></td><td>Automation "Booking reminder", 0 credits left for step 2</td><td class="n">0</td></tr>
 <tr><td>22 Oct 18:40</td><td>Email</td><td><span class="chip ok">Refund</span></td><td>"Expo follow-up": 214 suppressed before send</td><td class="n up">+214</td></tr>
 <tr><td>20 Oct 14:11</td><td>WhatsApp</td><td><span class="chip ok">Purchase</span></td><td>5,000 pack · Visa ··4242 · <u>Receipt</u></td><td class="n up">+5,000</td></tr>
</table></div>`),{Ledger:'One append-only ledger with a wallet column (email | whatsapp | sms). Balance per wallet = sum. FIFO expiry.',Rates:'WhatsApp: credits per message by category (marketing / utility) and country, kept in config so Meta price changes don\'t need a deploy. SMS: credits per segment per country.',Free:'Free plan: 500 email credits a month. WhatsApp and SMS are prepaid only.'});

/* ===================== Marketing ===================== */
add('Marketing','m1','Marketing overview','Marketing › Overview','NEW',app({on:'Overview',body:`
${ph('Marketing','Last 30 days across email, WhatsApp, SMS and social',`${AIBTN}<span class="btn">${ic('share')}New post</span><span class="btn p">${ic('plus')}New campaign</span>`)}
<div class="g5">${kpi('Messages sent','98,430','<span class="up">↑ 12%</span> email 84k · WA 11k · SMS 3k')}${kpi('Email open rate','41.2%','<span class="up">↑ 2.1 pts</span>')}${kpi('WhatsApp read rate','88%','')}${kpi('Social reach','212k','<span class="up">↑ 18%</span>')}${kpi('Complaints','0.04%','limit 0.30%')}</div>
<div style="display:grid;grid-template-columns:2fr 1fr;gap:14px">
 <div class="card"><h4>Messages by channel</h4><svg viewBox="0 0 600 150" style="width:100%;height:160px"><g stroke="hsl(var(--border))"><line x1="0" y1="140" x2="600" y2="140"/><line x1="0" y1="90" x2="600" y2="90" stroke-dasharray="3 4"/><line x1="0" y1="40" x2="600" y2="40" stroke-dasharray="3 4"/></g>${Array.from({length:30},(_,i)=>{const e=[30,10,60,20,15,90,25,12,8,70,30,22,14,110,40,20,10,9,60,30,16,12,95,38,22,10,8,50,20,12][i],w=[4,2,10,3,2,14,4,2,1,9,4,3,2,12,5,3,2,1,8,4,2,2,13,5,3,1,1,6,3,2][i];return `<rect x="${i*20+3}" y="${140-e}" width="12" height="${e}" rx="2" fill="hsl(var(--primary)/.85)"/><rect x="${i*20+3}" y="${140-e-w}" width="12" height="${w}" rx="2" fill="#25d366"/>`}).join('')}</svg><div class="small muted"><span class="dot" style="background:hsl(var(--primary));margin:0 4px 0 0"></span>Email &nbsp; <span class="dot" style="background:#25d366;margin:0 4px 0 0"></span>WhatsApp</div></div>
 <div style="display:flex;flex-direction:column;gap:14px">
  <div class="card"><h4>${ic('shield')}Sending health</h4><div class="small">acme.com <b class="up">96</b> · WhatsApp quality <b class="up">High</b></div></div>
  <div class="card"><h4>${ic('cal')}Coming up</h4><div class="small">Thu 09:00 · <b>November open day</b> (email, 5,200)</div><div class="small">Fri 12:00 · 3 social posts</div><div class="small">Mon 08:30 · <b>Expo last call</b> (WhatsApp, 2,800)</div></div>
 </div>
</div>
<div class="tc"><table class="t"><tr><th>Recent</th><th>Channel</th><th>Status</th><th class="n">Sent</th><th class="n">Engagement</th></tr>
 <tr><td>Expo follow-up</td><td>${ic('mail')} Email</td><td><span class="chip ok">Sent</span></td><td class="n">12,786</td><td class="n">52% open · 9.7% click</td></tr>
 <tr><td>Open day reminder</td><td>${ic('wa')} WhatsApp</td><td><span class="chip ok">Sent</span></td><td class="n">2,410</td><td class="n">91% read · 14% replied</td></tr>
 <tr><td>"Meet our new campus"</td><td>${ic('share')} Social · 4 networks</td><td><span class="chip ok">Published</span></td><td class="n">—</td><td class="n">18.2k reach · 640 engagements</td></tr>
</table></div>`}),{Landing:'Marketing\'s rail item lands here instead of /crm/campaigns. Wallet balances sit at the bottom of the submenu on every Marketing page.'});

add('Marketing','m2','Campaigns: one list, three channels','Marketing › Campaigns','CHANGED',app({on:'Campaigns',body:`
${ph('Campaigns','Manage and track campaigns across channels',`${AIBTN}<span class="btn">${ic('file')}Templates</span><span class="btn p">${ic('plus')}New campaign</span>`)}
<div style="display:flex;gap:10px;align-items:center"><div class="tabs"><span class="on">All</span><span>${ic('mail')}Email</span><span>${ic('wa')}WhatsApp</span><span>${ic('sms')}SMS</span></div><div class="in" style="width:260px">${ic('search')}<span class="muted">Search campaigns</span></div><span class="btn">${ic('filter')}Status</span><div class="sp"></div><span class="btn sm">Columns</span></div>
<div class="tc"><table class="t">
 <tr><th>Campaign</th><th>Channel</th><th>Status</th><th>Audience</th><th class="n">Sent</th><th class="n">Opened / read</th><th class="n">Clicked / replied</th><th class="n">Credits</th><th>Date</th></tr>
 <tr><td><b>Expo 2026: early bird ends</b><div class="muted small">news@acme.com</div></td><td>${ic('mail')}</td><td><span class="chip bad">${ic('pause','style="width:11px;height:11px"')}Paused</span><div class="small dn">complaints 0.42%</div></td><td>Leads · Sydney</td><td class="n">6,210</td><td class="n">38%</td><td class="n">3.1%</td><td class="n">18,240</td><td>Today 08:00</td></tr>
 <tr><td><b>Open day reminder</b><div class="muted small">template open_day_v2</div></td><td>${ic('wa')}</td><td><span class="chip ok">Sent</span></td><td>Registered: Open day</td><td class="n">2,410</td><td class="n">91%</td><td class="n">14%</td><td class="n">2,410</td><td>Yesterday</td></tr>
 <tr><td><b>November open day</b><div class="muted small">events@acme.com</div></td><td>${ic('mail')}</td><td><span class="chip warn">Scheduled</span></td><td>Prospects 2026</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td class="n">5,200 held</td><td>24 Oct 09:00</td></tr>
 <tr><td><b>Fee deadline nudge</b><div class="muted small">from ACME</div></td><td>${ic('sms')}</td><td><span class="chip ok">Sent</span></td><td>Unpaid invoices</td><td class="n">310</td><td class="n">—</td><td class="n">22 replies</td><td class="n">620</td><td>20 Oct</td></tr>
 <tr><td><b>Expo follow-up</b><div class="muted small">events@acme.com</div></td><td>${ic('mail')}</td><td><span class="chip ok">Sent</span></td><td>Expo 2026 attendees</td><td class="n">12,786</td><td class="n">52%</td><td class="n">9.7%</td><td class="n">12,786</td><td>22 Oct</td></tr>
 <tr><td><b>Untitled campaign</b></td><td>${ic('wa')}</td><td><span class="chip">Draft</span></td><td class="muted">Not set</td><td></td><td></td><td></td><td></td><td>2h ago</td></tr>
</table></div>
<div class="muted small" style="display:flex;justify-content:flex-end;gap:8px;align-items:center">1–6 of 48 <span class="btn sm">Prev</span><span class="btn sm">Next</span></div>`}),{Today:'CampaignsPage already has Email / WhatsApp / SMS tabs. Changes: an "All" tab, a per-channel icon column, a Credits column, keyset paging (not numbered pages), and WhatsApp campaigns stop linking out to /crm/whatsapp.',New:'"New campaign" asks for the channel first, then opens that channel\'s builder (M3–M5).'});

add('Marketing','m3','Email campaign builder with pre-send checks','Marketing › Campaigns › November open day','CHANGED',app({on:'Campaigns',body:`
${ph('November open day',`<span class="chip">Draft</span> · ${ic('mail','style="width:12px;height:12px"')} Email · autosaved 10:41`,`${AIBTN}<span class="btn">${ic('eye')}Preview</span><span class="btn">Send test</span><span class="btn">${ic('clock')}Schedule</span><span class="btn p">${ic('send')}Send now</span>`)}
<div style="display:grid;grid-template-columns:1fr 340px;gap:14px;min-height:0">
 <div style="display:flex;flex-direction:column;gap:10px">
 ${[['From','Acme Events &lt;events@acme.com&gt; · reply to admissions@acme.com'],['To','List <b>Prospects 2026</b> + segment <b>Opened in 90 days</b>, excluding <b>Customers</b> · <b>5,200</b> people after suppressions'],['Subject','Come see campus on 9 November · preview "Tours, talks and free lunch" · <span class="chip info">A/B: 2 subjects, winner by opens after 4h</span>'],['Design','"Open day invite" · brand kit applied · 2 links · 1 image'],['Settings','Track opens + clicks · UTM on · Topic: <b>Events</b>']].map(([t,d])=>`<div class="card" style="display:flex;gap:12px;align-items:flex-start"><span style="width:30px;height:30px;border-radius:8px;display:grid;place-items:center;background:hsl(var(--success)/.1);color:hsl(var(--success))">${ic('check')}</span><div style="flex:1"><b>${t}</b><div class="muted small">${d}</div></div><span class="btn sm">Edit</span></div>`).join('')}
 </div>
 <div style="display:flex;flex-direction:column;gap:12px">
  <div class="card"><h4>${ic('shield')}Ready to send?</h4>
   <div class="check"><span class="dot ok"></span><div>Domain acme.com verified</div></div>
   <div class="check"><span class="dot ok"></span><div>Unsubscribe link + one-click header</div></div>
   <div class="check"><span class="dot ok"></span><div>Postal address in footer</div></div>
   <div class="check"><span class="dot warn"></span><div><b>1,140 haven't opened in 12+ months.</b> <u>Exclude them</u></div></div>
   <div class="check"><span class="dot ok"></span><div>Within today's cap (8,000)</div></div></div>
  <div class="card"><h4>${ic('mail')}Email credits</h4><table class="t"><tr><td>This campaign</td><td class="n"><b>5,200</b></td></tr><tr><td>Available</td><td class="n">41,250</td></tr><tr><td>After sending</td><td class="n"><b>36,050</b></td></tr></table><div class="hint">Held at send or schedule. Anyone we skip is refunded.</div></div>
 </div>
</div>`}),{Base:'Keeps today\'s CampaignHubPage cards (Sender, Recipients, Subject, Design, Additional settings) and adds the checks and credits panels.',Blocks:'Hard blocks: unverified domain, missing unsubscribe, not enough credits, over the daily cap. Warnings never block.'});

add('Marketing','m4','WhatsApp campaign builder','Marketing › Campaigns › Open day reminder','CHANGED',app({on:'Campaigns',body:`
${ph('Open day reminder',`<span class="chip">Draft</span> · ${ic('wa','style="width:12px;height:12px"')} WhatsApp`,`${AIBTN}<span class="btn">Send test</span><span class="btn">${ic('clock')}Schedule</span><span class="btn p">${ic('send')}Send now</span>`)}
<div style="display:grid;grid-template-columns:1fr 320px 300px;gap:14px;min-height:0">
 <div style="display:flex;flex-direction:column;gap:10px">
  <div class="card"><b>From</b><div class="muted small">+61 2 8000 1234 · Acme Learning (Settings › Channels)</div></div>
  <div class="card"><b>To</b><div class="muted small">Event <b>Open day Nov</b>: registered, not checked in · <b>2,410</b> with WhatsApp consent · 312 skipped (no consent)</div></div>
  <div class="card"><b>Template</b> <span class="chip ok">Approved by Meta</span><div class="in" style="margin-top:6px">open_day_v2 · Marketing · English ${ic('chev')}</div>
   <div class="grp" style="margin:10px 0 4px">Variables</div>
   <div style="display:grid;grid-template-columns:60px 1fr;gap:6px;align-items:center" class="small"><span class="mono">{{1}}</span><div class="in small">Contact › First name, fallback "there"</div><span class="mono">{{2}}</span><div class="in small">Event › Start time</div><span class="mono">button</span><div class="in small">Event › Ticket link (per person)</div></div></div>
  <div class="card"><b>Replies</b><div class="muted small">Land in Support › Inbox on the same WhatsApp channel, tagged with this campaign.</div></div>
 </div>
 <div class="card" style="display:flex;justify-content:center;background:hsl(var(--muted)/.5)"><div class="phone"><div style="background:#075e54;color:#fff;padding:10px;font-size:12px"><b>Acme Learning</b> ✓</div><div class="bubble">Hi Priya 👋 Open day is this <b>Saturday 10am</b>. Your ticket is ready. Come hungry, lunch is on us!<div style="border-top:1px solid #eee;margin-top:8px;padding-top:6px;color:#0a7cff;text-align:center">View my ticket</div></div></div></div>
 <div style="display:flex;flex-direction:column;gap:12px">
  <div class="card"><h4>${ic('shield')}Ready to send?</h4><div class="check"><span class="dot ok"></span><div>Template approved</div></div><div class="check"><span class="dot ok"></span><div>Number quality High · tier 10k/day</div></div><div class="check"><span class="dot ok"></span><div>Only contacts who opted in to WhatsApp</div></div></div>
  <div class="card"><h4>${ic('wa')}WhatsApp credits</h4><table class="t"><tr><td>2,410 messages</td><td class="n"><b>2,410</b></td></tr><tr><td>Available</td><td class="n">3,200</td></tr><tr><td>After</td><td class="n"><b>790</b></td></tr></table><div class="hint">Australia · marketing rate. Mixed countries are priced per recipient.</div></div>
 </div>
</div>`}),{Today:'WhatsAppCampaignBuilderPage moves from /crm/whatsapp/campaigns/new to here. Same template and variable logic, plus the consent filter, the phone preview and the wallet panel.'});

add('Marketing','m5','SMS campaign builder','Marketing › Campaigns › Fee deadline nudge','CHANGED',app({on:'Campaigns',body:`
${ph('Fee deadline nudge',`<span class="chip">Draft</span> · ${ic('sms','style="width:12px;height:12px"')} SMS`,`${AIBTN}<span class="btn">Send test</span><span class="btn p">${ic('send')}Send now</span>`)}
<div style="display:grid;grid-template-columns:1fr 340px;gap:14px">
 <div style="display:flex;flex-direction:column;gap:10px">
  <div class="card"><b>From</b><div class="in" style="margin-top:6px">ACME (alphanumeric sender) ${ic('chev')}</div><div class="hint">Replies need a number: switch to +61 480 000 111 to receive them in the Inbox.</div></div>
  <div class="card"><b>To</b><div class="muted small">Segment <b>Unpaid invoices, due in 7 days</b> · 310 with SMS consent</div></div>
  <div class="card"><b>Message</b><div class="in" style="height:110px;align-items:flex-start;margin-top:6px">Hi {{first_name}}, a reminder your Term 1 fee is due {{invoice.due_date}}. Pay here: {{invoice.link}} Reply STOP to opt out.</div>
   <div style="display:flex;justify-content:space-between" class="hint"><span>142 / 160 characters · <b>1 segment</b> · short links on</span><span><u>Insert variable</u></span></div></div>
 </div>
 <div style="display:flex;flex-direction:column;gap:12px">
  <div class="card"><h4>${ic('shield')}Ready to send?</h4><div class="check"><span class="dot ok"></span><div>Opt-out text present ("Reply STOP")</div></div><div class="check"><span class="dot ok"></span><div>Quiet hours respected: sends 9am–8pm local</div></div><div class="check"><span class="dot bad"></span><div><b>Not enough SMS credits.</b> Needs 620 (2 per AU segment), you have 180.</div></div></div>
  <div class="card"><h4>${ic('sms')}SMS credits</h4><div style="font:600 22px Space Grotesk" class="dn">180</div><span class="btn p sm" style="margin-top:6px">${ic('plus')}Buy 1,000 for $60</span></div>
 </div>
</div>`}),{Sender:'Uses org_phone_numbers (already used by the Inbox to send SMS). Sender IDs only where the country allows them.'});

add('Marketing','m6','Not enough credits at Send','Any campaign › Send now','NEW',app({on:'Campaigns',body:`${ph('Expo 2026: last call','')}<div class="card" style="height:520px"></div>`,overlay:`<div class="ov"><div class="dlg" style="width:540px">
 <div class="dlg-h"><div style="color:hsl(var(--warning))">${ic('alert','style="width:22px;height:22px"')}</div><div><h3>You need 12,000 more email credits</h3><div class="muted small">This campaign goes to 20,000 people. You have 8,000 available.</div></div></div>
 <div class="dlg-b">
  <div class="card" style="outline:2px solid hsl(var(--primary));display:flex;gap:10px;align-items:center"><span class="cb on"></span><div><b>Buy 50,000 for $60</b><div class="muted small">Covers this campaign and leaves 38,000</div></div></div>
  <div class="card" style="display:flex;gap:10px;align-items:center"><span class="cb"></span><div><b>Send to fewer people</b><div class="muted small">Narrow the audience to 8,000 or fewer</div></div></div>
  <div class="hint">We never send half a campaign. After paying you come straight back here and it sends.</div>
 </div>
 <div class="dlg-f"><span class="btn g">Save as draft</span><div class="sp"></div><span class="btn p">${ic('card')}Pay $60 and send</span></div>
</div></div>`}),{Same:'Same dialog for every wallet. Scheduled campaigns hold credits at schedule time and pause with an alert if the hold can\'t be met.'});

add('Marketing','m7','Email editor with brand kit','Marketing › Campaigns › Design (full-screen route)','CHANGED',fullScreen(`
<div style="display:flex;align-items:center;gap:8px;padding:10px 16px;border-bottom:1px solid hsl(var(--border));background:hsl(var(--card))"><b>November open day</b><span class="muted small">› Design</span><div class="sp"></div><span class="chip ok">Brand kit: Acme</span>${AIBTN}<span class="btn sm">${ic('monitor')}</span><span class="btn sm">${ic('phone')}</span><span class="btn sm">Send test</span><span class="btn sm p">Done</span></div>
<div style="flex:1;display:flex;min-height:0">
 <div style="width:220px;border-right:1px solid hsl(var(--border));background:hsl(var(--card));padding:12px;display:flex;flex-direction:column;gap:8px"><div class="tabs"><span class="on">Blocks</span><span>Sections</span><span>Saved</span></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${['Text','Image','Button','Columns','Divider','Spacer','Social','Video','Event card','Product','Countdown','HTML'].map(b=>`<div class="card" style="padding:9px 6px;text-align:center;font-size:12px">${b}</div>`).join('')}</div></div>
 <div style="flex:1;overflow:hidden;padding:20px;background:hsl(var(--muted)/.5)"><div class="emailpage">
  <div style="padding:16px 24px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #eee"><div style="width:26px;height:26px;border-radius:6px;background:#0f3d63"></div><b style="font-family:Space Grotesk;color:#0f3d63">Acme Learning</b></div>
  <div style="height:140px;background:linear-gradient(135deg,#0f3d63,#2f6f9f 60%,#f08a4b)"></div>
  <div style="padding:18px 24px;outline:2px solid #7c5cf5;outline-offset:-6px"><h3 style="font-size:20px;color:#0f3d63">Come see campus on 9 November</h3><div class="lines"><div></div><div></div><div style="width:70%"></div></div></div>
  <div style="padding:0 24px 18px"><span style="display:inline-block;background:#f08a4b;color:#fff;padding:9px 18px;border-radius:8px;font-weight:600">Book your spot</span></div>
  <div style="padding:12px 24px;background:#f6f6f4;font-size:11px;color:#777">Acme Learning · 12 King St, Sydney NSW 2000 · <u>Preferences</u> · <u>Unsubscribe</u></div></div></div>
 <div style="width:260px;border-left:1px solid hsl(var(--border));background:hsl(var(--card));padding:12px;display:flex;flex-direction:column;gap:10px"><b>Text</b>
  <div class="fld"><label>Font</label><div class="in">Brand body (Arial)</div></div>
  <div class="fld"><label>Colour</label><div style="display:flex;gap:6px">${['#0f3d63','#2f6f9f','#f08a4b','#1d2433','#ffffff'].map(c=>`<span style="width:22px;height:22px;border-radius:6px;background:${c};border:1px solid hsl(var(--border))"></span>`).join('')}</div></div>
  <div class="fld"><label>Merge tags</label><div class="in small mono">{{first_name|there}}</div></div>
  <div class="fld"><label>Show to</label><div class="in small">Everyone</div></div></div>
</div>`),{Options:'The editor is a full-screen route (withLayout=false). Five alternative layouts are on the Email editor options page.',Reuse:'Extends today\'s CampaignDesignEditorPage (EmailBuilder, SectionLibrary, MergeTagMenu). New: brand kit, Event card / Product / Countdown blocks, and the AI panel.'});

add('Marketing','m8','Templates: Email, WhatsApp, SMS','Marketing › Templates','CHANGED',app({on:'Templates',body:`
${ph('Templates','Reusable messages for every channel',`${AIBTN}<span class="btn p">${ic('plus')}New template</span>`)}
<div class="tabs" style="align-self:flex-start"><span>${ic('mail')}Email</span><span class="on">${ic('wa')}WhatsApp</span><span>${ic('sms')}SMS</span></div>
<div class="tc"><table class="t"><tr><th>Name</th><th>Category</th><th>Language</th><th>Meta status</th><th class="n">Used in</th><th>Updated</th></tr>
 <tr><td><b>open_day_v2</b><div class="muted small">Hi {{1}} 👋 Open day is this {{2}}…</div></td><td>Marketing</td><td>English</td><td><span class="chip ok">Approved</span></td><td class="n">3 campaigns · 1 automation</td><td>18 Oct</td></tr>
 <tr><td><b>ticket_confirmation</b><div class="muted small">Your ticket for {{1}} is confirmed…</div></td><td>Utility</td><td>English</td><td><span class="chip ok">Approved</span></td><td class="n">Events</td><td>2 Oct</td></tr>
 <tr><td><b>fee_reminder_hi</b><div class="muted small">नमस्ते {{1}}…</div></td><td>Utility</td><td>Hindi</td><td><span class="chip warn">In review</span></td><td class="n">—</td><td>Today</td></tr>
 <tr><td><b>expo_flash_sale</b></td><td>Marketing</td><td>English</td><td><span class="chip bad">Rejected</span><div class="small dn">"Promotional content in a utility template"</div></td><td class="n">—</td><td>20 Oct</td></tr>
 <tr><td><b>Course enquiry (Flow)</b><div class="muted small">WhatsApp Flow form · 4 screens</div></td><td>Flow</td><td>English</td><td><span class="chip ok">Published</span></td><td class="n">1 template</td><td>11 Oct</td></tr>
</table></div>
<div class="banner info">${ic('spark')}<div>Rejected? Open it with <b>✦ AI</b>: it reads Meta's reason, proposes a compliant rewrite and resubmits after you approve.</div></div>`}),{Moves:'WhatsAppTemplatesPage and WhatsAppFlowsPage come here (WhatsApp tab). TemplatesPage (email) is the Email tab. SMS templates are new and simple.'});

add('Marketing','m9','Audiences: lists, segments, consent per channel','Marketing › Audiences','NEW',app({on:'Audiences',body:`
${ph('Audiences','Everyone you can message, and on which channels they said yes',`${AIBTN}<span class="btn">${ic('upload')}Import CSV</span><span class="btn">${ic('filter')}New segment</span><span class="btn p">${ic('plus')}New list</span>`)}
<div class="ul"><span class="on">Lists 7</span><span>Segments 5</span><span>All contacts 38,412</span><span>Topics 4</span><span>Suppressed 1,206</span></div>
<div class="g4">${kpi('Email subscribed','34,980','91%')}${kpi('WhatsApp opted in','9,310','24%')}${kpi('SMS opted in','6,870','18%')}${kpi('Suppressed','1,206','bounced, complained or opted out')}</div>
<div class="tc"><table class="t"><tr><th>List</th><th>Source</th><th class="n">Contacts</th><th class="n">${ic('mail','style="width:13px;height:13px"')}</th><th class="n">${ic('wa','style="width:13px;height:13px"')}</th><th class="n">${ic('sms','style="width:13px;height:13px"')}</th><th>Updated</th></tr>
 <tr><td><b>Newsletter</b></td><td>Form: hub.acme.com sign-up (double opt-in)</td><td class="n">21,904</td><td class="n">21,410</td><td class="n">2,100</td><td class="n">—</td><td>live</td></tr>
 <tr><td><b>Prospects 2026</b></td><td>CRM: stage = Lead</td><td class="n">6,340</td><td class="n">6,102</td><td class="n">3,880</td><td class="n">2,950</td><td>synced 5m ago</td></tr>
 <tr><td><b>Expo 2026 attendees</b></td><td>Events: registrations</td><td class="n">12,980</td><td class="n">12,786</td><td class="n">5,230</td><td class="n">3,110</td><td>live</td></tr>
 <tr><td><b>WhatsApp contacts (imported)</b></td><td>Moved from Marketing › WhatsApp › Contacts</td><td class="n">1,980</td><td class="n">—</td><td class="n">1,980</td><td class="n">—</td><td>4 Oct</td></tr>
</table></div>`}),{Model:'A contact is the existing crm_contacts row. Marketing adds consent per channel (email / whatsapp / sms + timestamp + source), topic preferences and list membership. wa_contacts merge in, so there\'s no second contact store.',Suppression:'One suppression list per org, per channel: hard bounce, complaint, STOP reply, WhatsApp block. Every send checks it.'});

add('Marketing','m10','Segment builder','Marketing › Audiences › New segment','NEW',app({on:'Audiences',body:`
${ph('Engaged prospects','Segment · updates automatically',`${AIBTN}<span class="btn">Cancel</span><span class="btn p">Save segment</span>`)}
<div style="display:grid;grid-template-columns:1fr 300px;gap:14px">
 <div class="card"><div class="grp" style="margin-bottom:10px">People who match all of these</div>
 ${[['Contact','Lifecycle stage','is','Lead'],['Event','Registered for','any of','Expo 2026, Open day Nov'],['Engagement','Opened email or read WhatsApp','in the last','90 days'],['Contact','Country','is','Australia']].map(r=>`<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">${r.map(x=>`<div class="in small">${x}</div>`).join('')}<span class="muted">${ic('x')}</span></div>`).join('')}
 <div style="display:flex;gap:8px"><span class="btn sm">${ic('plus')}Add condition</span><span class="btn sm">${ic('plus')}Add "or" group</span></div>
 <div class="banner info" style="margin-top:14px">${ic('spark')}<div>Or describe it: <i>"leads in Australia who came to an event this year but haven't booked a tour"</i>. ✦ AI builds the conditions for you to check.</div></div></div>
 <div style="display:flex;flex-direction:column;gap:12px"><div class="card kpi"><div class="l">Matches now</div><div class="v">4,812</div><div class="d">${ic('mail','style="width:12px;height:12px"')} 4,700 · ${ic('wa','style="width:12px;height:12px"')} 2,210 · ${ic('sms','style="width:12px;height:12px"')} 1,640 reachable</div></div><div class="card"><h4>Sample</h4><table class="t small"><tr><td>Priya S.</td><td class="muted">opened 3d ago</td></tr><tr><td>Tom W.</td><td class="muted">read WA 12d ago</td></tr></table></div></div>
</div>`}),{SQL:'Compiles to SQL, extending today\'s campaigns/audience-sql.ts. The count is one indexed query, debounced.'});

add('Marketing','m11','Social: content calendar','Marketing › Social','NEW',app({on:'Social',body:`
${ph('Social','Plan, publish and reply across your social accounts',`${AIBTN}<span class="btn p">${ic('plus')}New post</span>`)}
<div style="display:flex;gap:10px;align-items:center"><div class="ul" style="border:none"><span class="on">Calendar</span><span>Posts</span><span>Engage <span class="chip bad" style="padding:0 6px">14</span></span><span>Analytics</span></div><div class="sp"></div><span class="muted small">Showing</span><span class="net fb">f</span><span class="net ig">ig</span><span class="net li">in</span><div class="tabs"><span>Day</span><span class="on">Week</span><span>Month</span></div></div>
<div class="cal">${['Mon 21','Tue 22','Wed 23','Thu 24','Fri 25','Sat 26','Sun 27'].map(d=>`<div class="dh">${d}</div>`).join('')}
 ${[[['fb','10:00 Expo recap album'],['li','10:00 Expo recap']],[['ig','12:30 Reel: campus tour']],[['ig','09:00 Student story'],['fb','17:00 Webinar reminder']],[['li','08:00 Scholarship winners'],['ig','18:00 Open day countdown']],[['fb','12:00 Meet our new campus'],['ig','12:00 Meet our new campus'],['li','12:00 Meet our new campus']],[['ig','10:00 Open day live']],[]].map((posts,i)=>`<div class="dc">${posts.map(([n,t])=>`<div class="post"><span class="net ${n}">${n==='fb'?'f':n==='li'?'in':'ig'}</span>${t}</div>`).join('')}${i===6?'<div class="post" style="background:none;border:1px dashed hsl(var(--border));color:hsl(var(--muted-fg))">+ Suggested 11:00</div>':''}</div>`).join('')}
 ${Array.from({length:7},(_,i)=>`<div class="dc">${i===1?'<div class="post"><span class="net ig">ig</span>Draft: fees FAQ <span class="chip warn" style="padding:0 5px">Needs approval</span></div>':''}${i===4?'<div class="post"><span class="net li">in</span>Hiring: tutors</div>':''}</div>`).join('')}
</div>`}),{Publish:'Scheduled posts go out through each network\'s API from a job_outbox topic. Failures retry and the owner is notified.',Approval:'Optional approval step: posts by members wait for an owner/admin to approve, the same pattern as Agents › Approvals.'});

add('Marketing','m12','Social: post composer with previews','Marketing › Social › New post','NEW',app({on:'Social',body:`${ph('Social','')}<div class="card" style="height:540px"></div>`,overlay:`<div class="ov"><div class="dlg" style="width:1040px">
 <div class="dlg-h"><div><h3>New post</h3></div><div class="sp"></div>${ic('x')}</div>
 <div class="dlg-b" style="display:grid;grid-template-columns:1fr 380px;gap:16px">
  <div style="display:flex;flex-direction:column;gap:10px">
   <div style="display:flex;gap:6px;align-items:center"><span class="muted small">Post to</span>${['fb','ig','li'].map(n=>`<span class="chip"><span class="net ${n}">${n==='fb'?'f':n==='li'?'in':'ig'}</span>${n==='fb'?'Acme Learning':n==='ig'?'@acmelearning':'Acme Learning'}</span>`).join('')}<span class="chip">${ic('plus','style="width:11px;height:11px"')}</span></div>
   <div class="in" style="height:150px;align-items:flex-start">Our new campus opens 9 November 🎉 Bright classrooms, a 24/7 library and a café run by students. Come see it at open day. Link in bio.</div>
   <div style="display:flex;gap:6px"><span class="btn sm">${ic('img')}Media</span><span class="btn sm ai">${ic('spark')}Write with AI</span><span class="btn sm ai">${ic('spark')}Generate image</span><span class="btn sm">#</span><div class="sp"></div><span class="muted small">LinkedIn 182/3000 · X off</span></div>
   <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${[1,2,3].map(()=>`<div class="thumb" style="height:80px;background:linear-gradient(135deg,#2f6f9f,#f08a4b)"></div>`).join('')}<div class="thumb" style="height:80px;display:grid;place-items:center;background:hsl(var(--muted))">${ic('plus')}</div></div>
   <div class="ul" style="margin-top:4px"><span class="on">Same for all</span><span>Customise per network</span></div>
   <div class="g2"><div class="fld"><label>When</label><div class="in">${ic('cal')}Fri 25 Oct, 12:00 · suggested best time</div></div><div class="fld"><label>Campaign tag</label><div class="in">Open day Nov ${ic('chev')}</div></div></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:8px"><div class="tabs"><span class="on">Instagram</span><span>Facebook</span><span>LinkedIn</span></div>
   <div class="card" style="padding:0;overflow:hidden"><div style="padding:8px 10px;display:flex;gap:8px;align-items:center" class="small"><span class="net ig" style="width:22px;height:22px;border-radius:50%">ig</span><b>acmelearning</b></div><div style="height:250px;background:linear-gradient(135deg,#2f6f9f,#f08a4b)"></div><div style="padding:8px 10px" class="small">${ic('heart')} ${ic('msg')} ${ic('send')}<div><b>acmelearning</b> Our new campus opens 9 November 🎉 Bright classrooms…</div></div></div></div>
 </div>
 <div class="dlg-f"><span class="btn g">Save draft</span><div class="sp"></div><span class="btn">Send for approval</span><span class="btn p">${ic('clock')}Schedule</span></div>
</div></div>`}),{Networks:'Facebook Pages, Instagram Business, LinkedIn Pages, TikTok and X. Each has its own limits (characters, media, aspect ratio), checked live.',AI:'Write with AI and image generation use the existing ai-service and brand kit. Each costs AI credits, as in Events.'});

add('Marketing','m13','Social: Engage (comments and mentions)','Marketing › Social › Engage','NEW',app({on:'Social',flush:true,body:`
<div style="padding:24px 32px 12px">${ph('Social','Plan, publish and reply across your social accounts',AIBTN)}<div class="ul" style="margin-top:12px"><span>Calendar</span><span>Posts</span><span class="on">Engage <span class="chip bad" style="padding:0 6px">14</span></span><span>Analytics</span></div></div>
<div style="flex:1;display:flex;min-height:0;border-top:1px solid hsl(var(--border))">
 <div style="width:380px;border-right:1px solid hsl(var(--border));background:hsl(var(--card));overflow:hidden">
  <div style="padding:10px 12px;display:flex;gap:6px"><span class="chip">Unreplied 14</span><span class="chip">Mentions 3</span><span class="chip">Negative 1</span></div>
  ${[['ig','Maya R.','commented on "Meet our new campus"','Is parking free on open day? 🚗','2m',true],['fb','Daniel K.','commented','Do you offer evening classes?','18m',false],['li','Sara P.','mentioned you','Proud to have studied at @Acme Learning…','1h',false],['ig','j.wong','commented','The app keeps crashing 😡','2h',false,true]].map(([n,a,w,t,ti,sel,neg])=>`<div style="padding:10px 12px;border-top:1px solid hsl(var(--border));${sel?'background:hsl(var(--primary-light))':''}"><div class="small" style="display:flex;gap:6px;align-items:center"><span class="net ${n}">${n==='fb'?'f':n==='li'?'in':'ig'}</span><b>${a}</b><span class="muted">${w}</span><span class="sp"></span><span class="muted">${ti}</span></div><div style="font-size:13px;margin-top:3px">${t} ${neg?'<span class="chip bad" style="padding:0 6px">Negative</span>':''}</div></div>`).join('')}
 </div>
 <div style="flex:1;padding:16px 20px;display:flex;flex-direction:column;gap:12px">
  <div class="card" style="display:flex;gap:12px"><div class="thumb" style="width:90px;height:90px;flex:none;background:linear-gradient(135deg,#2f6f9f,#f08a4b)"></div><div class="small"><span class="net ig">ig</span> <b>Meet our new campus</b> · 23 Oct 12:00<div class="muted">2.1k likes · 84 comments · 18.2k reach</div><u>Open post</u></div></div>
  <div class="card"><div class="small"><b>Maya R.</b> · 2m</div><div>Is parking free on open day? 🚗</div></div>
  <div class="banner info">${ic('spark')}<div><b>Suggested reply</b> (from your Knowledge base: "Open day FAQ"): <i>Hi Maya! Yes, parking is free all day in the King St car park. See you there 😊</i> <span class="btn sm" style="margin-left:6px">Use</span></div></div>
  <div class="in" style="height:80px;align-items:flex-start">Reply publicly…</div>
  <div style="display:flex;gap:8px"><span class="btn sm">Hide comment</span><span class="btn sm">Move to Inbox as DM</span><span class="btn sm">Create CRM contact</span><div class="sp"></div><span class="btn p">Reply</span></div>
 </div>
</div>`}),{Split:'Public comments and mentions live here, next to the post. DMs stay in Support › Inbox (Instagram, Messenger and TikTok are already Inbox channels). "Move to Inbox as DM" hands a comment over when it turns private.'});

add('Marketing','m14','Social: analytics','Marketing › Social › Analytics','NEW',app({on:'Social',body:`
${ph('Social','Last 30 days · all connected accounts',AIBTN)}
<div class="ul"><span>Calendar</span><span>Posts</span><span>Engage</span><span class="on">Analytics</span></div>
<div class="g5">${kpi('Reach','212k','<span class="up">↑ 18%</span>')}${kpi('Engagements','9,840','4.6% rate')}${kpi('Followers','+1,204','now 38.6k')}${kpi('Link clicks','2,310','→ 184 form fills')}${kpi('Avg reply time','42 min','Engage')}</div>
<div style="display:grid;grid-template-columns:2fr 1fr;gap:14px">
 <div class="card"><h4>Reach by network</h4><svg viewBox="0 0 600 160" style="width:100%;height:170px"><polyline fill="none" stroke="#1877f2" stroke-width="2" points="0,120 60,110 120,100 180,105 240,90 300,70 360,80 420,60 480,55 540,40 600,45"/><polyline fill="none" stroke="#dc2743" stroke-width="2" points="0,130 60,125 120,115 180,100 240,95 300,85 360,70 420,72 480,50 540,35 600,30"/><polyline fill="none" stroke="#0a66c2" stroke-width="2" points="0,140 60,138 120,135 180,130 240,128 300,126 360,120 420,118 480,112 540,110 600,106"/></svg></div>
 <div class="card"><h4>Best time to post</h4><div class="small muted" style="margin-bottom:8px">From your audience's activity</div>${['Tue 12:00 · Instagram','Thu 08:00 · LinkedIn','Fri 17:00 · Facebook'].map(x=>`<div class="check"><span class="dot ok"></span><div>${x}</div></div>`).join('')}</div>
</div>
<div class="tc"><table class="t"><tr><th>Top posts</th><th>Network</th><th class="n">Reach</th><th class="n">Engagement</th><th class="n">Clicks</th></tr>
 <tr><td>Meet our new campus</td><td><span class="net ig">ig</span> <span class="net fb">f</span> <span class="net li">in</span></td><td class="n">18.2k</td><td class="n">6.1%</td><td class="n">420</td></tr>
 <tr><td>Reel: campus tour</td><td><span class="net ig">ig</span></td><td class="n">41.0k</td><td class="n">8.3%</td><td class="n">310</td></tr></table></div>`}),{Data:'Pulled nightly from each network\'s insights API into a per-post metrics table; no live calls when the page opens.'});

add('Marketing','m15','Reports: all channels','Marketing › Reports','NEW',app({on:'Reports',body:`
${ph('Reports','Campaign, automation and social results in one place',`${AIBTN}<span class="btn">${ic('dl')}Export</span>`)}
<div style="display:flex;gap:10px"><div class="tabs"><span class="on">Overview</span><span>Email</span><span>WhatsApp</span><span>SMS</span><span>Social</span><span>Deliverability</span></div><div class="sp"></div><span class="btn sm">${ic('cal')}Last 30 days</span></div>
<div class="g4">${kpi('Contacts reached','31,204','across all channels')}${kpi('Form fills from marketing','612','<span class="up">↑ 22%</span>')}${kpi('Deals influenced','48','$184k pipeline')}${kpi('Credits used','98,430','email 84k · WA 11k · SMS 3k')}</div>
<div class="tc"><table class="t"><tr><th>Campaign / automation</th><th>Channel</th><th class="n">Sent</th><th class="n">Engaged</th><th class="n">Form fills</th><th class="n">Deals</th><th class="n">Unsub / opt-out</th></tr>
 <tr><td>Expo follow-up</td><td>${ic('mail')}</td><td class="n">12,786</td><td class="n">52%</td><td class="n">212</td><td class="n">19</td><td class="n">0.18%</td></tr>
 <tr><td>Automation: Lead nurture</td><td>${ic('mail')} ${ic('wa')}</td><td class="n">14,200</td><td class="n">47%</td><td class="n">180</td><td class="n">14</td><td class="n">0.3%</td></tr>
 <tr><td>Open day reminder</td><td>${ic('wa')}</td><td class="n">2,410</td><td class="n">91% read</td><td class="n">96</td><td class="n">6</td><td class="n">0.4% blocked</td></tr>
 <tr><td>Fee deadline nudge</td><td>${ic('sms')}</td><td class="n">310</td><td class="n">22 replies</td><td class="n">—</td><td class="n">—</td><td class="n">1.0% STOP</td></tr>
</table></div>`}),{Deliverability:'The Deliverability tab holds the email domain health page (complaint and bounce limits, warm-up cap, Gmail/Yahoo checklist, auto-pause history) plus WhatsApp number quality.',Attribution:'Form fills and deals come from UTM plus contact matching on the existing crm_contacts and opportunities tables.'});

add('Marketing','m16','Auto-paused campaign','Marketing › Campaigns › Expo 2026: early bird ends','NEW',app({on:'Campaigns',body:`
${ph('Expo 2026: early bird ends',`<span class="chip bad">${ic('pause','style="width:11px;height:11px"')}Auto-paused</span>`,AIBTN)}
<div class="banner bad">${ic('alert','style="width:20px;height:20px"')}<div><b>We paused this campaign after 6,210 of 18,240 emails.</b><div class="small">17 people marked it as spam (0.42%). Gmail starts blocking senders above 0.3%, so we stopped to protect acme.com. The other 12,030 credits are still held.</div></div></div>
<div class="g2">
 <div class="card"><h4>Likely cause</h4><div class="check"><span class="dot bad"></span><div>14 of 17 complaints came from <b>"Leads · Sydney"</b>, imported 3 Oct, with no opens on record</div></div><div class="check"><span class="dot warn"></span><div>Subject uses "FREE" plus urgency</div></div></div>
 <div class="card"><h4>What would you like to do?</h4>
  <div class="card" style="margin-bottom:8px;outline:2px solid hsl(var(--primary))"><b>Resume to engaged people only</b><div class="muted small">7,480 who engaged in 90 days. Refunds 4,550 credits.</div></div>
  <div class="card" style="margin-bottom:8px"><b>Cancel and refund</b><div class="muted small">12,030 credits back to your wallet.</div></div>
  <div class="card"><b>Resume as is</b><div class="muted small">Needs GlobalyOS review above 0.3%.</div></div></div>
</div>`}),{Guardrails:'Thresholds live in config. Enforced in the send loop and a 5-minute cron. Pausing also pauses this domain\'s email steps in Automations.'});

add('Marketing','m17','Marketing settings and brand kit','Marketing › Settings','CHANGED',app({on:'Settings',body:`
${ph('Marketing settings','')}
<div class="ul"><span class="on">Sending</span><span>Brand kit</span><span>Subscriptions</span><span>Tracking</span><span>Dedicated IP</span></div>
<div class="g2">
 <div class="card"><h4>Defaults</h4>
  <div class="fld"><label>Default email sender</label><div class="in">Acme Learning &lt;hello@acme.com&gt;</div></div><br>
  <div class="fld"><label>Default WhatsApp number</label><div class="in">+61 2 8000 1234 ${ic('chev')}</div><div class="hint">From Settings › Channels</div></div><br>
  <div class="fld"><label>Default SMS sender</label><div class="in">ACME / +61 480 000 111 ${ic('chev')}</div></div><br>
  <div class="fld"><label>Postal address (required by law)</label><div class="in">12 King St, Sydney NSW 2000</div></div></div>
 <div class="card"><h4>Brand kit</h4>
  <div style="display:flex;gap:12px;align-items:center"><div style="width:48px;height:48px;border-radius:10px;background:#0f3d63"></div><div class="small"><b>Logo</b><div class="muted">from Organization · <u>Replace</u></div></div></div>
  <div class="grp" style="margin:12px 0 6px">Colours</div><div style="display:flex;gap:6px">${['#0f3d63','#2f6f9f','#f08a4b','#1d2433','#f6f6f4'].map(c=>`<span style="width:28px;height:28px;border-radius:7px;background:${c};border:1px solid hsl(var(--border))"></span>`).join('')}</div>
  <div class="grp" style="margin:12px 0 6px">Email fonts</div><div class="in small">Headings Georgia · Body Arial</div>
  <div class="grp" style="margin:12px 0 6px">Voice (used by AI)</div><div class="in small">Warm, clear, no jargon. Australian English.</div></div>
</div>`}),{Today:'CampaignSettingsPage (email tracking toggles) becomes the Tracking tab. WhatsAppSettingsPage\'s connection part moves to Settings › Channels; its defaults land here.',Voice:'"Voice" is new. The AI assistant follows it in every channel.'});

/* ===================== AI assistant ===================== */
add('AI assistant','ai1','✦ AI: "Create a campaign for…"','Marketing › Campaigns, AI panel open','NEW',app({on:'Campaigns',body:`
${ph('Campaigns','Manage and track campaigns across channels',`<span class="btn ai">${ic('spark')}AI</span><span class="btn p">${ic('plus')}New campaign</span>`)}
<div class="tabs" style="align-self:flex-start"><span class="on">All</span><span>Email</span><span>WhatsApp</span><span>SMS</span></div>
<div class="tc" style="opacity:.6"><table class="t"><tr><th>Campaign</th><th>Status</th><th class="n">Sent</th></tr><tr><td>Expo follow-up</td><td><span class="chip ok">Sent</span></td><td class="n">12,786</td></tr><tr><td>Open day reminder</td><td><span class="chip ok">Sent</span></td><td class="n">2,410</td></tr></table></div>`,overlay:`<div class="aisheet">
 <div class="h">${ic('spark','style="color:hsl(var(--chart-4))"')}AI <span class="chip ai" style="margin-left:6px">Campaigns</span><div class="sp"></div>${ic('x')}</div>
 <div class="log">
  <div class="msg me">Invite everyone who came to Expo 2026 to the November open day. Email first, then WhatsApp 2 days before for anyone who hasn't registered.</div>
  <div class="msg ai">Here's a plan. Nothing is created until you press Apply.</div>
  <div class="cs">
   <div class="row"><b>Audience</b><span>Expo 2026 attendees, not registered for Open day Nov · <b>9,402</b> (email 9,300 · WhatsApp 4,120)</span></div>
   <div class="row"><b>1 · Email</b><span>Thu 24 Oct 09:00 · "You're invited: open day, 9 Nov" · template Open day invite, brand kit · A/B on 2 subjects</span></div>
   <div class="row"><b>2 · WhatsApp</b><span>Thu 7 Nov 10:00 · open_day_v2 (approved) · only people still not registered</span></div>
   <div class="row"><b>Credits</b><span>Email 9,300 of 41,250 · WhatsApp up to 4,120 of 3,200 <span class="dn">(short by 920)</span></span></div>
   <div class="row"><b>Creates</b><span>1 email campaign (draft) + 1 automation (paused)</span></div>
   <div style="display:flex;gap:6px;margin-top:8px"><span class="btn sm p">Apply</span><span class="btn sm">Edit email first</span><span class="btn sm g">Discard</span></div>
  </div>
  <div class="msg ai small">Heads-up: you'll need about 920 more WhatsApp credits before 7 Nov. I'll remind you on 4 Nov.</div>
 </div>
 <div class="ft"><div class="chips"><span>Write 3 subject lines</span><span>Who hasn't opened in 90 days?</span><span>Turn this into a social post</span></div><div class="in" style="height:64px;align-items:flex-start;color:hsl(var(--muted-fg))">Describe the campaign you want…</div><div style="display:flex"><span class="muted small">Uses AI credits · Pro</span><div class="sp"></div><span class="btn p sm">${ic('send')}Send</span></div></div>
</div>`}),{Pattern:'Same as the Events assistant: one panel per module, skills underneath (campaign, audience, copy, template, social post, automation), always a change-set preview, Apply writes drafts only, Undo per batch.',Safety:'The assistant never sends. Apply creates drafts and paused automations; launching is the normal Send or Schedule with its checks.',Skills:'v1 skills: build a campaign (any channel), write or rewrite copy, build a segment from a description, draft a WhatsApp template and resubmit a rejected one, plan a week of social posts, create an automation.'});

add('AI assistant','ai2','✦ AI: plan a week of social posts','Marketing › Social, AI panel open','NEW',app({on:'Social',body:`
${ph('Social','Plan, publish and reply across your social accounts',`<span class="btn ai">${ic('spark')}AI</span><span class="btn p">${ic('plus')}New post</span>`)}
<div class="cal" style="opacity:.75">${['Mon 28','Tue 29','Wed 30','Thu 31','Fri 1','Sat 2','Sun 3'].map(d=>`<div class="dh">${d}</div>`).join('')}${[[['ig','09:00 Open day: 12 days']],[['li','08:00 Meet the dean']],[['fb','12:00 Student Q&A']],[['ig','18:00 Reel: café']],[['li','08:00 Scholarship deadline'],['fb','12:00 Parking + map']],[['ig','10:00 Behind the scenes']],[]].map(p=>`<div class="dc">${p.map(([n,t])=>`<div class="post" style="outline:1.5px dashed hsl(var(--chart-4));background:hsl(var(--chart-4)/.06)"><span class="net ${n}">${n==='fb'?'f':n==='li'?'in':'ig'}</span>${t}</div>`).join('')}</div>`).join('')}</div>
<div class="muted small">Dashed = proposed by AI, not saved yet.</div>`,overlay:`<div class="aisheet">
 <div class="h">${ic('spark','style="color:hsl(var(--chart-4))"')}AI <span class="chip ai" style="margin-left:6px">Social</span><div class="sp"></div>${ic('x')}</div>
 <div class="log">
  <div class="msg me">Plan next week's posts to build up to open day. Mix of reels and photos, LinkedIn more formal.</div>
  <div class="msg ai">I drafted 7 posts across Instagram, Facebook and LinkedIn at your best times. They're shown dashed in the calendar.</div>
  <div class="cs"><div class="row"><b>Posts</b><span>7 drafts · 3 with AI images (brand kit), 2 reuse Expo photos from Files</span></div><div class="row"><b>Voice</b><span>Your brand voice; LinkedIn formal as asked</span></div><div class="row"><b>Approval</b><span>Saved as drafts needing approval (members can't publish)</span></div>
   <div style="display:flex;gap:6px;margin-top:8px"><span class="btn sm p">Apply 7 drafts</span><span class="btn sm">Review one by one</span></div></div>
 </div>
 <div class="ft"><div class="chips"><span>Make Friday's post shorter</span><span>Add a TikTok version</span></div><div class="in" style="height:64px;align-items:flex-start;color:hsl(var(--muted-fg))">Ask for changes…</div><div style="display:flex"><div class="sp"></div><span class="btn p sm">${ic('send')}Send</span></div></div>
</div>`}),{Calendar:'The calendar previews the change-set before Apply, the same way the Events page builder previews AI edits.'});

/* ===================== Automations ===================== */
add('Automations','au1','Automations: email, WhatsApp and SMS steps work','Automations › Lead nurture','CHANGED',app({mod:'automations',label:'',items:[],on:'',proj:false,wallet:false,flush:true,body:`
<div style="display:flex;align-items:center;gap:10px;padding:12px 20px;border-bottom:1px solid hsl(var(--border));background:hsl(var(--card))"><b style="font:600 16px Space Grotesk">Lead nurture: courses</b><span class="chip ok">Live</span><span class="muted small">2,304 people in progress</span><div class="sp"></div>${AIBTN}<span class="btn sm">Run history</span><span class="btn sm">${ic('pause')}Pause</span><span class="btn sm p">Save</span></div>
<div style="flex:1;display:flex;min-height:0">
 <div style="width:230px;border-right:1px solid hsl(var(--border));background:hsl(var(--card));padding:12px;display:flex;flex-direction:column;gap:6px">
  <div class="in small">${ic('search')}Search steps</div>
  <div class="grp" style="margin-top:6px">Messages</div>
  ${[['mail','Send email','',''],['wa','Send WhatsApp template','NEW',''],['sms','Send SMS','NEW',''],['bell','In-app notification','','']].map(([i,n,t])=>`<div class="card" style="padding:7px 9px;display:flex;gap:8px;align-items:center;font-size:12.5px">${ic(i)}${n}${t?`<span class="sp"></span><span class="chip ok" style="padding:0 6px">${t}</span>`:''}</div>`).join('')}
  <div class="grp" style="margin-top:6px">Flow</div>
  ${['Wait','If / else','Wait until event','Exit'].map(n=>`<div class="card" style="padding:7px 9px;font-size:12.5px">${n}</div>`).join('')}
  <div class="grp" style="margin-top:6px">CRM</div>
  ${['Update field','Add tag','Create task'].map(n=>`<div class="card" style="padding:7px 9px;font-size:12.5px">${n}</div>`).join('')}
 </div>
 <div style="flex:1;overflow:hidden;padding:16px 0;background:hsl(var(--muted)/.4);background-image:radial-gradient(hsl(var(--border)) 1px,transparent 1px);background-size:18px 18px" class="flowcol">
  <div class="node"><div class="k">${ic('zap')}</div><div><b>Trigger</b><div class="muted small">CRM stage becomes <b>Lead</b></div></div></div><div class="vline"></div>
  <div class="node"><div class="k">${ic('mail')}</div><div><b>Send email</b><div class="muted small">"Pick your course" · hello@acme.com · 1 email credit</div></div></div><div class="vline"></div>
  <div class="node"><div class="k">${ic('clock')}</div><div><b>Wait 2 days</b><div class="muted small">sends 8am–6pm their time</div></div></div><div class="vline"></div>
  <div class="node"><div class="k">${ic('flow')}</div><div><b>If</b> opened the email</div></div>
  <div style="display:flex;gap:28px"><div class="flowcol"><div class="vline"></div><div class="node" style="width:250px"><div class="k">${ic('mail')}</div><div><b>Send email</b><div class="muted small">"Book a campus tour"</div></div></div></div><div class="flowcol"><div class="vline"></div><div class="node sel" style="width:250px"><div class="k" style="background:#25d36622">${ic('wa')}</div><div><b>Send WhatsApp</b><div class="muted small">course_followup · 1 WA credit</div></div></div></div></div>
  <div class="vline"></div><div class="node"><div class="k">${ic('flow')}</div><div><b>Exit</b> when they book a tour</div></div>
 </div>
 <div style="width:310px;border-left:1px solid hsl(var(--border));background:hsl(var(--card));padding:14px;display:flex;flex-direction:column;gap:10px">
  <b>Send WhatsApp template</b>
  <div class="fld"><label>From number</label><div class="in small">+61 2 8000 1234 ${ic('chev')}</div></div>
  <div class="fld"><label>Template</label><div class="in small">course_followup <span class="chip ok" style="margin-left:auto">Approved</span></div></div>
  <div class="fld"><label>{{1}}</label><div class="in small">Contact › First name</div></div>
  <div class="fld"><label>{{2}}</label><div class="in small">Contact › Course of interest</div></div>
  <div class="check"><span class="dot ok"></span><div class="small">Skips people without WhatsApp consent (continues down the "no" path)</div></div>
  <div class="check"><span class="dot warn"></span><div class="small">If the WhatsApp wallet is empty this step waits (nobody skips it) and admins get an alert</div></div>
 </div>
</div>`}),{Replaces:'The Sequences page from v1, plus WhatsAppSequencesPage and WhatsAppAutomationsPage. Existing wa_sequences convert to automations.',Backend:'action.comms.send_whatsapp_template and send_sms stop throwing "not available yet" and dispatch through the same senders the Inbox uses (inbox-send.ts dispatchWhatsApp / dispatchSms), with consent, suppression and wallet checks. Email steps with a marketing topic use the email wallet; transactional emails are free.'});

/* ===================== Other modules + public ===================== */
add('Other modules + public','o1','Events: message registrants (uses wallets + channels)','Events › Expo 2026 › Registrations','CHANGED',app({mod:'events',label:'',items:[],on:'',proj:false,wallet:false,body:`${ph('Registrations','12,980 registered')}<div class="card" style="height:520px"></div>`,overlay:`<div class="ov"><div class="dlg" style="width:620px">
 <div class="dlg-h"><div><h3>Message 3,412 selected registrants</h3><div class="muted small">Filtered: ticket = Exhibitor, checked in = no</div></div><div class="sp"></div>${ic('x')}</div>
 <div class="dlg-b"><div class="tabs" style="align-self:flex-start"><span class="on">${ic('mail')}Email</span><span>${ic('wa')}WhatsApp</span><span>${ic('sms')}SMS</span></div>
  <div class="fld"><label>From</label><div class="in">Acme Events &lt;events@acme.com&gt;</div><div class="hint">From your connected domain</div></div>
  <div class="fld"><label>Subject</label><div class="in">Your exhibitor pass + bump-in times</div></div>
  <div class="fld"><label>Message</label><div class="in" style="height:90px;align-items:flex-start">Hi {{first_name}}, …</div><div class="hint">Need a designed email? <u>Open in Marketing</u> with this audience filled in.</div></div>
  <div class="banner info">${ic('mail')}<div><b>3,412 email credits</b> · you have 41,250. Tickets and confirmations stay free.</div></div></div>
 <div class="dlg-f"><span class="btn g">${ic('spark')}Draft with AI</span><div class="sp"></div><span class="btn">Schedule</span><span class="btn p">${ic('send')}Send</span></div>
</div></div>`}),{OneEngine:'Events, Support and CRM bulk sends all go through the Marketing send path: one wallet check, one suppression list, one set of guardrails. This matches the 2026-10-23 Events decision (Registrations bulk email/WhatsApp).'});

add('Other modules + public','o2','Public: email preferences on the customer\'s hub','hub.acme.com/email/preferences','NEW',browser('hub.acme.com/email/preferences?t=…',`<div style="max-width:560px;margin:0 auto;background:#fff;color:#1d2433;border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.08);overflow:hidden">
 <div style="padding:18px 24px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #eee"><div style="width:26px;height:26px;border-radius:6px;background:#0f3d63"></div><b style="font-family:Space Grotesk;color:#0f3d63">Acme Learning</b></div>
 <div style="padding:22px 24px"><h3 style="font-size:20px;color:#0f3d63">Your preferences</h3><div style="color:#666;font-size:13px;margin:4px 0 16px">priya@example.com · +61 4•• ••• 512</div>
 ${[['Newsletter','Email',true],['Events','Email + WhatsApp',true],['Courses & offers','Email + SMS',false]].map(([t,d,on])=>`<div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #eee"><span style="width:16px;height:16px;border-radius:4px;border:1.5px solid ${on?'#0f3d63':'#ccc'};background:${on?'#0f3d63':'#fff'}"></span><div><b style="font-size:14px">${t}</b><div style="color:#777;font-size:12px">${d}</div></div></div>`).join('')}
 <div style="display:flex;gap:10px;margin-top:18px"><span style="background:#0f3d63;color:#fff;padding:9px 16px;border-radius:8px;font-weight:600;font-size:13px">Save</span><span style="padding:9px 16px;border-radius:8px;border:1px solid #ddd;font-size:13px">Unsubscribe from everything</span></div></div></div>`),{Host:'Served on the hub (acme.globalyos.com on Free), so links match the From domain. One-click List-Unsubscribe still works with no page.'});

add('Other modules + public','o3','Staff: sending health across all customers','Super admin › Messaging','NEW',app({mod:'settings',label:'GlobalyOS admin',items:[['shield','Messaging'],['building','Organisations'],['card','Billing']],on:'Messaging',proj:false,wallet:false,body:`
${ph('Messaging, all customers','Shared Resend account and WhatsApp/SMS senders · last 7 days')}
<div class="g5">${kpi('Email sent','1.84M','')}${kpi('Account complaints','0.05%','limit 0.08%')}${kpi('Account bounces','1.1%','limit 4%')}${kpi('Paused orgs','3','')}${kpi('Imports in review','2','> 5k rows')}</div>
<div class="tc"><table class="t"><tr><th>Organisation</th><th>Domain</th><th>Plan</th><th class="n">Email 7d</th><th class="n">Bounce</th><th class="n">Complaints</th><th>WA quality</th><th>Status</th></tr>
 <tr><td><b>Acme Learning</b></td><td class="mono small">acme.com</td><td>Pro</td><td class="n">38,210</td><td class="n">0.8%</td><td class="n dn">0.42%*</td><td><span class="chip ok">High</span></td><td><span class="chip bad">1 campaign paused</span></td></tr>
 <tr><td><b>Kathmandu Expo Co</b></td><td class="mono small">mail.globalyos.com</td><td>Free</td><td class="n">1,400</td><td class="n dn">7.9%</td><td class="n">0.10%</td><td>—</td><td><span class="chip bad">Suspended</span></td></tr>
 <tr><td><b>Bright Path Tutors</b></td><td class="mono small">brightpath.au</td><td>Pro</td><td class="n">0</td><td></td><td></td><td><span class="chip warn">Medium</span></td><td><span class="chip warn">Import review</span></td></tr>
</table></div>`}),{Why:'One shared Resend account carries every customer. Free-tier sending pauses first if the account-level rates approach Resend\'s limits.'});

