const breaking_news = document.querySelector("#breaking_news");

// Parses newsfeed in markup
function parseNews(news) {
  const parsed = news
    .map(function(feed) {
      console.log(feed);
      // if no descr then dont show feed
      // if (feed.description) {}
      const { title,url, urlToImage, description, publishedAt } = feed;
      return `
    <div class="article">
        <a href="${url}">
          <div class="article__title">${title}</div>
        </a>
        <div class="article__image"><img src="${
          urlToImage ? urlToImage : "No image"
        }"/></div>
        <div class="article__description">${
          description ? description : "No description"
        }</div>
        <div class="article__publication">${publishedAt}</div>
    </div>
    `;
    })
    .join("");
  return parsed;
}
//fetch wihtin a fx grabbing received data & sending it to the relevant markup element
function getLatestNews(latestNews) {
  fetch(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=876e36c7116d4ea8bb23b4b1eb97e8d2"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      breaking_news.innerHTML = parseNews(data.articles);
    });
}

getLatestNews();
