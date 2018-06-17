const newsAPIKey = "8483a39eb2d649bb80b09b3c36cb30df";
const newsDisplay = document.querySelector("#app__content-body--news");
const readLater = [];

const liveNewsButton = document.querySelector("#app__header-nav--live");
const readLaterButton = document.querySelector("#app__header-nav--readlater");
const searchNavButton = document.querySelector("#app__header-nav--search");
const mainNav = document.querySelector("#app__header-nav--wrapper");
const contentBody = document.querySelector("#app__content-body");
const mainNavItems = document.querySelectorAll(
  "#app__header-nav--wrapper ul > li"
);
const navOptions = document.querySelector("#app__content-nav-options");

const showImagesButton = document.querySelector("#show-images");
const searchButton = document.querySelector("#app__content-nav-options");
let liveNewsCollection = "";
let searchDataCollection = "";
let totalPages = 1;
let page = 1;
let maxItemPerPage = 5;

function createRequest(
  service,
  searchTerm,
  sortBy = "",
  language = "",
  page = 1
) {
  return service === "live"
    ? `https://newsapi.org/v2/top-headlines?language=en&apiKey=${newsAPIKey}&page=${page}&pageSize=${maxItemPerPage}`
    : `https://newsapi.org/v2/everything?q=${searchTerm}&language=${language}&sortBy=${sortBy}&apiKey=${newsAPIKey}&page=${page}&pageSize=${maxItemPerPage}`;
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
      totalPages = Math.floor(liveNewsData.totalResults / maxItemPerPage);
      console.log(totalPages);
      displayNews(liveNewsCollection);
      toggleImages();
      pagination(page, totalPages);
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

function pagination(page, totalPages) {
  const container = document.createElement("div");
  paginationUl = `
  <ul class="pagination">
    <li id="prev-page">Prev</li>
    <li id="page">${page} of ${totalPages}</li>
    <li id="next-page">Next</li>
  </ul>`;
  container.innerHTML = paginationUl;
  // document
  //   .querySelector("#app__content-body--news")
  //   .prepend(container.cloneNode(true));
  document.querySelector("#app__content-body--news").appendChild(container);

  // Show/hide buttons when needed
  page === 1
    ? (document.querySelector("#prev-page").style.visibility = "hidden")
    : (document.querySelector("#prev-page").style.visibility = "visible");

  page === totalPages
    ? (document.querySelector("#next-page").style.visibility = "hidden")
    : (document.querySelector("#next-page").style.visibility = "visible");
}

newsDisplay.addEventListener("click", e => {
  if (e.target.className === "article__readlater btn") {
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
  if (readLater.length > 0) {
    displayNews(readLater);
    toggleImages();
  } else {
    newsDisplay.innerHTML = `
      <strong>Read later list is empty</strong>
    `;
  }
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

// Main navigation state
mainNavItems.forEach(navItem => {
  navItem.addEventListener("click", function(e) {
    page = 1;
    mainNavItems.forEach(navItem => {
      navItem.classList.remove("app__header-nav--active");
    });
    e.target.parentNode.classList.add("app__header-nav--active");
    if (e.target.id === "app__header-nav--readlater") {
      document.querySelector("body").classList.add("readlater");
    } else {
      document.querySelector("body").classList.remove("readlater");
    }
  });
});

// Prev and Next pagination
contentBody.addEventListener("click", function(e) {
  if (e.target.id === "prev-page") {
    page > 1 ? (page -= 1) : 1;
    console.log(page);
  }
  if (e.target.id === "next-page") {
    page += 1;
  }
  if (e.target.id === "prev-page" || e.target.id === "next-page") {
    fetch(createRequest("live", "", "", "", page))
      .then(function(liveNewsResponse) {
        return liveNewsResponse.json();
      })
      .then(function(liveNewsData) {
        liveNewsCollection = liveNewsData.articles;
        totalPages = Math.floor(liveNewsData.totalResults / maxItemPerPage);
        displayNews(liveNewsCollection);
        toggleImages();
        pagination(page, totalPages);

        window.scroll(0, 0);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});
