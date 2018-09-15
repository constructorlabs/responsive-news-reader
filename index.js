const form = document.querySelector("#newsform");
const input = document.querySelector("#input");
const results = document.querySelector("#news__results__container");
const country = document.querySelector("#countries");
const category = document.querySelector("#categories");
const goodBad = document.querySelector("#good__bad");
const storedSearch = document.querySelector("#stored__search");

function fetchNews(search) {
  fetch(
    `https://newsapi.org/v2/everything?q=${search}&from=2018-06-15&sortBy=popularity&apiKey=4150b2f03a834ff68cffe0f3a011f41e`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      display(json);
      console.log(json);
    })
    .catch(function(error) {
      console.log(error);
    });
}
function fetchNation(nation) {
  fetch(
    `https://newsapi.org/v2/sources?country=${nation}&apiKey=4150b2f03a834ff68cffe0f3a011f41e`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(nationJson) {
      console.log(nationJson);
      display(nationJson);
    })
    .catch(function(error) {
      console.log("No news is good news!");
    });
}
function display(myJson) {
  let newsResults = myJson.articles
    .map(function(news) {
      return `
    <div class="results__body">
    <ui>
    <div class="results__body__block">
    <a href=${
      news.url
    }><h3 class="news__title"><strong>${news.title}</strong></h3></a>
    <p class="news__publication">Date Published: ${news.publishedAt}</p>
    <p class="news__author"><i>${news.author}</i></p>
    <p class="news__source">${news.source.name}</p>
    <p class="news__description">${news.description}</p>
    <div class="imageparent">
    <img class="news__image" src=${news.urlToImage}>
    </div>
    </div>
    </ui>
    </div>
    `;
    })
    .join("");

  results.innerHTML = newsResults;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  fetchNews(input.value);
});

goodBad.addEventListener("change", function(event) {
  event.preventDefault();
  fetchNews(goodBad.value);
});

category.addEventListener("change", function(event) {
  event.preventDefault();
  fetchNews(category.value);
});

country.addEventListener("change", function(event) {
  event.preventDefault();
  fetchNews(country.value);
});
