// 件名キーの保管に使うプロパティ名
const PROP_SEND_SUBJECT_KEY = 'SEND_SUBJECT_KEY';

// タイマートリガーの受け口
function sendEmailsBatch() {
  const key = (PropertiesService.getScriptProperties()
               .getProperty(PROP_SEND_SUBJECT_KEY) || 'A').toUpperCase();
  sendEmailsBatchWithSubject(key);
}

// 次バッチをスケジューリング
function scheduleNextSendBatch() {
  const triggers = ScriptApp.getProjectTriggers();
  for (let trigger of triggers) {
    if (trigger.getHandlerFunction() === "sendEmailsBatch") {
      ScriptApp.deleteTrigger(trigger);
    }
  }
  ScriptApp.newTrigger("sendEmailsBatch")
    .timeBased()
    .after(1000)
    .create();
}

// プロパティにJSON形式で保存するときのキーを生成する
function _getContextKey(name) {
  return `BATCH_CONTEXT_${name.toUpperCase()}`;
}

// バッチ処理のコンテキスト（開始行、終了行、現在行）を保存
function saveBatchContext(name, startRow, endRow, currentRow) {
  const context = { startRow, endRow, currentRow };
  PropertiesService.getScriptProperties().setProperty(
    _getContextKey(name),
    JSON.stringify(context)
  );
}

// 保存されたバッチ処理のコンテキストを取得
function getBatchContext(name) {
  const saved = PropertiesService.getScriptProperties().getProperty(_getContextKey(name));
  return saved ? JSON.parse(saved) : null;
}


// subjectKey を受け取り、プロパティへ保存
function initSendBatch(startRow, endRow, subjectKey) {
  saveBatchContext("send", startRow, endRow, startRow);
  PropertiesService.getScriptProperties().setProperty(PROP_SEND_SUBJECT_KEY, String(subjectKey || 'A').toUpperCase());
  scheduleNextSendBatch();
}

// バッチ処理の現在行のみを更新
function updateCurrentRow(name, nextRow) {
  const context = getBatchContext(name);
  if (context) {
    context.currentRow = nextRow;
    PropertiesService.getScriptProperties().setProperty(
      _getContextKey(name),
      JSON.stringify(context)
    );
  }
}

// 指定されたコンテキストを削除
function clearBatchContext(name) {
  PropertiesService.getScriptProperties().deleteProperty(_getContextKey(name));
}

// 既存：UI起動
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📧 メール実行')
    .addItem('実行UIを開く', 'showExecutionDialog')
    .addToUi();
}

function showExecutionDialog() {
  const html = HtmlService.createHtmlOutputFromFile('実行メニューUI')
    .setWidth(500)
    .setHeight(560); // ちょい伸ばす
  SpreadsheetApp.getUi().showModalDialog(html, 'メール自動送信');
}
