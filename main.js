/*
 * tools.js のツール一覧から、カードを自動で作るプログラム
 * （ツールの追加は tools.js だけ直せばOK。このファイルは基本さわらなくて大丈夫です）
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const list = document.getElementById("tool-list");

  TOOLS.forEach(function (tool, i) {
    const li = document.createElement("li");

    // カード全体を1つのリンクにする（どこを押しても移動できる）
    const card = document.createElement("a");
    card.className = "tool-card reveal";
    card.href = tool.url;
    if (tool.color) card.style.setProperty("--tool", tool.color);

    const num = document.createElement("span");
    num.className = "tool-num";
    num.setAttribute("aria-hidden", "true");
    num.textContent = String(i + 1).padStart(2, "0");

    const icon = document.createElement("span");
    icon.className = "tool-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = tool.emoji || "🔧";

    const body = document.createElement("span");
    body.className = "tool-body";

    const name = document.createElement("span");
    name.className = "tool-name";
    name.textContent = tool.name;
    if (tool.isNew) {
      const badge = document.createElement("span");
      badge.className = "badge-new";
      badge.textContent = "NEW";
      name.appendChild(badge);
    }

    const desc = document.createElement("span");
    desc.className = "tool-desc";
    desc.textContent = tool.description;

    const go = document.createElement("span");
    go.className = "tool-go";
    go.setAttribute("aria-hidden", "true");
    go.innerHTML = "<span>→</span>";

    body.appendChild(name);
    body.appendChild(desc);
    card.appendChild(num);
    card.appendChild(icon);
    card.appendChild(body);
    card.appendChild(go);
    li.appendChild(card);
    list.appendChild(li);
  });

  // スクロールして見えた要素を、順番にふわっと表示する
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      let n = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.transitionDelay = (n++ * 90) + "ms";
        el.classList.add("is-visible");
        io.unobserve(el);
        // 表示し終わったら遅延を消して、ホバーの反応を速くする
        setTimeout(function () { el.style.transitionDelay = ""; }, 1200);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  document.getElementById("tool-count").textContent = TOOLS.length + " ITEMS";
  document.getElementById("year").textContent = new Date().getFullYear();
})();
