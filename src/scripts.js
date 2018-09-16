// News API key: 9ed005ef4eb94baf913fce701c69972f

//TODO: stylization, excludeDomains/blocklist

//Object contains possible URLS for fetch requests
const apiRequests = {
  usTop20:  'https://newsapi.org/v2/top-headlines?country=us&apiKey=9ed005ef4eb94baf913fce701c69972f',

  ukTop20: 'https://newsapi.org/v2/top-headlines?country=gb&apiKey=9ed005ef4eb94baf913fce701c69972f',


//object contains stored parameters for searches
  customParameters : {
    q: {val: null, string: ""},

    from: {val: null, string: ""},

    excludeDomains: {val: null, string: ""},

    language: {val: null, string: ""},

    page: {val: 1, string: ""},

    sortBy: {val: null, string: ""}
  },


//getURL provides a url for API with specified parameters above
  getURL: function(){
    const customURL = `https://newsapi.org/v2/everything?${this.customParameters.q.string}${this.customParameters.from.string}${this.customParameters.excludeDomains.string}${this.customParameters.page.string}${this.customParameters.language.string}${this.customParameters.sortBy.string}&apiKey=9ed005ef4eb94baf913fce701c69972f`
        return customURL
  },

  updateURL: function(parameter, update){
    this.customParameters[parameter].val = update
    if (parameter === "q"){
      this.customParameters[parameter].string = `${parameter}=${update}`
    }else{
      this.customParameters[parameter].string = `&${parameter}=${update}`
    }
  },


  blockList: []

}


//Object contains functions attached to buttons and page features
const pageHandlers = {

  changeCountry: function(){
    const countryButtonElement = document.querySelector(".country-button")
      countryButtonElement.addEventListener("click", event => {
        paginationElement.style.display = "none";
        countryButtonElement.textContent === "Top UK Stories"
          ? ( countryButtonElement.textContent = "Top US Stories",
              fetchNews(apiRequests.ukTop20))
          : (countryButtonElement.textContent = "Top UK Stories",
              fetchNews(apiRequests.usTop20))
      })
    },

  search: function(event){
      event.preventDefault();
      if (searchTextElement.value === ""){
        return
      }
      const dateRange = formatDate(dateRangeElement.value)
      paginationElement.style.display = "inline"
      apiRequests.updateURL("q", searchTextElement.value)
      apiRequests.updateURL("from", dateRange)
      fetchNews(apiRequests.getURL())
      searchTextElement.value = ""
      pageHandlers.checkPage()
    },


  checkPage: function(){
    apiRequests.customParameters.page.val === 1
      ? prevPageElement.disabled = true
      : prevPageElement.disabled = false
  },


  paginationControl: function(event){
    let currentPage = apiRequests.customParameters.page.val
    event.target.value === "next"
      ? currentPage ++
      : currentPage --
    apiRequests.updateURL("page", currentPage)
    fetchNews(apiRequests.getURL())
    pageHandlers.checkPage()


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
const searchFormElement = document.querySelector(".search-form")
const searchTextElement = document.querySelector(".search-text")
const dateRangeElement = document.querySelector(".date-range")
const advancedSearchElement = document.querySelector(".advanced-search")
const advancedSearchMenu = document.querySelector(".advanced-search-options")
const advancedSearchForm = document.querySelector(".advanced-search-form")
const languageSelector = document.querySelector(".language-select")
const sortBySelector = document.querySelector(".sort-by-select")
searchFormElement.addEventListener("submit", pageHandlers.search)
prevPageElement.addEventListener("click", pageHandlers.paginationControl)
nextPageElement.addEventListener("click", pageHandlers.paginationControl)

advancedSearchElement.addEventListener("click", event => {
  console.log("click")
  advancedSearchMenu.style.display === "none"
    ? advancedSearchMenu.style.display = "block"
    : advancedSearchMenu.style.display = "none"
})

advancedSearchForm.addEventListener("submit", event => {
  event.preventDefault()
  apiRequests.updateURL("language", languageSelector.value)
  apiRequests.updateURL("sortBy", sortBySelector.value )
})




fetchNews(apiRequests.usTop20)
pageHandlers.changeCountry()
