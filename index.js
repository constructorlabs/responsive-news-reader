function getLatestNews (latestNews) {

fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=876e36c7116d4ea8bb23b4b1eb97e8d2')
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    console.log(data.articles);
    return data.articles;
  })
  return 'hello';
};

getLatestNews();