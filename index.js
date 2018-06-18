const mainContent = document.querySelector("#main-content");
const footer = document.querySelector("#footer");
// const bbc = document.querySelector("#bbc");
// const dailyMail = document.querySelector("#dailymail");
// const independent = document.querySelector("#independent");
// const guardian = document.querySelector("#guardian");

function loadDefault(data) {
  mainContent.innerHTML = data.articles
    .map(function(article) {
      return `
    <div class="main__content__article">
    <a href="${article.url}">
    <p class="main__content__article__title">${article.title}</p>
    </a>
    <img class="main__content__article__image" src="${article.urlToImage}">
    <p class="main__content__article__text">${article.description}</p>
    <p class="main__content__article__text">${article.publishedAt}</p>
    <p class="main__content__article__text">${article.source.name}</p>
    </div>
    `;
    })
    .join("");
}

function newsFeed(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      loadDefault(data);
    })
    .catch(function(error) {
      alert("No news is good news");
    });
}

function createUrl(keyWord) {
  return `https://newsapi.org/v2/top-headlines?sources=${keyWord}&apiKey=4aa5a400c9434c7cb4885f2e374617ca`;
}

function getNews(event) {
  event.preventDefault();
  if (event.target.id === "bbc") {
    let keyWord = "bbc-news";
    console.log(createUrl(keyWord));
    newsFeed(createUrl(keyWord));
  } else if (event.target.id === "dailymail") {
    let keyWord = "daily-mail";
    newsFeed(createUrl(keyWord));
  } else if (event.target.id === "independent") {
    let keyWord = "independent";
    newsFeed(createUrl(keyWord));
  } else if (event.target.id === "guardian") {
    let keyWord = "the-guardian-uk";
    newsFeed(createUrl(keyWord));
  }
}

newsFeed(
  "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4aa5a400c9434c7cb4885f2e374617ca"
);
footer.addEventListener("click", getNews);
