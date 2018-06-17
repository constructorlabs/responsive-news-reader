/*
APIKEY - 4e6aa60e17534b93ad4407fa0a2256a7
*
*/
/*
*/
const formEvent = document.querySelector("#form");

formEvent.addEventListener("submit", function(e) {
  e.preventDefault();
  const cityName = document.querySelector("#input");

  getNews(cityName.value);
  getFlag(cityName.value);
});

function getNews(cityName) {
  const sideBarImg = document.querySelector(".app__content-sidebar");
  const bodyContent = document.querySelector(".app__content-body");
  const rightNav = document.querySelector(".app__content-nav");
  let apiCall = encodeURI(
    `https://newsapi.org/v2/top-headlines?q=${cityName}&apiKey=4e6aa60e17534b93ad4407fa0a2256a7`
  );
  fetch(apiCall)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const articlesData = data;

      let title = data.articles.map(function(item) {
        return (bodyContent.innerHTML += "<p>Title: " + item.title + "</p>");
      });
      let images = data.articles.map(function(item) {
        return (sideBarImg.innerHTML += "<img src =" + item.urlToImage + ">");
      });
      let description = data.articles.map(function(item) {
        return (bodyContent.innerHTML += "<p>" + item.description + "</p>");
      });
      let newsSource = data.articles.map(function(item) {
        return (rightNav.innerHTML += "<p>" + item.source.name + "</p>");
      });
      let articleDate = data.articles.map(function(item) {
        return item.publishedAt;
      });
      let articleLink = data.articles.map(function(item) {
        return (bodyContent.innerHTML += `<p><a href =${item.url} > ${
          item.url
        }</a></p>`);
      });
    })
    .catch(function(error) {
      console.log("error");
    });
}

function getFlag(cityName) {
  const flagFooter = document.querySelector(".app__footer-notes");
  let apiImageCall = encodeURI(
    `https://restcountries.eu/rest/v2/name/${cityName}?fullText=true`
  );

  fetch(apiImageCall)
    .then(resp => resp.json())
    .then(function(data) {
      let flagImg = data[0].flag;
      flagFooter.innerHTML += "<img src =" + flagImg + ">";
    })
    .catch(function(error) {
      console.log("error");
    });
}
