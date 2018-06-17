const newsAPIKey = "8483a39eb2d649bb80b09b3c36cb30df";
const newsDisplay = document.querySelector("#app__content-body--news");
const readLater = [];

const liveNewsButton = document.querySelector("#app__header-nav--live");
const readLaterButton = document.querySelector("#app__header-nav--readlater");
const searchNavButton = document.querySelector("#app__header-nav--search");
const mainNav = document.querySelector("#app__header-nav--wrapper");
const navOptions = document.querySelector("#app__content-nav-options");

const showImagesButton = document.querySelector("#show-images");
const searchButton = document.querySelector("#app__content-nav-options");
let liveNewsCollection = "";
let searchDataCollection = "";

function createRequest(service, searchTerm, sortBy = "", language = "") {
  return service === "live"
    ? `https://newsapi.org/v2/top-headlines?language=en&apiKey=${newsAPIKey}`
    : `https://newsapi.org/v2/everything?q=${searchTerm}&language=${language}&sortBy=${sortBy}&apiKey=${newsAPIKey}`;
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
        <header class="article__title">${article.title}</header>
            <figure class="article__image"
                    style="background-image:url('${article.urlToImage}')">
            </figure>
            <span id="article__date" class="article__date">${new Date(
              article.publishedAt
            ).toGMTString()}</span>
            <span class="article__author">${article.author}</span>
            <p class="article__description">${article.description}</p>
        </a>
        <button type="text" data-title="${
          article.title
        }" class="article__readlater btn">Read later</button>
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

function searchNews(searchTerm, sortBy, category) {
  if (!searchTerm) return;
  fetch(createRequest("search", searchTerm, sortBy, category))
    .then(function(searchResponse) {
      return searchResponse.json();
    })
    .then(function(searchData) {
      searchDataCollection = searchData.articles;
      displayNews(searchDataCollection);
      toggleImages();
    })
    .catch(function(error) {
      console.log(error);
    });
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
    if (searchDataCollection) {
      searchDataCollection.forEach(articleObj => {
        return Object.keys(articleObj).find(articleKey => {
          if (articleObj[articleKey] === articleTitle) {
            readLater.push(articleObj);
          }
        });
      });
    }
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
searchNavButton.addEventListener("click", function(e) {
  e.preventDefault();
  navOptions.classList.toggle("search-form--open");
});
// Search
navOptions.addEventListener("click", function(e) {
  e.preventDefault();
  if (e.target.id === "search-form__submit") {
    const searchTerm = document.querySelector("#searchTerm").value;
    const sortBy = document.querySelector("#sortby").value;
    const language = document.querySelector("#language").value;
    searchNews(searchTerm, sortBy, language);
  }
});
