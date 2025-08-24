/** ピクセルURL生成 **/
function _buildPixelUrl(rid, mid) {
  const props = PropertiesService.getScriptProperties();
  const webAppUrl = props.getProperty("PIXEL_WEB_APP_URL");
  if (!webAppUrl) throw new Error("PIXEL_WEB_APP_URL is not set.");
  const cid = Utilities.getUuid();
  return `${webAppUrl}?rid=${encodeURIComponent(rid)}&mid=${encodeURIComponent(
    mid
  )}&cid=${encodeURIComponent(cid)}`;
}

/**
 * 送信本体：件名バリアント subjectKey ('A' | 'B' | 'C') を指定
 * どれで送ったかは「件名」列に A/B/C を出力（送信した行のみ）。
 */
function sendEmailsInSpecifiedRangeUI(
  sheet,
  startRow,
  endRow,
  excludeSent,
  subjectKey
) {
  // ヘッダー（2行目）取得
  const headers = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
  const columnMap = {};
  headers.forEach((name, index) => (columnMap[name] = index + 1)); // 1-based

  // 必須列
  const colEmail = columnMap["メールアドレス"];
  const colSendFlag = columnMap["送信可否"]; // 判定用
  const colHtmlResult = columnMap["HTML送信結果"]; // 結果記録先
  const colCompany = columnMap["会社名"]; // 差し込み用
  const colRid = columnMap["RID"]; // 必須
  const colSubjectMark = columnMap["件名"]; // ★A/B/C を記録

  if (!colEmail)
    throw new Error("必須ヘッダー『メールアドレス』が見つからない。");
  if (!colSendFlag) throw new Error("必須ヘッダー『送信可否』が見つからない。");
  if (!colHtmlResult)
    throw new Error("必須ヘッダー『HTML送信結果』が見つからない。");
  if (!colRid) throw new Error("必須ヘッダー『RID』が見つからない。");
  if (!colSubjectMark) throw new Error("必須ヘッダー『件名』が見つからない。");

  const subject = getMailSubjectByKey(subjectKey);
  const subjectLetter = String(subjectKey || "A").toUpperCase();

  for (let row = startRow; row <= endRow; row++) {
    const sendFlag = String(
      sheet.getRange(row, colSendFlag).getValue() || ""
    ).trim();

    // 空白以外はすべてスキップ扱い（理由を結果列に転記）
    if (sendFlag !== "") {
      sheet.getRange(row, colHtmlResult).setValue(sendFlag);
      continue;
    }

    // 空白 → 送信対象
    const email = String(sheet.getRange(row, colEmail).getValue() || "").trim();
    if (!/@/.test(email)) {
      sheet.getRange(row, colHtmlResult).setValue("スキップ（メール不正）");
      continue;
    }

    const companyName = colCompany
      ? String(sheet.getRange(row, colCompany).getValue() || "")
      : "";

    // RIDセル：空ならUUID採番
    let rid = String(sheet.getRange(row, colRid).getValue() || "").trim();
    if (!rid) {
      rid = Utilities.getUuid();
      sheet.getRange(row, colRid).setValue(rid);
    }

    // メールID：日時＋行番号
    const mid = `mail_${Utilities.formatDate(
      new Date(),
      "Asia/Tokyo",
      "yyyyMMddHHmmss"
    )}_${row}`;
    const pixelUrl = _buildPixelUrl(rid, mid);

    // 本文
    const textFallback = "HTMLメールをご確認ください。";
    const htmlBody = buildMailHtml(companyName, pixelUrl, subjectKey);

    try {
      GmailApp.sendEmail(email, subject, textFallback, {
        name: "エイジラボ株式会社",
        from: "genba-chi@age-lab.jp", // 送信元アドレス
        htmlBody,
      });
      // 成功：結果と件名(A/B/C)を記録
      sheet.getRange(row, colHtmlResult).setValue("送信済み");
      sheet.getRange(row, colSubjectMark).setValue(subjectLetter);
    } catch (err) {
      sheet.getRange(row, colHtmlResult).setValue("送信失敗");
      // 失敗時は「件名」列は空のままにしておく（必要なら 'X' 等にしてもよい）
      Logger.log(`送信失敗: 行${row} → ${email} / ${err}`);
    }
  }
}

/** バッチ実行：キーを指定して送る（UIから呼ぶ想定） */
function sendEmailsBatchWithSubject(subjectKey) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("テスト");
  const { startRow, endRow, currentRow } = getBatchContext("send");

  const BATCH_SIZE = 500;
  const batchEnd = Math.min(currentRow + BATCH_SIZE - 1, endRow);

  // excludeSent は従前の運用に合わせるなら false でOK（「送信可否」列で判定しているため）
  sendEmailsInSpecifiedRangeUI(sheet, currentRow, batchEnd, false, subjectKey);

  const nextRow = batchEnd + 1;
  if (nextRow <= endRow) {
    updateCurrentRow("send", nextRow);
    scheduleNextSendBatch(); // ※必要なら subjectKey を保持する実装に変更可
  } else {
    clearBatchContext("send");
  }
}
