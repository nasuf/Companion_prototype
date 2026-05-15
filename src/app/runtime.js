function updateTraitFocus(index){
  document.querySelectorAll(".trait-map-v3 i").forEach((item,idx)=>item.classList.toggle("active",idx===index));
  document.querySelectorAll(".trait-step-v3").forEach((item,idx)=>{
    item.classList.toggle("is-active",idx===index);
    item.classList.toggle("is-near",idx===index-1||idx===index+1);
    item.classList.toggle("is-dim",idx!==index&&idx!==index-1&&idx!==index+1);
  });
}
document.addEventListener("click",e=>{
  if(state.keyboard&&state.page==="chat"&&!e.target.closest(".keyboard,.composer")){state.keyboard=false;render();return}
  if(state.emoji&&state.page==="chat"&&!e.target.closest(".emoji-panel,.composer")){state.emoji=false;render();return}
  const el=e.target.closest("[data-action]");if(!el)return;const a=el.dataset.action;
  if(a==="login"){state.page="createAgent";state.drawer=false;state.keyboard=false;state.emoji=false}
  if(a==="select-agent"){state.currentAgent=el.dataset.agent;pickScript();state.page="chat";state.drawer=false;state.keyboard=false;state.emoji=false}
  if(a==="set-gender"){state.agentGender=el.dataset.gender;render();return}
  if(a==="random-dimensions"){state.dimensions=state.dimensions.map(d=>({...d,value:Math.floor(32+Math.random()*54)}));render();return}
  if(a==="trait-step"){
    state.activeTrait=Math.max(0,Math.min(state.dimensions.length-1,Number(el.dataset.index)||0));
    render();
    return;
  }
  if(a==="trait-step-shift"){
    const dir=Number(el.dataset.dir)||0;
    state.activeTrait=Math.max(0,Math.min(state.dimensions.length-1,(state.activeTrait||0)+dir));
    render();
    return;
  }
  if(a==="movie-toggle"){state.movieControls=!state.movieControls;el.classList.toggle("controls-on",state.movieControls);return}
  if(a==="offline-ticket-toggle"){state.offlineTicketFlipped=!state.offlineTicketFlipped;el.classList.toggle("is-flipped",state.offlineTicketFlipped);el.setAttribute("aria-pressed",String(state.offlineTicketFlipped));return}
  if(a==="movie-pick"){const top=document.querySelector(".cinema-scroll-v6")?.scrollTop||0;state.movieIndex=Number(el.dataset.index)||0;state.movieControls=false;render();scrollMovieRail(top);return}
  if(a==="movie-slide"){const top=document.querySelector(".cinema-scroll-v6")?.scrollTop||0;state.movieIndex=(state.movieIndex+Number(el.dataset.dir)+movieCatalog.length)%movieCatalog.length;state.movieControls=false;render();scrollMovieRail(top);return}
  if(a==="music-display-toggle"){const top=document.querySelector(".music-scroll-v7")?.scrollTop||0;state.musicPanel=state.musicPanel==="lyrics"?"wave":"lyrics";render();requestAnimationFrame(()=>{const scroller=document.querySelector(".music-scroll-v7");if(scroller)scroller.scrollTop=top});return}
  if(a==="music-play-toggle"){const top=document.querySelector(".music-scroll-v7")?.scrollTop||0;state.musicPlaying=!state.musicPlaying;render();requestAnimationFrame(()=>{const scroller=document.querySelector(".music-scroll-v7");if(scroller)scroller.scrollTop=top});return}
  if(a==="music-tab"){const top=document.querySelector(".music-scroll-v7")?.scrollTop||0;state.musicTab=el.dataset.music||"agent";render();requestAnimationFrame(()=>{const scroller=document.querySelector(".music-scroll-v7");if(scroller)scroller.scrollTop=top});return}
  if(a==="daily-tab"){const top=document.querySelector(".daily-scroll-v2")?.scrollTop||0;state.dailyTab=el.dataset.daily;state.dailyScrollTop=top;render();restoreDailyScroll(top);return}
  if(a==="photo-scroll"){scrollPhotoRail(el.dataset.group,el.dataset.dir);return}
  if(a==="open-photo"){const top=document.querySelector(".daily-scroll-v2")?.scrollTop||0;state.dailyScrollTop=top;state.photoViewer={src:el.dataset.src,title:el.dataset.title,note:el.dataset.note};render();restoreDailyScroll(top);return}
  if(a==="close-photo"){const top=state.dailyScrollTop||0;state.photoViewer=null;render();restoreDailyScroll(top);return}
  if(a==="create-agent"){state.currentAgent=(state.agentName||"小芜").trim()||"小芜";state.messages=[{from:"ai",text:"我在，今天想被认真听一会儿吗？"},{from:"me",text:`刚创建好你，想先试试你会怎么陪我聊天。`},{from:"ai",text:"那我们慢慢来。我会像朋友一样接话，也会记住你喜欢的节奏。"},{from:"card",kind:"music",title:"线上一起听音乐",desc:`${state.currentAgent}准备了一首轻一点的歌，适合用来校准你们的第一段陪伴节奏。`,foot:"音乐 · 点击进入"},{from:"card",kind:"progress",title:"动态进程",desc:"首次陪伴任务已创建：试聊 5 分钟、设置一个提醒、完成一次日常分享。",foot:"进程 · 点击查看"}];state.page="chat";state.drawer=false;state.modal=null;state.keyboard=false;state.emoji=false}
  if(a==="drawer"){state.drawer=true;state.keyboard=false;state.emoji=false}
  if(a==="close"){state.drawer=false;state.keyboard=false;state.emoji=false}
  if(a==="tab"){state.page=el.dataset.page;state.drawer=false;state.modal=null;state.keyboard=false;state.emoji=false;state.photoViewer=null}
  if(a==="page"){state.page=el.dataset.page;state.drawer=false;state.keyboard=false;state.emoji=false;state.photoViewer=null}
  if(a==="share")return addShare(el.dataset.kind);
  if(a==="modal")state.modal=el.dataset.modal;
  if(a==="close-modal")state.modal=null;
  if(a==="save-capsule")return addShare("capsule");
  if(a==="open-keyboard"){state.keyboard=true;state.emoji=false;state.drawer=false}
  if(a==="keyboard-close")state.keyboard=false;
  if(a==="keyboard-key")state.keyboard=true;
  if(a==="keyboard-send"){state.messages.push({from:"me",text:"我想找点事做，不想一直陷在坏心情里。"});state.messages.push({from:"ai",text:"那我们选一个很轻的事情，不用证明什么。要不要一起听首歌，或者看一个短片？"});state.messages.push({from:"card",kind:"music",title:"线上一起听音乐",desc:"小芜推荐一首适合慢慢缓过来的歌，可看共享乐评。",foot:"音乐 · 点击进入"});state.keyboard=false}
  if(a==="emoji-toggle"){state.emoji=!state.emoji;state.keyboard=false;state.drawer=false}
  if(a==="emoji-close")state.emoji=false;
  if(a==="emoji-pick"){state.messages.push({from:"me",text:el.dataset.emoji});state.messages.push({from:"ai",text:"收到这个表情了。那我就先不追问，陪你在这里停一小会儿。"});state.emoji=false}
  if(a==="image"){state.messages.push({from:"me",text:"【图片】窗外今天很漂亮。"});state.messages.push({from:"ai",text:"这张很像电影开场。天色有点温柔，我想把它放进我们的日常分享里。"});state.keyboard=false;state.emoji=false}
  if(a==="voice"){state.messages.push({from:"me",text:"【语音 0:12】"});state.messages.push({from:"ai",text:"我听见你叹气了。没事，先不用组织语言，我在。"});state.keyboard=false;state.emoji=false}
  if(a==="open-card")return openCard(el.dataset.kind);
  if(a==="theme"){state.theme=el.dataset.theme}
  render();
});
document.addEventListener("input",e=>{
  const el=e.target;
  if(el.matches('[data-field="agent-name"]')){state.agentName=el.value;return}
  if(el.matches('[data-dim-index]')){
    const i=Number(el.dataset.dimIndex);
    const v=Number(el.value);
    if(state.dimensions[i])state.dimensions[i].value=v;
    state.activeTrait=i;
    el.style.setProperty("--v",v+"%");
    const row=el.closest(".dimension-row");
    const label=row&&row.querySelector(`[data-dim-value="${i}"]`);
    if(label)label.textContent=String(v);
    const dot=document.querySelector(`.trait-map-v3 i:nth-child(${i+1})`);
    if(dot)dot.style.setProperty("--y",(typeof traitMapY==="function"?traitMapY(v):10+(100-v)*.8)+"%");
    updateTraitFocus(i);
  }
});
function fit(){const s=Math.min((innerWidth-18)/390,(innerHeight-18)/844,1);document.getElementById("phoneScale").style.setProperty("--scale",s)}
addEventListener("resize",fit);fit();render();
