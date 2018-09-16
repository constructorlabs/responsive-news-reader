//cd79c8caed5c47f4ae25ec30f7cca674 is API key

//Functions to update page when the load more button is pressed and create url to be fetched. (PAGE NUMBER NOT UPDATING)

function updatePageNumber(button, number) {
    button.addEventListener("click", function (event){
        console.log("click");
        number ++;
    }) 
    console.log(number);
    return number;
};


function createNewsUrl() {
    const loadMoreButton = document.querySelector("button");
    let defaultUrl = "https://newsapi.org/v2/everything?q=gb&apiKey=cd79c8caed5c47f4ae25ec30f7cca674&page=";
    let funPageNumber = 1;
    funPageNumber = updatePageNumber(loadMoreButton, funPageNumber);
    console.log(funPageNumber);
    newsUrl = defaultUrl + funPageNumber;
    return newsUrl;
};
 
newsApiUrl = createNewsUrl();

//Fetches news API
    fetch(newsApiUrl)
        .then(response => {
            console.log("promise has been resolved")
            return response.json();
        }) 
        .then(body => {
            // pullNewsObject(body);
            createNewsContent(body);
        });


// Exploratory function to examin keys in news JSON object.

function pullNewsObject(news) {
    console.log(news);
    news.articles.forEach(article => {
        console.log(article);
    })
};


//Create .innerHTML of each news article div.

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

//Appends each div to the content container.

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


