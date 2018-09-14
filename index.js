fetch(
  'https://newsapi.org/v2/everything?q=bitcoin&from=2018-08-14&sortBy=publishedAt&apiKey=f29390555fbc483ba17e7ec1cb19af1a'
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    addArticleToFeed(data.articles);
  })
  .catch(err => {
    displayErrorToUser('Server failed to return data');
  });

const createArticle = articleData => {
  let article = document.createElement('article');
  article.classList.add('news__article');
  article.innerHTML = `  <h2 class='news__headline'>${articleData[0].title}</h2>
                        <img class='news__image' src="${
                          articleData[0].urlToImage
                        }" alt="${articleData[0].title}">
                        <p class="news__story">${articleData[0].description}</p>
                        <p class="news__publication">${
                          articleData[0].source.name
                        }</p>
                        <p class="news__date">${articleData[0].publishedAt}</p>
                        <a href="" class="news__source">${
                          articleData[0].url
                        }</a>`;

  console.log(article);
  return article;
};

const addArticleToFeed = data => {
  const newsArticle = createArticle(data);
  const newsFeed = document.querySelector('section.news');
  //   const refArticle = newsFeed.querySelector('article:first-child');
  newsFeed.appendChild(newsArticle);
};

const displayErrorToUser = err => {
  alert(err);
};
