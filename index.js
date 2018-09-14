//initialize values
let page = 1;
let pageSize = 20;
let searchText = '';
let topic = 'technology';
let APIQuery = `https://newsapi.org/v2/everything?&q=${topic}&pageSize=${pageSize}&page=${page}&apiKey=4fede2e79736471581f9259c131f0fc2`;

//grab HTML elements
const articles = document.querySelector('.articles');
const pageSizeButtons = document.querySelectorAll('.pageSize');
const pageNextButton = document.querySelector('.page-next');
const pagePrevButton = document.querySelector('.page-prev');
const form = document.querySelector('.form');
const textArea = document.querySelector('.search');

//initial API query
fetch(APIQuery)
    .then(response => response.json())
    .then(body => renderArticles(body));

//Function to generate HTML elements for articles    
function renderArticles(body) {
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

        const articleSource = document.createElement('h3');
        articleSource.innerHTML = item.source.name;

        const articleDate = document.createElement('h3');
        articleDate.innerHTML = item.publishedAt;

        const articleDateSource = document.createElement('div');
        articleDateSource.setAttribute('class','dateSource');
        articleDateSource.appendChild(articleSource);
        articleDateSource.appendChild(articleDate);
        
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
        
        console.log(article);
        articles.appendChild(article);
    });
}

//Listener for search query
textArea.addEventListener('input', event => {
    searchText = event.target.value;
});

//Listener for search submit
form.addEventListener('submit', event => {
    event.preventDefault();
    topic = searchText;
    APIQuery = `https://newsapi.org/v2/everything?q=${topic}&pageSize=${pageSize}&page=${page}&apiKey=4fede2e79736471581f9259c131f0fc2`;
    articles.innerHTML = '';
    form.reset(); 
    searchText = '';
    fetch(APIQuery)
    .then(response => response.json())
    .then(body => renderArticles(body));
});

//Listener for next page button
pageNextButton.addEventListener('click', event => {
    event.preventDefault();
    page++;
    APIQuery = `https://newsapi.org/v2/everything?q=${topic}&pageSize=${pageSize}&page=${page}&apiKey=4fede2e79736471581f9259c131f0fc2`;
    articles.innerHTML = '';
    fetch(APIQuery)
    .then(response => response.json())
    .then(body => renderArticles(body));
});

//Listener for previous page button
pagePrevButton.addEventListener('click', event => {
    event.preventDefault();
    if (page > 1) {
        page--;
        APIQuery = `https://newsapi.org/v2/everything?q=${topic}&pageSize=${pageSize}&page=${page}&apiKey=4fede2e79736471581f9259c131f0fc2`;
        articles.innerHTML = '';
        fetch(APIQuery)
        .then(response => response.json())
        .then(body => renderArticles(body));
    } 
});

//Listener for articles per page
pageSizeButtons.forEach(button => {
    button.addEventListener('click', event => {
    event.preventDefault();
    pageSize = event.target.innerHTML;
    APIQuery = `https://newsapi.org/v2/everything?q=${topic}&pageSize=${pageSize}&page=${page}&apiKey=4fede2e79736471581f9259c131f0fc2`;
    articles.innerHTML = '';
    fetch(APIQuery)
    .then(response => response.json())
    .then(body => renderArticles(body));})
});