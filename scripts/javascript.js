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
const newsLayout = newsitem => {
  // fallbacks or empty if data is null 
  const imageurl =  (newsitem.urlToImage !== null) ? `${newsitem.urlToImage}` : "https://placeholdit.co//i/400x400?&bg=808069&fc=eee8cd&text=Project Image";
  const source = (newsitem.source.name !== null) ? `<span class="${newsitem.source.name}"></span>` : "";
  const url = (newsitem.url !== null) ? `${newsitem.url}` : "#";
  const title = (newsitem.title !== null) ? `${newsitem.title}` : "News article";
  const description = (newsitem.description !== null) ? `<h3>${newsitem.description}</h3>` : "";
  const content = (newsitem.content !== null) ? `<p>${newsitem.content.split("[+")[0]}</p>` : "";

  return `
    <a href="${url}" class="news--article-link">
    <figure class="news--article-image" style="background-image: url(${imageurl});" ></figure>
    ${source}
    </a>
    <section class="news--article-content">
    <header><h2>${title}</h2></header>
    ${description}
    ${content}
    <p><a href="${url}" title="Visit news article: ${title}">Read full article</a></p>
   <input class="redcard-checkbox" type="checkbox" name="ratenews"> <label>Red Card!</label>
    </section>`;
}



function displayDataOnPage(newsStories){
  parentNode.innerHTML = "";
  
  const newsArray = newsStories.articles;
    // add news blocks (as articles)
    newsArray.forEach(function(newsitem) {
        const node = document.createElement("article");
        node.innerHTML = newsLayout(newsitem);
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
  // console.log(filteredArray); 
 
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
        // console.log(publicationList);
        generateFetchURL(publicationList);
      })
  })
}
/* this function to run generateFetchURL() */
createCheckboxFilter();


/*
-------------
ERROR HANDLER
-------------
*/
function displayErrorToUser() {}

// Initial call to fetch data
generateFetchURL(baseUrl);


const redcardCheckbox = document.querySelectorAll(".redcard-checkbox");

redcardCheckbox.forEach(item => {
  addEventListener("change", function(event) {
    console.log(event);
    if (event.target.checked) {
      console.log("checkbox!");
      event.target.parentNode.parentNode.style.backgroundColor = "red";
    }
})
})