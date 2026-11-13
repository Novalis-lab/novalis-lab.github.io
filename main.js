/*
 * tools.js のツール一覧から、区分ごとのカードと切り替えボタンを自動で作るプログラム
 * （ツールや区分の追加は tools.js だけ直せばOK。このファイルは基本さわらなくて大丈夫です）
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const groupsEl = document.getElementById("tool-groups");
  const filterEl = document.getElementById("tool-filter");
  const cats = (typeof CATEGORIES !== "undefined" ? CATEGORIES : []).slice();

  // 区分ごとにツールを振り分ける（区分が見つからないツールは「その他」へ）
  const byCat = {};
  cats.forEach(function (c) { byCat[c.id] = []; });
  TOOLS.forEach(function (tool) {
    const id = byCat[tool.category] ? tool.category : "other";
    if (!byCat[id]) { byCat[id] = []; cats.push({ id: "other", name: "その他", en: "OTHERS" }); }
    byCat[id].push(tool);
  });
  const used = cats.filter(function (c) { return byCat[c.id].length > 0; });

  // ---- カード1枚 ----
  let num = 0;
  function makeCard(tool) {
    num += 1;
    const li = document.createElement("li");

    // カード全体を1つのリンクにする（どこを押しても移動できる）
    const card = document.createElement("a");
    card.className = "tool-card reveal";
    card.href = tool.url;
    if (tool.color) card.style.setProperty("--tool", tool.color);

    const n = document.createElement("span");
    n.className = "tool-num";
    n.setAttribute("aria-hidden", "true");
    n.textContent = String(num).padStart(2, "0");

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
    card.appendChild(n);
    card.appendChild(icon);
    card.appendChild(body);
    card.appendChild(go);
    li.appendChild(card);
    return li;
  }

  // ---- 区分ごとの見出しとリスト ----
  used.forEach(function (c, i) {
    const sec = document.createElement("section");
    sec.className = "tool-group";
    sec.id = "cat-" + c.id;
    sec.dataset.cat = c.id;
    sec.setAttribute("aria-labelledby", "cat-title-" + c.id);

    const head = document.createElement("div");
    head.className = "group-head reveal";
    head.innerHTML =
      '<span class="group-no" aria-hidden="true">' + String.fromCharCode(65 + i) + " /</span>" +
      '<h3 class="group-title" id="cat-title-' + c.id + '"></h3>' +
      '<span class="group-en" aria-hidden="true"></span>' +
      '<span class="group-count"></span>';
    head.querySelector(".group-title").textContent = c.name;
    head.querySelector(".group-en").textContent = c.en || "";
    head.querySelector(".group-count").textContent = byCat[c.id].length + (byCat[c.id].length === 1 ? " ITEM" : " ITEMS");

    const ul = document.createElement("ul");
    ul.className = "tool-list";
    byCat[c.id].forEach(function (tool) { ul.appendChild(makeCard(tool)); });

    sec.appendChild(head);
    sec.appendChild(ul);
    groupsEl.appendChild(sec);
  });

  // ---- 切り替えボタン（すべて／区分ごと） ----
  function addButton(id, label, count) {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.cat = id;
    b.innerHTML = '<span class="f-name"></span><span class="f-count"></span>';
    b.querySelector(".f-name").textContent = label;
    b.querySelector(".f-count").textContent = count;
    filterEl.appendChild(b);
  }
  if (used.length > 1) {
    addButton("all", "すべて", TOOLS.length);
    used.forEach(function (c) { addButton(c.id, c.name, byCat[c.id].length); });
  } else {
    filterEl.hidden = true;   // 区分が1つしかないときはボタンを出さない
  }

  // byUser：ボタンで切り替えたとき（すぐ表示する）／最初の表示（スクロールでふわっと出す）
  function select(id, byUser) {
    if (id !== "all" && !byCat[id]) id = "all";
    [].forEach.call(filterEl.children, function (b) { b.setAttribute("aria-pressed", b.dataset.cat === id ? "true" : "false"); });
    [].forEach.call(groupsEl.children, function (sec) {
      const show = id === "all" || sec.dataset.cat === id;
      sec.hidden = !show;
      if (show && byUser) sec.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
    });
    // 切り替えで一覧が短くなっても、ボタンが画面の上のほうに見える位置に戻す
    if (byUser) {
      const top = filterEl.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.6) {
        window.scrollTo({ top: top + window.scrollY - 24, behavior: "smooth" });
      }
    }
  }
  filterEl.addEventListener("click", function (e) {
    const b = e.target.closest("button");
    if (b) select(b.dataset.cat, true);
  });
  select("all", false);   // 開いたときは、いつも「すべて」を表示

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
    items.forEach(function (el) { if (!el.classList.contains("is-visible")) io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  document.getElementById("tool-count").textContent = TOOLS.length + " ITEMS";
  document.getElementById("year").textContent = new Date().getFullYear();

  /* 秘密の入り口：左上の「◆ NOVALIS」を素早く5回タップするとパスワード金庫へ。
     1回だけのタップは、これまでどおりページの先頭に戻るだけ（見た目は何も変わらない） */
  var logo = document.querySelector(".topbar .logo, .logo");
  if (logo) {
    var taps = 0, last = 0;
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      var now = Date.now();
      taps = now - last < 700 ? taps + 1 : 1;
      last = now;
      if (taps >= 5) { taps = 0; location.href = "https://novalis-lab.github.io/password-vault/"; return; }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
