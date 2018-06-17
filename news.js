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

function start(url) {
  const parent = query("main__content");
  parent.innerHTML = ` `;
  getTopStories(url);
}

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

// Fetch actual start
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
// Category functionality -- footer
let footerCategory = query("footer__list");

// Category - Add click event listener
footerCategory.addEventListener("click", function(event) {
  event.preventDefault();
  myCategory = `&category=${event.target.innerText}`;
  url = `https://newsapi.org/v2/top-headlines?country=${myCountry}&apiKey=${myApiKey}${myCategory}`;
  start(url);
});

// Category functionality -- header
let headerCategory = query("header__list");

// Category - Add click event listener
headerCategory.addEventListener("click", function(event) {
  event.preventDefault();
  myCategory = `&category=${event.target.innerText}`;
  url = `https://newsapi.org/v2/top-headlines?country=${myCountry}&apiKey=${myApiKey}${myCategory}`;
  start(url);
});

// HOME button functionality
let home = query("main__nav");

// HOME - Add click event listener
home.addEventListener("click", function(event) {
  event.preventDefault();
  url = `https://newsapi.org/v2/top-headlines?country=${myCountry}&apiKey=${myApiKey}`;

  start(url);
});

// Top button functionality
let backToTop = query("footer__backtotop"),
  body = document.body,
  docElem = document.documentElement,
  offset = 100,
  scrollPos;

// Top button - Add scroll event listener
window.addEventListener("scroll", function(event) {
  scrollPos = body.scrollTop || docElem.scrollTop;
  backToTop.className = scrollPos > offset ? "visible" : "";
});

// Top button - Add click event listener
backToTop.addEventListener("click", function(event) {
  event.preventDefault();
  window.scrollTo(top);
});

start(url);
