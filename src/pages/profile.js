// Split from the original prototype. Loaded as classic scripts so existing global behavior is preserved.
function profile(){
  const stats=[
    ["亲密阶段","P4","稳定陪伴","#55746f"],
    ["陪伴天数","126","天","#55746f"],
    ["累计聊天","48","小时","#55746f"],
    ["消息总数","3,284","条","#55746f"]
  ];
  const settings=[
    ["mail","通知提醒","主动消息、任务提醒、免打扰时段","#1f6fff"],
    ["scene","隐私与安全","本机加密、登录设备、敏感内容保护","#18c6c0"],
    ["bag","订阅与账单","VIP 至 2026/06/19，发票与续费","#ff8a3d"],
    ["check","字体与系统","字体大小、语言、缓存、帮助与反馈","#22c66b"],
    ["archive","数据导出","聊天记录与个人资料可随时导出","#7c3cff"],
    ["archive","删除当前 agent","删除后才可以重新创建新的伴生对象","#e35b6f","createAgent"]
  ];
  return`<section class="page profile-page profile-v6">
    <div class="scroll profile-scroll-v6">
      <section class="profile-hero-v6">
        <div class="pro-kicker">personal space</div>
        <h2>山木和${state.currentAgent}</h2>
        <p>我们一起走过的时光，都在这里慢慢沉淀。</p>
        <div class="profile-orbit-v6">
          <div class="profile-person-v6 me">
            <div class="profile-photo-v6 image-avatar">${userPortrait()}</div>
            <span>山木</span>
          </div>
          <div class="profile-link-v6"><i></i><i></i><i></i></div>
          <div class="profile-person-v6 agent">
            <div class="profile-photo-v6 image-avatar">${agentPortrait()}</div>
            <span>${state.currentAgent}</span>
          </div>
        </div>
      </section>
      <section class="profile-section-v6 profile-status-v6">
        <div class="profile-section-head-v6">
          <b>我们的时光</b>
          <span>唯一伴生对象 · 女 · ENFP</span>
        </div>
        <div class="profile-stat-line-v6">${stats.map(x=>`<button class="profile-stat-v6" style="--profile-accent:${x[3]}" data-action="share" data-kind="profile"><small>${x[0]}</small><strong>${x[1]}</strong><em>${x[2]}</em></button>`).join("")}</div>
      </section>
      <section class="profile-section-v6 profile-theme-v6">
        <div class="profile-section-head-v6">
          <b>界面风格</b>
          <span>${themes.find(t=>t.id===state.theme)?.name||"雾白"}</span>
        </div>
        <div class="profile-theme-row-v6">${themes.map(t=>`<button class="profile-theme-dot-v6 ${state.theme===t.id?"on":""}" data-action="theme" data-theme="${t.id}" aria-label="${t.name}"><i style="background:${t.sw[2]}"></i><span>${t.name}</span></button>`).join("")}</div>
      </section>
      <section class="profile-section-v6 profile-settings-v6">
        <div class="profile-section-head-v6">
          <b>系统设置</b>
          <span>通知、隐私、订阅和数据</span>
        </div>
        <div class="profile-setting-list-v6">${settings.map(x=>`<button class="profile-setting-row-v6 ${x[4]?"danger":""}" style="--profile-accent:${x[3]}" ${x[4]?`data-action="page" data-page="${x[4]}"`:""}><span class="profile-setting-icon-v6">${uiIcon(x[0])}</span><span><b>${x[1]}</b><small>${x[2]}</small></span><em>›</em></button>`).join("")}</div>
      </section>
    </div>
  </section>`;
}
