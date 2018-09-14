const mainNode = document.querySelector("main");

function displayDataOnPage(newsStories) {
  const articlesArr = newsStories.articles;
  const articleKeys = Object.keys(articlesArr[0]);
  //console.log(articleKeys);
  articlesArr.forEach(function(article) {
    //  console.log(article.title);
    //  trigger the creation of a story for each node
    createStory(article);
  });
}

function displayErrorToUser(error) {
  createStory(error);
}

// fetch news api
const loadAPI = function() {
  fetch(
    "https://newsapi.org/v2/top-headlines?sortBy=popularity&apiKey=ca8681b5ce9447468962c7f40280c85f&country=gb"
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

const createTitle = function(title) {
  return `<h1>${title}</h1>`;
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

const createStory = function(article, className = "story") {
  const node = document.createElement("div");
  const storyHTML = `${createImg(article.urlToImage)}${createTitle(
    article.title
  )}
  ${createDescription(article.description)}${createTimeCountry(
    article.publishedAt,
    article.country
  )}`;
  node.className = className;
  node.innerHTML = storyHTML;
  mainNode.appendChild(node);
  console.log(storyHTML);
};

//switch countries we are fetching news from
const switchCountryButton = document.querySelector("#switch-countries");

switchCountryButton.addEventListener("click", function(event) {});

// initiate loading of news api
loadAPI();
