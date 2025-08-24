/** メールバリエーション（件名と画像URL） */
const MAIL_VARIANTS = {
  A: {
    subject: "なぜ、社員20人でも突発案件で売上20%アップできたのか",
    imageUrl:
      "https://raw.githubusercontent.com/Sekiguchi-AgeLab/htmlmail/main/HTMLメール画像ver1/FV_A.png",
  },
  B: {
    subject:
      "「100人以下なら施工管理アプリは不要」小規模な建築会社に最適なスケジュール管理術",
    imageUrl:
      "https://raw.githubusercontent.com/Sekiguchi-AgeLab/htmlmail/main/HTMLメール画像ver1/FV_B.png",
  },
  C: {
    subject:
      "LINE WORKSからの乗り換えなら！小規模な建築会社におススメな管理アプリ",
    imageUrl:
      "https://raw.githubusercontent.com/Sekiguchi-AgeLab/htmlmail/main/HTMLメール画像ver1/FV_C.png",
  },
};

/** キーで件名を取得（デフォルトA） */
function getMailSubjectByKey(key) {
  const k = String(key || "A").toUpperCase();
  const variant = MAIL_VARIANTS[k] || MAIL_VARIANTS.A;
  return variant.subject;
}

/** キーで画像URLを取得（デフォルトA） */
function getImageUrlByKey(key) {
  const k = String(key || "A").toUpperCase();
  const variant = MAIL_VARIANTS[k] || MAIL_VARIANTS.A;
  return variant.imageUrl;
}

/** テキストfallback（不要なら "" にしても可） */
function getTextFallback() {
  return "HTMLメールをご確認ください。";
}

/** HTML本文テンプレ（会社名、ピクセルURL、件名キーに応じた画像を埋め込み） */
function buildMailHtml(companyName, pixelUrl, subjectKey) {
  const imageUrl = getImageUrlByKey(subjectKey);
  return `
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>ご提案</title>
    <style type="text/css">
      @media screen and (max-width: 600px) {
        /* 画面幅が600px以下になったら適用 */
        .container {
          width: 100% !important;
        }
        .content-padding {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        .image-padding {
          padding-left: 40px !important;
          padding-right: 40px !important;
        }
      }
    </style>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: 'Segoe UI', 'Yu Gothic', 'Hiragino Sans', 'メイリオ',
        'Meiryo', sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color: #f4f4f4"
    >
      <tr>
        <td align="center" style="padding: 20px 0">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background-color: #ffffff"
            class="container"
          >
            <tr>
              <td
                align="center"
                style="padding: 30px 120px"
                class="image-padding"
              >
                <img
                  src="${imageUrl}"
                  alt="現場っち"
                  width="360"
                  style="
                    display: block;
                    width: 100%;
                    max-width: 360px;
                    height: auto;
                  "
                />
              </td>
            </tr>

            <tr>
              <td
                align="center"
                style="padding: 20px 20px 20px 20px"
                class="content-padding"
              >
                <a
                  href="#"
                  style="
                    background-color: #ff6b35;
                    border-radius: 500px;
                    color: #ffffff;
                    display: inline-block;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 50px;
                    text-align: center;
                    text-decoration: none;
                    width: 200px;
                    -webkit-text-size-adjust: none;
                  "
                  >無料相談してみる</a
                >
              </td>
            </tr>

            <tr>
              <td style="padding: 0 30px" class="content-padding">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 20px;
                      "
                    >
                      ${companyName}様<br />
                      <br />
                      お世話になっております。<br />
                      エイジラボ株式会社の小林と申します。
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 20px;
                      "
                    >
                      <strong style="font-size: 14px;"
                        >「職人のスケジュールを管理するツールを導入したいが、施工管理アプリを入れるほどじゃない」</strong
                      ><br />
                      <strong style="font-size: 14px;"
                        >「今までLINE
                        WORKSなどのスケジュールアプリを使ってきたが、実務に合ってなくて使いづらい…」</strong
                      >
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 20px;
                      "
                    >
                      そんなお悩みはありませんか？
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 20px;
                      "
                    >
                      弊社は小規模建築会社向けワーカー管理アプリ「現場っち」を提供している会社です。
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 30px;
                      "
                    >
                      この度、施工管理・スケジュール管理に課題感をお持ちの方向けに、<br />
                      <strong>無料相談会</strong>を開催します！
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- 相談会セクション -->
            <tr>
              <td style="padding: 30px 30px 30px 30px" class="content-padding">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAFAFA; padding: 30px 20px;">
                  <!-- 画像 -->
                  <tr>
                    <td align="center" style="padding: 0 0 30px 0">
                      <img
                        src="https://raw.githubusercontent.com/Sekiguchi-AgeLab/htmlmail/main/HTMLメール画像ver1/soudankai.png"
                        alt="無料相談会"
                        width="360"
                        style="
                          display: block;
                          width: 100%;
                          max-width: 360px;
                          height: auto;
                        "
                      />
                    </td>
                  </tr>

                  <!-- 白背景の内側ブロック -->
                  <tr>
                    <td>
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; padding: 20px;">
                        <!-- CTAボタン -->
                        <tr>
                          <td align="center" style="padding-bottom: 30px;">
                            <table cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td
                                  style="
                                    font-size: 18px;
                                    font-weight: bold;
                                    color: #ff6b35;
                                    padding-bottom: 10px;
                                  "
                                  align="center"
                                >
                                  ＼参加無料／
                                </td>
                              </tr>
                              <tr>
                                <td align="center">
                                  <a
                                    href="#"
                                    style="
                                      background-color: #ff6b35;
                                      border-radius: 500px;
                                      color: #ffffff;
                                      display: inline-block;
                                      font-size: 18px;
                                      font-weight: bold;
                                      line-height: 50px;
                                      text-align: center;
                                      text-decoration: none;
                                      width: 280px;
                                      -webkit-text-size-adjust: none;
                                    "
                                    >日程を選んで相談会に参加</a
                                  >
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- 相談会内容 -->
                        <tr>
                          <td
                            style="
                              font-size: 16px;
                              line-height: 1.8;
                              color: #1a2e4a;
                              padding-bottom: 10px;
                            "
                          >
                            無料相談会では、以下のようなことをお話ししています。
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              font-size: 16px;
                              line-height: 1.8;
                              color: #1a2e4a;
                              padding-bottom: 20px;
                            "
                          >
                            <strong
                              >・貴社の事業課題を整理し、オススメの業務改善をご提案</strong
                            ><br />
                            <strong
                              >・他の建築会社様でのスケジュール管理成功事例のご紹介</strong
                            ><br />
                            <strong
                              >・今日からできる業務改善・AI活用テクニック</strong
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- 注記（#FAFAFA背景上に直接） -->
                  <tr>
                    <td style="padding: 20px 0 0 0">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td
                            style="
                              padding: 10px 15px;
                              font-size: 13px;
                              line-height: 1.5;
                              color: #8896a3;
                            "
                          >
                            ※相談会は今後の事業展開のための調査の一環として開催しています。<br />
                            簡単にアプリのご紹介をさせて頂く場合もございますが、<br />
                            無理な勧誘などは一切いたしません！
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 30px" class="content-padding">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 10px;
                      "
                    >
                      無料相談会では、以下のようなことをお話しています。
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 20px;
                      "
                    >
                      <strong
                        >・貴社の事業課題を整理し、オススメの業務改善をご提案</strong
                      ><br />
                      <strong
                        >・他の建築会社様でのスケジュール管理成功事例のご紹介</strong
                      ><br />
                      <strong
                        >・今日からできる業務改善・AI活用テクニック</strong
                      >
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 20px 20px 20px">
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          background-color: #f9fafb;
                          border-left: 2px solid #e0e5ea;
                        "
                      >
                        <tr>
                          <td
                            style="
                              padding: 10px 15px;
                              font-size: 13px;
                              line-height: 1.5;
                              color: #8896a3;
                            "
                          >
                            ※相談会は今後の事業展開のための調査の一環として開催しています。<br />
                            簡単にアプリのご紹介をさせて頂く場合もございますが、<br />
                            無理な勧誘などは一切いたしません！
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 10px;
                      "
                    >
                      <span style="font-size: 14px;">「既存ツールを変えようか悩んでいる」</span><br />
                      <span style="font-size: 14px;">「他の中小企業がどのようにスケジュール管理をしているか知りたい」</span><br />
                      <span style="font-size: 14px;">「事務員が1人しかいないため、管理業務を効率化したい」</span>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 30px;
                      "
                    >
                      このようなお悩みがある方は、ぜひ無料相談会にお申し込みください。
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td
                align="center"
                style="padding: 0 20px 30px 20px"
                class="content-padding"
              >
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td
                      style="
                        font-size: 18px;
                        font-weight: bold;
                        color: #ff6b35;
                        padding-bottom: 10px;
                      "
                      align="center"
                    >
                      ＼日程を選ぶだけ／
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a
                        href="#"
                        style="
                          background-color: #ff6b35;
                          border-radius: 500px;
                          color: #ffffff;
                          display: inline-block;
                          font-size: 18px;
                          font-weight: bold;
                          line-height: 50px;
                          text-align: center;
                          text-decoration: none;
                          width: 220px;
                          -webkit-text-size-adjust: none;
                        "
                        >無料で相談してみる</a
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 30px 30px 30px" class="content-padding">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td
                      style="font-size: 14px; line-height: 1.6; color: #666666"
                    >
                      ※フォームで必要事項と、参加可能な日程を最大3つご入力ください。<br />
                      　後ほど弊社担当より、日程調整のご連絡をさせていただきます。
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 30px" class="content-padding">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td
                      style="border-top: 1px solid #dddddd; padding-top: 30px"
                    ></td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 30px 30px" class="content-padding">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td
                      style="
                        font-size: 16px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 15px;
                      "
                    >
                      <strong>「まずは資料を見たい」</strong>という人は、<br />
                      こちらからスケジュール管理アプリ「現場っち」の資料がダウンロードできます。
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td
                            align="center"
                            style="
                              background-color: #4a90e2;
                              padding: 12px 30px;
                            "
                          >
                            <a
                              href="#"
                              style="
                                color: #ffffff;
                                text-decoration: none;
                                font-size: 16px;
                                font-weight: bold;
                                display: block;
                              "
                              >現場っちの資料をダウンロードする</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding: 0 30px 30px 30px" class="content-padding">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td
                      style="
                        font-size: 15px;
                        line-height: 1.8;
                        color: #1a2e4a;
                        padding-bottom: 20px;
                      "
                    >
                      弊社は社内外で使えるスマホアプリの開発や、AIを活用した業務効率化支援などを行っている会社です。<br />
                      ご依頼やご相談は会社HPからもお気軽にご相談ください。
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background-color: #f8f8f8"
            class="container"
          >
            <tr>
              <td style="padding: 30px" class="content-padding">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td
                      style="font-size: 15px; line-height: 1.8; color: #1a2e4a"
                    >
                      <strong>エイジラボ株式会社</strong>　<a
                        href="https://age-lab.jp/"
                        style="color: #4a90e2; text-decoration: none"
                        >（会社HP）</a
                      ><br />
                      担当：取締役COO　小林　周<br />
                      電話番号：<a
                        href="tel:090-9956-7565"
                        style="color: #4a90e2; text-decoration: none"
                        >090-9956-7565</a
                      ><br />
                      メール：<a
                        href="mailto:amane.kobayashi@age-lab.jp"
                        style="color: #4a90e2; text-decoration: none"
                        >amane.kobayashi@age-lab.jp</a
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <img
      src="${pixelUrl}"
      width="1"
      height="1"
      style="display: none"
      alt=""
    />
  </body>
</html>`.trim();
}
