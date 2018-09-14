const parentNode = document.querySelector(".news--area--feed");

// compile this Url = "https://newsapi.org/v2/top-headlines?sources=bbc-news,daily-mail,mirror,&apiKey=93238bcda39e4404852697d364b77971";
const baseUrl = "https://newsapi.org/v2/top-headlines?apiKey=93238bcda39e4404852697d364b77971";


const publicationList = {
    "bbc-news": true,
    "daily-mail": true,
    "mirror": true
}

// create an array from object using key values
let publicationArray = Object.keys(publicationList);


//console.log(defaultArray);
const sourceList = `&sources=${defaultArray}`;
const fullURL = `${baseUrl}${sourceList}`;




function displayDataOnPage(newsStories) {
  const newsArray = newsStories.articles;
  console.log(newsStories.articles);
  
  // add news blocks (as articles)
    newsArray.forEach(function(newsitem) {

        const node = document.createElement("article");
        node.innerHTML = `${newsitem.source.name} (source logo)
        <b>${newsitem.title}:</b> ${newsitem.description}`;
        parentNode.appendChild(node);

    })  



  // filter  
    let checkboxArray = document.querySelectorAll(".news--filter input");
    console.log(checkboxArray)
    
    checkboxArray.forEach(function(input) {
        input.addEventListener("change", event => {
            console.log(event.target.value);
            
            if (publicationList[event.target.value]) {
                publicationList[event.target.value] = false
                filteredArray.push(event.target.value);
            }
            
            console.log(filteredArray)

        })
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

    // need filter to NOT SHOW any news story with empty values
    // if any value is empty do no show
  });

  