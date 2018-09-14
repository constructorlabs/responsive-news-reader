// documentation: 
// https://newsapi.org/docs
// https://newsapi.org/docs/get-started
// everything: https://newsapi.org/docs/endpoints/everything

const apiKey = "apiKey=756ef978eb384d9cb3ecdab2d9bac0da";
const newsURL = "https://newsapi.org/v2/";
const sectionEverything = "everything";
const sectionHeadlines = "top-headlines";
const querySources = "sources=bbc-news&"; // choose sources
const queryCountry = "country=gb&"; // choose country (UK)
const querySubject = "q=bitcoin"; // choose subject

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
        <bold>${article.title}</bold>
    </div>
    <div>
        ${article.source.name}
    </div>
    `;
}

const parentNode = document.querySelector(".content__body");
const articleNode = document.querySelector(".article__list");

function displayDataOnPage(body) {
    const articleKeys = Object.keys(body.articles[0]);

    body.articles.forEach(function(article) {
        const node = document.createElement("li");
        node.innerHTML = articleTemplate(article)
        articleNode.appendChild(node);



        // articleKeys.forEach(function(key) {
        //     // if (typeof article[key] === "object" && key === "source") {
        //     //     let articleDescription = `<a href="${article[key].name}" target="_blank">${article[key].name}</a>`;
        //     //     let articleKey = "";
        //     //     let className = "article-name";
        //     // } else {
        //     //     let articleDescription = `<span class="key">${key.toUpperCase()}</span><br>`;
        //     //     let articleKey = article[key];
        //     //     let className = "article-other-props";
        //     // }
            
        //     let articleKeyName = (typeof article[key] === "object" && key === "source") ? article[key].name : "";
        //     const articleDescription = key === "source" ? `<a href="${articleKeyName}" target="_blank">${articleKeyName}</a>` : article[key];
        //     //console.log(articleDescription)
        //     const outputString = `<span class="key">${key}</span><br><span class="description-text">${articleDescription}</span>`;
        //     const className = key === "source" ? "article-name" : "article-other-props";
        //     //node.innerHTML = outputString;
        //     node.className = className;
        // });
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
