const displayArticles = document.querySelector("#news");

var url = `https://newsapi.org/v2/top-headlines?country=Gb&apiKey=fef23a6326874b0a8642a68a9dc15687`;
var req = new Request(url);
fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data.articles);
    displayNews(data);
  })
  .catch(function(error) {
    console.log(error);
  });

function displayNews(data) {
  const html = data.articles
    .map(function(news) {
      return `
        <div class="article-container"><p class="titles">
        ${news.title}
        </p>
        <img class="images"src=${
          news.urlToImage
        } alt="No article image available">
        <p>${news.description}</p>
        <p><p>
        <p><strong>Source:</strong> <a href=${
          news.url
        }>${news.source.name}</a><strong> &nbsp&nbsp&nbsp Date of publication:</strong> ${news.publishedAt}<p>
        </div>
      `;
    })
    .join("");

  displayArticles.innerHTML = html;
}
