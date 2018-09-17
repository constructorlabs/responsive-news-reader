// elements avilable on page
const mainNode = document.querySelector("main");
const switchLanguageButton = document.querySelector("#switch-languages");
const loadNextPageButton = document.querySelector("#load-next-page");
const submitSearchButton = document.querySelector("#search-button");
const formNode = document.querySelector("footer form");
const searchInput = document.querySelector("#search-field");
const searchResults = document.querySelector(".search-results");

// Breaking out API object to display
function displayDataOnPage(newsStories) {
  //console.log(newsStories);
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
  let currentDateTime = Date.now();
  //console.log(time);
  let jsTime = new Date(time);

  let articleTimestamp = jsTime.getTime();
  timeDifference = currentDateTime - articleTimestamp;
  //console.log(timeDifference);
  time = timeDifference / 1000 / 60 / 60 / 24;
  //console.log(time);
  return `<p>${time.toFixed(0)} days ago | ${country}</p>`;
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

// Global variabel defaults to pass into API.
let language = "en";
let searchTerm = "";
let pageSize = 10;

// fetch news api
const loadAPI = function(language, searchTerm, pageSize) {
  mainNode.innerHTML = "";
  console.log(language, searchTerm, pageSize);
  fetch(
    `https://newsapi.org/v2/everything?q=${searchTerm}&pageSize=${pageSize}&language=${language}&sortBy=popularity&domains=bbc.co.uk,lemonde.fr,guardian.com,nytimes.com,sina.com.cn&apiKey=ca8681b5ce9447468962c7f40280c85f`
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
  //console.log(event);
  //console.log(language);
  //console.log(typeof language);
  if (language === "en") {
    language = "fr";
  } else if (language === "fr") {
    language = "en";
  }

  //console.log(language);
  loadAPI(language, searchTerm, pageSize);
});

// load in 10 more results
loadNextPageButton.addEventListener("click", function(event) {
  //console.log(event);
  //console.log(pageSize);
  pageSize = pageSize + 10;
  loadAPI(language, searchTerm, pageSize);
});

// submit a search query to the API
submitSearchButton.addEventListener("sumbit", function(event) {
  console.log("form submitted");
  console.log(event.target);
  searchText = searchInput.value;
  console.log(searchText);
  // let searchResut = searchInput;
  searchTerm = searchText;
  loadAPI(language, searchTerm, pageSize);
});

loadAPI(language, searchTerm, pageSize);
