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
    card.className = "tool-card";
    card.href = tool.url;
    card.style.setProperty("--accent", tool.color || "#7c6cff");

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
    go.innerHTML = 'OPEN <span class="arrow" aria-hidden="true">→</span>';

    body.appendChild(name);
    body.appendChild(desc);
    body.appendChild(go);
    card.appendChild(num);
    card.appendChild(icon);
    card.appendChild(body);
    li.appendChild(card);
    list.appendChild(li);

    // マウスの位置を記録して、カードの光をついてこさせる
    card.addEventListener("pointermove", function (e) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  // スクロールして見えたカードを、順番にふわっと表示する
  const cards = list.querySelectorAll(".tool-card");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(function (c, i) {
      c.style.transitionDelay = (i * 80) + "ms";
      io.observe(c);
      // 表示し終わったら遅延を消して、ホバーの反応を速くする
      c.addEventListener("transitionend", function () { c.style.transitionDelay = ""; }, { once: true });
    });
  } else {
    cards.forEach(function (c) { c.classList.add("is-visible"); });
  }

  document.getElementById("tool-count").textContent = TOOLS.length + " ITEMS";
  document.getElementById("year").textContent = new Date().getFullYear();
})();
