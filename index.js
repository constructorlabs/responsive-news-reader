fetch(
  'https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=f29390555fbc483ba17e7ec1cb19af1a'
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    addArticlesToNewsfeed(data.articles, 25);
  })
  .catch(err => {
    displayErrorToUser('Server failed to return data');
  });

const createArticle = articleData => {
  console.log(articleData.title);

  const article = document.createElement('article');
  article.classList.add('news__article');

  const elapsedTime = getTimeSinceArticlePublication(articleData.publishedAt);

  article.innerHTML = `  <h2 class='news__headline'>${articleData.title}</h2>
        <p class="news__date">Published ${elapsedTime} ago</p>
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

const pluralUnits = (val, unit) => {
  console.log(val);
  return val >= 2 ? unit.replace(' ', 's ') : unit;
};

const getTimeSinceArticlePublication = date => {
  let mins = Math.floor((Date.now() - new Date(date).valueOf()) / 60000);
  let hours = mins / 60;
  console.log(hours + 'hours');
  let days = hours / 24;
  console.log(days + 'days');
  let elapsedTime = '';
  if (days >= 1) {
    elapsedTime += `${Math.floor(days)} ${pluralUnits(days, 'day ')}`;
    hours = hours % 24;
  }
  if (hours >= 1) {
    elapsedTime += `${Math.floor(hours)} ${pluralUnits(hours, 'hour ')}`;
    mins = mins % 60;
  }

  elapsedTime += `${mins} ${pluralUnits(mins, 'min ')}`;

  return elapsedTime;
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
