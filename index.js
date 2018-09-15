// Sets initial values
const apiUrl = `https://newsapi.org/v2/everything?sources=bbc-news&apiKey=a346fd18cae743c7a27e0f214df32cbd`;
let pageNumber = 1;
let articlesPerPage = 20;

// Fetches the news articles from News API and returns content to displayContent
getContent = (pageNumber) => {
    console.log("Fetching Content");
    let apiString = apiUrl + `&page=${pageNumber}`;
    fetch(apiString)
        .then(function (response) {
            return response.json();
        })
        .then(function (content) {
            console.log(content);
            displayContent(content, pageNumber);
        })
        .catch(error => {
            displayErrorToUser('Server failed to return data');
        });

    // Error message displayed when failed to get content from server
    displayErrorToUser = (errorMessage) => {
        console.log(errorMessage);
    }
}

// Displays the news articles retrieved from getContent
displayContent = (content, pageNumber) => {
    // Sets how many news cards are added to the page
    setLayout(20, pageNumber);
    const parentNode = document.querySelector(`.news-container-page-${pageNumber}`);
    const newsItemContainer = parentNode.querySelectorAll('.news-item__container');

    let counter = 0;

    newsItemContainer.forEach(item => {
        const headlineText = item.querySelector('.headline');
        const descriptionText = item.querySelector('.description');
        const dateText = item.querySelector('.date');
        const sourceText = item.querySelector('.source');
        const imgSrc = item.querySelector('.image');

        headlineText.textContent = content.articles[counter].title;
        descriptionText.textContent = content.articles[counter].description
        dateText.textContent = content.articles[counter].publishedAt;
        sourceText.textContent = content.articles[counter].source.name;
        imgSrc.src = content.articles[counter].urlToImage;

        counter++;
    });
}

// Creates the DIVs for the news articles depending on how many articles per page are set
setLayout = (articlesPerPage, pageNumber) => {
    const parentNode = document.querySelector(`.news-container-page-${pageNumber}`);
    for (i = 1; i < articlesPerPage; i++) {
        const div = document.querySelector('.news-item__container'),
            clone = div.cloneNode(true);
        parentNode.appendChild(clone);
    }
}

// Button listener to clone parent DIV to create another page and set the content
const button = document.querySelector('button');
button.addEventListener("click", (event) => {
    console.log("button was clicked");
    pageNumber++;

    const parentNode = document.querySelector('.container')
    const div = document.querySelector('.news-container-page-1'),
        clone = div.cloneNode(false);
    clone.className = `news-container-page-${pageNumber}`;
    parentNode.appendChild(clone);

    getContent(pageNumber);
})

getContent(pageNumber);