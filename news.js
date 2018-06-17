// Code to display news from News API site. Displays latest headlines by default with ability to search by category and user-specified keyword. Responsive for mobile, tablet and laptop views.

// Variable initialisation
const myApiKey = "167aa74e22a045b58d8d8af7cb8effe8";
const myCountry = "gb";
let myCategory = "";
let url = `https://newsapi.org/v2/top-headlines?country=${myCountry}&apiKey=${myApiKey}${myCategory}`;

//Utility functions
function query(eleID) {
  return document.querySelector(`#${eleID}`);
}
function createNode(eleID) {
  return document.createElement(eleID);
}
function append(parent, eleID) {
  return parent.appendChild(eleID);
}

// Main function to clear previous content and get new data
function start(url) {
  const parent = query("main__content");
  parent.innerHTML = ` `;
  getTopStories(url);
}

// Create HTML to display info
function displayNews(newsArray) {
  const parent = query("main__content");
  newsArray.forEach(newsItem => {
    child = createNode("article");
    child.innerHTML = `
    <h2>
      <a  href= "${newsItem.storyLink}"target='blank'>${newsItem.title}
    </h2> 
    <div id="article__row">
    <img src=${
      newsItem.image === null ? "nrn.png" : newsItem.image
    } max-width="500" width="auto" height="200" <p> ${
      newsItem.description === null ? "" : newsItem.description
    } </br></br>
  (${newsItem.publishDate} - ${newsItem.source}) </p></div> </a>`;
    append(parent, child);
  });
}

// Fetch data from API and populate newsArray with relevant items
function getTopStories() {
  return fetch(url)
    .then(response => response.json())
    .then(function(newsObj) {
      let newsArray = [];
      newsObj.articles.forEach(function(newsItem) {
        let newsData = {
          title: newsItem.title, //title
          image: newsItem.urlToImage, //image
          description: newsItem.description, //description
          source: newsItem.source.name, //publication
          publishDate: newsItem.publishedAt.substring(0, 10), //date
          storyLink: newsItem.url
        };
        newsData.publishDate = formatDate(newsData.publishDate);
        newsArray.push(newsData);
      });
      displayNews(newsArray);
    })
    .catch(error => console.log(`Ruh-roh! ${error}`));
}

// Makes Dates look presentable
function formatDate(date) {
  let myDate = new Date(date);
  const prettyDate = myDate.toDateString().substring(4, myDate.length);
  myDate = prettyDate.split(" ");
  const month = myDate[0];
  const day = parseInt(myDate[1]);
  const year = myDate[2];
  let suffix = "";
  switch (day) {
    case 1:
    case 21:
    case 31:
      suffix = "st";
      break;
    case 2:
    case 22:
      suffix = "nd";
      break;
    case 3:
      suffix = "rd";
      break;
    default:
      suffix = "th";
      break;
  }
  return `${day}${suffix} ${month} ${year}`;
}

// Listeners Below :

// Search by Category functionality -- footer
let footerCategory = query("footer__list");

// Category - Add click event listener
footerCategory.addEventListener("click", function(event) {
  event.preventDefault();
  myCategory = `&category=${event.target.innerText}`;
  url = `https://newsapi.org/v2/top-headlines?country=${myCountry}&apiKey=${myApiKey}${myCategory}`;
  start(url);
});

// User Search functionality -- header
const searchStr = query("search__text");
const searchForm = query("header__search");

//Listener for Search Term
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let mySearchTerm = `everything?q=${searchStr.value}`;
  url = `https://newsapi.org/v2/${mySearchTerm}&apiKey=${myApiKey}`;
  start(url);
});

// Search by Category functionality -- header (repeated in footer)
let headerCategory = query("header__list");

// Category - Add click event listener
headerCategory.addEventListener("click", function(event) {
  event.preventDefault();
  myCategory = `&category=${event.target.innerText}`;
  url = `https://newsapi.org/v2/top-headlines?country=${myCountry}&apiKey=${myApiKey}${myCategory}`;
  start(url);
});

// HEADLINE button functionality
let home = query("main__nav");

// Headline - Add click event listener
home.addEventListener("click", function(event) {
  event.preventDefault();
  url = `https://newsapi.org/v2/top-headlines?country=${myCountry}&apiKey=${myApiKey}`;

  start(url);
});

// Scroll to Top button functionality
let backToTop = query("footer__backtotop"),
  body = document.body,
  docElem = document.documentElement,
  offset = 100,
  scrollPos;

// Top button - Add scroll event listener to display button
window.addEventListener("scroll", function(event) {
  scrollPos = body.scrollTop || docElem.scrollTop;
  backToTop.className = scrollPos > offset ? "visible" : "";
});

// Top button - Add click event listener to execute scroll
backToTop.addEventListener("click", function(event) {
  event.preventDefault();
  window.scrollTo(top);
});

start(url); // Initial page load :)
