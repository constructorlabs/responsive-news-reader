// News API key: 9ed005ef4eb94baf913fce701c69972f

//TODO: pagination, stylization, excludeDomains/blocklist

//Object contains possible URLS for fetch requests
const apiRequests = {
  usTop20:  'https://newsapi.org/v2/top-headlines?country=us&apiKey=9ed005ef4eb94baf913fce701c69972f',

  ukTop20: 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=9ed005ef4eb94baf913fce701c69972f',

  displayTop20: true,

//function takes search string, and if specified a date range
  searchURL: function(userString, daterange, page){
    this.displayTop20 = false
    if (daterange === null){
      this.currentSearchURL = `https://newsapi.org/v2/everything?q=${userString}&page=1&sortBy=popularity&apiKey=9ed005ef4eb94baf913fce701c69972f`
      return this.currentSearchURL
    }else{
      this.currentSearchURL = `https://newsapi.org/v2/everything?q=${userString}${daterange}&page=1&sortBy=popularity&apiKey=9ed005ef4eb94baf913fce701c69972f`
      return this.currentSearchURL
    }
  },

  pageChange: function(inputPage){
    const currentURL = this.currentSearchURL
    const pageRegex = /page=(\d)/
    this.currentPage = inputPage
    return currentURL.replace(pageRegex, `page=${inputPage}`)
  },

  currentSearchURL: null,

  currentPage: 1
}


//Object contains functions attached to buttons and page features
const pageHandlers = {
  changeCountry: function(){
    const countryButtonElement = document.querySelector(".country-button")
      countryButtonElement.addEventListener("click", event => {
        paginationElement.style.display = "none";
        newsDisplayElement.innerHTML = ""
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
      newsDisplayElement.innerHTML = ""
      searchTextElement.value = ""
      paginationElement.style.display = "inline"
      fetchNews(searchString)
      this.checkPage()

    })
  },

  checkPage: function(){
    apiRequests.currentPage === 1
      ? prevPageElement.disabled = true
      : prevPageElement.disabled = false
  },


  paginationControl: function(){
    nextPageElement.addEventListener("click", event => {
      let currentPage = apiRequests.currentPage
      currentPage ++
      const requestedPage = apiRequests.pageChange(currentPage)
      newsDisplayElement.innerHTML = ""
      fetchNews(requestedPage)
      this.checkPage()
    })

    prevPageElement.addEventListener("click", event => {
      let currentPage = apiRequests.currentPage
      currentPage --
      const requestedPage = apiRequests.pageChange(currentPage)
      newsDisplayElement.innerHTML = ""
      fetchNews(requestedPage)
      this.checkPage()
    })

  }





}



//creates each story panel from fetch response
function createStoryPanel(article){
  const storyDivElement = document.createElement("div")
  storyDivElement.className = "story-div-element"

  const headerElement = document.createElement("div")
  headerElement.className = "story-header"

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

  headerElement.appendChild(headlineElement)
  headerElement.appendChild(storyImageElement)
  storyDivElement.appendChild(headerElement)
  storyDivElement.appendChild(publicationNameElement)
  storyDivElement.appendChild(publicationDateElement)

  storyDivElement.appendChild(descriptionElement)
  storyDivElement.appendChild(linkElement)
  newsDisplayElement.appendChild(storyDivElement)
}

//formats date for search
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
const newsDisplayElement = document.querySelector(".news-display")
const paginationElement = document.querySelector(".pagination")
const nextPageElement = document.querySelector(".next-page")
const prevPageElement = document.querySelector(".back-page")

fetchNews(apiRequests.usTop20)
pageHandlers.changeCountry()
pageHandlers.search()
pageHandlers.paginationControl()
