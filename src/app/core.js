const chatScripts=[
  [
    {from:"ai",text:"我在。你刚才说今天有点闷，是身体累，还是心里有一块没放下？"},
    {from:"me",text:"像是事情都做完了，但脑子还在不停转。"},
    {from:"ai",text:"那我们先不解决它。我给你放一首慢一点的歌，你只负责跟着呼吸。"},
    {from:"card",kind:"music",title:"线上一起听音乐",desc:"小芜邀请你一起听《云烟成雨》，可看共享乐评，也可以一边听一边聊天。",foot:"音乐 · 点击进入"},
    {from:"ai",text:"我也顺手帮你看了下正在路上的东西，免得你一直惦记。"},
    {from:"card",kind:"progress",title:"动态进程",desc:"奶茶 18 分钟后送达；淘宝包裹已到上海分拨；今晚学习提醒 20:30。",foot:"进程 · 点击查看"}
  ],
  [
    {from:"ai",text:"今天想聊点轻的，还是想让我认真陪你拆一拆？"},
    {from:"me",text:"轻一点吧，想找个周末能出去的理由。"},
    {from:"ai",text:"那我给你留一个不费力的选项：电影、咖啡店、书店都行。"},
    {from:"card",kind:"offlineInvite",title:"线下活动邀请",desc:"周六 19:30 看电影，预约码 B612；彩蛋任务：拍一张你觉得像电影海报的路灯。",foot:"邀请 · 点击查看"},
    {from:"card",kind:"daily",title:"日常分享卡片",desc:"《海边的卡夫卡》：不管暴风雨什么时候来，你都要穿过它。",foot:"分享 · 点击查看"}
  ],
  [
    {from:"ai",text:"我看见你今天已经完成两次打卡了，先夸一下。"},
    {from:"me",text:"但还有工作没收尾，感觉拖着很烦。"},
    {from:"ai",text:"可以先做 25 分钟，不要追求漂亮收尾。结束后我提醒你休息。"},
    {from:"card",kind:"checkin",title:"打卡提醒",desc:"工作冲刺 25 分钟，20:30 起床/活动提醒已同步。可修改内容和提醒方式。",foot:"打卡 · 点击进入"},
    {from:"card",kind:"movie",title:"线上一起看电影",desc:"《海街日记》共同播放房间已准备，支持共同弹幕和实时通话。",foot:"电影 · 点击进入"}
  ]
];
const themes=[
  {id:"blue",name:"雾白",desc:"安静、克制、展示友好",sw:["#f7f8f6","#ffffff","#3b6f78"]},
  {id:"warm",name:"暖石",desc:"柔和但不过甜",sw:["#f8f6f1","#ffffff","#8a6b3f"]},
  {id:"mint",name:"青植",desc:"清醒、健康、松弛",sw:["#f5f8f5","#ffffff","#4c7963"]},
  {id:"rose",name:"淡蔷",desc:"亲密、柔软、低饱和",sw:["#f9f6f6","#ffffff","#9a6871"]},
  {id:"dark",name:"夜幕",desc:"低亮度、深夜对话",sw:["#111513","#1f2321","#9fc4bc"]}
];
const dimBlueprint=[
  ["活泼度","内敛","活泼",62],
  ["理性度","感性","理性",54],
  ["感性度","冷静","感性",68],
  ["计划度","随性","计划",47],
  ["随性度","规矩","随性",58],
  ["脑洞度","务实","脑洞",73],
  ["幽默度","严肃","幽默",61]
];
const state={
  page:"login",drawer:false,modal:null,keyboard:false,emoji:false,currentAgent:"小芜",theme:"blue",
  agentName:"小芜",agentGender:"female",
  movieIndex:0,movieControls:false,dailyTab:"book",musicTab:"agent",musicPanel:"wave",musicPlaying:true,dailyScrollTop:0,photoViewer:null,
  dimensions:dimBlueprint.map(d=>({name:d[0],low:d[1],high:d[2],value:d[3]})),
  messages:chatScripts[0].map(item=>({...item}))
};
const movieCatalog=[
  {title:"海街日记",poster:"assets/prototype/movie-poster.jpg",state:"双人同步中",time:"01:42:18",duration:"03:24",barrage:"18 弹幕",subtitle:"“要不要把这一段留给等会儿聊？”"},
  {title:"大都会",poster:"assets/prototype/movie-metropolis.jpg",state:"候选片单",time:"00:18:42",duration:"02:33",barrage:"9 弹幕",subtitle:"“这个城市像一首太用力的梦。”"},
  {title:"寻子遇仙记",poster:"assets/prototype/movie-the-kid.jpg",state:"轻喜剧片单",time:"00:36:05",duration:"02:08",barrage:"12 弹幕",subtitle:"“这一段好适合一起笑一下。”"},
  {title:"卡里加里博士的小屋",poster:"assets/prototype/movie-caligari.jpg",state:"夜间片单",time:"00:22:17",duration:"01:14",barrage:"6 弹幕",subtitle:"“如果害怕，我会先把灯打开一点。”"},
  {title:"安全至下",poster:"assets/prototype/movie-safety-last.jpg",state:"周末片单",time:"00:41:29",duration:"01:09",barrage:"15 弹幕",subtitle:"“这段紧张得像在帮他扶梯子。”"}
];
const movieBarrage=[
  ["01:42","小芜：这里的眼神好适合暂停一下。"],
  ["01:43","你：这句台词有点像我们刚才说的。"],
  ["01:44","小芜：我把这一段留着，等结束后再聊。"],
  ["01:45","你：背景音乐突然安静下来，很会。"],
  ["01:46","小芜：如果你不想说话，我们就先看完这一幕。"]
];
const sideItems=[
  ["weather","天气","#edf6f8","#2f6f85","#85c4d6"],
  ["capsule","胶囊","#eef8f3","#34796d","#8acbb7"],
  ["legacy","遗言","#f0f4f9","#486e93","#95b2d1"],
  ["achieve","成就","#fbf0f3","#96556a","#dda0ae"],
  ["checkin","打卡","#f0f8f1","#477b5d","#93ca9b"],
  ["shop","商城","#fbf2eb","#93664d","#e1a982"]
];
const tabItems=[["chat","chat","聊天"],["online","online","线上交互"],["scene","scene","场景交互"],["profile","profile","个人中心"]];
function uiIcon(name){
  const icons={
    "chevron-left":`<svg class="ui-ico" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>`,
    plus:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,
    mic:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M12 14a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v3a4 4 0 0 0 4 4Z"/><path d="M19 10a7 7 0 0 1-14 0M12 17v4M9 21h6"/></svg>`,
    menu:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h14"/></svg>`,
    smile:`<svg class="ui-ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M9 10h.01M15 10h.01M8.8 14.2c1.8 1.7 4.6 1.7 6.4 0"/></svg>`,
    sun:`<svg class="ui-ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/></svg>`,
    mail:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M4 7.5h16v10H4z"/><path d="m5 8 7 5 7-5"/></svg>`,
    archive:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M5 6h14v14H5zM8 6V4h8v2M9 11h6"/></svg>`,
    award:`<svg class="ui-ico" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="m9.5 12-1.2 8 3.7-2 3.7 2-1.2-8"/></svg>`,
    check:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M5 13.2 9.4 17 19 7"/></svg>`,
    bag:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>`,
    music:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>`,
    scene:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>`,
    user:`<svg class="ui-ico" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.8-3.6 3.1-5.4 6.5-5.4s5.7 1.8 6.5 5.4"/></svg>`,
    play:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="m9 6 10 6-10 6V6Z"/></svg>`,
    pen:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg>`,
    wallet:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M4 7h16v12H4z"/><path d="M16 12h4M7 7V5h10v2"/></svg>`,
    arrow:`<svg class="ui-ico" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg>`
  };
  return icons[name]||"";
}
function tabIcon(name){
  const icons={
    chat:`<svg viewBox="0 0 24 24"><path d="M5.2 7.2c0-2.1 1.7-3.8 3.9-3.8h5.8c2.2 0 3.9 1.7 3.9 3.8v3.7c0 2.2-1.7 3.9-3.9 3.9h-3.2L7.4 19v-4.4c-1.3-.6-2.2-2-2.2-3.7V7.2Z"/><path d="M9 8.2h6M9 11.2h3.7"/><circle cx="16.8" cy="15.8" r="1.15"/></svg>`,
    online:`<svg viewBox="0 0 24 24"><path d="M9 17.4V6.3l9-1.9v10.9"/><circle cx="6.7" cy="17.5" r="2.45"/><circle cx="15.7" cy="15.4" r="2.45"/><path d="M9 8.6 18 6.7"/><circle cx="18.4" cy="4.2" r=".9"/></svg>`,
    scene:`<svg viewBox="0 0 24 24"><path d="M12 20.7s5.8-5 5.8-10.5A5.8 5.8 0 0 0 6.2 10c0 5.7 5.8 10.7 5.8 10.7Z"/><circle cx="12" cy="10.1" r="2.05"/><path d="M7.6 19.3c-1.4.4-2.2.9-2.2 1.5 0 1.1 3 1.9 6.6 1.9s6.6-.8 6.6-1.9c0-.6-.8-1.1-2.2-1.5"/></svg>`,
    profile:`<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.15"/><path d="M5.3 20c.7-3.6 3.1-5.5 6.7-5.5s6 1.9 6.7 5.5"/><path d="M18.4 5.2c1 .9 1.5 2 1.5 3.4s-.5 2.5-1.5 3.4"/></svg>`
  };
  return icons[name];
}
function sideIcon(name){
  const icons={
    weather:`<svg class="side-svg" viewBox="0 0 32 32" fill="none"><path class="wash" d="M21.7 8.4a4.7 4.7 0 1 1-4.7 4.7 4.7 4.7 0 0 1 4.7-4.7Z"/><path class="ghost" d="M9.5 24.2h13.3c2.8 0 5-2 5-4.6s-2-4.6-4.6-4.6c-.8 0-1.5.2-2.1.5-1.1-2.4-3.4-3.9-6.2-3.9-3.8 0-6.8 2.7-7.2 6.1-2.3.5-3.8 2.2-3.8 4.2 0 1.4 1.2 2.3 3 2.3h2.6Z"/><path class="fine" d="M8.4 24.2h14.2c2.9 0 5.1-2 5.1-4.7 0-2.5-2-4.5-4.6-4.5-.8 0-1.5.2-2.2.5-1-2.3-3.4-3.9-6.1-3.9-3.7 0-6.8 2.7-7.2 6.2-2.3.5-3.8 2.2-3.8 4.2 0 1.4 1.2 2.2 2.9 2.2h1.7Z"/><path class="hair" d="M22 5.9v1.6M26.8 10.9h1.5M25.4 7.4l1-1.1M18.4 7.4l-1-1.1"/></svg>`,
    capsule:`<svg class="side-svg" viewBox="0 0 32 32" fill="none"><g transform="rotate(-31 16 16)"><rect class="ghost" x="6.5" y="11.4" width="19" height="9.2" rx="4.6"/><rect class="fine" x="6.5" y="11.4" width="19" height="9.2" rx="4.6"/><path class="hair" d="M16 11.6v8.8"/><path class="hair" d="M10.8 16h3.1M18.4 16h2.9"/><circle cx="22.6" cy="16" r="1.15" fill="currentColor" opacity=".58"/></g></svg>`,
    legacy:`<svg class="side-svg" viewBox="0 0 32 32" fill="none"><path class="ghost" d="M6.4 10.6h19.2v12.8H6.4z" rx="3.2"/><rect class="fine" x="6.4" y="10.6" width="19.2" height="12.8" rx="3.2"/><path class="fine" d="m8.5 12.6 7.5 5.7 7.5-5.7"/><path class="hair" d="m9 22 5.1-4M23 22l-5.1-4"/></svg>`,
    achieve:`<svg class="side-svg" viewBox="0 0 32 32" fill="none"><path class="wash" d="M16 6.8c3.8 0 6.6 2.8 6.6 6.2s-2.8 6.2-6.6 6.2-6.6-2.8-6.6-6.2 2.8-6.2 6.6-6.2Z"/><path class="fine" d="M16 6.8c3.8 0 6.6 2.8 6.6 6.2s-2.8 6.2-6.6 6.2-6.6-2.8-6.6-6.2 2.8-6.2 6.6-6.2Z"/><path class="fine" d="m12.9 13.2 2.2 2.1 4.2-4.4"/><path class="hair" d="m12.5 18.3-1.1 6.5 4.6-2.3 4.6 2.3-1.1-6.5"/></svg>`,
    checkin:`<svg class="side-svg" viewBox="0 0 32 32" fill="none"><circle class="ghost" cx="16" cy="16" r="9.7"/><path class="hair" d="M8.3 20.5c2.1 3.4 6.2 5.3 10.2 4.4 2.3-.5 4.3-1.8 5.6-3.7"/><circle class="fine" cx="16" cy="16" r="9.7"/><path class="fine" d="m10.8 16.5 3.7 3.5 7.5-8.1"/></svg>`,
    shop:`<svg class="side-svg" viewBox="0 0 32 32" fill="none"><path class="ghost" d="M8.8 12.8h14.4l-.9 12.2H9.7L8.8 12.8Z"/><path class="fine" d="M8.8 12.8h14.4l-.9 12.2H9.7L8.8 12.8Z"/><path class="fine" d="M12.4 12.7c.1-3 1.7-5 3.6-5s3.5 2 3.6 5"/><path class="hair" d="M12.5 18.4h7M13.4 21.5h5.2"/></svg>`
  };
  return icons[name]||"";
}
function setTheme(id){state.theme=id;document.documentElement.dataset.theme=id==="blue"?"":id}
function pickScript(){state.messages=chatScripts[Math.floor(Math.random()*chatScripts.length)].map(item=>({...item}))}
