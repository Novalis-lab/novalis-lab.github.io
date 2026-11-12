#!/usr/bin/env python3
"""
novalis のアイコンを、元データ 1 つ（logo-square.svg）から全部作り直すスクリプト（Mac 用）

使い方（このリポジトリのフォルダで）:
    python3 tools/make_icons.py

作られるもの（すべてこのリポジトリの一番上に上書き）:
    icon.svg              … ブラウザのタブのアイコン（角丸・角は透明）
    favicon-32.png        … 古いブラウザ用のタブのアイコン
    apple-touch-icon.png  … iPhone のホーム画面のアイコン（180×180）
    icon-192.png          … Android のホーム画面のアイコン
    icon-512.png          … Android のホーム画面のアイコン（大）

全部のツール（unit-converter・highway-cost・si-converter・date-calc・sai-slot）は
https://novalis-lab.github.io/ にあるこれらのファイルを読み込んでいるので、
このリポジトリを GitHub に反映するだけで、全ツールのアイコンが新しくなります。

※ Mac に最初から入っている qlmanage（クイックルック）と sips（画像の変換）だけを使います。
"""
import os
import re
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "logo-square.svg")
RADIUS = 112  # 角丸の大きさ（512 の正方形に対して）

PNGS = [
    ("favicon-32.png", 32),
    ("apple-touch-icon.png", 180),
    ("icon-192.png", 192),
    ("icon-512.png", 512),
]


def make_rounded_svg(src_text: str) -> str:
    """logo-square.svg の絵を、角丸で切り抜いた icon.svg に変える"""
    m = re.search(r"<svg\b[^>]*>", src_text)
    if not m or "</svg>" not in src_text:
        sys.exit("logo-square.svg の形式が読めませんでした（<svg> … </svg> が必要です）")
    head = m.group(0)
    body = src_text[m.end():src_text.rindex("</svg>")]

    # <defs> はそのまま残し、それ以外の絵の部分を角丸の切り抜きで包む
    defs = ""
    dm = re.search(r"<defs>.*?</defs>", body, re.S)
    if dm:
        defs = dm.group(0)
        body = body[:dm.start()] + body[dm.end():]
    clip = f'<clipPath id="novalis-round"><rect width="512" height="512" rx="{RADIUS}"/></clipPath>'
    defs = defs.replace("<defs>", "<defs>\n    " + clip, 1) if defs else f"<defs>{clip}</defs>"
    # 元データのコメントは外す（自動で作ったファイルだとわかる説明に置きかえる）
    body = re.sub(r"<!--.*?-->", "", body, flags=re.S).strip("\n")

    return (
        f"{head}\n"
        "  <!-- 自動生成ファイル：直接編集しないでください。元データは logo-square.svg、作り方は tools/make_icons.py -->\n"
        f"  {defs.strip()}\n"
        '  <g clip-path="url(#novalis-round)">\n'
        f"{body}\n"
        "  </g>\n"
        "</svg>\n"
    )


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    if sys.platform != "darwin":
        sys.exit("このスクリプトは Mac 専用です（qlmanage と sips を使います）")
    with open(SRC, encoding="utf-8") as f:
        src = f.read()

    # 1) 角丸の icon.svg
    with open(os.path.join(ROOT, "icon.svg"), "w", encoding="utf-8") as f:
        f.write(make_rounded_svg(src))
    print("作成: icon.svg")

    # 2) PNG（四角い元データを 1024px で描いてから、各サイズに縮小）
    #    ホーム画面では端末が自動で角を丸めるので、PNG は四角のままにする
    with tempfile.TemporaryDirectory() as tmp:
        run(["qlmanage", "-t", "-s", "1024", "-o", tmp, SRC])
        big = os.path.join(tmp, os.path.basename(SRC) + ".png")
        if not os.path.exists(big):
            sys.exit("logo-square.svg を画像にできませんでした")
        for name, size in PNGS:
            run(["sips", "-z", str(size), str(size), big, "--out", os.path.join(ROOT, name)])
            print(f"作成: {name}（{size}×{size}）")

    print("\n完了。git で反映（commit・push）すると、全ツールのアイコンが新しくなります。")


if __name__ == "__main__":
    main()
