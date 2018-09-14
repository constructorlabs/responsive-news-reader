//cd79c8caed5c47f4ae25ec30f7cca674 is API key

const topHeadlinesUS = `https://newsapi.org/v2/top-headlines?country=us&apiKey=cd79c8caed5c47f4ae25ec30f7cca674`;
const topHeadlinesUK = `https://newsapi.org/v2/top-headlines?country=gb&apiKey=cd79c8caed5c47f4ae25ec30f7cca674`;
const topHeadlinesBrexit = `https://newsapi.org/v2/top-headlines?country=gb&q=brexit&apiKey=cd79c8caed5c47f4ae25ec30f7cca674`;


function pullNewsObject(news) {
    console.log(news);
    news.articles.forEach(article => {
        console.log(article);
    })
};


function articleTemplate (article) {
    let authorVar = "";
    let sourceVar = "";
    (article.author === null) ? authorVar = "" : authorVar = article.author;
    (article.source.name === null) ? sourceVar = "" : sourceVar = article.source.name;
    return `
    <h2 class="article_title">${article.title}</h2>
    <div class="image_container"><img class="article_image" src="${article.urlToImage}"></div>
    <p class="article_content">${article.content}</p>
    <ul class="article_author_source_list">
        <li class="author_item">${authorVar}</li>
        <li class="source_item">${sourceVar}</li>
    </ul>
    <a class="article_link" href="${article.url}">Full article available here</a>
    `
}

function createNewsContent(news) {
    news.articles.forEach(item => {
        if (item.content !== null && item.source.name !== "Bloomberg") {
            const contentBody = document.querySelector(".content");
            const articleBox = document.createElement("div");
            articleBox.className = "article_box";
            articleBox.innerHTML = articleTemplate(item) 
            contentBody.append(articleBox);
        }
    })
}


fetch(topHeadlinesUK)
    .then(response => {
        console.log("promise has been resolved")
        return response.json();
    }) 
    .then(body => {
        // pullNewsObject(body);
        createNewsContent(body);
    });
