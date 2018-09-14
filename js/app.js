const main = document.querySelector('.main');

fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=454852947b2747dabc52cf3ebcf4807c')
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (body) {
        const articles = body.articles;
        articles.forEach((article) => {

            const sectionMainTitle = document.createElement('section');
            console.log(article);
            sectionMainTitle.className = 'main__title';
            sectionMainTitle.textContent = article.title;
            main.append(sectionMainTitle);

            const sectionMainDescription = document.createElement('section');
            sectionMainDescription.className = 'main__description';
            sectionMainDescription.textContent = article.description;
            main.append(sectionMainDescription);

            const sectionMainImage = document.createElement('figure');
            sectionMainImage.className = 'main__image';
            sectionMainImage.style.backgroundImage = `url("${article.urlToImage}")`;
            main.append(sectionMainImage);

            const sectionMainPublished = document.createElement('section');
            sectionMainPublished.className = 'main__published';
            sectionMainPublished.textContent = article.publishedAt;
            main.append(sectionMainPublished);

            const sectionMainSource = document.createElement('section');
            sectionMainSource.className = 'main__source';
            sectionMainSource.textContent = article.source.name;
            main.append(sectionMainSource);

        })


    })
    .catch(function (error) {
        console.log('Server failed to return data: ' + error);
    });