// Split from the original prototype. Loaded as classic scripts so existing global behavior is preserved.
function music(){
  const wave=[66,112,52,126,78,108,64,96,48,132,84,116,70,101,56,124,88,136,58,104];
  const agentList=[
    ["云烟成雨","房东的猫","云烟成雨 - Single","1 首","#1f6fff","#18c6c0",true,"https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/23/32/23/2332234e-89aa-9aec-f589-48d518a304cc/3616840519694.jpg/600x600bb.jpg"],
    ["夜空中最亮的星","逃跑计划","世界","10 首","#7c3cff","#1f6fff",false,"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/dc/85/ab/dc85ab94-26c9-5f50-3c89-d9a95b22ca1c/2910029.jpg/600x600bb.jpg"],
    ["给你一瓶魔法药水","告五人","玫瑰凭证","8 首","#ff8a3d","#7c3cff",false,"https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/86/22/53/86225309-0ac8-3ee6-3118-66ec50ddc8e7/196589268105.jpg/600x600bb.jpg"],
    ["慢慢喜欢你","莫文蔚","慢慢喜欢你 - Single","1 首","#22c66b","#1f6fff",false,"https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/c0/31/a7/c031a72d-f7b0-55bd-d5c6-a7223b8adaa4/cover.jpg/600x600bb.jpg"],
    ["玫瑰少年","五月天","玫瑰少年 - Single","1 首","#18c6c0","#22c66b",false,"https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/dc/86/ea/dc86ea9c-2ba0-e6f6-25f1-bee57d809089/1._-.jpg/600x600bb.jpg"],
    ["如果可以","韦礼安","如果可以 - From THE FIRST TAKE","1 首","#1f6fff","#7c3cff",false,"https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/d8/ca/64/d8ca640f-3b2d-55db-1f35-31f8f813d9d1/196589600639.jpg/600x600bb.jpg"]
  ];
  const userList=[
    ["晴天","周杰伦","叶惠美","11 首","#7c3cff","#1f6fff",false,"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/45/8a/e4/458ae484-dc8b-5683-ce04-8d2948346462/JAY.jpg/600x600bb.jpg"],
    ["我记得","赵雷","署前街少年","10 首","#18c6c0","#22c66b",false,"https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/3e/fc/be/3efcbe87-236a-ad35-98c0-b075cd95a1b4/6976364784976.jpg/600x600bb.jpg"],
    ["句号","邓紫棋","摩天动物园","13 首","#101820","#1f6fff",false,"https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a8/59/dd/a859ddfd-0f50-4987-0301-2117bd152c4c/886448203414.jpg/600x600bb.jpg"],
    ["NEW BOY","朴树","我去2000年","11 首","#ff8a3d","#ffc936",false,"https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/28/94/e0/2894e08b-05bc-d63c-23ee-4b7e834fb5f2/fengmian.jpg/600x600bb.jpg"],
    ["小幸运","田馥甄","小幸运 - Single","1 首","#1f6fff","#18c6c0",false,"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/69/87/7f/69877fbc-cd2c-bb9b-2397-5f3ed14a04a8/Hebe_Little_Happiness_1400.jpg/600x600bb.jpg"]
  ];
  const tabs=[["agent","小芜在播"],["user","我的收藏"]];
  const active=state.musicTab==="user"?"user":"agent";
  const list=active==="agent"?agentList:userList;
  const lyrics=["你的晚风里有一点潮湿","我先不说话，陪你听到副歌","这句像傍晚路灯刚亮的时候","如果你也喜欢，就让这一句多停一会儿","下一首换你收藏里的那首晴天","等旋律落下来，再慢慢回消息"];
  const display=state.musicPanel==="lyrics"
    ?`<button class="music-display-v7 lyrics" data-action="music-display-toggle" aria-label="切换到波形"><div class="music-lyrics-stage-v7"><div class="music-lyrics-list-v7">${lyrics.map((x,i)=>`<span class="${i===2?"on":""}">${x}</span>`).join("")}</div></div></button>`
    :`<button class="music-display-v7 wave" data-action="music-display-toggle" aria-label="切换到歌词"><div class="music-wave-v7">${wave.map((h,i)=>`<i style="--h:${h}%;--d:-${(i*.09).toFixed(2)}s"></i>`).join("")}</div></button>`;
  const playIcon=state.musicPlaying?`<span class="music-pause-bars-v7"><i></i><i></i></span>`:`<span class="music-play-triangle-v7"></span>`;
  const row=x=>`<button class="music-track-v7 ${x[6]?"now":""}" style="--track-a:${x[4]};--track-b:${x[5]};--track-glow:${x[4]}30;--track-img:url('${x[7]}')" data-action="share" data-kind="music"><div class="music-track-art-v7"></div><div><h4>${x[0]}</h4><p>${x[1]} · ${x[2]}</p></div><time>${x[3]}</time></button>`;
  return`<section class="page music-page-v7"><div class="music-scroll-v7"><div class="music-actions-v7"><button class="music-back-v7" data-action="page" data-page="online" aria-label="返回">${uiIcon("chevron-left")}</button><button class="music-share-v7" data-action="share" data-kind="music">发聊天</button></div><div class="music-intro-v7"><div class="pro-kicker">shared rhythm</div><h2>今晚随机播到这首</h2><p>小芜也在听同一个进度。你切到自己的收藏，她那边也会一起换过去。</p></div><div class="music-player-v7 ${state.musicPanel==="lyrics"?"lyrics-mode":""} ${state.musicPlaying?"":"paused"}"><div class="music-player-top-v7"><div class="music-cover-v7"></div><div class="music-now-v7"><small>now playing</small><h3>房东的猫 · 云烟成雨</h3><p>小芜正在同步播放。喜欢这一句的话，可以直接发回聊天。</p></div></div>${display}<div class="music-control-v7"><button class="music-play-v7" data-action="music-play-toggle" aria-label="${state.musicPlaying?"暂停":"播放"}">${playIcon}</button><div class="music-progress-v7"><div class="music-progress-time-v7"><span>01:42</span><span>03:58</span></div><div class="music-progress-line-v7"><i></i></div></div></div></div><div class="music-tabs-v7">${tabs.map(t=>`<button class="music-tab-v7 ${t[0]===active?"on":""}" data-action="music-tab" data-music="${t[0]}">${t[1]}</button>`).join("")}</div><section class="music-section-v7"><div class="music-section-head-v7"><h3>${active==="agent"?"小芜的歌单":"我的歌单"}</h3><span>${active==="agent"?"专辑与歌单":"切换后同步给小芜"}</span></div><div class="music-list-v7">${list.map(row).join("")}</div></section></div></section>`;
}
