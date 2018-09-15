const parentNode = document.querySelector(".content__body");
const articleNode = document.querySelector(".article__list");
const sectionButtonsNode = document.querySelector(".content__section__buttons");
const displayJSONNode = document.querySelector(".display__url");
const countryMenuNode = document.querySelector(".country");
const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

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
FORMAT DATA FOR ARTICLES
======================================================
*/

const articleTemplate = article => {
    const keys = Object.keys(article);
    // ["title", "description", "content"].forEach(function(key){
    //     const convertedText = (article[key] !== null) ? highlightFoundWords(article[key]) : "";
    //     article[key] = convertedText;
    // });
    const title = (article.title !== null) ? `<li><strong>${article.title}</strong></li>` : "";
    const convertedDescription = (article.description !== null) ? highlightFoundWords(article.description) : null;
    const description = (article.description !== null) ? `<li>${convertedDescription}</li>` : "";
    const content = (article.content !== null) ? `<li>${article.content}</li>` : "";
    const author = (article.author !== null) ? `<cite>Author: ${article.author}</cite>` : "";
    const source = (article.source.name !== null) ? `<cite>Source: ${article.source.name}</cite>` : "";
    const url = (article.url !== null) ? `<a href="${article.url}" target="_blank">READ FULL STORY</a>` : "";
    const urlToImage = (article.urlToImage !== null) ? `<a href="${article.url}" target="_blank"><img src="${article.urlToImage}" class="article__image__src"></a>` : "";
    return `
    <div>
        <span class="article__header">
            <a href="${url}" target="_blank">${article.title}</a>
        </span>
    </div>
    <div class="article__main">
        <div class="article__image">
            ${urlToImage}
        </div>
        <div class="article__text">
            <ul>
                <li>${title}</li>
                <li>${description}</li>
                <li>${content}</li>
                <li>${author}</li>
                <li>${source}</li>
                <li>${url}</li>
            </ul>
        </div>
    </div>
    `;
}

/* //////////////////////////
// DISPLAY DATA
///////////////////////////*/

function displayDataOnPage(body, url) {
    articleNode.innerHTML = "";
    displaySearchMessage(url);
    body.articles.forEach(function(article) {
        const node = document.createElement("li");
        node.innerHTML = articleTemplate(article);
        articleNode.appendChild(node);
    });
    displayJSONNode.innerHTML = `<a href="${url}" target="_blank">View JSON</a>`;
}

/* /////////////////////
CREATE MENU AND BUTTONS
//////////////////////*/

const createCountriesMenu = function() {
    const menuNode = document.createElement("select");
    menuNode.innerHTML = getCountries().join("");
    countryMenuNode.appendChild(menuNode);
    countryMenuNode.addEventListener('change', function(event){
        event.preventDefault();
        const countryURL = queryAPI("top-headlines", event.target.value, "", "");
        loadAPI(countryURL);
    });
}

/* ///////////////////////////////////
CREATE QUERIES
////////////////////////////////////*/

let bodyURL = "";
const newsURL = "https://newsapi.org/v2/";
const apiKey = "756ef978eb384d9cb3ecdab2d9bac0da";

const queryAPI = function (type, country="", category="", search="") {
    let validCountry = country ? `country=${country}&` : "";
    let validCategory = category ? `category=${category}&` : "";
    let validSearch = search ? `q=${search}&` : "";
    bodyURL = `${newsURL}${type}?${validCountry}${validCategory}${validSearch}apiKey=${apiKey}`;
    return bodyURL;
}

const displayErrorToUser = error => console.log(error);

createCountriesMenu();
loadAPI(queryAPI("everything", "", "", "Donald+Trump"));

/* ///////////////////////////////////
NAVIGATION SEARCH AND BUTTONS
////////////////////////////////////*/

const navBar = document.querySelector(".content__nav");
const navButton = document.querySelector(".header__nav__button");
const navSections = document.querySelector(".header__nav__sections a");
const navSearch = document.querySelector(".search");

// search from top nav
navButton.addEventListener("click", function(event){
    event.preventDefault();
    let searchQuery = navSearch.value.split(" ").join("+");
    loadAPI(queryAPI("everything", "", "", searchQuery));
});

// display "search results for:"
const displaySearchMessage = function(url) {
    if (url.indexOf("everything?") >= 0) {
        const searchNode = document.createElement("li");
        searchNode.innerHTML = `Your search results for: "<span class="highlighted">${convertedSearchArray(url).join(" ")}</span>"`;
        articleNode.appendChild(searchNode);
    } else {
        if (typeof searchNode === "object") searchNode.innerHTML = "";
    }
}

// convert the URL from search results to an array
const convertedSearchArray = function (url) {
    let regex = /\A?q=[^&]*/g;
    const found = url.match(regex).toString();
    return found.split("=")[1].split("+");
}

Array.prototype.intersect = function(secondArray) {
    return this.filter(function(item) {
        return (secondArray.indexOf(item) != -1);
    });
}

// highlight found search terms
const highlightFoundWords = function (descriptionText) {
    if (bodyURL.indexOf("everything?") >= 0) {
        const searchResultsArray = convertedSearchArray(bodyURL);
        const updatedWords = descriptionText.split(" ").map(function(item){
            const found = searchResultsArray.find(function(searchItem) {
                return searchItem === item;
            });
            return found !== undefined ? `<span class="highlighted">${found}</span>` : item;
        });
        return updatedWords.join(" ");
    } else {
        return descriptionText;
    }
}

// collapse main nav
let state = 1;
navSections.addEventListener("click", function(event){
    event.preventDefault();
    navBar.style.display = state ? "flex" : "none";
    navSearchIcon = state ? "x" : "+";
    navSections.innerHTML = `${navSearchIcon}`;
    state = !state;
});

// documentation: 
// https://newsapi.org/sources
// https://newsapi.org/docs
// https://newsapi.org/docs/get-started
// everything: https://newsapi.org/docs/endpoints/everything
