/*
  _____                 ______                _   _                   _ _ _         
  / ____|               |  ____|              | | (_)                 | (_) |        
 | |     ___  _ __ ___  | |__ _   _ _ __   ___| |_ _  ___  _ __   __ _| |_| |_ _   _ 
 | |    / _ \| '__/ _ \ |  __| | | | '_ \ / __| __| |/ _ \| '_ \ / _` | | | __| | | |
 | |___| (_) | | |  __/ | |  | |_| | | | | (__| |_| | (_) | | | | (_| | | | |_| |_| |
  \_____\___/|_|  \___| |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|\__,_|_|_|\__|\__, |
                                                                                __/ |
                                                                               |___/ 
*/
let url =
  "https://newsapi.org/v2/top-headlines?q=trump&language=en&apiKey=2b19d03fc1cf4cd7b62ac5bb15c98827";

const grabData = () => {
  fetch(url)
    .then(response => {
      return response.json();
      /*run animation on list items.*/
    })
    .then(body => {
      /*
        Send the 20(default) to another
        function one at a time to populate our ul. 
        */
      for (let i = 0; i < body.articles.length; i++) {
        createListElement(body.articles[i]);
      }
    });
};
//On page load.
document.addEventListener("DOMContentLoaded", grabData());

const refreshButton = document.querySelector(".refresh");
refreshButton.addEventListener("click", function() {
  //Clear the feed.
  const feed = document.querySelector("articles__wrapper");
  feed.innerHTML = "";
  //Fill the feed.
  grabData();
});

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
  articleDate.textContent = articleObject.publishedAt;
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
  feed.prepend(article);
}

const refineFeed = document.querySelector(".refine");
refineFeed.addEventListener("click", function() {
  const refineList = document.querySelector(".dropdown__list");
});

/*  _____ _                     _      _        
  / ____(_)                   (_)    | |       
 | |  __ _ _ __ ___  _ __ ___  _  ___| | _____ 
 | | |_ | | '_ ` _ \| '_ ` _ \| |/ __| |/ / __|
 | |__| | | | | | | | | | | | | | (__|   <\__ \
  \_____|_|_| |_| |_|_| |_| |_|_|\___|_|\_\___/
                                               
                                                */

//Causes putin to pop up when the 'Grabber' logo is hovered.
const home = document.querySelector(".home");
home.addEventListener("mouseover", function() {
  const putin = document.querySelector(".oi__cheeky");
  putin.style.display = "inline";
});
