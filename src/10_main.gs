const SHEET_NAME_TECHCRUNCH = "TechCrunch";

function main() {
    // 対象のURLを設定
    const TARGET_URL = "https://techcrunch.com/latest/";

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
    const response = UrlFetchApp.fetch(TARGET_URL, options);
    const htmlText = response.getContentText();
    //writeToSheet(htmlText.split(/\r?\n/), "TechCrunch");

    // レスポンスをログに出力
    //Logger.log(htmlText);

    // ページ特有の情報を取得
    const articleList = getTechCrunchLatest(htmlText);
    //Logger.log(articleList);

    // シートへ出力
    writeToSheet(articleList, SHEET_NAME_TECHCRUNCH);
}

