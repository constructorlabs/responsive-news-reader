function displayErrorToUser(message){
    return console.log(message)
}
      
const parentNode = document.getElementById("newz"); // find the <ul in the html file

// Main News div insertion

function displayDataOnPage(topNews){
  //  console.log(topNews);

    topNews.articles.forEach(content => {
        const spanNode = document.createElement("li"); // make fresh <li>
        spanNode.innerHTML =                            // news contents
        `<h2>${content.title}</h2>
        <p>${content.description}</p>
        <img src="${content.urlToImage}" class="image" alt="news image" height="42" width="42">`;
        parentNode.appendChild(spanNode);           // pushing to the <ul>
    });
}

// Buttons event listener/value to fetch

const buttonSelector = document.querySelector('.buttons');
buttonSelector.addEventListener("submit", function(event){
    event.preventDefault();
    let url;
    if (event.target.value === 'all-button') {
        url = 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=534d9b30f7bd4185b60cba8d406e11ec'
    }
    else {
        url = `https://newsapi.org/v2/everything?q=${event.target.value}&apiKey=534d9b30f7bd4185b60cba8d406e11ec`
    }
             
    getData(url);
});

//search event listener
let searchFunc = document.querySelector('.searchB');
let inputInfo = document.querySelector('.searchClass');
//let inputInfo = document.querySelector('mySearch'); //INPUT? NECESSARY????
//console.log(searchFunc.value);
console.log(searchFunc.value);
console.log(searchFunc);

console.log(inputInfo.value);
console.log(inputInfo);

searchFunc.addEventListener("submit", function(event){ //COMBINE SEARCH AND INPUT??
    event.preventDefault();
    //WHAT IS VALUE??? GOOGLE IT
    event.target.value === inputInfo
    let url = `https://newsapi.org/v2/everything?q=${event.target.value}&apiKey=534d9b30f7bd4185b60cba8d406e11ec`
    
    getData(url);
})


//button function

function fetchingButtons(url, selector) { //button fetch addresses
    const buttonall = document.querySelector(selector);

}


//Fetch

function getData(url){
    // main news body fetch - button changeable
    fetch(url) // by default fetch makes a GET request
    .then(function(response) {
        
        return response.json();
    })
    .then(function(body){
        parentNode.innerHTML = "";
        displayDataOnPage(body);
    })
    .catch(function(error) {
        displayErrorToUser(`${error} ahhhh server problem`);
    });
}

getData('https://newsapi.org/v2/top-headlines?country=gb&apiKey=534d9b30f7bd4185b60cba8d406e11ec')