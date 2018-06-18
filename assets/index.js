/* News App CSS file */
const newAPIKey = 'd05cdaa1109d496ebc3443d5ea54ba16';
const categorySearch = document.querySelector('#content__nav--links');
const indvCategory = document.querySelector('#category-link');
const newsArticleArea = document.querySelector('#thumbs');
const invertButton = document.querySelector('#invert-btn');
const appScreen = document.querySelector('#app');
const descriptionToggle = document.querySelector('#descrption-toggle');

function createURL(indvCategory){
    return `https://newsapi.org/v2/top-headlines?category=technology&country=gb&apiKey=${newAPIKey}&pagesize=5`;
}

function display(newsData){
    let newsArticles = newsData.articles.map(function(article){
        return `
            <div class="news-articles">
                <a href='${article.url}' target='_blank'>
                <h3>${article.title}</h3>
                <p id="news-desc" class="news-desc">${article.description}</p>
                <p>${article.publishedAt}</p>
                </a>
            </div>
        `
    }).join('');
    newsArticleArea.innerHTML = newsArticles;
}

function invertColor(){
    if(invertButton.className.match(/(?:|\s) clicked(?!\S)/)){
        appScreen.className = appScreen.className.replace(' clicked', '');
        invertButton.className = invertButton.className.replace(' clicked', '');
    } else {
        appScreen.className += ' clicked';
        invertButton.className += ' clicked';
    }
}

function toggleDesc(){
    const newsDesc = Array.from(document.getElementsByClassName('news-desc'));
    if(descriptionToggle.className.match(/(?:|\s) toggle-on(?!\s)/)){
        newsDesc.forEach(function(el){
        el.className = el.className.replace(' toggle-on', '');
        })
        descriptionToggle.className = descriptionToggle.className.replace(' toggle-on', '');
    } else {
        newsDesc.forEach(function(el){
        el.className += ' toggle-on';
    })
    descriptionToggle.className += ' toggle-on';
    }
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
invertButton.addEventListener('click', invertColor);
descriptionToggle.addEventListener('click', toggleDesc);