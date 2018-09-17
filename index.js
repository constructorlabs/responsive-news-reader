const container = document.querySelector(".container");
let articlesPerPage = 20;


// Holds the API values for generateApiUrl to use to form a URL String
const apiValues = {
    url: 'https://newsapi.org/v2/',
    key: 'a346fd18cae743c7a27e0f214df32cbd',
    category: 'general',
    search: '',
    page: 1,
    sources: 'bbc-news,independent,the-telegraph,metro,the-new-york-times'
};

// Generates a URL String from the values set in apiValues
const generateApiUrl = () => {
    if (apiValues.search !== '') {
        return `${apiValues.url}everything?q=${apiValues.search}&page=${apiValues.page}&apiKey=${apiValues.key}`;
    } else if (apiValues.page == 1) {
        return `${apiValues.url}top-headlines?country=gb&category=${apiValues.category}&apiKey=${apiValues.key}`;
    } else {
        return `${apiValues.url}everything?sources=${apiValues.sources}&sortBy=publishedAt&page=${apiValues.page}&apiKey=${apiValues.key}`;
    }
}

// Fetches the news articles from News API and returns content to displayContent
const getContent = () => {
    fetch(generateApiUrl())
        .then(function (response) {
            return response.json();
        })
        .then(function (content) {
            displayContent(content);
        })
        .catch(error => {
            displayErrorToUser('There was an error retrieving data. Please try again.');

        });

    // Error message displayed when failed to get content from server
    displayErrorToUser = (errorMessage) => {
        container.innerHTML = `<h4>${errorMessage}</h4>`;
    }
}

// Displays the news articles retrieved from getContent
const displayContent = (content) => {
    // Sets how many news cards are added to the page before displaying content on them
    setLayout(articlesPerPage);
    const parentNode = document.querySelector(`#page-${apiValues.page}`);
    const newsItemContainer = parentNode.querySelectorAll('.news-item__container');

    newsItemContainer.forEach((item, index) => {
        const headlineText = item.querySelector('.headline');
        const descriptionText = item.querySelector('.description');
        const dateText = item.querySelector('.date');
        const sourceText = item.querySelector('.source');
        const imgSrc = item.querySelector('.image');

        if (content.articles[index].urlToImage === null) {
            item.style.display = 'none';
        }
    
        headlineText.textContent = content.articles[index].title;
        descriptionText.textContent = content.articles[index].description
        dateText.textContent = timeDifference(content.articles[index].publishedAt);
        sourceText.textContent = content.articles[index].source.name;
        imgSrc.src = content.articles[index].urlToImage;
        item.href = content.articles[index].url;
    });
}

// Returns minutes or hours since article was published if less, otherwise returns date
const timeDifference = (timePublished) => {
    const msPerMinute = 60000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const currentTime = Date.now();
    const publishedTime = Date.parse(timePublished);
    const elapsedTime = currentTime - publishedTime;

    if (elapsedTime < msPerHour) {
        return Math.round(elapsedTime / msPerMinute) + 'm';
    }
    else if (elapsedTime < msPerDay) {
        return Math.round(elapsedTime / msPerHour) + 'h';
    }
    else {
        return timePublished.substr(0,10);
    }
}

// Inserts 1 page with articles into HTML so that content can be displayed on them
const setLayout = (articlesPerPage) => {
    const newPage = document.createElement('div');
    newPage.className = `news-container`;
    newPage.id = `page-${apiValues.page}`;
    container.appendChild(newPage);

    for (let i = 0; i < articlesPerPage; i++) {
        const newArticle = document.createElement('a');
        newArticle.className = 'news-item__container';
        newArticle.id = `page-${apiValues.page}-article-${i + 1}`;
        newArticle.innerHTML =
            '<img class="image" src="images/test.jpg" />\
        <div class="news-item__text">\
            <div class="headline">Volkswagen to end production of iconic Beetle</div>\
            <h3 class="description">The company announced that it would end global production in July next year</h3>\
            <div class="news-item-info">\
                <h5 class="date">07:24</h5>\
                <h5 class="source">Manchestereveningnews.co.uk</h5>\
            </div>\
        </div>'

        newPage.appendChild(newArticle);
    }
}

// Button listener to clone parent DIV to create another page and set the content
const button = document.querySelector(".more-news-btn");
button.addEventListener("click", (event) => {
    apiValues.page++;
    getContent(apiValues.page);
})

// Button Listener for search button
const searchNews = document.querySelector('.search-form');
searchNews.addEventListener("submit", event => {
    event.preventDefault();
    apiValues.search = document.querySelector(".search-input").value;
    searchNews.reset();
    apiValues.page = 1;
    container.innerHTML = "";
    getContent();

})

// Button Listener for nav buttons
const navUk = document.querySelector('.nav__uk');
navUk.addEventListener("click", event => {
    event.preventDefault();
    apiValues.search = '';
    apiValues.category = '';
    apiValues.page = 1;
    container.innerHTML = "";
    getContent();
})

const navTech = document.querySelector('.nav__tech');
navTech.addEventListener("click", event => {
    event.preventDefault();
    apiValues.search = '';
    apiValues.category = 'technology';
    apiValues.page = 1;
    container.innerHTML = "";
    getContent();
})

// Button Listener for nav buttons
const navScience = document.querySelector('.nav__science');
navScience.addEventListener("click", event => {
    event.preventDefault();
    apiValues.search = '';
    apiValues.category = 'science';
    apiValues.page = 1;
    container.innerHTML = "";
    getContent();
})

// Button Listener for nav buttons
const navHealth = document.querySelector('.nav__health');
navHealth.addEventListener("click", event => {
    event.preventDefault();
    apiValues.search = '';
    apiValues.category = 'health';
    apiValues.page = 1;
    container.innerHTML = "";
    getContent();
})

// Calls getContent to get and then display content once page is first loaded
getContent();