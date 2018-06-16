const newsAPIKey = "8483a39eb2d649bb80b09b3c36cb30df";
const newsDisplay = document.querySelector("#app__content-body--news");
const readLater = [];
const readLaterButton = document.querySelector("#app__header-nav--readlater");
const mainNav = document.querySelector("#app__header-nav--wrapper");
const liveNewsButton = document.querySelector("#app__header-nav--live");
const searchButton = document.querySelector("#app__header-nav--search");
const showImagesButton = document.querySelector("#show-images");
let liveNewsCollection = "";

function createRequest(service) {
  return service === "live"
    ? `https://newsapi.org/v2/top-headlines?language=en&apiKey=${newsAPIKey}`
    : ``;
}

function displayNews(news) {
  const articles = [];
  news.forEach(article => {
    articles.push(generateArticle(article));
  });
  newsDisplay.innerHTML = articles.join("");
}

function generateArticle(article) {
  return `
  <article class="article">
        <a target="_blank" class="article__link" href="${article.url}">
            <figure class="article__image"
                    style="background-image:url('${article.urlToImage}')">
            </figure>
            <span id="article__date" class="article__date">${new Date(
              article.publishedAt
            ).toGMTString()}</span>
            <header class="article__title">${article.title}</header>
            <span class="article__author">${article.author}</span>
            <p class="article__description">${article.description}</p>
        </a>
        <button type="text" data-title="${
          article.title
        }" class="article__readlater">Read later</button>
    </article>
    `;
}

function toggleImages() {
  const localStor = localStorage.getItem("showImages");
  const images = document.querySelectorAll(".article__image");
  const checkbox = document.querySelector("#show-images");
  if (localStor === "show") {
    checkbox.checked = true;
    images.forEach(function(img) {
      img.style.display = "block";
    });
  } else {
    checkbox.checked = false;
    images.forEach(function(img) {
      img.style.display = "none";
    });
  }
}

function loadLiveNews(e) {
  e.preventDefault();
  fetch(createRequest("live"))
    .then(function(liveNewsResponse) {
      return liveNewsResponse.json();
    })
    .then(function(liveNewsData) {
      liveNewsCollection = liveNewsData.articles;
      displayNews(liveNewsCollection);
      toggleImages();
    })
    .catch(function(error) {
      console.log(error);
    });
}

function displayImages(e) {
  const images = document.querySelectorAll(".article__image");
  if (e.target.checked) {
    localStorage.setItem("showImages", "show");
    toggleImages();
  } else {
    localStorage.setItem("showImages", "hide");
    toggleImages();
  }
}

newsDisplay.addEventListener("click", e => {
  if (e.target.className === "article__readlater") {
    const articleTitle = e.target.getAttribute("data-title");
    liveNewsCollection.forEach(articleObj => {
      return Object.keys(articleObj).find(articleKey => {
        if (articleObj[articleKey] === articleTitle) {
          readLater.push(articleObj);
        }
      });
    });
    e.target.setAttribute("disabled", "");
  }
});
document.addEventListener("DOMContentLoaded", loadLiveNews);
liveNewsButton.addEventListener("click", loadLiveNews);
readLaterButton.addEventListener("click", () => {
  displayNews(readLater);
  toggleImages();
});
showImagesButton.addEventListener("change", displayImages);
