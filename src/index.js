/* ======================================================
DEFINE NODES */

const parentNode = document.querySelector(".content__body");
const articleNode = document.querySelector(".article__list");
const sectionButtonsNode = document.querySelector(".content__section__buttons");
const displayJSONNode = document.querySelector(".content__footer");
const countryMenuNode = document.querySelector(".country");
const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

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
    const title = (article.title !== null) ? `<li><strong>${convertedTitle}</strong></li>` : "";
    const convertedDescription = (article.description !== null) ? highlightFoundWords(article.description) : null;
    const description = (article.description !== null) ? `<li>${convertedDescription}</li>` : "";
    // const content = (article.content !== null) ? `<li>${article.content}</li>` : "";
    const author = (article.author !== null) ? `${article.author}` : "";
    const source = (article.source.name !== null) ? `${article.source.name}` : "";
    const separator = (author && source) ? ", " : "";
    const publishedBy = `<li><cite>Published by: ${author}${separator}${source}</cite></li>`;
    const readMoreURL = (article.url !== null) ? `<li><a href="${article.url}" target="_blank">READ FULL STORY...</a></li>` : "";
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
            <ul>
                ${description}
                ${publishedBy}
                ${publishedAt}
                ${readMoreURL}
            </ul>
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
        const countryURL = queryAPI("top-headlines", event.target.value, "", "");
        loadAPI(countryURL);
    });
}

/* ////////////////////////////////////////////////////////////////////
QUERYING */

let bodyURL = "";
const newsURL = "https://newsapi.org/v2/";
const apiKey = "756ef978eb384d9cb3ecdab2d9bac0da";

const queryAPI = function (type, country="", category="", search="") {
    console.log("hi");
    let validCountry = country ? `country=${country}&` : "";
    let validCategory = category ? `category=${category}&` : "";
    let validSearch = search ? `q=${search}&` : "";
    bodyURL = `${newsURL}${type}?${validCountry}${validCategory}${validSearch}apiKey=${apiKey}`;
    return bodyURL;
}

const displayErrorToUser = error => articleNode.innerHTML = error;

createCountriesMenu();
loadAPI(queryAPI("everything", "", "", "Donald+Trump"));

/* /////////////////////////////////////////////////////////////////
SEARCH FUNCTIONALITY */

const navBar = document.querySelector(".content__nav");
const navButton = document.querySelector(".header__nav__button");
const navSearch = document.querySelector(".search");
const searchFormNode = document.querySelector(".header__form");
const messageNode = document.querySelector(".content___message");
// const navSections = document.querySelector(".header__nav__sections a");

// search from top nav - click search button for results
searchFormNode.addEventListener("submit", function(event){
    event.preventDefault();
    let searchQuery = navSearch.value.split(" ").join("+");
    loadAPI(queryAPI("everything", "", "", searchQuery));
});

// load search results from 'submit' event
navSearch.addEventListener("submit", function(event){
    event.preventDefault();
    let searchQuery = navSearch.value.split(" ").join("+");
    loadAPI(queryAPI("everything", "", "", searchQuery));
});

// display message "search results for:"
const displaySearchMessage = function(url) {
    if (url.indexOf("everything?") >= 0) {
        const searchNode = document.createElement("li");
        searchNode.innerHTML = `Your search results for: "<span class="highlighted">${convertedSearchArray(url).join(" ")}</span>"`;
        articleNode.appendChild(searchNode);
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

// highlight words from search query
// const highlightFoundWords = function (descriptionText) {
//     if (bodyURL.indexOf("everything?") >= 0) {
//         const searchResultsArray = convertedSearchArray(bodyURL);
//         const updatedWords = descriptionText.split(" ").map(function(item){
//             const found = searchResultsArray.find(function(searchItem) {
//                 return searchItem === item;
//             });
//             return found !== undefined ? `<span class="highlighted">${found}</span>` : item;
//         });
//         return updatedWords.join(" ");
//     } else {
//         return descriptionText;
//     }
// }

const highlightFoundWords = function (descriptionText) {
    if (bodyURL.indexOf("everything?") >= 0) {
        const searchResultsArray = convertedSearchArray(bodyURL);
        // const updatedWords = descriptionText.split(" ").map(function(hay){
        //     const found = searchResultsArray.find(needle => hay === needle);
        //     return found ? `<span class="highlighted">${hay}</span>` : hay;
        // });
        const descriptionArray = descriptionText.split(" ")
        const updatedWords = searchForMatches(descriptionArray, searchResultsArray);
        return updatedWords.join(" ");
    } else {
        return descriptionText;
    }
}

const searchForMatches = function(haystackArray, needleArray) {
    const output = haystackArray.map(function(hay){
        const found = needleArray.find(needle => hay === needle);
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