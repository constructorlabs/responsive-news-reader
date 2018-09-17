const url =
  "https://newsapi.org/v2/top-headlines?" +
  "country=gb&" +
  "apiKey=7318e7fb7dc04d14af2f0fd675cfda53";

const req = new Request(url);

// Fetch function for the main headlines
fetch(req)
  .then(function(response) {
    return response.json();
  })

  .then(function(body) {
    displayArticles(body);
  });


//  Function which generates a div containing the article's headline, time, img, discription, source and link
function displayArticles(body) {
  body.articles.forEach(article => {

	//Timestamp is converted into GMT date and time format
    const ts = new Date(`${article.publishedAt}`);
    const date = ts.toGMTString();

	//If article does not have description it will not be displayed
    if (article.description) {
      const divNode = document.createElement("div");

	  //Two divs are generated due to the final layout for wide screens
	  // one with img and one without;
      if (article.urlToImage) {
        divNode.className = "article-div-w-img";

        divNode.innerHTML = `<div class="title"><h2>${article.title}</h2></div>

                    <div  class="date"><h4>${date}</h4></div>

                    <div class="img"><img src="${article.urlToImage}"></div>

                    <div class="content"><p>${article.description}</p></div>

                    <div  class="source"><h4>Source: ${
                      article.source.name
                    }</h4></div>

                    <div class="more-news"><button class="news">More headlines from this source</button></div>

                    <div class="link"><a href="${
                      article.url
                    }">Read all about it</a></div>`;
      } else {
        divNode.className = "article-div";

        divNode.innerHTML = `<div class="title"><h2>${article.title}</h2></div>

                    <div class="date"><h4>${date}</h4></div>

                    <div class="content"><p>${article.description}</p></div>

                    <div  class="source"><h4>Source: ${
                      article.source.name
                    }</h4></div>

                    <div class="more-news"><button class="news">More headlines from this source</button></div>

                    <div class="link"><a href="${
                      article.url
                    }">Read all about it</a></div>`;
      }

	  //   The newly created article div is added to the newsfeed
      const parentNode = document.querySelector("#newsfeed");
      parentNode.appendChild(divNode);
    }

	// Tried adding an event listener to 'More news from this source button', but it does not seem to work.
    document.querySelector(".news").addEventListener("click", e => {
	  
		let requiredSource = "";
		article.source.id
        ? (requiredSource = article.source.id)
		: (requiredSource = article.source.name);
		
      document.querySelector("#newsfeed").textContent = "";
      let newSourceURL =
        "https://newsapi.org/v2/top-headlines?" +
        `sources=${requiredSource}&` +
        "apiKey=7318e7fb7dc04d14af2f0fd675cfda53";

      const source = new Request(newSourceURL);

      fetch(source)
        .then(function(response) {
          return response.json();
        })

        .then(function(body) {
          displayArticles(body);
        });
    });
  });
}



//Add event listener to the search form
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  let searchItem = document.querySelector("#search").value;
  //The exisiting newsfeed is cleared before search results displayed
  document.querySelector("#newsfeed").textContent = "";

  const searchURL =
    "https://newsapi.org/v2/everything?" +
    `q=${searchItem}&` +
    "from=2018-09-14&" +
    "sortBy=popularity&" +
    "language=en&" +
    "apiKey=7318e7fb7dc04d14af2f0fd675cfda53";

  const reqURL = new Request(searchURL);

  fetch(reqURL)
    .then(function(response) {
      return response.json();
    })

    .then(function(body) {
      displayArticles(body);
    });

  document.querySelector("#search").value = "";
});



//Two functions are executed on scroll - sticky header and 'go to top' button
window.onscroll = function() {
  myFunction(), scrollFunction();
};

// myFunction() activates sticky header
var header = document.querySelector(".header");
var sticky = header.offsetTop;
// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// When the user scrolls down 20px from the top of the document, show the 'go to top' button
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the 'go to top' button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari

  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
