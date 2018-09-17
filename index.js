//cd79c8caed5c47f4ae25ec30f7cca674 is API key


//Defaults search term to UK news, page 1
let pageNumberGlobal = 1;
let searchResult = "uk";
upDateUrl(pageNumberGlobal, searchResult);
updateSideBarUrl(pageNumberGlobal);

//Increases page number by 1 everytime the load more button is pressed
const loadMoreButton = document.querySelector(".load_more_button");
loadMoreButton.addEventListener("click", function (event){
    pageNumberGlobal ++;
    upDateUrl(pageNumberGlobal, searchResult);
    updateSideBarUrl(pageNumberGlobal);
    });


//Creates and updates search term, defaults page number to 1
    let searchInput = document.querySelector(".search_form");
searchInput.addEventListener("submit", function(event){
    let searchContent = document.querySelector(".search_box").value;
    let previousArticles = document.querySelectorAll(".article_box");
    event.preventDefault();
    searchResult = searchContent;
    previousArticles.forEach(node => {
        node.parentNode.removeChild(node);
    });
    upDateUrl(1, searchResult);
});



//Updates search URL with search terms and page numbers
function upDateUrl(number, term) {
    let defaultUrlFirst = "https://newsapi.org/v2/everything?q=";
    let defaultUrlSecond = "&language=en&sortBy=publishedAt&apiKey=cd79c8caed5c47f4ae25ec30f7cca674&page="
    newsUrl = defaultUrlFirst + term + defaultUrlSecond + number;
    generateNews(newsUrl);
};
 

//Fetches news API
function generateNews(url) {
    fetch(url)
        .then(response => {
            // console.log("promise has been resolved")
            return response.json();
        }) 
        .then(body => {
            // pullNewsObject(body);
            createNewsContent(body);
        });
    }


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
    let imgVar = "";
    let textVar = "";
    (article.author === null) ? authorVar = "" : authorVar = article.author;
    (article.source.name === null) ? sourceVar = "" : sourceVar = article.source.name;
    (article.urlToImage === null) ? imgVar = "jc-gellidon-714673-unsplash.jpg" : imgVar = article.urlToImage;
    (article.description === null) ? textVar = article.content : textVar = article.description;
    return `
    <h2 class="article_title">${article.title}</h2>
    <div class="image_container"><img class="article_image" src="${imgVar}"></div>
    <p class="article_content">${textVar}</p>
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
            const contentBody = document.querySelector(".news_content");
            const articleBox = document.createElement("div");
            articleBox.className = "article_box";
            articleBox.innerHTML = articleTemplate(item) 
            contentBody.append(articleBox);
        }
    })
}

//Fetches items for the sidebar

function generateSideBar(url) {
    fetch(url)
        .then(response => {
            // console.log("promise has been resolved")
            return response.json();
        }) 
        .then(body => {
            // pullNewsObject(body);
            createSideBarContent(body);
        });
    }




//Adds more items to the sidebar as the page number for main article increases
function updateSideBarUrl(number) {
    let sidebarUrl = "https://newsapi.org/v2/everything?q=celebrity&q=hollywood&q=showbix&popculture&language=en&totalResults=10&sortBy=publishedAt&apiKey=cd79c8caed5c47f4ae25ec30f7cca674&page=";
    sidebarUrl = sidebarUrl + number;
    generateSideBar(sidebarUrl);
};


//Creates template for sidebar articles
function sideBarTemplate (article) {
    let authorVar = "";
    let sourceVar = "";
    (article.author === null) ? authorVar = "" : authorVar = article.author;
    (article.source.name === null) ? sourceVar = "" : sourceVar = article.source.name;
    return `
    <h2 class="sidebar_title">${article.title}</h2>
    <div class="sidebar_image_container"><img class="article_image" src="${article.urlToImage}"></div>
    <ul class="sidebar_source_list">
        <li class="sidebar_source_item">${sourceVar}</li>
    </ul>
    <a class="sidebar_link" href="${article.url}">Full article available here</a>
    `
}

//Appends all new content to sidebar

function createSideBarContent(news) {
    news.articles.forEach(item => {
        if (item.content !== null && item.source.name !== "Bloomberg") {
            const sideBar = document.querySelector(".news_sidebar");
            const featureBox = document.createElement("div");
            featureBox.className = "feature_box";
            featureBox.innerHTML = sideBarTemplate(item) 
            sideBar.append(featureBox);
        }
    })
}