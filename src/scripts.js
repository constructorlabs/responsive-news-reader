// News API key: 9ed005ef4eb94baf913fce701c69972f

const apiRequests = {
  usTop20:  'https://newsapi.org/v2/top-headlines?country=us&apiKey=9ed005ef4eb94baf913fce701c69972f',

  ukTop20: 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=9ed005ef4eb94baf913fce701c69972f',

  searchURL: function(userString, daterange){
    if (daterange === null){
      return `https://newsapi.org/v2/everything?q=${userString}&sortBy=popularity&apiKey=9ed005ef4eb94baf913fce701c69972f`
    }else{
      return `https://newsapi.org/v2/everything?q=${userString}${daterange}&sortBy=popularity&apiKey=9ed005ef4eb94baf913fce701c69972f`
    }
  }
}

const pageHandlers = {
  changeCountry: function(){
                    console.log("test")
                    const countryButtonElement = document.querySelector(".country-button")
                    countryButtonElement.addEventListener("click", event => {
                      contentElement.innerHTML = ""
                      countryButtonElement.textContent === "Top UK Stories"
                        ? ( countryButtonElement.textContent = "Top US Stories",
                           fetchNews(apiRequests.ukTop20))
                        : (countryButtonElement.textContent = "Top UK Stories",
                           fetchNews(apiRequests.usTop20))
                    })
                  },

  search: function(){
    const searchFormElement = document.querySelector(".search-form")
    const searchTextElement = document.querySelector(".search-text")
    const dateRangeElement = document.querySelector(".date-range")
    searchFormElement.addEventListener("submit", event => {
      event.preventDefault();
      const dateRange = formatDate(dateRangeElement.value)
      const searchString = apiRequests.searchURL(searchTextElement.value, dateRange)
      contentElement.innerHTML = ""
      searchTextElement.value = ""
      fetchNews(searchString)

    })
  }



}




function createStoryPanel(article){
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


function formatDate(monthsAgo){
  if ( monthsAgo != "all-time") {
    const newDate = new Date
    newDate.setMonth(newDate.getMonth() - monthsAgo);
    const isoDate = newDate.toISOString().slice(0,10)
    return `&from=${isoDate}`
  }else{
    return null
  }
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


const contentElement = document.querySelector(".content")

fetchNews(apiRequests.usTop20)
pageHandlers.changeCountry()
pageHandlers.search()
