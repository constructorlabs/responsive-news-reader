// Fetches the news articles from News API and returns content to setContent
fetch('https://newsapi.org/v2/top-headlines?country=gb&apiKey=a346fd18cae743c7a27e0f214df32cbd')
    .then(function (response) {
        return response.json();
    })
    .then(function (content) {
        setContent(content);
    })
    .catch(error => {
        displayErrorToUser('Server failed to return data');
    });

// Error message displayed when failed to get content from server
function displayErrorToUser(errorMessage) {
    console.log(errorMessage);
}

// Clones the first DIV element news-item__container and copies it x amount of times
cloneDiv = (amount) => {
    const parentNode = document.querySelector('.news-container')
    for (i = 1; i < amount; i++) {
        const div = document.querySelector('.news-item__container'),
            clone = div.cloneNode(true);
        parentNode.appendChild(clone);
    }
}

// Sets how many news cards are added to the page
cloneDiv(20);

// sets the news items to the items retrieved from retrieveNewsItems
setContent = (content) => {
    const newsItemContainer = document.querySelectorAll('.news-item__container');
    let counter = 0;
    newsItemContainer.forEach(item => {
        const headlineText = item.querySelector('.headline');
        headlineText.textContent = content.articles[counter].title;

        const descriptionText = item.querySelector('.description');
        descriptionText.textContent = content.articles[counter].description;

        const dateText = item.querySelector('.date');
        dateText.textContent = content.articles[counter].publishedAt;

        const sourceText = item.querySelector('.source');
        sourceText.textContent = content.articles[counter].source.name;

        const imgSrc = item.querySelector('.image');
        imgSrc.src = content.articles[counter].urlToImage;

        counter++;
    });
}