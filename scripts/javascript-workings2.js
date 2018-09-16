const baseUrl = "https://newsapi.org/v2/top-headlines?apiKey=93238bcda39e4404852697d364b77971";
const parentNode = document.querySelector(".news--area--feed");

let checkboxArray = document.querySelectorAll(".news--filter input");
let userOpted = false;
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
      // need filter to NOT SHOW any news story with empty values. if any value is empty do no show
    });
}

/*
--------------------
DISPLAY DATA ON PAGE
--------------------
*/

function displayDataOnPage(newsStories) {

  const newsArray = newsStories.articles;
  // console.log(newsStories.articles);
  // add news blocks (as articles)
    newsArray.forEach(function(newsitem) {

        const node = document.createElement("article");
        node.innerHTML = `<figure class="news--article-image"><img src="${newsitem.urlToImage}"></figure>
        <section class="news--article-content">
        <header class="${newsitem.source.name}"><h2>${newsitem.title}</h2></header>
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
  "the-telegraph": false,
  "financial-times": false,
  "bbc-news": false,
}

const generateFetchURL = function (publicationList) {
  // baseUrl and default
  const defaultArray = ["bbc-news","daily-mail","mirror"];

  // create an array from object using key values
  let publicationArray = Object.keys(publicationList);
  let filteredArray = publicationArray.filter(function(pub) {
    return publicationList[pub] === true;
  });

  // compile fetch url
  let defaultArrayUrl = `&sources=${defaultArray}`;
  let filteredPublicationUrl = `&sources=${filteredArray}`;
  let fullURL = "";

  if (userOpted === true) {
    // RETURN VALUES - fullURL
    fullURL = `${baseUrl}${filteredPublicationUrl}`;
  } else {
    fullURL = `${baseUrl}${defaultArrayUrl}`;
  }
  goFetch(fullURL)
}

/*
----------------------
CREATE CHECKBOX FILTER
----------------------
*/
const createCheckboxFilter = function() {
  // Reset UserOpted to false
  userOpted = false;
  checkboxArray.forEach(function(input) {
    input.addEventListener("change", function(event) {
      // new assigned value to match object key
      // assign object value if checked is true
      if (event.target.checked === true) {
        publicationList[event.target.value] = true;
        userOpted = true;
      }
      else {
        publicationList[event.target.value] = false;
      }
      console.log(publicationList)
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