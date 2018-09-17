function displayData(articles) {
  const stories = document.querySelector("#article");
  articles.map(article => {
    let div = document.createElement("div");
    stories.appendChild(div);

    let title = document.createElement("h3");
    title.textContent = article.title;
    div.appendChild(title);
    image = document.createElement("img");
    image.setAttribute(
      "src",
      article.urlToImage || "http://placekitten.com/200/300"
    );
    image.setAttribute("alt", article.title || "Nothing to see here");
    image.setAttribute("height", "100px");
    image.setAttribute("width", "150px");
    div.appendChild(image);

    let description = document.createElement("h4");
    description.textContent = article.description;
    div.appendChild(description);

    let source = document.createElement("h5");
    source.textContent = article.source.name;
    div.appendChild(source);

    let datePublished = document.createElement("div");
    datePublished.textContent = article.publishedAt;
    div.appendChild(datePublished);

    let button = document.createElement("a");
    button.textContent = "Original Source";
    button.setAttribute("href", article.url);
    div.appendChild(button);

    // function articleSearch() {
    //   let input = document.getElementById("article.description").placeholder {

    //   }

    //   filter = input.value.toUpperCase(result);
    // }

    console.log(
      "title :",
      article.title,
      "image ",
      article.urlToImage,
      "desc :",
      article.description,
      "source",
      article.source.name,
      "date",
      article.publishedAt,
      "link:",
      article.url
    );
  });
}

fetch(
  "https://newsapi.org/v2/top-headlines?country=gb&apiKey=b7b5bf6dda374f2086f391c826337994"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(body) {
    console.log(body.articles);
    displayData(body.articles);
  })
  .catch(function(error) {
    console.log(error);
  });
