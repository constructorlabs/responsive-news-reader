// News API key: 9ed005ef4eb94baf913fce701c69972f

const apiRequests = {
  usTop20:  'https://newsapi.org/v2/top-headlines?country=us&apiKey=9ed005ef4eb94baf913fce701c69972f',

  ukTop20: 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=9ed005ef4eb94baf913fce701c69972f',
}

function createStoryPanel(article){
  const contentElement = document.querySelector(".content")
  const storyDivElement = document.createElement("div")
  storyDivElement.className = "story-div-element"

  const headlineElement = document.createElement("h4")
  headlineElement.className = "headline"
  headlineElement.textContent = article.title

  const publicationNameElement = document.createElement("h6")
  publicationNameElement.textContent = article.source.name

  const publicationDateElement = document.createElement("h6")
  publicationDateElement.textContent = article.publishedAt

  const storyImageElement = document.createElement("img")
  storyImageElement.setAttribute("src", article.urlToImage)
  storyImageElement.className = "story-image"

  const descriptionElement = document.createElement("p")
  descriptionElement.textContent = article.description

  const linkElement = document.createElement("a")
  linkElement.setAttribute("href", article.url)
  linkElement.textContent = "See full story"

  storyDivElement.appendChild(headlineElement)
  storyDivElement.appendChild(publicationNameElement)
  storyDivElement.appendChild(publicationDateElement)
  storyDivElement.appendChild(storyImageElement)
  storyDivElement.appendChild(descriptionElement)
  storyDivElement.appendChild(linkElement)
  contentElement.appendChild(storyDivElement)


}


function fetchNews(apiAddress){
  fetch(apiAddress)
    .then(response => {
      return response.json()
    })
    .then(body => {
      body.articles.forEach(article => {
        createStoryPanel(article)
      })
    })
}


fetchNews(apiRequests.usTop20)
