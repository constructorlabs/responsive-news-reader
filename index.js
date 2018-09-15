window.addEventListener('resize', e => {
  console.log(window.innerWidth);
});

// Initialise url parameters

const params = {
  base: 'https://newsapi.org/v2/',
  endpoint: 'top-headlines',
  apiKey: 'f29390555fbc483ba17e7ec1cb19af1a',
  country: 'gb',
  category: '',
  query: '',
  pageSize: 5,
  pageNum: 1
};

//---------------------------//

const init = () => {
  getNews(params);
};

const setURL = params => {
  return `${params.base}${params.endpoint}?apiKey=${params.apiKey}&q=${
    params.query
  }&country=${params.country}&category=${params.category}&pageSize=${
    params.pageSize
  }&page=${params.pageNum}`;
};

const getNews = params => {
  fetch(setURL(params))
    .then(response => {
      return response.json();
    })
    .then(data => {
      addArticlesToFeed(data);
    })
    .catch(err => {
      displayErrorToUser('Server failed to return data');
    });
};

// Error function
const displayErrorToUser = err => {
  alert(err);
};

// Filter data to prevent stories without description or image loading
const cleanData = data => {
  return data.articles.filter(
    article => article.description !== null && article.urlToImage !== null
  );
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
  const feed = cleanData(data);
  const stories = createArticles(feed);
  newsFeed.insertBefore(stories, ref);
  document.querySelector('.page-total').textContent =
    data.totalResults / params.pageSize;
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

const clearNewsFeed = () => {
  document
    .querySelector('section.news')
    .removeChild(document.querySelector('section.news div'));
};

const nextPage = document.querySelector('.page-nav .next');
nextPage.addEventListener('click', e => {
  const currentPageNum = document.querySelector('.page-current');
  const totalPageNum = document.querySelector('.page-total');
  e.preventDefault();
  +currentPageNum.textContent < +totalPageNum.textContent
    ? params.pageNum++
    : false;
  clearNewsFeed();
  getNews(params);
  currentPageNum.textContent = params.pageNum;
});

const prevPage = document.querySelector('.page-nav .prev');
prevPage.addEventListener('click', e => {
  e.preventDefault();
  params.pageNum > 1 ? params.pageNum-- : false;
  clearNewsFeed();
  getNews(params);
  document.querySelector('.page-current').textContent = params.pageNum;
});

// Search

const searchForm = document.querySelector('form.search--form');
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchForm.lastElementChild.value;
  console.log(query);
  // do something with input value
  if (query !== '') {
    params.query = query;
    params.endpoint = 'everything';
    params.country = '';
    clearNewsFeed();
    getNews(params);
  }
  //reset the search input
  searchForm.lastElementChild.value = '';
  searchForm.lastElementChild.placeholder = 'Type your query here...';
});

const searchInput = document.querySelector('#search--query');
searchInput.addEventListener('focus', e => {
  searchInput.placeholder = '';
  searchInput.value = '';
});

// -----------

// Personal features

// Prevent image loading on mobile view, not just hide with CSS

// Category select - inc Cyling News

// pretty URLs

// secure apiKey transmission

// Let's get this party started!

init();
