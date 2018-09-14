const url = 'https://newsapi.org/v2/top-headlines?' +
'country=gb&' +
'apiKey=7318e7fb7dc04d14af2f0fd675cfda53';
const req = new Request(url);


fetch(req)
    .then(function (response){
        return response.json();
    })
    .then(function(body){
       displayMobileArticle(body);
    })

    function displayMobileArticle(body) {
        body.articles.forEach(article=> {
            if (article.content) {
                const divNode = document.createElement('div');
                divNode.className = 'article-div';
                if (article.urlToImage) {
                    divNode.innerHTML = `<div><h2 class="title">${article.title}</h2></div>
                    <div><h4 class="date">${article.publishedAt}</h4></div>
                    <div><img src="${article.urlToImage}"></div>
                    <div class="content"><p>${article.description}</p></div>
                    <div><a href="${article.url}">Read all about it</a></div>`;
                } else {
                    divNode.innerHTML = `<div><h2 class="title">${article.title}</h2></div>
                    <div><h4 class="date">${article.publishedAt}</h4></div>
                    <div><p>${article.description}</p></div>
                    <div><a href="${article.url}">Read all about it</a></div>`;;
                }
                const parentNode = document.querySelector('#newsfeed');
                parentNode.appendChild(divNode);
            }
        })
    }

//Add event listened to the search form
document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    let searchItem = document.querySelector('#search').value;
    document.querySelector('#newsfeed').textContent = "";
    const searchURL = 'https://newsapi.org/v2/everything?' +
    `q=${searchItem}&` +
    'from=2018-09-14&' +
    'sortBy=popularity&' +
    'language=en&' +
    'apiKey=7318e7fb7dc04d14af2f0fd675cfda53';
    const reqURL = new Request(searchURL);
    fetch(reqURL)
        .then(function (response){
        return response.json();
        })
        .then(function(body){
        displayMobileArticle(body);
        })
        document.querySelector('#search').value = '';
})

