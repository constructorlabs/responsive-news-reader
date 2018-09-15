
// I am trying to work in stages - currently focusing on building a generate fetch url function 
// this means that the code not running when the fetch() is run

// To explain what I am trying to do:
// 1)  create object with keys as news sources, values as true/false.
// 2) These values to be changed on "change" event when checkbox is checked / unchecked.
// 3) If (any of the) values are true, they are used to create an array
// 4) The array is used as the sources part of the fetch url.

// I THINK the problem at the moment is that my filter event code 
// is not returning an updated object. I think I am updating individual keys but not updating the object…


/// GENERATE FETCH URL
function generateFetchUrl() {
  
  // baseUrl and default
  const baseUrl = "https://newsapi.org/v2/top-headlines?apiKey=93238bcda39e4404852697d364b77971";
  const defaultArray = ["bbc-news","daily-mail","mirror"];
  let checkboxArray = document.querySelectorAll(".news--filter input");

  // news sources object
  let publicationList = {
    "bbc-news": false,
    "daily-mail": false,
    "mirror": false
  }
 
  //filter event 
  checkboxArray.forEach(function(input) {
    input.addEventListener("change", event => {
        // new assigned value to match object key
        console.log(event.target.value);
        
        // assign object value if checked is true
        if (event.target.checked === true) {
          return publicationList[event.target.value] = true;
        }
        else {
          return publicationList[event.target.value] = false;
        }
    })
})

///   THIS IS WHERE I AM STUCK; I think I need to be updating the publicationList but am only changing the individual values
console.log(publicationList)

 // create an array from object using key values
 let publicationArray = Object.keys(publicationList);
 let filteredArray = publicationArray.filter(function(pub) {
     return publicationList[pub] === true;
 });

  // compile fetch url
  let defaultArrayUrl = `&sources=${defaultArray}`;
  let filteredPublicationUrl = `&sources=${filteredArray}`;
  let fullURL = "";
  
  checkboxArray.forEach(function (checkbox) {   
    if (checkbox.checked === true) {
      return fullURL = `${baseUrl}${filteredPublicationUrl}`;
    }
    else {
      return fullURL = `${baseUrl}${defaultArrayUrl}`;
    }
  })
}

generateFetchUrl();


/// DISPLAY DATA ON PAGE

const parentNode = document.querySelector(".news--area--feed");

function displayDataOnPage(newsStories) {

  const newsArray = newsStories.articles;
  // console.log(newsStories.articles);
  // add news blocks (as articles)
    newsArray.forEach(function(newsitem) {

        const node = document.createElement("article");
        node.innerHTML = `${newsitem.source.name} (source logo)
        <b>${newsitem.title}:</b> ${newsitem.description}`;
        parentNode.appendChild(node);

    })  
}

function displayErrorToUser() {}

fetch(fullURL) // by default fetch makes a GET request
  .then(function(response) {
    return response.json();
  })
  .then(function(body) {
    //console.log(body);
    displayDataOnPage(body);
  })
  .catch(function(error) {
    displayErrorToUser("Server failed to return data");

    // need filter to NOT SHOW any news story with empty values. if any value is empty do no show
  });

  



