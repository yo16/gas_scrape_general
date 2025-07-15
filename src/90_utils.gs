
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

