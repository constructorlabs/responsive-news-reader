const apiKey = "e3f2c5f01b3a456eb81a95a2f0e85fc2";

const configTopHeadlines = {
  url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
};

export const topHeadlines = fetch(configTopHeadlines.url)
  .then(response => response.json())
  .then(data => ({
    title: "Top Headlines - USA",
    articles: data.articles.filter(data => data.urlToImage)
  }))
  .catch(e => console.log(e));
