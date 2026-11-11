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
3. `name`（名前）・`description`（説明）・`url`（アドレス）・`emoji`・`color` を書きかえる
4. 保存してアップロードすると、カードが1枚増えます

5. `index.html` の下のほうにある `tools.js?v=20261111` の数字を、その日の日付などに書きかえる（スマホのホーム画面から開いたときも、新しい内容が読み込まれるようにするため。`style.css` や `main.js` を直したときも同じように数字を変えてください）

※ `index.html` の `<noscript>` の中にも同じリンクを1行足しておくと、JavaScriptが動かない環境でもリンクが表示されます（なくても動作に問題はありません）。

## 広告を入れるとき

`index.html` の `<aside class="ad-slot">` の中に広告のコードを貼り、「広告スペース」の文字（`<span class="ad-placeholder">…</span>`）を消してください。

## ロゴ・アイコンのファイル

| ファイル | 使いみち |
|---|---|
| `icon.svg` | ブラウザのタブのアイコン（角丸） |
| `favicon-32.png` | 古いブラウザ用のタブのアイコン |
| `apple-touch-icon.png` | iPhoneのホーム画面のアイコン |
| `icon-192.png` / `icon-512.png` | Androidのホーム画面のアイコン（`site.webmanifest` で指定） |
| `logo-square.svg` | ロゴの元データ（四角・角なし） |

ほかのツールのページでも、`<head>` に次の3行を入れると同じアイコンになります。

```html
<link rel="icon" href="https://novalis-lab.github.io/icon.svg" type="image/svg+xml">
<link rel="icon" href="https://novalis-lab.github.io/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="https://novalis-lab.github.io/apple-touch-icon.png">
```
