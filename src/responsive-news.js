/*
APIKEY - 4e6aa60e17534b93ad4407fa0a2256a7
*
*/
/*
*/

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
  const bodyContent = document.querySelector(".app__content-body");
  const rightNav = document.querySelector(".app__content-nav");
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
        return (bodyContent.innerHTML += "<p>Title: " + item.title + "</p>");
      });
      let images = data.articles.map(function(item) {
        console.log(item.urlToImage);
        //let img = createNode("img");
        //append(sideBarImg, img.images);
        return (sideBarImg.innerHTML += "<img src =" + item.urlToImage + ">");
      });
      let description = data.articles.map(function(item) {
        //console.log(item.description);
        return (bodyContent.innerHTML += "<p>" + item.description + "</p>");
      });
      let newsSource = data.articles.map(function(item) {
        //console.log(item.source.name);
        return (rightNav.innerHTML += "<p>" + item.source.name + "</p>");
      });
      let articleDate = data.articles.map(function(item) {
        //console.log(item.publishedAt);
        return item.publishedAt;
      });
      let articleLink = data.articles.map(function(item) {
        //console.log(item.url);
        return (bodyContent.innerHTML += `<p><a href =${item.url} > ${
          item.url
        }</a></p>`);
      });
    })
    .catch(function(error) {
      console.log("error");
    });
}
