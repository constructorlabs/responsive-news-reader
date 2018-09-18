//initialize values
let page = 1;
let searchText = '';
let category = 'General';  
let topic = 'Politics';
let country = 'gb';
let modeLatestNews = false;
let toggleNumber;
const initialAPIQuery = `https://newsapi.org/v2/everything?language=en&page=${page}&q=${topic}&apiKey=4fede2e79736471581f9259c131f0fc2`;
    
//grab HTML elements
const articles = document.querySelector('.articles');
const pageNextButton = document.querySelector('.next');
const pagePrevButton = document.querySelector('.previous');
const form = document.querySelector('.form');
const textArea = document.querySelector('.search');
const sidenavCategory = document.querySelectorAll('.category');
const toggle = document.querySelector('#container');
const toggleContainer = document.querySelector('#toggle-container');
const pageTitle = document.querySelector('.page-title');
const logo = document.querySelector('.logo');
const sidenavOpen = document.querySelector('.fa-bars');
const sidenavClose = document.querySelector('.fa-times');
const searchToggle = document.querySelector('.fa-search');

//initial API query & page render
fetchArticles(initialAPIQuery);

//Listener for side navigation open
sidenavOpen.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector(".sidenav").style.width = "200px";
    document.body.style.backgroundColor = "#cccbcb";
    document.querySelectorAll('.article').forEach(item => {
        item.style.backgroundColor = '#e4e3e3';
    });
});

//Listener for side navigation close
sidenavClose.addEventListener('click', event => {
    event.preventDefault();
    closeSideNav();
});

//Function for side navigation close
function closeSideNav() {
    document.querySelector(".sidenav").style.width = "0";
    document.body.style.backgroundColor = "#e4e3e3";
    document.querySelectorAll('.article').forEach(item => {
        item.style.backgroundColor = 'white';
    });
}

//Listener for side navigation categories
sidenavCategory.forEach(link => {
    link.addEventListener('click', event => {
        modeLatestNews = true;
        category = event.target.innerHTML;
        const APIQuery = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=4fede2e79736471581f9259c131f0fc2`; 
        document.querySelector('.page-nav').setAttribute('style','display: none');
        fetchArticles(APIQuery);
        setTimeout(closeSideNav,500);
        pageTitle.innerHTML = category;
    })
});

//Listener for search bar display toggle
searchToggle.addEventListener('click', event => {
    event.preventDefault();
    if (document.querySelector(".search").style.width === "0px") {
        document.querySelector(".search").style.width = "200px";
    }
    else {
        document.querySelector(".search").style.width = "0px";
    }
});

//Listener for search submit
form.addEventListener('submit', event => {
    event.preventDefault();
    modeLatestNews = false;
    searchText = textArea.value;
    topic = searchText;
    form.reset(); 
    searchText = '';
    document.querySelector(".search-box").style.display = "none";
    const APIQuery = `https://newsapi.org/v2/everything?language=en&page=${page}&q=${topic}&apiKey=4fede2e79736471581f9259c131f0fc2`;
    document.querySelector('.page-nav').setAttribute('style','display: flex');
    fetchArticles(APIQuery);
    pageTitle.innerHTML = 'Search results for ' + topic;
});

//Listener for next page button
pageNextButton.addEventListener('click', event => {
    page++;
    const APIQuery = `https://newsapi.org/v2/everything?language=en&page=${page}&q=${topic}&apiKey=4fede2e79736471581f9259c131f0fc2`;
    fetchArticles(APIQuery);
});

//Listener for previous page button
pagePrevButton.addEventListener('click', event => {
    if (page > 1) {
        page--;
        const APIQuery = `https://newsapi.org/v2/everything?language=en&page=${page}&q=${topic}&apiKey=4fede2e79736471581f9259c131f0fc2`;
        fetchArticles(APIQuery);
    } 
});

//Listener for toggle
toggle.addEventListener('click', function() {
    toggleNumber = !toggleNumber;
    if (toggleNumber) {
        toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
        toggleContainer.style.backgroundColor = '#D74046';
        country = 'us';
    } else {
        toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
        toggleContainer.style.backgroundColor = 'dodgerblue';
        country = 'gb';
    }
    const APIQuery = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=4fede2e79736471581f9259c131f0fc2`;  
    modeLatestNews = true;
    document.querySelector('.page-nav').setAttribute('style','display: none');
    fetchArticles(APIQuery);
    setTimeout(closeSideNav,500);
});

//Listener for Newsroom link
logo.addEventListener('click', event => {
    topic = 'Politics';
    page = 1;
    const APIQuery = `https://newsapi.org/v2/everything?language=en&page=${page}&q=${topic}&apiKey=4fede2e79736471581f9259c131f0fc2`;
    modeLatestNews = false;
    document.querySelector('.page-nav').setAttribute('style','display: flex');
    pageTitle.innerHTML = topic;
    fetchArticles(APIQuery);
});

//Fetch data
function fetchArticles(APIQuery) {
    fetch(APIQuery)
    .then(response => {
        if (!response.ok) throw response;
        return response.json();})
    .then(body => renderArticles(body))
    .catch(error => console.log(error));
}

//Function to generate HTML elements for articles    
function renderArticles(body) {
    articles.innerHTML = '';
    body.articles.forEach(item => {
        const article = document.createElement('article');
        article.setAttribute('class','article');

        const articleTitle = document.createElement('h1');
        articleTitle.innerHTML = item.title;

        const articleLink = document.createElement('a');
        const articleUrl = item.url;
        articleLink.setAttribute('href',articleUrl);
        articleLink.setAttribute('class','articleLink');
        articleLink.appendChild(articleTitle);

        const articleDateSource = document.createElement('h3');
        articleDateSource.setAttribute('class','dateSource');
        articleDateSource.innerHTML = `published ${convertDate(item.publishedAt)} by ${item.source.name}`;
        
        const articleImg = document.createElement('img');
        articleImg.setAttribute('src', item.urlToImage);

        const articleDesc = document.createElement('h2');
        articleDesc.innerHTML = item.description;

        const articleImgDesc = document.createElement('div');
        articleImgDesc.appendChild(articleImg);
        articleImgDesc.appendChild(articleDesc);
        
        article.appendChild(articleLink);
        article.appendChild(articleDateSource);
        article.appendChild(articleImgDesc);
        
        articles.appendChild(article);
    });
}
//Convert date to human readable format 
function convertDate(date) {
    const datePublished = new Date(date);
    const timeDiff = Date.now() - datePublished.valueOf();
    const seconds = Math.round(timeDiff / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);

    if (seconds < 60) return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`;
    else if (minutes < 60) return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
    else if (hours < 24) return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
    else if (days < 7) return `${days} ${days > 1 ? 'days' : 'day'} ago`;
    else return `${weeks} ${weeks > 1 ? 'weeks' : 'week'} ago`;
}

//Top menu hide function
let prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    document.querySelector(".top-menu").style.top = "0";
  } else {
    document.querySelector(".top-menu").style.top = "-10em";
  }
  prevScrollPos = currentScrollPos;
}