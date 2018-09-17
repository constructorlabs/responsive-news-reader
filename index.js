const form = document.querySelector(".submit-button");
const lucky = document.querySelector(".feelingLucky");
let next = document.querySelector(".next");
let prev = document.querySelector(".previous");
var pageNumber = 1;
var searchQuery = "";
var textarea = document.querySelector(".textarea")
let parent = document.querySelector(".main");

function luckyDisplayTest(articles) {
  articles.forEach(function(article, index) {
    if (index === 0) {
      let x = document.createElement("div")
      x.className = "newsitem"
      date = moment(article.publishedAt).format('LL');
      age = moment(article.publishedAt).startOf('day').fromNow();
      console.log(age)
      // age = moment(article.publishedAt).format('LL')
      x.innerHTML = `
                    <div class="image">
                      <a href=${article.url} target="_blank"><img id="newsImage" src=${article.urlToImage} alt="story image"></a>
                    </div>
                    <div class="newsbody">
                      <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                        <h3>${date}&nbsp;&nbsp;&nbsp;&nbsp;<i>${age}</i></h3>
                      <p>${article.description}</p>
                    </div>
                      `
      parent.appendChild(x);
      z = `${article.url}`
      window.open(z)
    }
    else {
      let x = document.createElement("div")
      x.className = "newsitem"
      date = moment(article.publishedAt).format('LL');
      age = moment(article.publishedAt).startOf('day').fromNow();
      console.log(age)
      // age = moment(article.publishedAt).format('LL')
      x.innerHTML = `
                    <div class="image">
                      <a href=${article.url} target="_blank"><img id="newsImage" src=${article.urlToImage} alt="story image"></a>
                    </div>
                    <div class="newsbody">
                      <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                        <h3>${date}&nbsp;&nbsp;&nbsp;&nbsp;<i>${age}</i></h3>
                      <p>${article.description}</p>
                    </div>
                      `
      parent.appendChild(x);
    }
  })
}

function displayTest(articles) {
  articles.forEach(function(article, index) {
      let x = document.createElement("div")
      x.className = "newsitem"
      date = moment(article.publishedAt).format('LL');
      age = moment(article.publishedAt).startOf('day').fromNow();
      // age = moment(article.publishedAt).format('LL')
      x.innerHTML = `
                    <div class="image">
                      <a href=${article.url} target="_blank"><img id="newsImage" src=${article.urlToImage} alt="story image"></a>
                    </div>
                    <div class="newsbody">
                      <h2><a href=${article.url} target="_blank">${article.title}</a></h2>
                      <h3>${date}&nbsp;&nbsp;&nbsp;&nbsp;<i>${age}</i></h3>
                      <p>${article.description}</p>
                    </div>
                      `
      parent.appendChild(x);
  })
}


form.addEventListener("click", function(event){
    searchQuery = textarea.value
    var url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=9cf488552aab44aa8b6b1afe46d2f8cf&page=${pageNumber}`
    event.preventDefault()
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          parent.innerHTML = ""
          displayTest(body.articles)
          // textarea.value = ""
        })
    })




lucky.addEventListener("click", function(event){
    searchQuery = textarea.value
    var url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=9cf488552aab44aa8b6b1afe46d2f8cf&page=${pageNumber}`
    event.preventDefault()
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          parent.innerHTML = ""
          luckyDisplayTest(body.articles)
          // textarea.value = ""
        })
    })

next.addEventListener("click", function(event){
    searchQuery = textarea.value
    pageNumber++
    var url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=9cf488552aab44aa8b6b1afe46d2f8cf&page=${pageNumber}`
    event.preventDefault()
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          parent.innerHTML = ""
          displayTest(body.articles)
        })
    })

window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  if (Math.ceil(scrolled) === scrollable) {
    searchQuery = textarea.value
    pageNumber++
    var url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=9cf488552aab44aa8b6b1afe46d2f8cf&page=${pageNumber}`
    event.preventDefault()
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(body) {
          // parent.innerHTML = ""
          displayTest(body.articles)
        })
  }
})
