let pageNumber = 1;

function displayDataOnPage(newsOutput){
  // implement display logic here
  console.log(newsOutput);

  let parent = document.querySelector("#articles");

  newsOutput.forEach( article => {
    let child = document.createElement("li");
        child.innerHTML = `<h3 class="title"> ${article.title} </h3>
        <img class="images"src=${article.urlToImage}>
        <p class="description"> ${article.description}</p>
        <p class="publisehed"> ${article.publishedAt}</p>
        <a class="url" href=${article.url}>CLICK here for story</a>`
        parent.appendChild(child);
  })
}


function search( query, pageNumber ){
  fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=41a785bcf660443c92ded19ad436a52c&page=${pageNumber}`)
  // by default fetch makes a GET request
    .then(function(response) {
      return response.json();
    })
    .then(function(body){
      displayDataOnPage(body.articles);
    })
    .catch(function(error) {
      displayErrorToUser('Server failed to return data');
    });
}



function searchForm(){
const form =  document.querySelector("form")

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(event.target["0"].value);
    // get reference to text input
    // submit its to search
   search(event.target["0"].value, pageNumber)
  })
}

searchForm();

// let input = "";
//
// function textAreaInput(){
//   let textArea = document.querySelector(".searchText");
//   textArea.addEventListener("input", function(event) {
//   input = event.target.value;
//   return input;
//   })
// }

function displayErrorToUser(){

}


fetch("https://newsapi.org/v2/top-headlines?country=gb&apiKey=41a785bcf660443c92ded19ad436a52c")
// by default fetch makes a GET request
  .then(function(response) {
    return response.json();
  })
  .then(function(body){
    displayDataOnPage(body.articles);
  })
  .catch(function(error) {
    displayErrorToUser('Server failed to return data');
  });
