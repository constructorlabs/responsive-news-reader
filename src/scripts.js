// News API key: 9ed005ef4eb94baf913fce701c69972f

//TODO: stylization, excludeDomains/blocklist

//Object contains possible URLS for fetch requests
const apiRequests = {
  usTop20:  'https://newsapi.org/v2/top-headlines?country=us&apiKey=9ed005ef4eb94baf913fce701c69972f',

  ukTop20: 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=9ed005ef4eb94baf913fce701c69972f',


  customParameters : {
    searchString: {val: null,
                   string: null},

    dateRange: {val: null,
                string: null},

    excludedDomains: {val: null,
                      string: ""},

    page: {val: 1,
           string: ""}
  },

  getURL: function(){
    const customURL = `https://newsapi.org/v2/everything?q=${this.customParameters.searchString.string}${this.customParameters.dateRange.string}${this.customParameters.excludedDomains.string}${this.customParameters.page.string}&apiKey=9ed005ef4eb94baf913fce701c69972f`
        this.currentSearchURL = customURL
        return customURL
  },

  updateSearchURL: function(userString){
    this.customParameters.searchString.string = userString
  },

  updatePageURL: function(inputPage){
    this.customParameters.page.val = inputPage
    this.customParameters.page.string = `&page=${inputPage}`
  },

  updateDateURL: function(daterange){
    this.customParameters.dateRange.val
    this.customParameters.dateRange.string = `&from=${daterange}`
  },

  updateBlockURL: function(){
    const blockedString = this.blockList.join(",")
    this.customParameters.excludedDomains.string = `&excludeDomains=${blockedString}`
  },

  blockList: []

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
      if (searchTextElement.value === ""){
        return
      }
      const dateRange = formatDate(dateRangeElement.value)
      newsDisplayElement.innerHTML = ""
      paginationElement.style.display = "inline"
      apiRequests.updateSearchURL(searchTextElement.value)
      apiRequests.updateDateURL(dateRange)
      const searchString = apiRequests.getURL()
      fetchNews(searchString)
      searchTextElement.value = ""
      this.checkPage()

    })
  },

  checkPage: function(){
    apiRequests.customParameters.page.val === 1
      ? prevPageElement.disabled = true
      : prevPageElement.disabled = false
  },


  paginationControl: function(){
    nextPageElement.addEventListener("click", event => {
      let currentPage = apiRequests.customParameters.page.val
      currentPage ++
      apiRequests.updatePageURL(currentPage)
      const requestedPage = apiRequests.getURL()
      newsDisplayElement.innerHTML = ""
      fetchNews(requestedPage)
      this.checkPage()
    })

    prevPageElement.addEventListener("click", event => {
      let currentPage = apiRequests.customParameters.page.val
      currentPage --
      apiRequests.updatePageURL(currentPage)
      const requestedPage = apiRequests.getURL()
      newsDisplayElement.innerHTML = ""
      fetchNews(requestedPage)
      this.checkPage()

  })

}

}

function assignElement(elementType, elementClassName, elementTextContent){
  const output = document.createElement(elementType)
  output.className = elementClassName
  output.textContent = elementTextContent
  return output
}


//creates each story panel from fetch response
function createStoryPanel(article){
  const storyDivElement = assignElement("div", "story-div-element")
  const headerElement = assignElement("div", "story-header")
  const headerLeftElement = assignElement("div", "story-header-left")
  const publicationInfoElement = assignElement("span", "publication-info")
  const headlineElement = assignElement("h2", "headline", article.title)
  const publicationNameElement = assignElement("h4", "publication-name", article.source.name)
  const publicationDateElement = assignElement("h4", "publication-date", convertDateForDisplay(article.publishedAt))
  const storyImageElement = assignElement("img", "story-image")
  storyImageElement.setAttribute("src", article.urlToImage)
  if (storyImageElement.src === "http://127.0.0.1:3000/null"){
    storyImageElement.setAttribute("src", "../images/No_Image_Available.jpg")
  }

  const descriptionElement = assignElement("p", "description-element", article.description)
  const linkElement = assignElement("a", "full-story-link", "See full story")
  linkElement.setAttribute("href", article.url)


  publicationInfoElement.appendChild(publicationNameElement)
  publicationInfoElement.appendChild(publicationDateElement)

  headerLeftElement.appendChild(headlineElement)
  headerLeftElement.appendChild(publicationInfoElement)

  headerElement.appendChild(headerLeftElement)
  headerElement.appendChild(storyImageElement)


  storyDivElement.appendChild(headerElement)


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
    return `${isoDate}`
  }else{
    return null
  }
}

//formats date for display

function convertDateForDisplay(date){
  const inputDate = new Date(date)
  return inputDate.toLocaleString()
}


function fetchNews(apiAddress){
  fetch(apiAddress)
    .then(response => {
      return response.json()
    })
    .then(body => {
      newsDisplayElement.innerHTML = ""
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
