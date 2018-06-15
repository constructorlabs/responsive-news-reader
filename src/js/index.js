const newsAPI = "8483a39eb2d649bb80b09b3c36cb30df";
let newsCollection = "";
const newsDisplay = document.querySelector("#app__content-body--news-display");

// Main navigation items
const mainNav = document.querySelector("#app__header-nav--wrapper");
const liveNewsButton = document.querySelector("#app__header-nav--live");

function createRequest(service) {
  return service === "live"
    ? `https://newsapi.org/v2/top-headlines?language=en&apiKey=${newsAPI}`
    : ``;
}

function displayNews(news) {
  const articles = [];
  news.forEach(article => {
    articles.push(generateArticle(article));
  });
  newsDisplay.innerHTML = articles.join();
}

function generateArticle(article) {
  return `
  <article id="article" class="article">
    <a target="_blank" id="article__link" class="article__link" href="${
      article.url
    }">
        <figure id="article__image" class="article__image"></figure>
        <span id="article__date" class="article__date">${
          article.publishedAt
        }</span>
        <header id="article__title" class="article__title">${
          article.title
        }</header>
        <span id="article__author" class="article__author">${
          article.author
        }</span>
        <p class="article__description" id="article__description">${
          article.description
        }</p>
    </a>
    </article>
    `;
}

// {
//     "source": {
//       "id": "the-economist",
//       "name": "The Economist"
//     },
//     "author": "The Economist",
//     "title": "AT&T and Time Warner are cleared to merge",
//     "description": "More consolidation will follow. Consumers ought to worry",
//     "url": "http://www.economist.com/news/leaders/21744068-more-consolidation-will-follow-consumers-ought-worry-att-and-time-warner-are-cleared",
//     "urlToImage": "https://cdn.static-economist.com/sites/default/files/images/print-edition/20180616_LDD004_0.jpg",
//     "publishedAt": "2018-06-16T00:00:00Z"
//   }

function loadLiveNews(event) {
  event.preventDefault();
  fetch(createRequest("live"))
    .then(function(liveNewsResponse) {
      return liveNewsResponse.json();
    })
    .then(function(liveNewsData) {
      liveNewsCollection = liveNewsData.articles;
      displayNews(liveNewsCollection);
    })
    .catch(function(error) {
      console.log(error);
    });
}

document.addEventListener("DOMContentLoaded", loadLiveNews);
liveNewsButton.addEventListener("click", loadLiveNews);
