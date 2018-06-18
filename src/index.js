function submitHandler(event) {
    event.preventDefault();

    // Capture search term
    const getTopic = document.querySelector("#topicSearchBar");
    const topicToSearch = getTopic.value;

    const country = document.querySelector("#countries");
    const countryToSearch = country.value;

    // Get news information
    
    const url = `https://newsapi.org/v2/top-headlines?country=${countryToSearch}&q=${topicToSearch}&apiKey=814db06ca1814aeca4562dbafab25378`;

    fetch(url)
    .then(function(response){
        return response.json();
    }).then(function(data){

        console.log(data);

        const articlesLength = data.articles.length;

        if (articlesLength > 0) {

        const results = data.articles.map(article =>
            `<div class="app__content__body__article"><a href="${article.url}" target="_blank"><h2>${article.title}</h2></a><img class="app__content___body__article--img" src="${article.urlToImage}"><h3>${article.source.name}</h3><p>${article.description}</p><p>Author: ${article.author}</p></div>
            `
        ).join('');
        getTopic.value = '';

        const resultsEl = document.querySelector('#articlesBody');

        resultsEl.innerHTML = results;
    }

    else {
        alert('Hmm, slow news day. Maybe search for something else.');
    }

    }).catch(function(error){
        alert('Sorry, I couldn\'t find anything.');
    });
}

const getSubmit = document.querySelector("#searchTopic");

getSubmit.addEventListener("submit", submitHandler);