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
  page:"login",drawer:false,modal:null,keyboard:false,emoji:false,currentAgent:"小芜",theme:"blue",activeTrait:0,
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
  ["weather","天气","#eaf4ff","#1f6fff","#18c6c0"],
  ["capsule","胶囊","#eafff6","#18c6c0","#22c66b"],
  ["legacy","遗言","#f0ecff","#7c3cff","#1f6fff"],
  ["achieve","成就","#fff0e8","#ff6a3d","#ffbe3d"],
  ["checkin","打卡","#efffed","#22c66b","#ffbe3d"],
  ["shop","积分商城","#fff3e4","#ff8a3d","#ffbe3d"]
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
    weather:`<svg class="side-svg service-svg" viewBox="0 0 36 36"><rect class="tile" x="2" y="2" width="32" height="32" rx="10"/><circle class="tile-accent" cx="24.5" cy="11.5" r="4"/><path class="symbol" d="M10.2 23.7h14.1c2.5 0 4.4-1.7 4.4-3.9 0-2.1-1.8-3.8-4-3.8-.7 0-1.4.2-2 .5-1-2.1-3-3.3-5.5-3.3-3.3 0-5.9 2.3-6.2 5.4-2 .4-3.2 1.8-3.2 3.4 0 1.1.9 1.7 2.4 1.7Z"/><path class="symbol-line accent-line" d="M29 8.5v2.1M31.9 11.8h2M31 8.9l1.3-1.3"/></svg>`,
    capsule:`<svg class="side-svg service-svg" viewBox="0 0 36 36"><rect class="tile" x="2" y="2" width="32" height="32" rx="10"/><g transform="rotate(-34 18 18)"><path class="symbol-line" d="M11.3 18h5.1"/><path class="symbol-line" d="M19.6 18h5.1"/><rect class="symbol-stroke" x="7.4" y="13.2" width="21.2" height="9.6" rx="4.8"/><path class="symbol-line accent-line" d="M18 13.2v9.6"/></g></svg>`,
    legacy:`<svg class="side-svg service-svg" viewBox="0 0 36 36"><rect class="tile" x="2" y="2" width="32" height="32" rx="10"/><rect class="symbol-stroke" x="9" y="12" width="18" height="13" rx="3"/><path class="symbol-line" d="m10.4 13.6 7.6 5.8 7.6-5.8M10.6 24l5.2-4.2M25.4 24l-5.2-4.2"/><circle class="tile-accent" cx="26.2" cy="11.1" r="3.1"/></svg>`,
    achieve:`<svg class="side-svg service-svg" viewBox="0 0 36 36"><rect class="tile" x="2" y="2" width="32" height="32" rx="10"/><circle class="symbol-stroke" cx="18" cy="15.1" r="6.2"/><path class="symbol-line" d="m14.8 15.1 2.3 2.2 4.3-4.6"/><path class="symbol" d="m13.9 20.8-1.2 7.2 5.3-2.8 5.3 2.8-1.2-7.2c-1.1 1-2.5 1.5-4.1 1.5s-3-.5-4.1-1.5Z"/><circle class="tile-accent" cx="24.4" cy="9.8" r="2.8"/></svg>`,
    checkin:`<svg class="side-svg service-svg" viewBox="0 0 36 36"><rect class="tile" x="2" y="2" width="32" height="32" rx="10"/><rect class="symbol" x="10" y="10" width="16" height="17" rx="4"/><path class="tile-line" d="M13.3 18.2 16.8 21.5 23.2 14.4"/><path class="tile-line" d="M13 13.6h5.2"/><circle class="tile-accent" cx="25.2" cy="25" r="3"/></svg>`,
    shop:`<svg class="side-svg service-svg" viewBox="0 0 36 36"><rect class="tile" x="2" y="2" width="32" height="32" rx="10"/><path class="symbol" d="M10.2 14.8h15.6l-1 12H11.2l-1-12Z"/><path class="tile-line" d="M14 14.8c.1-3.2 1.8-5.2 4-5.2s3.9 2 4 5.2M14.2 20h7.6M15.2 23.5h5.6"/><circle class="tile-accent" cx="25.5" cy="14" r="3"/></svg>`
  };
  return icons[name]||"";
}
function setTheme(id){state.theme=id;document.documentElement.dataset.theme=id==="blue"?"":id}
function pickScript(){state.messages=chatScripts[Math.floor(Math.random()*chatScripts.length)].map(item=>({...item}))}
