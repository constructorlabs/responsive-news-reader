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
        `<img src="${content.urlToImage}" alt="news image">
        <h2>${content.title}</h2>
        <p>${content.description}</p>`;
        parentNode.appendChild(spanNode);           // pushing to the <ul>
    });
}
 // Buttons event listener/value to fetch
 const buttonSelector = document.querySelector('.buttons');
buttonSelector.addEventListener("click", function(event){
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
 const searchFunc = document.querySelector('.searchClass');
const inputInfo = document.querySelector('.searchClass') //INPUT? NECESSARY????
 searchFunc.addEventListener("click", function(event){ //COMBINE SEARCH AND INPUT??
    event.preventDefault();
    //WHAT IS VALUE??? GOOGLE IT
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



 //HEADLINE FETCH/DISPLAY

const parentNode2 = document.getElementById("headline"); // find the <ul in the html file

// Main News div insertion

function displayDataOnHead(topNews){
  //  console.log(topNews);

    topNews.articles.forEach(content => {
        const spanNode2 = document.createElement("li"); // make fresh <li>
        spanNode2.innerHTML =                            // news contents
        `<img src="${content.urlToImage}" alt="news image">
        <h2>${content.title}</h2>`;
    
        parentNode2.appendChild(spanNode2);           // pushing to the <ul>
    });
}

function getDataH(urlH){
    // main news body fetch - button changeable
    fetch(urlH) // by default fetch makes a GET request
    .then(function(response) {
        
        return response.json();
    })
    .then(function(body){
      //  parentNode.innerHTML = "";
        displayDataOnHead(body);
    })
    .catch(function(error) {
        displayErrorToUser2(`${error} ahhhh server problem`);
    });
}

getDataH('https://newsapi.org/v2/everything?q=bitcoin&pageSize=1&from=2018-08-16&sortBy=publishedAt&apiKey=534d9b30f7bd4185b60cba8d406e11ec')

