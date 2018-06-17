/* News App CSS file */
const newAPIKey = 'd05cdaa1109d496ebc3443d5ea54ba16';
const categorySearch = document.querySelector('#content__nav--links');
const indvCategory = document.querySelector('#category-link');
const newsArticleArea = document.querySelector('#thumbs');

function createURL(indvCategory){
    const search = indvCategory.textContent;
    return `https://newsapi.org/v2/top-headlines?category=${search}&country=gb&apiKey=${newAPIKey}&pagesize=5`;
}

function display(newsData){
    let newsArticles = newsData.articles.map(function(article){
        return `
            <div class="news-articles">
                <a href='${article.url}' target='_blank'>
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <p>${article.publishedAt}</p>
                </a>
            </div>
        `
    }).join('');
    newsArticleArea.innerHTML = newsArticles;
}

function newsSearch(e){
    e.preventDefault();
    fetch(createURL(e.target))
        .then(function(response){
            return response.json();
        }).then(function(newsData){
            return display(newsData);
        })
}

categorySearch.addEventListener("click", newsSearch);