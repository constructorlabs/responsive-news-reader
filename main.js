const mainBody = document.querySelector(".content__body");
const search = document.querySelector("#search");
const keyword = document.querySelector("#search-tf");

function getTopStories(){
  const url ='https://newsapi.org/v2/top-headlines?country=gb&apiKey=1f83068c0e0b46eb8146486c82998a9f';
  return fetch(url)
  .then(function(response){
    return response.json()
  }).then(function(data){
    // console.log(data);
    const topStories = data.articles.filter(imagesOnly => imagesOnly.urlToImage).map(function(article){
      return `
        <li class="article">
          <a href="${article.url}"><img class="article__image" src="${article.urlToImage}"></a>
          <a href="${article.url}" class="article__title">${article.title}</a>
          <p class="article_summary">${article.description}</p>
          <p class="article_source">
          ${article.source['name']}, ${article.publishedAt}
          </p>
        </li>
        `
    }).join('');
    mainBody.innerHTML = `<ul class="article__list">${topStories}</ul>`;
  })
  .catch(function(error){
    console.log('error');
  })
};
getTopStories();

function getArticle(keyword){
  const urlKeyword =`https://newsapi.org/v2/everything?q=${keyword}&apiKey=1f83068c0e0b46eb8146486c82998a9f`;
  return fetch(urlKeyword)
  .then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data);
    const keywordResults = data.articles.filter(imagesOnly => imagesOnly.urlToImage).map(function(article){
      return `
        <li class="article">
          <a href="${article.url}"><img class="article__image" src="${article.urlToImage}"></a>
          <a href="${article.url}" class="article__title">${article.title}</a>
          <p class="article_summary">${article.description}</p>
          <p class="article_source">
          ${article.source['name']}, ${article.publishedAt}
          </p>
        </li>
        `
    }).join('');
    mainBody.innerHTML = `<ul class="article__list">${keywordResults}</ul>`;
  })
  .catch(function(error){
    console.log('getArticle',error);
  })
};

//Event handlers
search.addEventListener('submit', function(event){
  event.preventDefault();
  const keyword = document.querySelector("#search-tf");
  getArticle(keyword.value);
})
