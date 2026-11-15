# novalis：新しいツールを作るときの決まり

このリポジトリ（novalis-lab.github.io）はトップページです。ツールは **1つごとに専用のリポジトリ** で作って公開します（例：highway-cost・sai-slot・warikan）。
トップページの中にツールのフォルダを作らないでください（同じアドレスがぶつかります）。

## 手順（毎回この順番で）

1. **リポジトリを用意してもらう**
   Claude はリポジトリを作れないので、持ち主に https://github.com/new で空の Public リポジトリを作ってもらう（名前は英小文字とハイフン。例：`warikan`）。README などは追加しない。
2. **ツールを作って `main` に入れる**
   - 基本は `index.html` 1ファイル＋ `README.md`（何ができるか・ファイルの役割を、やさしい日本語で）
   - デザインは既存ツール（例：Novalis-lab/warikan、Novalis-lab/highway-cost）に合わせる：上のバー・ヒーロー・番号つきカード・広告スペース・フッター
   - `<head>` に共通CSS（`https://novalis-lab.github.io/common.css?v=…`）と共通アイコン3行を入れる（README.md 参照）
   - 公開アドレスは `https://novalis-lab.github.io/リポジトリ名/`。canonical・og:url もこれにする
   - スマホ幅（390px）で表示を確認してから push する
3. **GitHub Pages をオンにしてもらう**
   Claude からは設定できないので、持ち主に `https://github.com/Novalis-lab/リポジトリ名/settings/pages` で Branch を **main** ／ **/ (root)** にして Save してもらう。公開の成否は Actions の「pages build and deployment」で確認する。
4. **トップページに追加する**（このリポジトリ）
   - `tools.js` の `TOOLS` のいちばん上に追加（`isNew: true`）
   - `index.html` の `<noscript>` にリンクを1行
   - `sitemap.xml` に URL を追加
   - `README.md` の、共通CSS・共通アイコンを読み込んでいるツールの一覧に追加
5. **Mac（Finder）にフォルダを作る**
   持ち主は Mac の Claude Code 用フォルダで、ツールごとのフォルダを管理している。
   - Mac で動いている Claude Code なら、そのフォルダの中で `git clone https://github.com/Novalis-lab/リポジトリ名.git` を実行してフォルダを作る（場所がわからなければ持ち主に聞く）
   - クラウドで動いているときは、持ち主の Mac のフォルダが共有されていれば（Remote Control）そこで同じことをする。共有されていなければ、持ち主に上のコマンドを伝えて実行してもらう

## 持ち主とのやりとり

- 持ち主はプログラミング初心者。説明は日本語で、専門用語を避けて短く
- 公開までやってほしい、と言われている（PR を作ってマージまでしてよい）
