/*
APIKEY - 4e6aa60e17534b93ad4407fa0a2256a7
*
*/
/*
https://newsapi.org/v2/top-headlines?country=us&apiKey=4e6aa60e17534b93ad4407fa0a2256a7
*/
// const url =
//   "https://newsapi.org/v2/top-headlines?country=us&apiKey=4e6aa60e17534b93ad4407fa0a2256a7";

const formEvent = document.querySelector("#form");
//const userInput = document.querySelector("input");
//console.log(userInput.value);

//const userInput = document.querySelector("input");

// let cityName = userInput.value;
// console.log(cityName);

formEvent.addEventListener("submit", function(e) {
  e.preventDefault();
  const cityName = document.querySelector("#input");
  //console.log(cityName);
  getNews(cityName.value);
});

function getNews(cityName) {
  let apiCall = encodeURI(
    `https://newsapi.org/v2/top-headlines?q=${cityName}&apiKey=4e6aa60e17534b93ad4407fa0a2256a7`
  );
  fetch(apiCall)
    .then(function(response) {
      console.log(response.json());
    })
    .then(function(data) {
      const articlesData = data;
      console.log(articlesData);
      const title
      const image 
      const description
      const publication //main pg
      const articleLink 
    })
    .catch(function(error) {
      console.log("error");
    });
}
