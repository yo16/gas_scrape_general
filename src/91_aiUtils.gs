// API key
const INITIAL_API_KEY = "";

// model
// gpt-4o-mini: $0.15/1M tokens
const CHAT_MODEL = "gpt-4o-mini";


// 初期設定
const OPENAI_API_KEY = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');

// ----------
// APIキーを設定する
// ソースにAPIキーを含めず、ScriptPropertiesに保存するためのメソッド
function setApiKey() {
    const apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
    if (!apiKey) {
        PropertiesService.getScriptProperties().setProperty('OPENAI_API_KEY', INITIAL_API_KEY);
    }
}
// APIキーの確認
function checkApiKey() {
    const apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
    if (!apiKey) {
        throw new Error('APIキーが設定されていません。');
    }
    Logger.log("APIキーが設定されています。");
    Logger.log(apiKey);
}


// html全体のページを要約する
function summarizePageByChatGPTAPI(htmlText) {
    const prompt = [
        "Please summarize the following HTML.",
        "Summarize the content of the HTML in about 50 English words.",
        "Write the summary in English.",
        "Summarize the content of the HTML.",
        "HTML:",
        htmlText,
    ].join('\n');
    Logger.log(prompt);

    // URL FetchでChatGPTのAPIを呼び出して要約を実行
    const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        payload: JSON.stringify(payload)
    });
    
    return response.text;
}
