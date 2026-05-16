// Split from the original prototype. Loaded as classic scripts so existing global behavior is preserved.
function render(){
  setTheme(state.theme);
  document.querySelector(".screen")?.setAttribute("data-page", state.page);
  const app=document.getElementById("app");
  app.classList.toggle("drawer-open", state.drawer);
  app.innerHTML=state.page==="chat"?chatPage():featurePage(state.page);
  if(["chat","online","scene","profile"].includes(state.page)&&!state.keyboard&&!state.emoji&&!state.more)app.insertAdjacentHTML("beforeend",tabbar());
  if(state.drawer)app.insertAdjacentHTML("beforeend",drawer());
  if(state.modal==="capsule")app.insertAdjacentHTML("beforeend",capsuleModal());
  if(state.keyboard&&state.page==="chat")app.insertAdjacentHTML("beforeend",keyboardPanel());
  if(state.emoji&&state.page==="chat")app.insertAdjacentHTML("beforeend",emojiPanel());
  if(state.more&&state.page==="chat")app.insertAdjacentHTML("beforeend",chatMorePanel());
  if(state.photoViewer)app.insertAdjacentHTML("beforeend",photoViewer());
  if(state.page==="daily")bindDailyScroll();
  if(state.page==="offlineInvite"&&!state.offlineTicketAutoDone&&!state.offlineTicketFlipped){
    state.offlineTicketAutoDone=true;
    setTimeout(()=>{
      if(state.page!=="offlineInvite"||state.offlineTicketFlipped)return;
      state.offlineTicketFlipped=true;
      const ticket=document.querySelector(".offline-ticket-v6");
      if(ticket){
        ticket.classList.add("is-flipped");
        ticket.setAttribute("aria-pressed","true");
      }
    },1000);
  }
  requestAnimationFrame(()=>{const s=document.querySelector(".chat-scroll");if(s)s.scrollTop=s.scrollHeight});
}

function activeTab(){if(["online","music","movie","game","daily"].includes(state.page))return"online";if(["scene","offlineInvite","progress"].includes(state.page))return"scene";if(state.page==="profile")return"profile";return"chat"}

function tabbar(){const active=activeTab();return`<nav class="tabbar ${active}-tabbar">${tabItems.map(i=>`<button class="tab ${active===i[0]?"on":""}" aria-label="${i[2]}" data-action="tab" data-page="${i[0]}">${tabIcon(i[1])}</button>`).join("")}</nav>`}

function nav(title,shareKind="",back="chat"){return`<div class="detail-actions-v10" aria-label="${title}"><button class="detail-back-v10" data-action="page" data-page="${back}" aria-label="返回">${uiIcon("chevron-left")}</button>${shareKind?`<button class="detail-share-v10" data-action="share" data-kind="${shareKind}">发聊天</button>`:""}</div>`}

function tabTitle(icon,title,sub){return`<div class="tab-title"><div class="mark">${uiIcon(icon)||icon}</div><div><h2>${title}</h2><p>${sub}</p></div></div>`}

function featurePage(page){const map={login,agents,createAgent,online,scene,weather,capsule,legacy,achieve,checkin,shop,music,movie,game,daily,offlineInvite,progress,profile};return map[page]?map[page]():chatPage()}
