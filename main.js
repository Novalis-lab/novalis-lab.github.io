/*
 * tools.js のツール一覧から、カードを自動で作るプログラム
 * （ツールの追加は tools.js だけ直せばOK。このファイルは基本さわらなくて大丈夫です）
 */
(function () {
  "use strict";

  const list = document.getElementById("tool-list");

  TOOLS.forEach(function (tool) {
    const li = document.createElement("li");

    // カード全体を1つのリンクにする（どこを押しても移動できる）
    const card = document.createElement("a");
    card.className = "tool-card";
    card.href = tool.url;
    card.style.setProperty("--accent", tool.color || "#f6c453");

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
    go.textContent = "使ってみる →";

    body.appendChild(name);
    body.appendChild(desc);
    body.appendChild(go);
    card.appendChild(icon);
    card.appendChild(body);
    li.appendChild(card);
    list.appendChild(li);
  });

  document.getElementById("tool-count").textContent = "（" + TOOLS.length + "個）";
  document.getElementById("year").textContent = new Date().getFullYear();
})();
