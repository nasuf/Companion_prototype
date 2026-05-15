// Split from the original prototype. Loaded as classic scripts so existing global behavior is preserved.
function bindDailyScroll(){
  const scroller=document.querySelector(".daily-scroll-v2");
  if(!scroller)return;
  const update=()=>{
    const fade=Math.max(0,Math.min(1,(scroller.scrollTop-138)/170));
    scroller.style.setProperty("--daily-fade",fade.toFixed(3));
  };
  scroller.addEventListener("scroll",update,{passive:true});
  update();
}

function restoreDailyScroll(top){
  requestAnimationFrame(()=>{
    const scroller=document.querySelector(".daily-scroll-v2");
    if(!scroller)return;
    scroller.scrollTop=top;
    const fade=Math.max(0,Math.min(1,(scroller.scrollTop-138)/170));
    scroller.style.setProperty("--daily-fade",fade.toFixed(3));
  });
}

function scrollPhotoRail(group,dir){
  const rail=document.querySelector(`.daily-photo-rail-v2[data-photo-group="${group}"]`);
  if(!rail)return;
  rail.scrollBy({left:Number(dir||1)*238,behavior:"smooth"});
}

function photoViewer(){
  if(!state.photoViewer)return"";
  const p=state.photoViewer;
  return`<div class="photo-viewer-v2"><button class="photo-viewer-close-v2" data-action="close-photo" aria-label="关闭">${uiIcon("chevron-left")}</button><div class="photo-viewer-card-v2"><div class="photo-viewer-image-v2" style="--photo:${p.src}"></div><div class="photo-viewer-caption-v2"><div><h3>${p.title}</h3><p>${p.note}</p></div><button class="pro-pill primary" data-action="share" data-kind="daily">生成分享</button></div></div></div>`;
}

function dailyContent(tab){
  if(tab.id==="book"){
    const books=[
      ["《海边的卡夫卡》","村上春树","一个关于离开、寻找和自我确认的故事，适合在情绪还没完全落地的时候慢慢读。","小芜的思考：这本书不是鼓励逃走，而是在问你要怎么带着自己继续往前。","分享摘要：暴风雨会过去，但穿过去的人会变得不一样。"],
      ["《也许你该找个人聊聊》","洛莉·戈特利布","把咨询室里的真实片段写得很轻，没有说教感，适合和小芜一起拆情绪。","小芜的思考：很多困住人的不是事件本身，而是我们反复讲给自己的版本。","分享摘要：如果今天不想解释太多，也可以先承认自己有点累。"],
      ["《悉达多》","赫尔曼·黑塞","更像一段缓慢的内在旅程，适合做成短摘录，不适合硬聊大道理。","小芜的思考：有些答案不是被说服来的，是生活慢慢把它递给你。","分享摘要：今晚先不追答案，先把心放慢一点。"],
      ["《蛤蟆先生去看心理医生》","罗伯特·戴博德","用童话式人物讲情绪整理，适合拆成“今天为什么突然低落”的轻讨论。","小芜的思考：难受不一定要立刻解决，先知道它从哪里来。","分享摘要：我可能不是矫情，只是太久没认真照顾自己。"],
      ["《深夜食堂》","安倍夜郎","每篇都很短，适合从一道食物聊到一个人，也适合做成睡前分享。","小芜的思考：食物有时候不是重点，重点是有人愿意听你把一天讲完。","分享摘要：今天想被一碗热的东西安慰一下。"]
    ];
    return`<div class="daily-dynamic-v2 daily-book-list-v2">${books.map(x=>`<button class="daily-book-row-v2" data-action="share" data-kind="daily"><h4>${x[0]}</h4><span class="author">${x[1]}</span><p>${x[2]}</p><div class="daily-book-tags-v2"><span>${x[3]}</span><span>${x[4]}</span></div></button>`).join("")}</div>`;
  }
  if(tab.id==="film"){
    const films=[
      ["花束般的恋爱","assets/prototype/movie-bouquet.jpg","两个认真生活的人走到一起，又慢慢错开。适合生成一段不夸张的观后感。",["菅田将晖","有村架纯","恋爱"]],
      ["海街日记","assets/prototype/movie-poster.jpg","节奏很慢，但很适合做成共同观影后的轻聊天。",["绫濑遥","长泽雅美","家庭"]],
      ["大都会","assets/prototype/movie-metropolis.jpg","画面强烈，适合整理成“今晚看到的一幕”而不是长影评。",["Fritz Lang","科幻","默片"]],
      ["寻子遇仙记","assets/prototype/movie-the-kid.jpg","轻喜剧更适合发一句“今晚先笑一下”，不用解释太多。",["Charlie Chaplin","喜剧","默片"]],
      ["卡里加里博士的小屋","assets/prototype/movie-caligari.jpg","更像夜晚的奇怪梦，适合收藏成一张氛围片单。",["Robert Wiene","表现主义","悬疑"]]
    ];
    return`<div class="daily-dynamic-v2 daily-film-list-v2">${films.map(x=>`<button class="daily-film-row-v2" data-action="share" data-kind="daily"><div class="daily-film-poster-v2" style="--poster:url('${x[1]}')"></div><div><h4>${x[0]}</h4><p>${x[2]}</p><div class="daily-cast-v2">${x[3].map(c=>`<span>${c}</span>`).join("")}</div></div></button>`).join("")}</div>`;
  }
  if(tab.id==="food"){
    const dishes=[
      ["番茄牛腩饭","番茄炒出沙，牛腩小火收汁，最后浇在热米饭上。适合记录成“今天把自己喂好了”。","步骤：煎香洋葱 / 加番茄和牛腩 / 小火 28 分钟 / 收汁",`url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=520&q=80')`],
      ["桂花拿铁","咖啡味轻，桂花香明显，适合下午困的时候。分享时可以带一句“今天被一杯甜的救了一下”。","配方：浓缩咖啡 / 牛奶 / 桂花蜜 / 少冰",`url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=520&q=80')`],
      ["清爽拌面","不重油，适合晚上不想点外卖时的轻食。可以生成一张菜谱卡。","步骤：煮面 6 分钟 / 过冷水 / 加黄瓜丝和酱汁",`url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=520&q=80')`],
      ["莓果酸奶碗","蓝莓和坚果铺在酸奶上，适合作为早晨第一张轻分享。","步骤：酸奶打底 / 加莓果 / 撒燕麦和坚果 / 淋蜂蜜",`url('https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=520&q=80')`],
      ["周末烤吐司","黄油边缘烤到微焦，适合配一句“今天慢一点”。","步骤：厚切吐司 / 抹黄油 / 烤 6 分钟 / 加果酱",`url('https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=520&q=80')`]
    ];
    return`<div class="daily-dynamic-v2 daily-food-list-v2">${dishes.map(x=>`<button class="daily-food-row-v2" data-action="share" data-kind="daily"><div><h4>${x[0]}</h4><p>${x[1]}</p><span class="daily-recipe-v2">${x[2]}</span></div><div class="daily-food-shot-v2" style="--dish:${x[3]}"></div></button>`).join("")}</div>`;
  }
  const groups=[
    ["傍晚光线","适合一句很短的晚安。","7 张",["url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=520&q=80')"]],
    ["桌面碎片","咖啡、书页、拍立得和没收好的耳机。","12 张",["url('assets/prototype/daily-journal.jpg')","url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=520&q=80')"]],
    ["路上看到","可以整理成一张“今天经过这里”的卡。","5 张",["url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=520&q=80')"]],
    ["小物件","不用解释也能知道今天怎么过的。","8 张",["url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=520&q=80')","url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=520&q=80')"]]
  ];
  return`<div class="daily-dynamic-v2 daily-photo-list-v2">${groups.map((g,gi)=>`<section class="daily-photo-group-v2"><div class="daily-photo-head-v2"><div><h4>${g[0]}</h4><p>${g[1]}</p></div><span>${g[2]}</span></div><div class="daily-photo-shell-v2"><button class="daily-photo-nav-v2 prev" data-action="photo-scroll" data-group="${gi}" data-dir="-1" aria-label="上一组照片">${uiIcon("chevron-left")}</button><div class="daily-photo-rail-v2" data-photo-group="${gi}">${g[3].map((p,pi)=>`<button class="daily-photo-thumb-v2" style="--photo:${p}" data-action="open-photo" data-src="${p}" data-title="${g[0]}" data-note="${g[1]} · 第 ${pi+1} 张" aria-label="${g[0]} 第 ${pi+1} 张"></button>`).join("")}</div><button class="daily-photo-nav-v2 next" data-action="photo-scroll" data-group="${gi}" data-dir="1" aria-label="下一组照片">${uiIcon("chevron-left")}</button></div></section>`).join("")}</div>`;
}

function daily(){const tabs=[
  {id:"book",label:"书籍",accent:"#7c3cff",accent2:"#ff8a3d",glow:"rgba(124,60,255,.20)",soft:"rgba(124,60,255,.20)",image:"url('assets/prototype/daily-journal.jpg')",kicker:"reading notes",title:"把读到的一句，变成能聊下去的话",desc:"书摘不只是复制文字，小芜会帮你保留出处、情绪和想发给对方的语气。",chip:"5 本书"},
  {id:"film",label:"影视",accent:"#ff6a3d",accent2:"#1f6fff",glow:"rgba(255,106,61,.20)",soft:"rgba(255,106,61,.18)",image:"url('assets/prototype/movie-bouquet.jpg')",kicker:"watch list",title:"看完一幕，就留下一句观后感",desc:"影视内容更适合做成片单、台词和观后聊题，不像书摘那样安静。",chip:"5 部影片"},
  {id:"food",label:"美食",accent:"#22c66b",accent2:"#ffbe3d",glow:"rgba(34,198,107,.20)",soft:"rgba(34,198,107,.18)",image:"url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80')",kicker:"taste card",title:"把一顿饭，记成今天的味道",desc:"美食分享要带菜名、口味和做法，像一张能回看的生活小票。",chip:"5 道菜"},
  {id:"photo",label:"照片",accent:"#1f6fff",accent2:"#18c6c0",glow:"rgba(31,111,255,.20)",soft:"rgba(31,111,255,.18)",image:"url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80')",kicker:"photo diary",title:"把照片整理成一句自然分享",desc:"照片分享不需要长文案，保留画面、时间和一句像朋友会说的话就够了。",chip:"32 张照片"}
];const active=tabs.find(t=>t.id===state.dailyTab)||tabs[0];return`<section class="page daily-page-v2 daily-${active.id}" style="--daily-accent:${active.accent};--daily-accent-2:${active.accent2};--daily-glow:${active.glow};--daily-accent-soft:${active.soft};--daily-image:${active.image}"><div class="scroll daily-scroll-v2"><div class="daily-actions-v2"><button class="daily-back-v2" data-action="page" data-page="online" aria-label="返回">${uiIcon("chevron-left")}</button><button class="daily-share-v2" data-action="share" data-kind="daily">发聊天</button></div><div class="daily-intro-v2"><div class="pro-kicker">daily board</div><h2>今天有什么，想让小芜一起看见？</h2><p>书、电影、吃到的东西和照片，不用写成长篇。先选一种内容，小芜会帮你整理成能自然发出去的分享卡。</p></div><div class="daily-tabs-v2">${tabs.map(t=>`<button class="daily-tab-v2 ${t.id===active.id?"on":""}" data-action="daily-tab" data-daily="${t.id}">${t.label}</button>`).join("")}</div><div class="daily-board-v2"><div class="daily-board-mark-v2"><i></i>${active.kicker}</div><h3>${active.title}</h3><p>${active.desc}</p><span class="daily-board-chip-v2">${active.chip}</span></div>${dailyContent(active)}</div></section>`}
