/*
APIKEY - 4e6aa60e17534b93ad4407fa0a2256a7
*
*/
/*
https://newsapi.org/v2/top-headlines?country=us&apiKey=4e6aa60e17534b93ad4407fa0a2256a7
*/
//const sideBarImg = document.querySelector(".app__content-sidebar");
const formEvent = document.querySelector("#form");

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

formEvent.addEventListener("submit", function(e) {
  e.preventDefault();
  const cityName = document.querySelector("#input");
  //console.log(cityName);
  getNews(cityName.value);
});

function getNews(cityName, createNode, append) {
  const sideBarImg = document.querySelector(".app__content-sidebar");
  let apiCall = encodeURI(
    `https://newsapi.org/v2/top-headlines?q=${cityName}&apiKey=4e6aa60e17534b93ad4407fa0a2256a7`
  );
  fetch(apiCall)
    .then(function(response) {
      //console.log(response.json());
      return response.json();
    })
    .then(function(data) {
      const articlesData = data;
      // console.log(articlesData);
      let title = data.articles.map(function(item) {
        //console.log(item.title);
        return item.title;
      });
      let images = data.articles.map(function(item) {
        console.log(item.urlToImage);
        //let img = createNode("img");
        //append(sideBarImg, img.images);
        return (sideBarImg.innerHTML += "<img src =" + item.urlToImage + ">");
      });
      let description = data.articles.map(function(item) {
        //console.log(item.description);
        return item.description;
      });
      let newsSource = data.articles.map(function(item) {
        //console.log(item.source.name);
        return item.source.name;
      });
      let articleDate = data.articles.map(function(item) {
        //console.log(item.publishedAt);
        return item.publishedAt;
      });
      let articleLink = data.articles.map(function(item) {
        console.log(item.url);
        return item.url;
      });
    })
    .catch(function(error) {
      console.log("error");
    });
}
