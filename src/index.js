/* ======================================================
DEFINE NODES */

const parentNode = document.querySelector(".content__body");
const articleNode = document.querySelector(".article__list");
const sectionButtonsNode = document.querySelector(".content__section__buttons");
const displayJSONNode = document.querySelector(".content__footer");
const countryMenuNode = document.querySelector(".country");
const categoriesMenuNode = document.querySelector(".category");
const categories = ["", "business", "entertainment", "general", "health", "science", "sports", "technology"];

/* ======================================================
FETCH DATA */

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

/* ======================================================
FORMAT AND DISPLAY ARTICLES */

const articleTemplate = article => {
    const convertedTitle = (article.title !== null) ? highlightFoundWords(article.title) : null;
    const title = (article.title !== null) ? `<div><strong>${convertedTitle}</strong></div>` : "";
    const convertedDescription = (article.description !== null) ? highlightFoundWords(article.description) : null;
    const description = (article.description !== null) ? `<div>${convertedDescription}</div>` : "";
    // const content = (article.content !== null) ? `<div>${article.content}</div>` : "";
    const author = (article.author !== null) ? `${article.author}` : "";
    const source = (article.source.name !== null) ? `${article.source.name}` : "";
    const separator = (author && source) ? ", " : "";
    const publishedBy = `<div><cite>Published by: ${author}${separator}${source}</cite></div>`;
    const readMoreURL = (article.url !== null) ? `<div><a href="${article.url}" target="_blank">READ FULL STORY...</a></div>` : "";
    // const urlToImage = (article.urlToImage !== null) ? `<a href="${article.url}" target="_blank"><img src="${article.urlToImage}" class="article__image__src"></a>` : "";
    const urlToImage = (article.urlToImage !== null) ? `<a href="${article.url}" target="_blank" style="background-image:url(${article.urlToImage});" class="article__image__src"></a>` : "";
    const publishedAt = (article.publishedAt !== null) ? `Time: ${convertDate(article.publishedAt)}` : "";
    return `
    <div class="article__main">
        <div class="article__image">
            ${urlToImage}
        </div>
        <div>
            <span class="article__header">
                <a href="${article.url}" target="_blank">${title}</a>
            </span>
        </div>
        <div class="article__text">
                ${description}
                ${publishedBy}
                ${publishedAt}
                ${readMoreURL}
        </div>
    </div>
    `;
}


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

/* /////////////////////////////////////////////////////////////////
CREATE MENUS */

const createCountriesMenu = function() {
    const menuNode = document.createElement("select");
    menuNode.innerHTML = getCountries().join("");
    countryMenuNode.appendChild(menuNode);
    countryMenuNode.addEventListener('change', function(event){
        event.preventDefault();
        categoriesMenuNode[0].selectedIndex = 0;
        const url = queryAPI("top-headlines", event.target.value, "", "");
        loadAPI(url);
    });
}

const createCategoriesMenu = function() {
    const menuNode = document.createElement("select");
    menuNode.innerHTML = getCategories().join("");
    categoriesMenuNode.appendChild(menuNode);
    categoriesMenuNode.addEventListener('change', function(event){
        event.preventDefault();
        const url = queryAPI("top-headlines", "", event.target.value, "");
        countryMenuNode[0].selectedIndex = 0;
        loadAPI(url);
    });
}

const getCountries = function () {
    return Object.keys(countries).map(function(key){
        return `<option value="${key}">${countries[key]}</option>\n`;
    });
}

const getCategories = function () {
    return categories.map(function(item){
        return `<option value="${item}">${item}</option>\n`;
    });
}

/* ////////////////////////////////////////////////////////////////////
QUERYING */

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

const displayErrorToUser = error => articleNode.innerHTML = error;

/* /////////////////////////////////////////////////////////////////
SEARCH FUNCTIONALITY */

const navBar = document.querySelector(".content__nav");
const navButton = document.querySelector(".header__nav__button");
const navSearch = document.querySelector(".search");
const searchFormNode = document.querySelector(".header__form");
const messageNode = document.querySelector(".content__message__wrapper");
const imageDisplayNode = document.querySelector(".nav__image__display");

// search from top nav - click search button for results
searchFormNode.addEventListener("submit", function(event){
    event.preventDefault();
    let searchQuery = navSearch.value.split(" ").join("+");
    loadAPI(queryAPI("everything", "", "", searchQuery));
});

// load search results from 'submit' event
navSearch.addEventListener("submit", function(event){
    event.preventDefault();
    // console.log(111);
    // countryMenuNode[0].selectedIndex = 0;
    // categoriesMenuNode[0].selectedIndex = 0;
    let searchQuery = navSearch.value.split(" ").join("+");
    loadAPI(queryAPI("everything", "", "", searchQuery));
});

// toggle show / hide images
imageDisplayNode.addEventListener("change", function(event){
    event.preventDefault();    
    state = event.target.checked ? "block" : "none";
    const articleNodes = document.querySelectorAll("div.article__image");
    articleNodes.forEach(img => img.style.display = state);
});

// display message "search results for:"
const displaySearchMessage = function(url) {
    messageNode.style.display = "none";
    messageNode.innerHTML = "";
    if (url.indexOf("everything?") >= 0) {
        const searchNode = document.createElement("div");
        searchNode.innerHTML = `Search results &gt; "<span class="highlighted">${convertedSearchArray(url).join(" ")}</span>"`;
        messageNode.style.display = "block";
        messageNode.appendChild(searchNode);
    } else {
        if (typeof searchNode === "object") searchNode.innerHTML = "";
    }
}

// convert search results URL into an array
const convertedSearchArray = function (url) {
    let regex = /\A?q=[^&]*/g;
    const found = url.match(regex).toString();
    return found.split("=")[1].split("+");
}

const highlightFoundWords = function (descriptionText) {
    if (bodyURL.indexOf("everything?") >= 0) {
        const searchResultsArray = convertedSearchArray(bodyURL);
        const descriptionArray = descriptionText.split(" ")
        const updatedWords = searchForMatches(descriptionArray, searchResultsArray);
        return updatedWords.join(" ");
    } else {
        return descriptionText;
    }
}

const searchForMatches = function(haystackArray, needleArray) {
    const output = haystackArray.map(function(hay){
        const found = needleArray.find(needle => hay.includes(needle));
        return found ? `<span class="highlighted">${hay}</span>` : hay;
    });
    return output;
}

const convertDate = function (string) {
    const date = new Date(string);
    const formatTime = n => n <10 ? "0" + n : n;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}, ${date.getDate()} ${ months[date.getMonth()]} ${date.getFullYear()}`
}

/* /////////////////////////////////////////////////////////////////
INITIALIZE FIRST PAGE */
createCountriesMenu();
createCategoriesMenu();
loadAPI(queryAPI("everything", "", "", "London+travel"));
