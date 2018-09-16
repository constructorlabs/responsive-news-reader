// window.addEventListener('resize', e => {
//   console.log(window.innerWidth);
// });

// Initialise url parameters

const params = {
  base: 'https://newsapi.org/v2/',
  endpoint: 'top-headlines',
  apiKey: 'f29390555fbc483ba17e7ec1cb19af1a',
  country: 'gb',
  category: '',
  query: '',
  sortBy: 'publishedAt',
  pageSize: 9,
  pageNum: 1
};

const paramsPop = {
  base: 'https://newsapi.org/v2/',
  endpoint: 'everything',
  apiKey: 'f29390555fbc483ba17e7ec1cb19af1a',
  country: '',
  category: '',
  query: '',
  sortBy: 'popularity',
  pageSize: 1,
  pageNum: 1
};
//---------------------------//

const init = () => {
  getNews(params);
  getPopular();
};

// Fetch functions

const setURL = params => {
  return `${params.base}${params.endpoint}?apiKey=${params.apiKey}&q=${
    params.query
  }&country=${params.country}&category=${params.category}&sortBy=${
    params.sortBy
  }&pageSize=${params.pageSize}&page=${params.pageNum}`;
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

const getPopular = () => {
  fetch(
    'https://newsapi.org/v2/everything?language=en&domains=dailymail.co.uk&pageSize=8&sortBy=popularity&apiKey=f29390555fbc483ba17e7ec1cb19af1a'
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      addPopular(data);
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
    article =>
      article.description != null &&
      article.description != '' &&
      article.urlToImage != null
  );
};

// Content creation functions

const createArticle = articleData => {
  const article = document.createElement('article');
  article.classList.add('news__article');
  const elapsedTime = getTimeSinceArticlePublication(articleData.publishedAt);
  article.innerHTML = `
          <h2 class='news__headline'>${articleData.title}</h2>
          <p class="news__date">Published ${elapsedTime} ago</p>            
          <img class='news__image' src="${articleData.urlToImage}" alt="${
    articleData.title
  }">
          <p class="news__story">${articleData.description}</p>
          <p class="news__publication">Read the full story at <a href="${
            articleData.url
          }" class="news__source">${articleData.source.name}</a></p>`;

  return article;
};

const createPopArticle = articleData => {
  const article = document.createElement('article');
  article.classList.add('news__article');
  // const elapsedTime = getTimeSinceArticlePublication(articleData.publishedAt);
  article.innerHTML = `
          <img class='news__image' src="${articleData.urlToImage}">
          <h3 class='news__headline'>${articleData.title}</h3>`;

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

const createPopArticles = data => {
  const popWrapper = document.createElement('div');
  data.forEach(story => {
    const newsArticle = createPopArticle(story);
    popWrapper.appendChild(newsArticle);
  });

  return popWrapper;
};

const addArticlesToFeed = data => {
  const newsFeed = document.querySelector('section.news');
  const ref = document.querySelector('section.news aside');
  const feed = cleanData(data);
  console.log(feed);
  const stories = createArticles(feed);
  newsFeed.insertBefore(stories, ref);
  document.querySelector('.page-total').textContent = Math.floor(
    data.totalResults / params.pageSize
  );
};

const addPopular = data => {
  const popularFeed = document.querySelector('aside.popular');
  const popFeed = cleanData(data);
  const popStories = createPopArticles(popFeed);
  popularFeed.appendChild(popStories);
};

// Content helper functions

const pluralUnits = (val, unit) => {
  return val >= 2 ? unit.replace(' ', 's ') : unit;
};

const getTimeSinceArticlePublication = date => {
  let mins = Math.floor((Date.now() - new Date(date).valueOf()) / 60000);
  let hours = mins / 60;
  let days = hours / 24;
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
  // process input value
  if (query !== '') {
    params.query = query;
    params.endpoint = 'everything';
    params.country = '';
    params.pageNum = 1;
    clearNewsFeed();
    getNews(params);
  }
  //reset the search input
  searchForm.lastElementChild.value = '';
  searchForm.lastElementChild.placeholder = `News about ${query}`;

  searchForm.lastElementChild.addEventListener('blur', e => {
    searchInput.placeholder = 'Type your search query...';
    searchInput.value = '';
  });
});

const searchInput = document.querySelector('#search--query');

searchInput.addEventListener('focus', e => {
  searchInput.placeholder = '';
  searchInput.value = '';
});

// const searchInput = document.querySelector('#search--query');

// Add dateline to header

const todayDate = new Date();
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

document.querySelector('.hero__date').textContent = todayDate.toLocaleString(
  'en-UK',
  options
);

// Category select

const categories = document.querySelectorAll('.category');
categories.forEach(category => {
  category.addEventListener('click', e => {
    const topic = e.target.textContent;
    if (topic === 'cycling') {
      params.query = 'cycling bicycle cycle';
      params.endpoint = 'everything';
      params.country = '';
      params.category = '';
    } else if (topic === 'food') {
      params.query = 'food nutrition cooking';
      params.endpoint = 'everything';
      params.country = '';
      params.category = '';
    } else if (topic === 'top stories') {
      params.category = 'general';
      params.query = '';
      params.endpoint = 'top-headlines';
      params.country = 'gb';
    } else {
      params.category = topic;
      params.query = '';
      params.endpoint = 'top-headlines';
      params.country = 'gb';
    }
    params.pageNum = 1;
    clearNewsFeed();
    getNews(params);

    Array.from(categories)
      .filter(category => category.classList.contains('current'))
      .map(category => category.classList.remove('current'));
    category.classList.add('current');

    console.log(categories);
  });
});

// Let's get this party started!

init();
