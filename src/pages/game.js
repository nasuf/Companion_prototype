// Split from the original prototype. Loaded as classic scripts so existing global behavior is preserved.
const gameGroups=[
  {
    id:"board",kicker:"slow strategy",title:"棋牌游戏",badge:"静心对弈",metric:"4 款棋类",accent:"#1f6fff",accent2:"#18c6c0",softA:"rgba(31,111,255,.16)",softB:"rgba(24,198,192,.24)",hero:"assets/prototype/games/category-board-hero.jpg",
    desc:"从安静落子开始，不急着赢，只把这一局慢慢下完。",
    games:[
      {title:"围棋",note:"黑白落子，适合慢慢想。",image:"assets/prototype/games/go-conquest.jpg"},
      {title:"五子棋",note:"五子连线，几分钟开局。",image:"assets/prototype/games/gomoku-lets-go.jpg"},
      {title:"象棋",note:"攻守推进，一边聊一边下。",image:"assets/prototype/games/chinese-chess.jpg"},
      {title:"国际象棋",note:"节奏更锋利的策略局。",image:"assets/prototype/games/chess-ultra.jpg"}
    ]
  },
  {
    id:"together",kicker:"co-op room",title:"双人同行",badge:"一起过关",metric:"4 个搭档局",accent:"#ff7a3d",accent2:"#ffc936",softA:"rgba(255,122,61,.18)",softB:"rgba(255,201,54,.24)",hero:"assets/prototype/games/category-coop-hero.jpg",
    desc:"需要一点配合，也允许一点手忙脚乱，笑出来就算赢。",
    games:[
      {title:"双人厨房",note:"分工备餐，别把锅烧糊。",image:"assets/prototype/games/overcooked-2.jpg"},
      {title:"乒乓大战",note:"短回合接球，节奏很轻。",image:"assets/prototype/games/eleven-table-tennis.jpg"},
      {title:"经典台球",note:"瞄准、撞球、慢慢收杆。",image:"assets/prototype/games/pure-pool.jpg"},
      {title:"异界冒险",note:"两个人一起探索下一格。",image:"assets/prototype/games/it-takes-two.jpg"}
    ]
  },
  {
    id:"versus",kicker:"quick match",title:"联机对战",badge:"热血一局",metric:"4 个竞技场",accent:"#7c3cff",accent2:"#35c9ff",softA:"rgba(124,60,255,.18)",softB:"rgba(53,201,255,.22)",hero:"assets/prototype/games/category-versus-hero.jpg",
    desc:"想把注意力切走的时候，打一局刚刚好，不把输赢看太重。",
    games:[
      {title:"拳皇",note:"街机感对战，出招要快。",image:"assets/prototype/games/kof-xv.jpg"},
      {title:"合金弹头",note:"横版闯关，火力一起开。",image:"assets/prototype/games/metal-slug-tactics.jpg"},
      {title:"赛车竞速",note:"弯道超车，追一点风。",image:"assets/prototype/games/forza-horizon-5.jpg"},
      {title:"球球大作战",note:"轻量吞噬，随时开局。",image:"assets/prototype/games/ball-battle.jpg"}
    ]
  },
  {
    id:"treasure",kicker:"tiny quest",title:"宝藏收集",badge:"慢慢探索",metric:"4 个小世界",accent:"#22c66b",accent2:"#ffbe3d",softA:"rgba(34,198,107,.18)",softB:"rgba(255,190,61,.22)",hero:"assets/prototype/games/category-treasure-hero.jpg",
    desc:"捡起一点碎片，收集一点好运，也把今天放松一点。",
    games:[
      {title:"像素世界",note:"小地图里搭一个角落。",image:"assets/prototype/games/terraria.jpg"},
      {title:"冒险王",note:"向前一格，就有新发现。",image:"assets/prototype/games/adventurequest-3d.jpg"},
      {title:"解忧时光",note:"收集温柔物件，整理心情。",image:"assets/prototype/games/cozy-grove.jpg"},
      {title:"密室寻宝",note:"找线索，开最后一扇门。",image:"assets/prototype/games/escape-simulator.jpg"}
    ]
  }
];

function gameTile(x){
  return`<span class="game-tile-v8" style="--game-img:url('${x.image}')"><span><b>${x.title}</b><small>${x.note}</small></span></span>`;
}

function game(){
  const active=state.activeGameGroup||"board";
  return`<section class="page game-page-v6"><div class="game-board-bg-v6" aria-hidden="true"><span></span><span></span><span></span></div><div class="scroll game-scroll-v6"><div class="game-actions-v6"><button class="game-back-v6" data-action="page" data-page="online" aria-label="返回">${uiIcon("chevron-left")}</button><button class="game-share-v6" data-action="share" data-kind="game">发聊天</button></div><div class="game-intro-v6"><div class="pro-kicker">live mini game</div><h2>在游戏里慢慢呼吸</h2><p>不用多说，一起玩一会儿就好</p><div class="game-metrics-v6"><span><b>16</b><small>可玩游戏</small></span><span><b>12848</b><small>累计积分</small></span><span><b>语音</b><small>可同步</small></span></div></div><div class="game-group-list-v8">${gameGroups.map(group=>`<button class="game-group-card-v8 ${group.id===active?"is-open":""}" style="--game-a:${group.accent};--game-b:${group.accent2};--game-soft-a:${group.softA};--game-soft-b:${group.softB};--game-hero:url('${group.hero}')" data-action="game-group" data-group="${group.id}" aria-expanded="${group.id===active}"><span class="game-group-visual-v8" aria-hidden="true"></span><span class="game-group-copy-v8"><small>${group.kicker}</small><strong>${group.title}</strong><em>${group.desc}</em><span class="game-chip-row-v8"><i>${group.badge}</i><i>${group.metric}</i></span></span><span class="game-group-panel-v8">${group.games.map(gameTile).join("")}</span></button>`).join("")}</div></div></section>`;
}
