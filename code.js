// varibles
const myMain = document.querySelector(".content__body");
const searchBox = document.querySelector(".searchform__textbar");
const myForm = document.querySelector(".searchform");

//functions
function submitHandler(event) {
  event.preventDefault();
  let search= searchBox.value;
  fetch(
    `https://newsapi.org/v2/everything?q=${search}&from=2018-06-01&sortBy=popularity&apiKey=cacb9f078d714b02b4baa44f3eea29f8`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      showResults(jsonData);
      console.log(jsonData);
    })
    .catch(function(error) {
      alert("error");
    });
}

function showResults(data){
  let style="";
 let counter=1;
 console.log(data)
  const news= data.articles.map(article => {
    if(counter ==1)
      style="article1"
      else
      style="article2"
      counter=counter*-1
   return `<div class="${style}"><a href="${article.url}"><h2>Title: ${article.title}</h2></a><br>
   <img class="article__img" src="${article.urlToImage}"></img>
   Description: ${article.description}.<br>
   Publication Date: ${article.publishedAt}.<br>
 </div>`
  });
  myMain.innerHTML=news;
}

//body
myForm.addEventListener("submit", submitHandler);
