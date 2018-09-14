var url = 'https://newsapi.org/v2/top-headlines?sources=metro&apiKey=7318e7fb7dc04d14af2f0fd675cfda53';
var req = new Request(url);

fetch(req)
    .then(function (response){
        return response.json();
    })
    .then(function(body){
       displayMobileArticle(body);
    })

    function displayMobileArticle(body) {
        body.articles.forEach(article=> {
            const divNode = document.createElement('div');
            divNode.innerHTML = `<h2 class="title">${article.title}</h2><h4 class="date">${article.publishedAt}</h4><img src="${article.urlToImage}">
            <p>${article.content}</p><a href="${article.url}">Read this in Metro</a>`;
            const parentNode = document.querySelector('#newsfeed');
            parentNode.appendChild(divNode);
        })
    }

