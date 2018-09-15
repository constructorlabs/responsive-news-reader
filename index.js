// Initialise url parameters
const params = {
  base: 'https://newsapi.org/v2/',
  endpoint: 'top-headlines',
  apiKey: 'f29390555fbc483ba17e7ec1cb19af1a',
  country: 'gb',
  category: 'general',
  query: ''
};

//---------------------------//

const setURL = params => {
  return `${params.base}${params.endpoint}?apiKey=${params.apiKey}&country=${
    params.country
  }&category=${params.category}`;
};

fetch(setURL(params))
  .then(response => {
    return response.json();
  })
  .then(data => {
    addArticlesToFeed(data.articles);
  })
  .catch(err => {
    displayErrorToUser('Server failed to return data');
  });

// Error function
const displayErrorToUser = err => {
  alert(err);
};

// Content creation functions

const createArticle = articleData => {
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
  }</a></p>`;

  return article;
};

const createArticles = data => {
  const newsWrapper = document.createElement('div');
  data.forEach(story => {
    const newsArticle = createArticle(story);
    newsWrapper.appendChild(newsArticle);
  });

  return newsWrapper;
};

const addArticlesToFeed = data => {
  const newsFeed = document.querySelector('section.news');
  const ref = document.querySelector('section.news nav:first-child');
  const stories = createArticles(data);
  newsFeed.insertBefore(stories, ref);
};

// Content helper functions

const pluralUnits = (val, unit) => {
  return val >= 2 ? unit.replace(' ', 's ') : unit;
};

const getTimeSinceArticlePublication = date => {
  let mins = Math.floor((Date.now() - new Date(date).valueOf()) / 60000);
  let hours = mins / 60;
  let days = hours / 24;
  let weeks = days / 7;
  let elapsedTime = '';
  if (days >= 1) {
    return (elapsedTime += `${Math.floor(days)} ${pluralUnits(days, 'day ')}`);
  }
  if (hours >= 1) {
    return (elapsedTime += `${Math.floor(hours)} ${pluralUnits(
      hours,
      'hour '
    )}`);
  }

  return (elapsedTime += `${mins} ${pluralUnits(mins, 'min ')}`);
};

// UI interactivity functions

// Filter data to only return stories with description

// Pagination

const addPagination = () => {
  const nextPage = document.createElement('button');
  nextPage.textContent = 'More stories';

  return nextPage;
};

// Search

// -----------

// Category select - inc Cyling News

// Give me cats!
