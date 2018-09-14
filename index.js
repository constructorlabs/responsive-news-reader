fetch(
  'https://newsapi.org/v2/everything?q=bitcoin&from=2018-08-14&sortBy=publishedAt&apiKey=f29390555fbc483ba17e7ec1cb19af1a'
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    addArticlesToNewsfeed(data.articles, 5);
  })
  .catch(err => {
    displayErrorToUser('Server failed to return data');
  });

const createArticle = articleData => {
  console.log(articleData.title);

  const article = document.createElement('article');
  article.classList.add('news__article');
  const elapsedTime = Math.floor(
    (Date.now() - new Date(articleData.publishedAt).valueOf()) / 60000
  );

  article.innerHTML = `  <h2 class='news__headline'>${articleData.title}</h2>
        <p class="news__date">Published ${elapsedTime} mins ago</p>
                              <img class='news__image' src="${
                                articleData.urlToImage
                              }" alt="${articleData.title}">
                              <p class="news__story">${
                                articleData.description
                              }</p>
                              <p class="news__publication">Read the full story at <a href="${
                                articleData.url
                              }" class="news__source">${
    articleData.source.name
  }</a></p>
      `;
  return article;
};

const getArticles = (data, number) => {
  return data.filter(article => data.indexOf(article) <= number - 1);
};

const addArticlesToNewsfeed = (data, number) => {
  const articles = getArticles(data, number);
  articles.forEach(story => {
    const newsArticle = createArticle(story);
    const newsFeed = document.querySelector('section.news');
    const refArticle = newsFeed.querySelector('article:first-child');
    newsFeed.appendChild(newsArticle);
  });
};

const displayErrorToUser = err => {
  alert(err);
};
