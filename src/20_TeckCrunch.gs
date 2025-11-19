/*
TechCrunchのLatestから、記事のタイトルとURLを取得する
https://techcrunch.com/latest/
*/


// 記事の全文から、必要な情報を抽出する
function getTechCrunchLatest(htmlText) {
    // 記事の１要素を定義
    //loop-card loop-card--post-type-post loop-card--default loop-card--horizontal loop-card--wide loop-card--force-storyline-aspect-ratio loop-card--brief
    //wp-block-post post-3027848 post type-post status-publish format-standard has-post-thumbnail hentry category-artificial-intelligence category-tc tag-h20 tag-jensen-huang tag-nvidia
    const elementPatternStr = [
        '<li class=',
            '"wp-block-post post-[0-9]+ post type-post ',
            'status-publish format-standard has-post-thumbnail ',
            'hentry category-[^"]+"',
        '[^>]*>([\\s\\S]*?)</li>',   // 内側のli要素をキャプチャ
    ].join('');
    Logger.log(elementPatternStr);
    const elementPattern = new RegExp(elementPatternStr, 'g');

    // 記事のリストを検索
    const elementList = [...htmlText.matchAll(elementPattern)];
    if (elementList.length === 0) {
        Logger.log("記事が見つかりませんでした");
        return [];
    }
    Logger.log(`elementList-length: ${elementList.length}`);

    // 検索結果を１件ずつ中身を抽出
    const articleList = [];
    let i = 0;
    for (const element of elementList) {
        i++;
        Logger.log(`i: ${i}`);
        // li要素の中身(2つ目の検索結果)を渡す
        if (!element[1]) {
            Logger.log(`skipped article i: ${i} - no content`);
            continue;
        }
        const article = getTechCrunchOneArticle(element[1]);
        if (!article) {
            Logger.log(`skipped article i: ${i}`);
            continue;
        }
        //Logger.log(article);
        // 戻り値の配列へ格納
        // シートに出力する順番に格納する
        articleList.push([
            article.category,
            article.title,
            article.url,
            article.date,
        ]);
    }
    return articleList;
}

// getTechCrunchOneArticleのテスト
function testGetTechCrunchOneArticle() {
    const htmlText = `
<li class="wp-block-post post-3027691 post type-post status-publish format-standard has-post-thumbnail hentry category-security tag-cyberattack tag-cybersecurity tag-hackers tag-healthcare tag-ransomware tag-unitedhealth">
	<div class="wp-block-techcrunch-card wp-block-null">
	<div class="loop-card loop-card--post-type-post loop-card--default loop-card--horizontal loop-card--wide loop-card--force-storyline-aspect-ratio">
			<figure class="loop-card__figure">
			<img width="580" height="375" src="https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?w=580" class="attachment-card-block-16x9 size-card-block-16x9 wp-post-image" alt="a selection of X-ray scans of a human head" decoding="async" loading="lazy" srcset="https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg 1995w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=150,97 150w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=300,194 300w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=768,496 768w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=680,439 680w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=1200,775 1200w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=1280,827 1280w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=430,278 430w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=720,465 720w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=900,582 900w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=800,517 800w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=1536,992 1536w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=668,432 668w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=580,375 580w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=955,617 955w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=708,457 708w, https://techcrunch.com/wp-content/uploads/2024/11/medical-imagery-getty-scans.jpg?resize=50,32 50w" sizes="auto, (max-width: 580px) 100vw, 580px">		</figure>
	<div class="loop-card__content">
					<div class="loop-card__cat-group">
															<a data-destinationlink="https://techcrunch.com/category/security/" data-event="recirculation" data-module="Query" href="https://techcrunch.com/category/security/" class="loop-card__cat">Security</a>
												</div>
					<h3 class="loop-card__title">
				<a data-destinationlink="https://techcrunch.com/2025/07/14/episource-is-notifying-millions-of-people-that-their-health-data-was-stolen/" data-event="recirculation" data-module="Query" href="https://techcrunch.com/2025/07/14/episource-is-notifying-millions-of-people-that-their-health-data-was-stolen/" class="loop-card__title-link">Episource is notifying millions of people that their health data was stolen</a>
			</h3>
					<div class="loop-card__meta">
													<ul class="loop-card__meta-item loop-card__author-list">
													<li><a data-destinationlink="https://techcrunch.com/author/zack-whittaker/" data-event="recirculation" data-module="Query" class="loop-card__author" href="https://techcrunch.com/author/zack-whittaker/">Zack Whittaker</a></li>
											</ul>
																			<time datetime="2025-07-14T12:07:18-07:00" class="loop-card__meta-item loop-card__time wp-block-tc23-post-time-ago">
	6 hours ago</time>
																								</div>
			</div>
		</div>
</div>
	</li>
    `;
    const article = getTechCrunchOneArticle(htmlText);
    Logger.log(article);
}

// 記事の１要素から、必要な情報を抽出する
function getTechCrunchOneArticle(element, isDebug = false) {
    // 分野
    const categoryPattern = new RegExp(
        '<(a|span) [\\s\\S]*?class="loop-card__cat"[^>]*>([\\s\\S]*?)</(a|span)>'
    );
    const categoryResult = element.match(categoryPattern);
    if (!categoryResult) {
        Logger.log("分野が見つかりませんでした");
        if (isDebug) {
            Logger.log(`ELM:${element}`);
        }
        return;
    }
    const category = categoryResult[2];
    //Logger.log(category);

    // 記事URLとタイトル
    const titlePattern = new RegExp(
        [
            '<a [\\s\\S]*?',
            'href="([^"]+?)"[^>]*?',
            'class="loop-card__title-link"[^>]*?>',
            '([\\s\\S]*?)</a>'
        ].join('')
    );
    const titleResult = element.match(titlePattern);
    if (!titleResult) {
        Logger.log("URLが見つかりませんでした");
        if (isDebug) {
            Logger.log(`ELM:${element}`);
        }
        return;
    }
    const url = titleResult[1];
    const title = titleResult[2];
    //Logger.log(url);
    //Logger.log(title);

    // 日付
    const datePatternStr = [
        '<time [^>]*?',
        'datetime="([^"]+)" ',
        'class="loop-card__meta-item loop-card__time ',
        'wp-block-tc23-post-time-ago"[^>]*>',
        '[\\s\\S]*?</time>',
    ].join('');
    const datePattern = new RegExp(datePatternStr);
    const dateResult = element.match(datePattern);
    if (!dateResult) {
        Logger.log("日付が見つかりませんでした");
        if (isDebug) {
            Logger.log(`ELM:${element}`);
            Logger.log(datePatternStr);
        }
        return;
    }
    const date = dateResult[1];
    //Logger.log(date);

    return {
        category,
        url,
        title,
        date,
    };
}
