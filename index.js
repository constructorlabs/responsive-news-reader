// documentation: 
// https://newsapi.org/docs
// https://newsapi.org/docs/get-started
// everything: https://newsapi.org/docs/endpoints/everything


const parentNode = document.querySelector(".content__body");
const articleNode = document.querySelector(".article__list");
const sectionButtonsNode = document.querySelector(".content__section__buttons");
const displayJSON = document.querySelector(".display-url");

// const topUSHeadlinesURL = newsURL + sectionHeadlines + "?" + queryCountry + apiKey;
// const bbcNewsURL = newsURL + sectionEverything + "?" + querySources + apiKey;
// const sectionHeadlines = "top-headlines";
// const sectionHeadlines = "top-headlines";
// const querySources = "sources=bbc-news&"; // choose sources
// const queryCountry = "country=us&"; // choose country (UK)
// const querySubject = "q=bitcoin"; // choose subject

const loadAPI = function (url) {
    fetch(url) 
    .then(function(response) {
        return response.json();
    })
    .then(function(body) {
        displayDataOnPage(body, url);
    })
    .catch(function(error) {
        displayErrorToUser(error);
    });
}

const articleTemplate = article => {
    const description = (article.description !== null) ? `<li>${article.description}</li>` : "";
    const content = (article.content !== null) ? `<li>${article.content}</li>` : "";
    const author = (article.author !== null) ? `<li><cite>Author: ${article.author}</cite></li>` : "";
    return `
    <div>
        <span class="article__header">
            <a href="${article.url}" target="_blank">${article.source.name}</a>
        </span>
    </div>
    <div class="article__main">
        <div class="article__image">
            <a href="${article.url}" target="_blank"><img src="${article.urlToImage}" class="article__image"></a>
        </div>
        <div class="article__text">
            <ul>
                <li><strong>${article.title}</strong></li>
                <li>${article.description}</li>
                ${description}
                ${content}
                ${author}
            </ul>
        </div>
    </div>
    `;
}

function displayDataOnPage(body, url) {
    articleNode.innerHTML = "";
    body.articles.forEach(function(article) {
        const node = document.createElement("li");
        node.innerHTML = articleTemplate(article)
        articleNode.appendChild(node);
    });
    displayJSON.innerHTML = `View JSON: <a href="${url}" target="_blank">${url}</a>`;
}

const createSectionButton = function (url, title){
    let buttonNode = document.createElement("button");
    buttonNode.innerHTML = title;
    sectionButtonsNode.appendChild(buttonNode);
    buttonNode.addEventListener('click', function(event){
        event.preventDefault();
        loadAPI(url);
    });
}

const newsURL = "https://newsapi.org/v2/";
const apiKey = "756ef978eb384d9cb3ecdab2d9bac0da";

const queryHeadlines = function (country) {
    const url = `${newsURL}top-headlines?country=${country}&apiKey=${apiKey}`;
    console.log(url);
    return url;
}
const queryEverything = function (subject) {
    const url = `${newsURL}everything?q=${subject}&apiKey=${apiKey}`;
    console.log(url);
    return url;
}

const headlinesUS = queryHeadlines("us");
createSectionButton(headlinesUS, "US Headlines");

const ukMusic = queryEverything("music");
createSectionButton(ukMusic, "Music UK");


const displayErrorToUser = error => console.log(error);

loadAPI(ukMusic)
// loadAPI("https://newsapi.org/v2/everything?sources=bbc-news&apiKey=756ef978eb384d9cb3ecdab2d9bac0da");

/*
======================================================
*/

const navButton = document.querySelector(".header__nav-button")
const navBar = document.querySelector(".content__nav");
let state = 1;

navButton.addEventListener("click", function(event){
    event.preventDefault();
    navBar.style.display = state ? "flex" : "none";
    navButtonIcon = state ? "x" : "+";
    navButton.innerHTML = `<a href="#">${navButtonIcon}</a>`;
    state = !state;
});


    // source: {
    //     id: null,
    //     name: "Birminghammail.co.uk"
    //     },
    //     author: "James Rodger",
    //     title: "This is why your Wetherspoons food AND drink order is set to get more expensive",
    //     description: "Profit before tax was up 4.3% to £107.2 million, the group's highest profit in its 39-year history",
    //     url: "https://www.birminghammail.co.uk/whats-on/food-drink-news/your-wetherspoons-food-drink-order-15151668",
    //     urlToImage: "https://i2-prod.walesonline.co.uk/incoming/article14267365.ece/ALTERNATES/s1200/1_2jpeg.jpg",
    //     publishedAt: "2018-09-14T11:26:20Z",
    //     content: "JD Wetherspoon's profits..."
