// functions
function createNode(element) {
    return document.createElement(element)
}

function append(parent, element) {
    return parent.appendChild(element)
}


function getTopStory(pageNumber){
    const topStoryUrl = `https://newsapi.org/v2/top-headlines?country=gb&pageSize=1&apiKey=287554a05efe4127bd911a0a216a7b64&page=${pageNumber}`;
    fetch(topStoryUrl)
    .then(response => {
        return response.json()
    })
    .then(body => {
        const topUsaNewsArticles = body.articles
        return topUsaNewsArticles.map(article => {
            topStoryDiv.innerHTML="";
            const mainImg = createNode("img")
            const header = createNode("h1")
            const span = createNode("span")
            const link = createNode("a")
            const swiper = createNode("p")
            const published = createNode("p")
            header.innerHTML = `<h1 class="article-header">${article.title}</h1>`
            mainImg.setAttribute("src", article.urlToImage || 'http://placekitten.com/200/300')
            span.innerHTML = `</p><span class ="image-span">${article.description || `Nothing to display`}</span></p>`
            link.innerHTML = `<p><a class ="btn-more" href=${article.url} target="_blank">Read More<a/></p>`
            published.innerHTML = `<p class="publishedAt">${article.published || `Posted Today`}</p>`
            // swiper.innerHTML = `<p class="swipe">swipe for latest News</p>`
            append(topStoryDiv, header)
            append(topStoryDiv, mainImg)
            append(topStoryDiv, published)
            append(topStoryDiv, swiper)
            append(topStoryDiv, span)
            append(topStoryDiv, link)
        })
    })
}


function nextSlide(){
    pageNumber++;
    getTopStory(pageNumber);
}

const topStoryDiv = document.querySelector("#main");
let pageNumber = 1;
getTopStory(1); //reset page back page 1


// let slideInterval = setInterval(nextSlide,3000);

// const urls = {
//     apiKey: "287554a05efe4127bd911a0a216a7b64",
//     topBbcNews: "https://newsapi.org/v2/top-headlines -G \
//     -d sources=bbc-news \
//     -d apiKey=287554a05efe4127bd911a0a216a7b64",
//     topUsaNews: "https://newsapi.org/v2/top-headlines?country=us&apiKey=287554a05efe4127bd911a0a216a7b64",
//     trumpNews: "https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=287554a05efe4127bd911a0a216a7b64"
// }


// event listeners
// const rightArrow = document.querySelector(".next")
// rightArrow.addEventListener("click" ,function(){
//     pageNumber++;
//     getTopStory(pageNumber);
  
// })

// const leftArrow = document.querySelector(".prev")
// leftArrow.addEventListener("click", function(){
//     pageNumber--;
//     getTopStory(pageNumber);
// })




const techNewsDiv = document.querySelector(".techNews")
const techUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=3&apiKey=287554a05efe4127bd911a0a216a7b64`
function content(url){
fetch(url)
.then(response => {
    return response.json()
})
.then(body => {
    console.log(body)
    const techNews = body.articles
        return techNews.map(article => {
            // techNewsDiv.innerHTML="";
            const mainImg = createNode("img")
            const header = createNode("h1")
            const span = createNode("span")
            const link = createNode("a")
            const swiper = createNode("p")
            const published = createNode("p")
            header.textContent = article.title
            mainImg.setAttribute("src", article.urlToImage || 'http://placekitten.com/200/300')
            span.innerHTML = `</p><span class ="image-span">${article.description || `Nothing to display`}</span></p>`
            link.innerHTML = `<p><a  class ="btn-more" href=${article.url} target="_blank">Read More<a/></p>`
            published.innerHTML = `<p class="publishedAt">${article.published || `Posted Today`}</p>`
           
            append(techNewsDiv, header)
            append(techNewsDiv, mainImg)
            append(techNewsDiv, published)
            
            append(techNewsDiv, span)
            append(techNewsDiv, link)
        })
})
}

content(techUrl)



// search function
function searchNews(){
    let keyword = '"' + document.querySelector("#search_input").value.replace(" ","")
    + '"';

    let apiKey = "287554a05efe4127bd911a0a216a7b64";

    let sortBy = "publishedAt";

    let newsUrl = `https://newsapi.org/v2/everything?q=${keyword}&pageSize=3&sortBy=${sortBy}&apiKey=${apiKey}`;

    techNewsDiv.innerHTML="";
    content(newsUrl);
}





//menu toggle
var open_menu = document.querySelector("#main-menu");
var burger_menu = document.querySelector("#burger_menu");
burger_menu.addEventListener("click", function(){
  burger_menu.classList.toggle("active-burger");
  open_menu.classList.toggle("show-menu-mobile");
});







