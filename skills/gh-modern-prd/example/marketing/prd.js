/* Marketing PRD data: DOC (hero), STATUS (build plan + status), SECTIONS (typed blocks). */
const DOC={
 module:'marketing',brand:'GlobalyOS Marketing',
 status:['Approved','ok'],date:'23 Oct 2026',
 title:'Marketing: your domain, every channel, pay as you send',
 lead:'Customers send email from their own domain, run WhatsApp, SMS and social from one Marketing module, and pay for what they send from prepaid wallets. They never need their own Resend, Meta or social developer accounts. Connect a domain or channel once, and every module uses it. This page has the decisions, the PRD, 21 user flows, 34 screens and the build plan with live status.',
 links:[['Open the screens','#screens','primary'],['User flows','flows.html',''],['Email editor options','options.html',''],['Spec (repo)','https://github.com/Globaly-Inc/GlobalyOS-V2/blob/main/docs/superpowers/specs/2026-10-23-marketing-email-domains-design.md','ghost']],
 decisions:[
  ['One Resend account, customer domains through its API.','Customers never create a Resend account; Free sends as <code>slug@mail.globalyos.com</code>.'],
  ['Connect once.','Verify acme.com once for email and a web hub (hub.acme.com/support, /events, /book); connect WhatsApp and social once in Settings › Channels.'],
  ['WhatsApp and social through Zernio.','One profile per org; Zernio hosts the sign-in flows, publishing, the comments inbox and WhatsApp broadcasts.'],
  ['Separate prepaid wallets.','Email, WhatsApp and SMS; reserved at Send, refunded if unused, never half-sent. One-to-one system mail is free.'],
  ['Automations owns journeys.','No Sequences page; WhatsApp and SMS steps go live in Automations.'],
  ['Marketing is one module.','Overview, Campaigns (Email/WhatsApp/SMS), Social, Audiences, Templates, Forms, Reports, Settings.'],
  ['Editor E4 + E3 + E5.','Section outline + brand-kit panel, AI panel, checks tab.'],
  ['✦ AI on every Marketing page.','Same pattern as Events: change-set, Apply writes drafts only, never sends.'],
 ],
 bet:['Everyone sells email marketing; almost nobody gives a 20-person business its own domain, WhatsApp, SMS, social and AI in the same app as its CRM, events and support, billed by the message instead of by contact count.','That, plus the contacts, events, forms and inbox GlobalyOS already has, is the bet.'],
};
const STATUS={ // update as work moves: todo | doing | review | done | live | blocked
 updated:'23 Oct 2026',
 phases:[
  {id:'p0',name:'Phase 0 · Design',when:'done · 23 Oct',exit:'Founder-approved spec, mockups and flows.',tasks:[
   ['Mockups: 29 screens on the real shell','live',''],['Email editor: 5 options, E4+E3+E5 picked','live',''],['User flows: 21 flows','live',''],['Spec with builder-check answers','review','d308c8c17 · branch docs/marketing-email-domains-spec'],
  ]},
  {id:'p1',name:'Phase 1 · Domains, email wallet, guardrails',when:'≈ 3 weeks · revenue',exit:'A Pro org verifies acme.com, buys a pack, sends a campaign from it, and an auto-pause fires in test.',tasks:[
   ['connected_domains + Resend Domains API on the platform key','todo',''],['Hub hostname via Cloudflare for SaaS; recheck cron covers email','todo',''],['resolveSender: project → org → BYOK → mail.globalyos.com','todo',''],['message_credit_ledger (email wallet), Stripe packs, reserve/consume/release','todo',''],['Resend webhooks → statuses + message_suppressions','todo',''],['Auto-pause, warm-up caps, one-click unsubscribe, preferences page','todo',''],['Consent backfill (inferred) + org confirm screen','todo',''],['Plan limits in config; grandfather org_domains + BYOK 90 days','todo',''],['Staff Messaging page','todo',''],
  ]},
  {id:'p1b',name:'Phase 1b · Domain Connect',when:'in parallel · provider approval',exit:'Cloudflare and GoDaddy show "Set up automatically".',tasks:[
   ['Templates PR to Domain-Connect/Templates','todo',''],['Signing key + _dck1 TXT','todo',''],['Discovery, signed apply URL, callback','todo',''],
  ]},
  {id:'p2',name:'Phase 2 · Channels via Zernio + WA/SMS wallets',when:'≈ 2–3 weeks',exit:'WhatsApp connected once is used by Inbox, Campaigns, Automations and Events.',tasks:[
   ['Zernio profiles, connect flow, channel_connections','todo',''],['Zernio webhook route (inbound, status, templates, disconnect)','todo',''],['WhatsApp send path moved to Zernio; direct Meta path removed at release','blocked','Zernio: Meta billing question'],['WhatsApp + SMS wallets and rate tables','blocked','Meta fee decision (21)'],
  ]},
  {id:'p3',name:'Phase 3 · Marketing restructure + Automations channels',when:'≈ 3–4 weeks',exit:'Old /crm/whatsapp URLs redirect; WhatsApp and SMS automation steps send.',tasks:[
   ['/marketing routes, menu, redirects','todo',''],['Campaigns per channel (M2–M5)','todo',''],['Templates Email/WhatsApp/SMS','todo',''],['Audiences: consent, lists, segments, imports + staff review','todo',''],['Automations: send_whatsapp_template, send_sms; wa_sequences converted','todo',''],
  ]},
  {id:'p4',name:'Phase 4 · ✦ AI assistant',when:'after Events assistant core',exit:'AI builds a two-step campaign as drafts; Undo restores.',tasks:[
   ['Reuse Events assistant core; Marketing skills','blocked','Events package D'],
  ]},
  {id:'p5',name:'Phase 5 · Social via Zernio',when:'≈ 3 weeks',exit:'A post is approved, published to 3 networks, and its comments are answered in Engage.',tasks:[
   ['Calendar, composer, approvals, outbox publishing','todo',''],['Engage inbox, nightly analytics','todo',''],
  ]},
  {id:'p6',name:'Phase 6 · Reports, editor, dedicated IP',when:'ongoing',exit:'E4+E3+E5 editor live; cross-channel Reports.',tasks:[
   ['Editor E4 + E3 + E5','todo',''],['Reports + Deliverability tab','todo',''],['Dedicated IP add-on','blocked','Resend per-domain pools'],
  ]},
 ]};

const SECTIONS=[
 {id:'status',title:'Implementation status',nav:'Status',intro:'Every task in the build plan, rolled up.',blocks:[{type:'status'}]},
 {id:'problem',title:'Problem and today',nav:'Problem',intro:'What exists on main (1cd6bb6ae) and why it falls short.',blocks:[{type:'table',head:['Area','Today','Problem'],rows:[
  ['Email sending','Each org brings its own Resend key (BYOK)','Customers must sign up to Resend; no way for us to bill usage'],
  ['Web domains','<code>org_domains</code> per purpose on Cloudflare for SaaS','Email and web domains verified separately'],
  ['WhatsApp','Connected in 3 places: Marketing › WhatsApp, Inbox › Channels, Settings › Inbox','Three tokens, three setups, confused customers'],
  ['Automations','Send email works; WhatsApp, SMS and push steps throw "not available yet"','No multi-channel journeys'],
  ['Marketing menu','Campaigns, Forms, and an 8-page WhatsApp area with its own sequences and automations','Duplicates Automations; no social, audiences or reports'],
  ['Social','DMs only, in the Inbox','No publishing, calendar or analytics']]}]},
 {id:'goals',title:'Goals, non-goals, anti-goals',nav:'Goals',blocks:[{type:'cards',cols:3,items:[
  {title:'Goals',list:['Connect acme.com once: email + hub','Prepaid Email / WhatsApp / SMS wallets','One Marketing module across channels','Automations sends every channel','WhatsApp + social through Zernio','✦ AI on every Marketing page']},
  {title:'Non-goals (v1)',list:['Own mail servers','Direct Meta / LinkedIn / TikTok / X integrations','Real inbox rendering (Litmus)','Ads management','Moving SMS off Twilio']},
  {title:'Anti-goals',list:['One spammer suspends everyone','A campaign goes out half-sent','Our DNS breaks the customer\'s inbox','A second contact database','AI sends without a human']}]}]},
 {id:'users',title:'Who uses it',nav:'Users',blocks:[{type:'cards',cols:3,items:[
  {title:'Owner / admin',text:'Connects the domain and channels, buys credits, approves posts and inferred consent.'},
  {title:'Marketer',text:'Builds audiences, campaigns, posts and automations; uses ✦ AI.'},
  {title:'Event organiser',text:'Messages registrants from Events with the same wallets and senders.'},
  {title:'Recipient',text:'Gets the email, WhatsApp or SMS; unsubscribes or changes preferences on the org\'s hub.'},
  {title:'GlobalyOS staff',text:'Watches sending health across orgs, reviews large imports, resolves pauses.'}]}]},
 {id:'ai',title:'✦ AI pillars',nav:'AI pillars',intro:'Same contract as the Events assistant: a change-set preview, Apply writes drafts only, Undo per batch, sending is always a separate human action.',blocks:[{type:'pillars',items:[
  {title:'Campaign builder',text:'Turns a goal into audience + steps + copy across channels.',fields:{Approval:'Drafts only',Cost:'AI credits',Screens:'AI1, F11'}},
  {title:'Copy and templates',text:'Writes and rewrites copy in the brand voice; fixes and resubmits rejected WhatsApp templates.',fields:{Approval:'Keep/Undo',Cost:'AI credits',Screens:'M7, M8, F9'}},
  {title:'Audience from words',text:'Turns a description into segment conditions you can check.',fields:{Approval:'Save to apply',Cost:'AI credits',Screens:'M10'}},
  {title:'Social planner',text:'Plans a week of posts at the best times, with images.',fields:{Approval:'Approval queue',Cost:'AI credits',Screens:'AI2, F15'}},
  {title:'Reply helper',text:'Suggests Engage replies from Knowledge.',fields:{Approval:'You send',Cost:'AI credits',Screens:'M13'}},
  {title:'Automation builder',text:'Creates a paused automation from a description.',fields:{Approval:'Paused until turned on',Cost:'AI credits',Screens:'F16'}}]}]},
 {id:'features',title:'Feature map by plan',nav:'Feature map',intro:'<span class="yes"></span> included &nbsp; <span class="part"></span> limited or add-on &nbsp; — not available. Limits live in config.',blocks:[{type:'matrix',corner:'Feature',cols:['Free','Starter','Pro','Enterprise'],rows:[
  ['Custom sending domains',0,'1','2','10+'],['Web hub + own subdomains',0,2,2,2],['Free campaign emails / month','500','0','2,000','10,000'],['Daily sending ceiling','200','20k','100k','none'],['Email / WhatsApp / SMS wallets',1,2,2,2],['Campaigns: email',1,2,2,2],['Campaigns: WhatsApp, SMS',0,2,2,2],['Automations with messaging steps',1,2,2,2],['Social publishing + Engage',0,1,2,2],['✦ AI assistant',0,1,2,2],['Domain Connect automatic DNS',0,2,2,2],['BYOK Resend',0,0,0,2],['Dedicated IP',0,0,0,1]]}]},
 {id:'credits',title:'Wallets and credits',nav:'Credits',intro:'Prepaid packs through Stripe, valid 12 months, used oldest-first. Prices are placeholders until provider costs are confirmed.',blocks:[
  {type:'table',head:['Wallet','Unit','What draws on it','Free'],rows:[['Email','1 credit = 1 email','Campaigns, list sends from any module, marketing automation emails','Monthly grant by plan'],['WhatsApp','per message, by category and country','Broadcasts, automation steps, Events registrant messages','—'],['SMS','per segment, by country','Campaigns, automation steps','—'],['Not metered','—','Invites, OTP, tickets, confirmations, support replies, one-to-one Inbox','Always free']]},
  {type:'cards',title:'Rules',cols:2,items:[{title:'Never half-sent',text:'Credits are reserved at Send or Schedule. If short, Send is blocked (M6). Unused credits are refunded.'},{title:'Automations wait',text:'An empty wallet holds people at the step and alerts admins; they continue after a top-up (F17).'},{title:'Scheduled live audiences',text:'Per-campaign toggle: snapshot at Schedule, or include people who join, topping up the hold at send time.'},{title:'Org wallets',text:'Wallets are per org; domains, channels and senders can be pinned to a project.'}]}]},
 {id:'flows',title:'User flows',intro:'The main journeys. Each box opens the flow; <a href="flows.html">all flows</a> show every step full-size.',blocks:[{type:'lanes',items:[
  ['F1','Connect a domain',['Domains','Enter domain','Copy DNS records','Checking','Verified','Domain detail']],
  ['F2','Automatic DNS (Domain Connect)',['Enter domain','Connect Cloudflare','Authorize at Cloudflare','Verified'],[],[2]],
  ['F5','Connect WhatsApp once',['Channels','Meta signup (Zernio)','Where it\'s used','Connected'],[],[1]],
  ['F7','Email campaign end to end',['Campaigns','Pick channel','Template','Editor','Builder + checks','Schedule','Sending','Report']],
  ['F8','Not enough credits',['Send now','Need more credits','Stripe','Sends'],[],[2]],
  ['F9','WhatsApp with a new template',['Pick WhatsApp','Create template','In review','Approved','Builder','Sending'],[1],[2]],
  ['F11','✦ AI builds a campaign',['Campaigns','Describe it','Change-set','Drafts created','Review','Schedule'],[1,2]],
  ['F14','Social post with approval',['Calendar','Compose','Admin approves','Published','Engage','Analytics']],
  ['F16','Automation with WhatsApp + SMS',['New from recipe','Edit steps','Test run','Live']],
  ['F18','Guardrail auto-pause',['Sending','Complaints spike','Paused + alert','Resume engaged']],
  ['F19','Recipient unsubscribes',['Email in Gmail','Preferences','Confirmed'],[],[0]]]}]},
 {id:'screens',title:'Screens',intro:'Every screen on the real app chrome (light and dark). Click to open full-size. Five editor layouts are on <a href="options.html">their own page</a>.',blocks:[{type:'screens'}]},
 {id:'architecture',title:'Architecture',intro:'Outside services do the sending; GlobalyOS owns the data, consent, wallets and guardrails.',blocks:[{type:'services',items:[
  {title:'Resend',tag:'Platform account',text:'Domains API (create, verify); send; webhooks delivered / bounced / complained; BYOK stays for Enterprise.'},
  {title:'Zernio',tag:'One team, a profile per org',text:'Connect flows for WhatsApp + social; /v1/broadcasts, /v1/whatsapp/templates, /v1/inbox, /v1/posts; webhooks routed by externalId.'},
  {title:'Twilio',tag:'Existing',text:'SMS through org_phone_numbers; STOP handling.'},
  {title:'Stripe',tag:'Existing REST + webhook',text:'Checkout for credit packs → ledger purchase rows.'},
  {title:'Cloudflare',tag:'For SaaS + Domain Connect',text:'Hub and promoted hostnames; automatic DNS templates.'},
  {title:'core-api',tag:'New domains',text:'connected_domains, channel_connections, message_credit_ledger, message_suppressions; outbox topics for sends, posts, webhooks.'}]}]},
 {id:'build',title:'Build plan',intro:'Foundation first. Each phase is its own set of PRs, tests first, CLAUDE.md gates. Badges update as PRs move.',blocks:[{type:'build'}]},
 {id:'risks',title:'Risks and open questions',nav:'Risks and questions',blocks:[{type:'risks',items:[
  {title:'Shared accounts',text:'One bad sender can hurt everyone on the shared Resend account and the shared Zernio team.',mitigation:'Guardrails, staff page, free tier pauses first.'},
  {title:'Decide: who pays Meta for WhatsApp',text:'Zernio has to confirm which invoice Meta\'s per-message fee lands on.',mitigation:'Rate table has an "includes Meta fee" switch.'},
  {title:'WhatsApp cutover',text:'Direct Meta connections switch off at release.',mitigation:'Banner + email before release; history re-linked on reconnect.'},
  {title:'Consent backfill',text:'Inferred consent could be wrong for some orgs.',mitigation:'Each org confirms once before its first bulk send.'},
  {title:'Provider approvals',text:'Domain Connect onboarding and Zernio limits are outside our control.',mitigation:'Manual DNS fallback; start submissions now.'},
  {title:'Resend limits',text:'Account-level complaint/bounce limits and IP pools are unconfirmed.',mitigation:'Ask before Phase 1 launch.'}]}]},
];
