const apiKey = "e3f2c5f01b3a456eb81a95a2f0e85fc2";

export const topHeadlines = () => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      title: "Top Headlines - USA",
      articles: data.articles.filter(data => data.urlToImage)
    }));
};

export const topUkHeadlines = () => {
  const url = `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      title: "Top Headlines - UK",
      articles: data.articles.filter(data => data.urlToImage)
    }))
    .catch(e => console.log(e));
};
export const categoryFetch = qurey => {
  const url = `https://newsapi.org/v2/top-headlines?country=gb&category=${qurey}&apiKey=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      title: qurey,
      articles: data.articles.filter(data => data.urlToImage)
    }))
    .catch(e => console.log(e));
};
