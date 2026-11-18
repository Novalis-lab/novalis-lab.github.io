/*
 * ============================================================
 *  ツールの一覧（ツールを増やすときは、ここに追加するだけ）
 * ============================================================
 *
 *  ■ 1つ分の書き方（{ から } までを1セットとしてコピーして使います）
 *    {
 *      name: "ツールの名前",
 *      description: "何ができるかの短い説明",
 *      url: "https://novalis-lab.github.io/リポジトリ名/",
 *      category: "calc",     // 区分（下の CATEGORIES の id のどれか）
 *      emoji: "🔧",          // カードに出る絵文字
 *      color: "#f6c453",     // カードのアクセント色
 *      isNew: true,          // 「NEW」マークをつけたいとき（いらなければこの行ごと消す）
 *    },
 *
 *  ■ 注意
 *    ・各セットの最後の「},」のカンマを忘れないでください
 *    ・同じ区分の中では、上に書いたものほどページの上に表示されます
 *    ・category を書き忘れたり、まちがえたりしたツールは「その他」に入ります
 */

/*
 *  ■ 区分の一覧（トップページの見出しと、切り替えボタンになります）
 *    ・上に書いた区分ほど、ページの上に表示されます
 *    ・区分を増やすときは { id, name, en } の1行を足すだけ
 *      id … ツールの category に書く名前（半角英字）
 *      name … 見出しとボタンに出る日本語
 *      en … 見出しに小さく出る英語
 */
const CATEGORIES = [
  { id: "calc",   name: "計算・変換",     en: "CALCULATE" },
  { id: "money",  name: "おでかけ・お金", en: "MONEY & TRAVEL" },
  { id: "fun",    name: "ごはん・あそび", en: "FOOD & FUN" },
  { id: "design", name: "デザイン・つくる", en: "DESIGN" },
  { id: "work",   name: "しごと・パソコン", en: "WORK & PC" },
];

const TOOLS = [
  {
    name: "Excel関数 早見表",
    description: "SUMIFS・VLOOKUP・XLOOKUP・IF・TEXT など、仕事でよく使うエクセル関数65個を「合計」「条件」「日付」など日本語でも検索。書き方・使用例と結果つきで、書き方はワンタップでコピー。新しいExcelだけの関数には印つき。",
    url: "https://novalis-lab.github.io/excel-functions/",
    category: "work",
    emoji: "🧮",
    color: "#4cc38a",
    isNew: true,
  },
  {
    name: "Excelショートカット検索",
    description: "「合計」「行 挿入」「太字」など、やりたいことの言葉でエクセルのショートカットをすぐ検索。Windows・Mac 切り替え、よく使う10個、お気に入り登録つき。公式の一覧で確かめたキーだけを載せています。",
    url: "https://novalis-lab.github.io/excel-shortcuts/",
    category: "work",
    emoji: "⌨️",
    color: "#4cc38a",
    isNew: true,
  },
  {
    name: "かんたんロゴメーカー",
    description: "お店の名前・屋号・チーム名を入れるだけで、ロゴとアイコン画像を無料で作成。エンブレムや和モダンなどおしゃれな型も。透過PNG・512×512アイコンで保存できます。",
    url: "https://novalis-lab.github.io/logo-maker/",
    category: "design",
    emoji: "🖋️",
    color: "#c9a0dc",
    isNew: true,
  },
  {
    name: "割り勘計算",
    description: "合計金額と人数を入れるだけで、ひとりいくらかすぐ計算。多めに払う人の額はスライダーで決められて、100円単位の切り上げにも対応。結果はLINEで送れます。",
    url: "https://novalis-lab.github.io/warikan/",
    category: "money",
    emoji: "🧾",
    color: "#e6b85c",
    isNew: true,
  },
  {
    name: "パスワード金庫",
    description: "サイトのIDとパスワードを、マスターパスワードで暗号化してこの端末の中だけに保管。どこにも送信しません。暗号化バックアップつき。",
    url: "https://novalis-lab.github.io/password-vault/",
    category: "calc",
    emoji: "🔐",
    color: "#8fb6e2",
    isNew: true,
  },
  {
    name: "パスワード生成",
    description: "長さと使う文字をえらぶだけで、安全なパスワードをすぐ作成。記号なしやPINにも対応。端末の中だけで作り、どこにも送りません。",
    url: "https://novalis-lab.github.io/password-generator/",
    category: "calc",
    emoji: "🔑",
    color: "#9fd4b4",
    isNew: true,
  },
  {
    name: "ポケモンGO 個体値チェッカー",
    description: "CP・HP・ほしのすな・入手方法から、あり得る個体値（攻撃・防御・HP）をすべて計算して％で表示。ひらがなでポケモンを探せます。非公式ツールです。",
    url: "https://novalis-lab.github.io/iv-checker/",
    category: "fun",
    emoji: "🎮",
    color: "#ffd166",
  },
  {
    name: "色の組み合わせ提案",
    description: "メインの色を1色えらぶだけで、相性のいい5色の配色を提案。日本語の色名つきで、平置きコーデで服の色合わせも見られます。",
    url: "https://novalis-lab.github.io/color-palette/",
    category: "design",
    emoji: "🎨",
    color: "#f783ac",
  },
  {
    name: "今日の晩ごはんルーレット",
    description: "献立に迷ったら回すだけ。和食・洋食・中華などジャンルを選んだり、家の定番メニューを入れたりして、今日の晩ごはんをルーレットで決めます。",
    url: "https://novalis-lab.github.io/dinner-roulette/",
    category: "fun",
    emoji: "🎡",
    color: "#d4a06a",
  },
  {
    name: "日付計算",
    description: "今日から何日後・何日前が何月何日かを、曜日と和暦つきですぐ計算。2つの日付のあいだが何日あるかもわかります。",
    url: "https://novalis-lab.github.io/date-calc/",
    category: "calc",
    emoji: "📅",
    color: "#e8a0a0",
  },
  {
    name: "SI単位変換ノート",
    description: "圧力・温度・熱量・力・仕事率・体積・密度・接頭語を変換。結果といっしょに「計算の途中」も出るので、勉強や資格試験の確認に。",
    url: "https://novalis-lab.github.io/si-converter/",
    category: "calc",
    emoji: "📐",
    color: "#8fb6e2",
  },
  {
    name: "くらしの単位変換",
    description: "大さじ・小さじ・カップをグラムに、坪・畳・㎡を相互に、合・升・尺・寸などの昔の単位も。数字を入れるだけですぐ変換できます。",
    url: "https://novalis-lab.github.io/unit-converter/",
    category: "calc",
    emoji: "⚖️",
    color: "#5cb88a",
  },
  {
    name: "高速と下道の費用比較",
    description: "高速道路と下道、どっちが得？ 距離・時間・高速料金・燃費から総費用を計算して、「1時間あたりいくらで時間を買っているか」までわかります。",
    url: "https://novalis-lab.github.io/highway-cost/",
    category: "money",
    emoji: "🚗",
    color: "#5aa9e6",
  },
  {
    name: "サイ⚪︎スロット",
    description: "予算を入れてスロットを回すと、予算内で食べられるサイ○リヤのメニューの組み合わせがランダムで出てきます。今日なに食べるか迷ったときに。",
    url: "https://novalis-lab.github.io/sai-slot/",
    category: "fun",
    emoji: "🎰",
    color: "#e8645a",
  },
];
