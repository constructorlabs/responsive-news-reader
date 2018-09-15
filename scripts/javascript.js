
/// GENERATE FETCH URL

// news sources object
  let publicationList = {
    "bbc-news": false,
    "daily-mail": false,
    "mirror": false
  }

function generateFetchURL(publicationList) {
  
  // baseUrl and default
  const baseUrl = "https://newsapi.org/v2/top-headlines?apiKey=93238bcda39e4404852697d364b77971";
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
  
  checkboxArray.forEach(function (checkbox) {   
    if (checkbox.checked === true) {
      return fullURL = `${baseUrl}${filteredPublicationUrl}`;
    }
    else {
      return fullURL = `${baseUrl}${defaultArrayUrl}`;
    }
  })
}

generateFetchURL(console.log(publicationList));

//filter event 
// let checkboxArray = document.querySelectorAll(".news--filter input");
// checkboxArray.forEach(function(input) {
//   input.addEventListener("change", function(generateFetchURL) {
//       // new assigned value to match object key
//       // console.log(event.target.value);
//       // assign object value if checked is true
//       if (event.target.checked === true) {
//         publicationList[event.target.value] = true;
//       }
//       else {
//         publicationList[event.target.value] = false;
//       }
//     })
//   })

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

// function goFetch(fullURL) {
//   fetch(fullURL) // by default fetch makes a GET request
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(body) {
//       //console.log(body);
//       displayDataOnPage(body);
//     })
//     .catch(function(error) {
//       displayErrorToUser("Server failed to return data");

//       // need filter to NOT SHOW any news story with empty values. if any value is empty do no show
//     });
// }
  
// goFetch();
