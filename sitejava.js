let fetchPromise = fetch('https://newsapi.org/v2/top-headlines?country=gb&apiKey=56887af3601845008f0dc6fa7f8b8810') //fetchs default page -news in UK


const Buttons = document.querySelectorAll(".normButton")
const categoryButtons = document.querySelectorAll(".categoryButton")
const paginationButton = document.querySelector(".pagButton")
const form = document.querySelector("form")
const textArea = document.querySelector(".textarea")


let textInBox = "" // variable to hold the value input to the text area
textArea.addEventListener("input", function(event) {
  textInBox = event.target.value
  console.log(textInBox) // sets varibale to equal the contents of text box
})

form.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log(textInBox)
  const articleParentNode = document.querySelector(".newsfeed")
  const childNewsArticle = document.querySelectorAll(".articleBox")
  childNewsArticle.forEach(function(arrayValue) {
    articleParentNode.removeChild(arrayValue) //removes our current news feed we loaded from deault page
  })

  fetchPromise = fetch(`https://newsapi.org/v2/everything?q=${textInBox}&page=1&apiKey=56887af3601845008f0dc6fa7f8b8810`)

  fetchPromise.then(function(response) {
    return response.json()
  }).then(function(body) {
    console.log(body.articles)
    createArticleBlock(body.articles) //calls our article create function with new fetch API
  })

})



Buttons.forEach(function(arrayValue) { // this loop goes over the buttons
  arrayValue.addEventListener("click", function(event) { // adds a listener
    const articleParentNode = document.querySelector(".newsfeed")
    const childNewsArticle = document.querySelectorAll(".articleBox")
    console.log(childNewsArticle)
    childNewsArticle.forEach(function(arrayValue) {
      articleParentNode.removeChild(arrayValue) //removes our current news feed we loaded from deault page
    })

    if (event.target.textContent === "GB" || event.target.textContent === "US") {
      fetchPromise = fetch(`https://newsapi.org/v2/top-headlines?country=${event.target.textContent}&apiKey=56887af3601845008f0dc6fa7f8b8810`)
    } else if (event.target.textContent === "Sport") {
      fetchPromise = fetch(`https://newsapi.org/v2/top-headlines?country=gb&category=${event.target.textContent.toLowerCase()}&apiKey=56887af3601845008f0dc6fa7f8b8810`)
    } else {
      fetchPromise = fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${event.target.textContent.toLowerCase()}&apiKey=56887af3601845008f0dc6fa7f8b8810`)
    }

    fetchPromise.then(function(response) {
      return response.json()
    }).then(function(body) {
      console.log(body.articles)
      createArticleBlock(body.articles) //calls our article create function with new fetch API
    })
  })
})

let pageCount = 1
let isLoading = false

window.addEventListener('scroll', function(e) { // this fires a console.log at bottom of page
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
    if (isLoading) {
      console.log("Is loading")
    }

    pageCount++

    isLoading = true

    const fetchPromise = fetch(`https://newsapi.org/v2/everything?q=${textInBox}&page=${pageCount}&apiKey=56887af3601845008f0dc6fa7f8b8810`)

    fetchPromise.then(function(response) {
      return response.json()
    }).then(function(body) {
      console.log(body.articles)

      createArticleBlock(body.articles)

      isLoading = false
    })
  }

  console.log('Not bottom')
  console.log(window.scrollY + window.innerHeight, document.body.scrollHeight)
})

fetchPromise.then(function(response) {
  return response.json()
}).then(function(body) {
  createArticleBlock(body.articles)
})



function createArticleBlock(newsStory) {
  const articleParentNode = document.querySelector(".newsfeed")

  newsStory.forEach(function(arrayValue) {
    const element = document.createElement('div')
    element.className = "articleBox"
    element.innerHTML = `
      <div class ="imgDiv">
      <img class = "articleImage" src="${arrayValue.urlToImage}">
      </div>
      <div class="articleBoxContent">
        <div class="articleTitle">
          <h3>${arrayValue.title}</h3> <!-- just for testing -->
        </div>
        <div class="articleBrief">
          <p>${arrayValue.description}</p>
          <!-- just for testing -->
        </div><!-- end of articleBrief -->
        <div class="articleMeta">
          <div class="articlesMetaPostedOn">
            <span>Posted on</span>
            <span class="articleMetaPostedOnDate">
         ${arrayValue.publishedAt} <!-- just for testing -->
       </span>
          </div>
          <div class="articleBy">
            <span>by</span>
            <span>
         ${arrayValue.author} <!-- just for testing -->
       </span>
          </div>
          <div class="articleLink">
            <a href="${arrayValue.url}">View &rarr;</a> <!-- just for testing -->
          </div>
        </div><!-- end of articleMeta -->
      </div><!-- end of articleContent -->
    <!-- end of articleBlock -->
    `
    articleParentNode.append(element)
  })
}








/*function createCharacter(character){
  const element = document.createElement('div');
  element.innerHTML = `
    <span>${character.name}</span>
    <img src="${character.img}" />
  `
  return element;
}
*/
