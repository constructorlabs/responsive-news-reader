// documentation: 
// https://newsapi.org/docs
// https://newsapi.org/docs/get-started
// everything: https://newsapi.org/docs/endpoints/everything

const newsURL = "https://newsapi.org/v2/";
const sectionEverything = "everything";
const sectionHeadlines = "top-headlines";
const querySources = "sources=bbc-news&"; // choose sources
const queryCountry = "country=us&"; // choose country (UK)
const querySubject = "q=bitcoin"; // choose subject
const apiKey = "apiKey=756ef978eb384d9cb3ecdab2d9bac0da";

const topUKHeadlinesURL = newsURL + sectionHeadlines + "?" + queryCountry + apiKey;
const bbcNewsURL = newsURL + sectionEverything + "?" + querySources + apiKey;
const newsApiURL = topUKHeadlinesURL;

const loadAPI = function () {
    fetch(newsApiURL) 
    .then(function(response) {
        return response.json();
    })
    .then(function(body) {
        displayDataOnPage(body);
    })
    .catch(function(error) {
        displayErrorToUser(error);
    });
}

const articleTemplate = article => {
    return `
    <div>
        <span class="article__header"><a href="${article.source.name}" target="_blank">${article.source.name}</a></span>
    </div>
    <div>
        <span class="article__main">
            <ul>
                <li><strong>${article.title}</strong></li>
                <li>${article.description}</li>
                <li><cite>Author: ${article.author}</cite></li>
        </span>
    </div>
    `;
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

}

const parentNode = document.querySelector(".content__body");
const articleNode = document.querySelector(".article__list");

function displayDataOnPage(body) {
    const articleKeys = Object.keys(body.articles[0]);
    body.articles.forEach(function(article) {
        const node = document.createElement("li");
        node.innerHTML = articleTemplate(article)
        articleNode.appendChild(node);
    });
    const displayURL = document.querySelector(".display-url");
    displayURL.innerHTML = `View JSON: <a href="${newsApiURL}" target="_blank">${newsApiURL}</a>`;
}

const displayErrorToUser = error => console.log(error);

loadAPI();

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
