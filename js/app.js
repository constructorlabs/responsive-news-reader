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
            const articleNews = document.createElement('div');
            articleNews.className = 'main__articleNews';
            const imageBox = document.createElement('div');
            imageBox.className = 'main__articleNews__imageBox';
            const textBox = document.createElement('div');
            textBox.className = 'main__articleNews__textBox';

            const sectionMainTitle = document.createElement('section');
            console.log(article);
            sectionMainTitle.className = 'main__articleNews__textBox__title';
            sectionMainTitle.textContent = article.title;
            textBox.append(sectionMainTitle);

            const sectionMainDescription = document.createElement('section');
            sectionMainDescription.className = 'main__articleNews__textBox__description';
            sectionMainDescription.textContent = article.description;
            textBox.append(sectionMainDescription);

            const sectionMainImage = document.createElement('figure');
            sectionMainImage.className = 'main__articleNews__imageBox__image';
            sectionMainImage.style.backgroundImage = `url("${article.urlToImage}")`;
            imageBox.append(sectionMainImage);

            const sectionMainPublished = document.createElement('section');
            sectionMainPublished.className = 'main__articleNews__textBox__published';
            sectionMainPublished.textContent = article.publishedAt;
            textBox.append(sectionMainPublished);

            const sectionMainSource = document.createElement('section');
            sectionMainSource.className = 'main__articleNews__textBox__source';
            sectionMainSource.textContent = article.source.name;
            textBox.append(sectionMainSource);

            articleNews.append(imageBox);
            articleNews.append(textBox);

            main.append(articleNews);
        })


    })
    .catch(function (error) {
        console.log('Server failed to return data: ' + error);
    });