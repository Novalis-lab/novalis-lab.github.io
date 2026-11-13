# novalis

ちょっと便利な、ゆるい道具箱。無料Webツール集のトップページです。

公開URL：https://novalis-lab.github.io/

## ファイルの役割

| ファイル | 役割 | さわる頻度 |
|---|---|---|
| `tools.js` | ツールの一覧（名前・説明・URL・絵文字・色） | **ツールを増やすたび** |
| `index.html` | 画面の骨組み | たまに |
| `style.css` | 色やレイアウト | たまに |
| `main.js` | 一覧からカードを作るプログラム | ほぼさわらない |

## ツールを追加する方法

1. `tools.js` を開く
2. `{` から `},` までの1セットをコピーして、`TOOLS = [` の中に貼り付ける
3. `name`（名前）・`description`（説明）・`url`（アドレス）・`category`（区分）・`emoji`・`color` を書きかえる
4. 保存してアップロードすると、その区分の中にカードが1枚増えます

※ `index.html` の `<noscript>` の中にも同じリンクを1行足しておくと、JavaScriptが動かない環境でもリンクが表示されます（なくても動作に問題はありません）。

## ツールの区分（トップページの区分け）

トップページのツール一覧は、区分ごとに見出しを付けて並びます。一覧の上の「すべて／計算・変換／…」のボタンで、区分ごとに表示を切り替えられます。

- 区分は `tools.js` の `CATEGORIES` で決めています（今は「計算・変換」「おでかけ・お金」「ごはん・あそび」「デザイン・つくる」）
- 区分を増やすときは、`CATEGORIES` に `{ id: "英字の名前", name: "日本語の名前", en: "ENGLISH" },` を1行足し、ツールの `category` にその id を書く
- 上に書いた区分ほど、ページの上に表示されます
- `category` を書き忘れたツールは、自動で「その他」に入ります
- ツールが1つもない区分は、見出しもボタンも表示されません

## 全ページ共通のフォントと角の丸み（common.css）

`common.css` で、フォント（Google Fonts・無料）と角の丸みをまとめて管理しています。

- `--font`：日本語の見出し・本文（Zen Maru Gothic）
- `--font-en`：英字ロゴ・英字の見出し・数字（Unbounded）
- `--radius`：ボタンやカードの角の丸み（8px）
トップページ・くらしの単位変換・高速と下道の費用比較が読み込んでいます。

- フォントや丸みを変えたいときは `common.css` だけ直せばOK
- 直したあとは、各ページの `common.css?v=〇〇` の数字も新しくすると、確実に反映されます
- 新しいツールで使うときは、`<head>` に次の1行を入れて、`font-family: var(--font);`（英字は `var(--font-en)`）と `border-radius: var(--radius);` を使う

```html
<link rel="stylesheet" href="https://novalis-lab.github.io/common.css?v=20261113d">
```

## 広告を入れるとき

`index.html` の `<aside class="ad-slot">` の中に広告のコードを貼り、「広告スペース」の文字（`<span class="ad-placeholder">…</span>`）を消してください。

## ロゴ・アイコンのファイル（元データ 1 つで全リポジトリに反映）

**元データは `logo-square.svg` の 1 つだけ**です。ここを直して、次の 2 ステップで全ツールのアイコンが変わります。

1. このフォルダで `python3 tools/make_icons.py` を実行する（Mac 専用。元データから下の表のファイルを全部作り直します）
2. このリポジトリを GitHub に反映（commit・push）する

各ツール（unit-converter・highway-cost・si-converter・date-calc・sai-slot）は、
`https://novalis-lab.github.io/` にあるアイコンを読み込んでいるので、**ほかのリポジトリは何も直さなくてOK**です。
（GitHub Pages は 10 分ほどでファイルを読み直させるので、少し待つと各ページに反映されます。iPhone のホーム画面に登録したアイコンだけは、登録し直すまで変わりません）

デザイン：ほぼ黒の背景に、太い白の **「N」** と、上のバーのロゴと同じ **青く光るひし形（◆）**。「N」の右の縦棒には、トップページのロゴ「VA」と同じ向きの斜めの切り込み線。右上に背景と同じ斜線。

| ファイル | 使いみち | 編集 |
|---|---|---|
| `logo-square.svg` | **元データ**（四角・角なし） | ここだけ直す |
| `icon.svg` | ブラウザのタブのアイコン（角丸）・サイ⚪︎スロットの上のバーのロゴ | 自動で作られる |
| `favicon-32.png` | 古いブラウザ用のタブのアイコン | 自動で作られる |
| `apple-touch-icon.png` | iPhoneのホーム画面のアイコン（角はiPhoneが自動で丸める） | 自動で作られる |
| `icon-192.png` / `icon-512.png` | Androidのホーム画面のアイコン（`site.webmanifest` で指定） | 自動で作られる |

※ LINE や X のシェア画像（`ogp.png` など）と、デスクトップの GitHub プロフィール画像は、アイコンとは別の画像なので自動では変わりません。

新しいツールのページでも、`<head>` に次の3行を入れると同じアイコンになります（数字の `?v=` は付けない）。

```html
<link rel="icon" href="https://novalis-lab.github.io/icon.svg" type="image/svg+xml">
<link rel="icon" href="https://novalis-lab.github.io/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="https://novalis-lab.github.io/apple-touch-icon.png">
```
