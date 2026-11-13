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

  /* 秘密の入り口：左上の「◆ NOVALIS」を素早く5回タップすると SECRET_URL へ移動する。
     1回だけのタップは、これまでどおりページの先頭に戻るだけ（見た目は何も変わらない）
     今は行き先がまだないので、存在しないページ → 404（ページが見つかりません）が出る。
     ツールを紐づけるときは、SECRET_URL をそのツールのアドレスに書きかえる */
  var SECRET_URL = "/secret/";
  var logo = document.querySelector(".topbar .logo, .logo");
  if (logo) {
    var taps = 0, last = 0;
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      var now = Date.now();
      taps = now - last < 700 ? taps + 1 : 1;
      last = now;
      if (taps >= 5) { taps = 0; enterSecret(); return; }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* 入るときのアニメーション：ロゴの青い◆が回りながらこちらに迫ってきて画面をおおい、暗転してから移動 */
  var entering = false;
  function enterSecret() {
    var mark = logo && logo.querySelector(".logo-mark");
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (entering) return;
    if (!mark || reduce || !document.body.animate) { location.href = SECRET_URL; return; }
    entering = true;
    var r = mark.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var size = mark.offsetWidth || 12;
    // 画面のまんなかへ動く量と、そこから画面全体をおおえる大きさ（回転しても隅が残らないように余裕をもたせる）
    var dx = innerWidth / 2 - cx, dy = innerHeight / 2 - cy;
    var scale = Math.hypot(innerWidth, innerHeight) * 1.2 / size;
    var sq = document.createElement("div");
    sq.setAttribute("aria-hidden", "true");
    sq.style.cssText = "position:fixed;z-index:9999;pointer-events:none;left:" + (cx - size / 2) + "px;top:" + (cy - size / 2) + "px;width:" + size + "px;height:" + size + "px;" +
      "background:var(--accent,#6f9fd4);will-change:transform;box-shadow:0 0 12px 3px rgba(111,159,212,.8)";
    var veil = document.createElement("div");
    veil.setAttribute("aria-hidden", "true");
    veil.style.cssText = "position:fixed;inset:0;z-index:10000;pointer-events:none;background:#0b0b0d;opacity:0";
    document.body.appendChild(sq);
    document.body.appendChild(veil);
    mark.style.visibility = "hidden";

    // 1) ◆がふわっと画面のまんなかへ → 2) 回りながら加速して、こちらに迫ってくる → 3) 画面をおおって暗転
    var at = "translate(" + dx + "px," + dy + "px) ";
    sq.animate([
      { transform: "translate(0,0) rotate(45deg) scale(1)", offset: 0, easing: "cubic-bezier(.3,.7,.3,1)" },
      { transform: at + "rotate(45deg) scale(3.5)", offset: .38, easing: "cubic-bezier(.7,0,1,.6)" },
      { transform: at + "rotate(225deg) scale(" + scale + ")", offset: 1 }
    ], { duration: 1300, fill: "forwards" });
    var fade = veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, delay: 1150, easing: "ease-in", fill: "forwards" });
    fade.onfinish = function () { location.href = SECRET_URL; };
  }
  // 「戻る」でこのページに戻ってきたときは、アニメーションの残りを片づける
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    entering = false;
    var m = logo && logo.querySelector(".logo-mark"); if (m) m.style.visibility = "";
    [].forEach.call(document.querySelectorAll("body > div[aria-hidden='true'][style*='z-index']"), function (el) { el.remove(); });
  });
})();
