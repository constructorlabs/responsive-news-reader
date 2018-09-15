// varibles
const myMain = document.querySelector(".content__body");
const searchBox = document.querySelector(".searchform__textbar");
const myForm = document.querySelector(".searchform");
const prev= document.querySelector(".footer__prev");
const next= document.querySelector(".footer__next");
const sideBar= document.querySelector(".content__sidebar");
const myHistory= document.querySelector(".history__items");
const clearH=document.querySelector(".clear")
let page=1;
let search="";
//localStorage.setItem('history', JSON.stringify([]));
let history = JSON.parse(localStorage.getItem('history'));

//functions


function submitHandler(event) {
  event.preventDefault();
  search= searchBox.value;
 if(! history.find(function(word){
    return search==word;
  }))
    {history.push(search);}

showHistory();
  localStorage.setItem('history', JSON.stringify(history));
  fetch(
    `https://newsapi.org/v2/everything?q=${search}&from=2018-06-01&sortBy=popularity&apiKey=cacb9f078d714b02b4baa44f3eea29f8`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      showResults(jsonData);
      prev.style.display="block";
      next.style.display="block";
      
    })
    .catch(function(error) {
      alert("error");
    });
}

function showResults(data){
  let style="";
 let counter=1;
  const news= data.articles.map(article => {
    if(counter ==1)
      style="article1"
      else
      style="article2"
      counter=counter*-1
   return `<div class="${style}"><a href="${article.url}"><h2>${article.title}</h2></a><br>
   <img class="article__img" src="${article.urlToImage}"></img>
   Description: ${article.description}.<br>
   Publication Date: ${article.publishedAt}.<br>
 </div>`
  });
  myMain.innerHTML=news;
}

function nextHandler(event){
  page++;
  fetch(
    `https://newsapi.org/v2/everything?q=${search}&from=2018-06-01&page=${page}&sortBy=popularity&apiKey=cacb9f078d714b02b4baa44f3eea29f8`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      window.scrollTo(0, 0);
      showResults(jsonData);
    })
    .catch(function(error) {
      alert("error");
    });
}

function prevHandler(event){
  if(page<=1){
    alert("This is the first page")
  }
else{
  page--;
  fetch(
    `https://newsapi.org/v2/everything?q=${search}&from=2018-06-01&page=${page}&sortBy=popularity&apiKey=cacb9f078d714b02b4baa44f3eea29f8`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      window.scrollTo(0, 0);
      showResults(jsonData);
    })
    .catch(function(error) {
      alert("error");
    });
  }
}

function headlines(){
  
  fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=cacb9f078d714b02b4baa44f3eea29f8`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      for(let i=0;i<5;i++){
        sideBar.innerHTML+= `<a href="${jsonData.articles[i].url}">${jsonData.articles[i].title}</a><br><br>`
      }
    })
    .catch(function(error) {
      alert("error");
    });
}

function historyHandler(event){
if(event.target.classList=="searched"){
  search=event.target.textContent;
  fetch(
    `https://newsapi.org/v2/everything?q=${search}&from=2018-06-01&sortBy=popularity&apiKey=cacb9f078d714b02b4baa44f3eea29f8`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      showResults(jsonData);
      searchBox.value=search;
      prev.style.display="block";
      next.style.display="block";
      
    })
    .catch(function(error) {
      alert("error");
    });
}
}

function showHistory (){
  const historyList= history.map(function(topic){
  return `<i class="searched"> ${topic} </i>`
  });
  myHistory.innerHTML=historyList;
}

function clearHistory(event){
history=[];
localStorage.setItem('history', JSON.stringify(history));
 showHistory();
}


//body
myForm.addEventListener("submit", submitHandler);
prev.addEventListener("click",prevHandler);
next.addEventListener("click",nextHandler);
myHistory.addEventListener("click",historyHandler);
clearH.addEventListener("click", clearHistory)
headlines();
showHistory ();



