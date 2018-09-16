const main = document.querySelector('.main');
// fetch('https://newsapi.org/v2/top-headlines?apiKey=454852947b2747dabc52cf3ebcf4807c&country=au')

fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=454852947b2747dabc52cf3ebcf4807c')
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (body) {
        const articles = body.articles;
        articles.forEach((article) => {
            console.log(article);

            const articleNews = document.createElement('div');
            articleNews.className = 'main__articleNews';

            const sectionMainTitle = document.createElement('h2');
            sectionMainTitle.className = 'main__articleNews__title';
            sectionMainTitle.textContent = article.title;
            articleNews.append(sectionMainTitle);

            const sectionMainDescription = document.createElement('section');
            sectionMainDescription.className = 'main__articleNews__description';
            sectionMainDescription.textContent = article.description;
            const urlContent = article.url;
            const urlContentElement = document.createElement('a');
            urlContentElement.className = 'main__articleNews__content__url';
            urlContentElement.setAttribute('href', urlContent);
            urlContentElement.setAttribute('target', '_blank');
            urlContentElement.textContent = 'click here for full article';
            sectionMainDescription.append(document.createElement('br'));
            sectionMainDescription.append(urlContentElement);

            articleNews.append(sectionMainDescription);

            // const sectionMainContent = document.createElement('section');
            // sectionMainContent.className = 'main__articleNews__content';

            // urlContentElement.className = 'main__articleNews__content__url';
            // urlContentElement.setAttribute('href', urlContent);
            // urlContentElement.setAttribute('target', '_blank');
            // urlContentElement.textContent = 'click here for full article';
            // sectionMainContent.textContent = `${articleContent}`;
            // sectionMainContent.append(document.createElement('br'));
            // sectionMainContent.append(urlContentElement);

            // articleNews.append(sectionMainContent);

            const sectionMainImage = document.createElement('figure');
            sectionMainImage.className = 'main__articleNews__image';
            sectionMainImage.style.backgroundImage = `url("${article.urlToImage}")`;
            articleNews.append(sectionMainImage);

            const sectionMainPublished = document.createElement('section');
            sectionMainPublished.className = 'main__articleNews__published';
            sectionMainPublished.textContent = article.publishedAt;
            articleNews.append(sectionMainPublished);

            const sectionMainSource = document.createElement('section');
            sectionMainSource.className = 'main__articleNews__source';
            sectionMainSource.textContent = article.source.name;
            articleNews.append(sectionMainSource);

            main.append(articleNews);
        })


    })
    .catch(function (error) {
        console.log('Server failed to return data: ' + error);
    });