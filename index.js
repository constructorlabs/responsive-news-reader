// Fetches the news articles from News API and returns content to displayDataOnPage
fetch('https://newsapi.org/v2/top-headlines?country=gb&apiKey=a346fd18cae743c7a27e0f214df32cbd')
    .then(function (response) {
        return response.json();
    })
    .then(function (content) {
        retrieveNewsItems(content);
    })
    .catch(error => {
        retrieveNewsItems('Server failed to return data');
    });

// Error message displayed when failed to get content from server
function displayErrorToUser(errorMessage) {
    console.log(errorMessage);
}

// Gets content and assigns into individual variables
retrieveNewsItems = (newsItem) => {
    const articleArr = newsItem.articles;
    const headline = newsItem.articles[0].title;
    const description = newsItem.articles[0].description;
    const date = newsItem.articles[0].publishedAt;
    const source = newsItem.articles[0].source.name;
    const imgUrl = newsItem.articles[0].urlToImage;

    setContent(headline);
}

// sets the news items to the items retrieved from retrieveNewsItems
setContent = (headline) => {

    const headlineText = document.querySelector('.headline');
    headlineText.textContent = headline;
    
}




