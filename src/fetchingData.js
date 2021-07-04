//Pagination
let pageNum = 1;
let todayGMT = new Date();
//Get yesterday's date
todayGMT.setDate(todayGMT.getDate() - 1);
let convertedToISO = todayGMT.toISOString();
let url = `https://newsapi.org/v2/everything?q=trump&language=en&from=${convertedToISO}&sortby=popularity&apiKey=2b19d03fc1cf4cd7b62ac5bb15c98827&page=${pageNum}`;
/*
        Send the 20(default) articles through a series of
        functions one at a time to populate our ul. 
        "uri" should be undefined the first time, but not subsequent times
        for purposes of pagination.
*/
function grabData(uri) {
  //Has something been passed into grabData()?
  if (uri !== undefined) {
    fetch(uri)
      .then(response => {
        return response.json();
      })
      .then(nextPageResults => {
        console.log(uri);
        console.log(nextPageResults);
        passArticlesForCreation(nextPageResults);
      });
  } else {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(body => {
        passArticlesForCreation(body);
      });
  }
}
const refreshButton = document.querySelector(".refresh");
refreshButton.addEventListener("click", refreshFeed);

const loadMoreButton = document.querySelector(".loadNext");
loadMoreButton.addEventListener("click", loadMore);

const topButton = document.querySelector(".up");
topButton.addEventListener("click", backUp);

const navList = document.querySelector(".options");
navList.addEventListener("click", function(event) {
  if (event.target.id !== "trump") {
    let country = event.target.id;
    let page = 1;
    let period = convertedToISO;
    let newFeedUrl = `https://newsapi.org/v2/top-headlines?q=trump&language=en&from=${period}&sortby=popularity&country=${country}&apiKey=2b19d03fc1cf4cd7b62ac5bb15c98827&page=${page}`;
    const feed = document.querySelector(".articles__wrapper");
    feed.innerHTML = "";
    grabData(newFeedUrl);
  } else {
    trumpify();
  }
});

//Now this is what I call 'core functionality'.
function trumpify() {
  console.log("present");
  const title = document.querySelector(".page__title");
  title.textContent = "Grabber by the p***y";
  const articles = document.querySelectorAll(".article__whole");
  console.log(articles[1].childNodes);
  articles.forEach(article => {
    article.childNodes[0].childNodes[0].textContent = randomPraise();
    article.childNodes[0].childNodes[0].style.backgroundColor = "#fff";
    article.style.backgroundImage = "url('images/flag.png')";
  });
}
//Probably should be in own JSON file.
function randomPraise() {
  let praise = [
    "Trump did nothing wrong.",
    "Global superstar president Trump turns down nobel prize.",
    "World peace declared under the greatest man to ever live, Donald Trump.",
    "American masses call for all faces on Mt. Rushmore be replaced with Trump's dynamic visage.",
    "The President has saved the lives of five local firemen.",
    "Nine people confirmed better off under President Trump.",
    "The President of the United States is a stand up dude.",
    "'Make America Great Again' to be title of Spielberg's new biopic.",
    "Quentin Tarantino 'okay, for a Jew' declares Trump magnanamously.",
    "Trump to fight for 'bigger' womens rights.",
    "New study shows: If you don't like the President... you're a communist.",
    "Oh say can you see, that Trump is the greatest.",
    "Fox News declares fealty to the legend himself.",
    "Melania's US birth certificate miraculously found in the hands of Administration intern.",
    "Tariffs - too short a word for lexicographer Trump. Should be Tariffics.",
    "'Organge is the new black. You're all racist.' Declares Trump.",
    "President orders new mandates for pronunciation: 'The Jina Ammendment'.",
    "Lord of the Rings to be reshot with the President.",
    "Trump overheard:'Kim Jong Un... sounds delicious, when's dinner?'",
    "Hillary Clinton to be forcibly renamed Shrek, under Federal Law.",
    "The USA to be henceforth referred to in full, according to President Donald J Trump, Great Proclaimer, Holy Unifier and Friend to Small Woodland Creatures."
  ];
  let rand = praise[Math.floor(Math.random() * praise.length)];
  return rand;
}

function backUp() {
  window.scroll(0, 0);
}

function refreshFeed() {
  const title = document.querySelector(".page__title");
  title.textContent = "Grabber";
  //Clear the feed.
  const feed = document.querySelector(".articles__wrapper");
  feed.innerHTML = "";
  //Fill the feed.
  grabData();
}

function loadMore() {
  pageNum++;
  let period = convertedToISO;
  let pageChange = pageNum++;
  let updated = `https://newsapi.org/v2/everything?q=trump&language=en&from=${period}&sortby=popularity&apiKey=2b19d03fc1cf4cd7b62ac5bb15c98827&page=${pageChange}`;
  grabData(updated);
}

function passArticlesForCreation(jsonData) {
  for (let i = 0; i < jsonData.articles.length; i++) {
    createListElement(jsonData.articles[i]);
  }
}

//As they pass in, create list elements from them.
//Call populateNewsFeed on each one.
function createListElement(articleObject) {
  /*CREATE THE LIST ITEM WITH ATTRIBUTES AND ARTICLE CONTENT */
  //List element
  const article = document.createElement("li");
  article.className = "article__whole";
  //Title
  const articleLink = document.createElement("a");
  articleLink.setAttribute("href", articleObject.url);
  articleLink.className = "article__link";

  const articleTitle = document.createElement("h2");
  articleTitle.textContent = articleObject.title;

  articleTitle.className = "article__title";

  //Image and description
  const imageDescWrapper = document.createElement("span");
  imageDescWrapper.className = "image__desc";

  const articleImage = document.createElement("img");
  articleImage.setAttribute("src", articleObject.urlToImage);
  articleImage.className = "article__image";

  const articleDescription = document.createElement("p");
  articleDescription.textContent = articleObject.content;
  articleDescription.className = "article__describe";

  //Date and publication
  const datePubWrapper = document.createElement("span");
  datePubWrapper.className = "date__pub";

  const articleDate = document.createElement("p");
  const pubDate = new Date(articleObject.publishedAt);
  const ammendedDate = pubDate
    .toString()
    .replace("GMT+0100 (British Summer Time)", "");
  articleDate.textContent = ammendedDate;
  articleDate.className = "article__date";

  const articlePub = document.createElement("p");
  articlePub.textContent = articleObject.source.name;

  /*ASSEMBLE THE LIST ITEM*/
  articleLink.appendChild(articleTitle);
  article.appendChild(articleLink);

  imageDescWrapper.appendChild(articleImage);
  imageDescWrapper.appendChild(articleDescription);
  article.appendChild(imageDescWrapper);

  datePubWrapper.appendChild(articleDate);
  datePubWrapper.appendChild(articlePub);
  article.appendChild(datePubWrapper);

  populateNewsFeed(article);
}

// Populate the created list elements:
function populateNewsFeed(article) {
  feed = document.querySelector(".articles__wrapper");
  if (pageNum === 1) {
    feed.prepend(article);
  } else {
    feed.appendChild(article);
  }
}

//PROGRAM START
document.addEventListener("DOMContentLoaded", grabData());
document.querySelector(".options").style.cursor = "pointer";
