const newsDisplay = document.querySelector("#newsbody");
const photodisplat = document.querySelector("#photopbody");
const form = document.querySelector("#searchfield");
const input = document.querySelector("input");
const bbcButton = document.querySelector("#bbc");
const topHeadlines = document.querySelector("#top");

fetch(
  "https://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=1a4b48d17f0e44148656196d121fb9c0"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    displayNews(data);
  })
  .catch(function(error) {
    console.log(error);
  });

function displayNews(data) {
  const html = data.articles
    .map(function(news) {
      return `
    <div class="newscontainer">
    <div class="newsfeed">
    <p><strong>${news.title}</strong>
    <span> (${news.source.name})</span>
    </p>
    <a href="${news.url}" 
    <p2>${news.description}</p2></a>
    </div>
    <div><img class="newsimage" src="${news.urlToImage}" alt=""></div>
    </div>
    `;
    })
    .join("");

  newsDisplay.innerHTML = html;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let searchContent = input.value;
  fetch(
    `https://newsapi.org/v2/everything?` +
      `q=${searchContent}&` +
      `from=2018-06-15&` +
      `sortBy=popularity&apiKey=1a4b48d17f0e44148656196d121fb9c0`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayNews(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

bbcButton.addEventListener("click", function(event) {
  event.preventDefault();
  fetch(
    `https://newsapi.org/v2/top-headlines?` +
      `sources=bbc-news&` +
      `apiKey=1a4b48d17f0e44148656196d121fb9c0`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayNews(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

topHeadlines.addEventListener("click", function(event) {
  event.preventDefault();
  fetch(
    "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "apiKey=1a4b48d17f0e44148656196d121fb9c0"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      displayNews(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});
