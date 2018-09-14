const parentNode = document.querySelector(".content__body");
const articleNode = document.querySelector(".article__list");
const sectionButtonsNode = document.querySelector(".content__section__buttons");
const displayJSONNode = document.querySelector(".display__url");
const countryMenuNode = document.querySelector(".country");

/*
======================================================
FETCH DATA
======================================================
*/

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

/*
======================================================
FETCH DATA FOR ARTICLES
======================================================
*/

const articleTemplate = article => {
    const title = (article.title !== null) ? `<li><strong>${article.title}</strong></li>` : "";
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
                ${title}
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
    displayJSONNode.innerHTML = `View JSON: <a href="${url}" target="_blank">${url}</a>`;
}

/*
CREATE MENU AND BUTTONS
*/

const createCountriesMenu = function() {
    const menuNode = document.createElement("select");
    menuNode.innerHTML = getCountries();
    countryMenuNode.appendChild(menuNode);
    countryMenuNode.addEventListener('change', function(event){
        event.preventDefault();
        const countryURL = queryHeadlines(event.target.value);
        loadAPI(countryURL);
    });
}

/*
CREATE QUERIES
*/

const newsURL = "https://newsapi.org/v2/";
const apiKey = "756ef978eb384d9cb3ecdab2d9bac0da";

const queryHeadlines = function (country, category="") {
    // categories are: business entertainment general health science sports technology
    let validCategory = category ? `&category=${category}` : "";
    return `${newsURL}top-headlines?country=${country}${validCategory}&apiKey=${apiKey}`;
}
const queryEverything = function (subject) {
    return `${newsURL}everything?q=${subject}&apiKey=${apiKey}`;
}

const displayErrorToUser = error => console.log(error);

createCountriesMenu();
loadAPI(queryHeadlines("gb"));

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

// const buttons = {
//     'top-headlines': ['category', 'country', 'q'],
//     'sources': ['language','country'],
//     'everything': ['q']
// }
// const createSectionButton = function (url, title){
//     let buttonNode = document.createElement("button");
//     buttonNode.innerHTML = title;
//     sectionButtonsNode.appendChild(buttonNode);
//     buttonNode.addEventListener('click', function(event){
//         event.preventDefault();
//         loadAPI(url);
//     });
// }

// const headlinesUS = queryHeadlines("us");
// createSectionButton(headlinesUS, "US Headlines");
// const ukMusic = queryEverything("music");
// createSectionButton(ukMusic, "Music UK");


// documentation: 
// https://newsapi.org/sources
// https://newsapi.org/docs
// https://newsapi.org/docs/get-started
// everything: https://newsapi.org/docs/endpoints/everything
