const baseUrl = "https://newsapi.org/v2/top-headlines?apiKey=93238bcda39e4404852697d364b77971";
const parentNode = document.querySelector(".news--area--feed");

let checkboxArray = document.querySelectorAll(".news--filter input");

/* 
--------------
FETCH FUNCTION
--------------
*/
const goFetch = function(fullURL) {

  fetch(fullURL) // by default fetch makes a GET request
    .then(function(response) {
      return response.json();
    })
    .then(function(body) {
      displayDataOnPage(body);
    })
    .catch(function(error) {
      displayErrorToUser("Server failed to return data");
    });
}

/*
--------------------
DISPLAY DATA ON PAGE
--------------------
*/

function displayDataOnPage(newsStories){
  
  const newsArray = newsStories.articles;
  // console.log(newsStories.articles);
  // add news blocks (as articles)
    newsArray.forEach(function(newsitem) {

        const node = document.createElement("article");
        node.innerHTML = `<figure class="news--article-image" style="background-image: url(${newsitem.urlToImage});" ><span class="${newsitem.source.name}"></span></figure>
        <section class="news--article-content">
        <header><h2>${newsitem.title}</h2></header>
        <h3>${newsitem.description}</h3>
        <p>${newsitem.content}</p>
        <p><a href="${newsitem.url}" title="Visit news article: ${newsitem.title}">Read full article</a>
        </section>`;
        parentNode.appendChild(node);

    })  
}

/*
------------------
GENERATE FETCH URL
------------------
*/

// news sources object
let publicationList = {
  "daily-mail": false,
  "mirror": false,
  "metro": false,
}

const generateFetchURL = function (publicationList) {
  // default url array
  const defaultArray = ["daily-mail","mirror","metro"];

  // create an array from object using key values
  let publicationArray = Object.keys(publicationList);
  // filter array to keys with 'true' values
  let filteredArray = publicationArray.filter(function(pub) {
      return publicationList[pub] === true;
  });

  // compile fetch url
  let defaultArrayUrl = `&sources=${defaultArray}`;
  let filteredPublicationUrl = `&sources=${filteredArray}`;
  let fullURL = "";
  
  // check if filteredArray has values
  if (filteredArray.length == 0 ) {
    fullURL = `${baseUrl}${defaultArrayUrl}`;
  } else {
    fullURL = `${baseUrl}${filteredPublicationUrl}`;
  }
  // CHANGE filteredArray GOOD
  console.log(filteredArray); 
  console.log(filteredArray.length); 

  goFetch(fullURL)
}

/*
----------------------
CREATE CHECKBOX FILTER
----------------------
*/
const createCheckboxFilter = function() {
  checkboxArray.forEach(function(input) {
    input.addEventListener("change", function(event) {
        // new assigned value to match object key
        // assign object value if checked is true
        if (event.target.checked === true) {
          publicationList[event.target.value] = true;
          // displayDataOnPage();
        }
        else {
          publicationList[event.target.value] = false;
        }
        // CHANGE publicationList object GOOD
        console.log(publicationList);
        generateFetchURL(publicationList);
      })
  })
}
/* this function to run generateFetchURL() */
createCheckboxFilter();

/*
---------------------
ERROR HANDLER - TO DO
---------------------
*/
function displayErrorToUser() {}

// Initial call to fetch data
generateFetchURL(baseUrl);
