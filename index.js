// elements avilable on page
const mainNode = document.querySelector("main");
const switchLanguageButton = document.querySelector("#switch-languages");
const loadNextPageButton = document.querySelector("#load-next-page");
const submitSearchButton = document.querySelector("#search");

// Global variabel defaults to pass into API.
let language = "en";
var searchTerm = "UK";
var pageSize = 10;

// Breaking out API object to display
function displayDataOnPage(newsStories) {
  console.log(newsStories);
  const articlesArr = newsStories.articles;
  const articleKeys = Object.keys(articlesArr[0]);
  //console.log(articleKeys);
  articlesArr.forEach(function(article) {
    //  console.log(article.title);
    //  trigger the creation of a story for each node
    createStory(article);
  });
}
// Show if error with API call
function displayErrorToUser(error) {
  createStory(error);
}

//Create story componenets
const createTitle = function(title, url) {
  return `<a href="${url}"><h2>${title}</h2></a>`;
};

const createImg = function(image) {
  return `<img src="${image}">`;
};

const createDescription = function(description) {
  return `<p>${description}</p>`;
};

const createTimeCountry = function(time, country) {
  let currentDateTime = new Date();
  return `<p>${time} | ${country}</p>`;
};
//Assemble story componenets
const createStory = function(article, className = "story") {
  const node = document.createElement("div");
  const storyHTML = `<div class="article-img"><a href="${
    article.url
  }">${createImg(
    article.urlToImage
  )}</a></div><div class="article-text">${createTitle(
    article.title,
    article.url
  )}
  ${createDescription(article.description)}${createTimeCountry(
    article.publishedAt,
    article.country
  )}</div>`;
  node.className = className;
  node.innerHTML = storyHTML;
  mainNode.appendChild(node);
  //console.log(storyHTML);
};

// fetch news api
const loadAPI = function(language, searchTerm, pageSize) {
  mainNode.innerHTML = "";

  fetch(
    `https://newsapi.org/v2/everything?q=${searchTerm}&pageSize=${pageSize}&language=${language}&domains
=bbc.co.uk&apiKey=ca8681b5ce9447468962c7f40280c85f`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(body) {
      displayDataOnPage(body);
    })
    .catch(function(error) {
      displayErrorToUser(error);
    });
};

//// Features that happen on event listen

//Switch the language
switchLanguageButton.addEventListener("click", function(event) {
  let currentLanguage = "en";
  if (currentLanguage === "en") {
    currentLanguage = "es";
  }

  if (currentLanguage === "es") {
    currentLanguage = "en";
  }

  console.log(currentLanguage);
  language = currentLanguage;
  loadAPI(language, searchTerm, pageSize);
});

// load in 10 more results
loadNextPageButton.addEventListener("click", function(event) {
  console.log("Loading more results");
});

// submit a search query to the API
submitSearchButton.addEventListener("submit", function(event) {
  console.log("Search submited");
  console.log(event);
});
