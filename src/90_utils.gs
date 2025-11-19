// ページにアクセスして、htmlを取得
function getHtml(url) {
    // ヘッダーを設定
    // ユーザーエージェント(自分のブラウザの情報)を設定
    const options = {
        method: 'get',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
        },
        muteHttpExceptions: true
    };

    // ページを取得
    const response = UrlFetchApp.fetch(url, options);
    const htmlText = response.getContentText();
    return htmlText;
}


// シートに書き込み
function writeToSheet(recs, sheetName) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
        Logger.log("シートが見つかりませんでした");
        return;
    }

    // 全行書き込み
    writeToSheetAllIne(sheet, recs);
}

// 全行書き込み
function writeToSheetAllIne(sheet, recs) {
    const lastRow = sheet.getLastRow();
    for (let i = 0; i < recs.length; i++) {
        writeToSheetLine(sheet, lastRow + i + 1, recs[i]);
    }
}

// １行書き込み
function writeToSheetLine(sheet, lineNumber, rec) {
    // recが配列かどうか
    let recArray = [];
    let lastColumn = 1;
    if (!Array.isArray(rec)) {
        recArray = [rec];
    } else {
        recArray = rec;
        lastColumn = recArray.length;
    }

    const range = sheet.getRange(lineNumber, 1, 1, lastColumn);
    range.setValues([recArray]);
    //range.setValue([['a','b'], [1,2]]);
}


// 指定のシートの列の情報を元に、AIで要約する
function summarizePage(sheetName, urlColumn, summaryColumn, firstRow = 2) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    // summaryColumnが空の行に対して、AIで要約する
    const lastRow = sheet.getLastRow();
    for (let i = firstRow; i <= lastRow; i++) {
        Logger.log(`line i: ${i}`);
        // すでに要約済みかどうかを確認
        const alreadySummarized = sheet.getRange(i, summaryColumn).getValue();
        if (alreadySummarized) {
            // すでに要約済みなのでスキップ
            continue;
        }

        // URL列に書いてあるURLを取得
        const url = sheet.getRange(i, urlColumn).getValue();

        // ページにアクセスして、htmlを取得
        const htmlText = getHtml(url);
        // 要約する
        const summary = summarizePageByChatGPTAPI(htmlText);

        // シートへ出力
        sheet.getRange(i, summaryColumn).setValue(summary);
    }

    // 翻訳関数を設定する
    for (let i = firstRow; i <= lastRow; i++) {
        const sourceCellA1Notation = sheet.getRange(i, summaryColumn).getA1Notation();
        const translateFunction = sheet.getRange(i, summaryColumn)
            .getFormula(`=GOOGLETRANSLATE(${sourceCellA1Notation}, "en", "ja")`);
        Logger.log(`translateFunction: ${translateFunction}`);
    }
}

