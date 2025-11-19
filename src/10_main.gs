const SHEET_NAME_TECHCRUNCH = "TechCrunch";

function main() {
    // 対象のURLを設定
    const TARGET_URL = "https://techcrunch.com/latest/";

    // ページを取得
    const htmlText = getHtml(TARGET_URL);
    //writeToSheet(htmlText.split(/\r?\n/), "TechCrunch");

    // レスポンスをログに出力
    //Logger.log(htmlText);

    // ページ特有の情報を取得
    const articleList = getTechCrunchLatest(htmlText);
    //Logger.log(articleList);

    // シートへ出力
    writeToSheet(articleList, SHEET_NAME_TECHCRUNCH);

    // シートを読んで、１つずつAIで要約する
    summarizePages();
}

// シートを読んで、１つずつAIで要約する
function summarizePages() {
    const techCrunchUrlColumn = 3;
    const techCrunchSummaryColumn = 5;
    summarizePage(SHEET_NAME_TECHCRUNCH, techCrunchUrlColumn, techCrunchSummaryColumn);

}
