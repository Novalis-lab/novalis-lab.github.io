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
 *      emoji: "🔧",          // カードに出る絵文字
 *      color: "#f6c453",     // カードのアクセント色
 *      isNew: true,          // 「NEW」マークをつけたいとき（いらなければこの行ごと消す）
 *    },
 *
 *  ■ 注意
 *    ・各セットの最後の「},」のカンマを忘れないでください
 *    ・上に書いたものほど、ページの上に表示されます
 */

const TOOLS = [
  {
    name: "SI単位変換ノート",
    description: "圧力・温度・熱量・力・仕事率・体積・密度・接頭語を変換。結果といっしょに「計算の途中」も出るので、勉強や資格試験の確認に。",
    url: "https://novalis-lab.github.io/si-converter/",
    emoji: "📐",
    color: "#8fb6e2",
    isNew: true,
  },
  {
    name: "くらしの単位変換",
    description: "大さじ・小さじ・カップをグラムに、坪・畳・㎡を相互に、合・升・尺・寸などの昔の単位も。数字を入れるだけですぐ変換できます。",
    url: "https://novalis-lab.github.io/unit-converter/",
    emoji: "⚖️",
    color: "#5cb88a",
    isNew: true,
  },
  {
    name: "高速と下道の費用比較",
    description: "高速道路と下道、どっちが得？ 距離・時間・高速料金・燃費から総費用を計算して、「1時間あたりいくらで時間を買っているか」までわかります。",
    url: "https://novalis-lab.github.io/highway-cost/",
    emoji: "🚗",
    color: "#5aa9e6",
  },
  {
    name: "サイ⚪︎スロット",
    description: "予算を入れてスロットを回すと、予算内で食べられるサイ○リヤのメニューの組み合わせがランダムで出てきます。今日なに食べるか迷ったときに。",
    url: "https://novalis-lab.github.io/sai-slot/",
    emoji: "🎰",
    color: "#e8645a",
  },
];
