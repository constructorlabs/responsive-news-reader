// Contains all the urls needed throughout the project
function createNode(element) {
    return document.createElement(element)
}

function append(parent, element) {
    return parent.appendChild(element)
}

const rightArrow = document.querySelector(".next")
rightArrow.addEventListener("click" ,function(){
    pageNumber++;
    console.log(`${pageNumber}`)
    getTopStory(pageNumber);
  
})

const leftArrow = document.querySelector(".prev")
leftArrow.addEventListener("click", function(){
    pageNumber--;
    getTopStory(pageNumber);
})


function getTopStory(pageNumber){
    const topStoryUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=287554a05efe4127bd911a0a216a7b64&page=${pageNumber}`;
    fetch(topStoryUrl)
    .then(response => {
        return response.json()
    })
    .then(body => {
        console.log(body)
        const topUsaNewsArticles = body.articles
        return topUsaNewsArticles.map(article => {
            div.innerHTML="";
            const mainImg = createNode("img")
            const header = createNode("h1")
            const span = createNode("span")
            const link = createNode("a")
            const swiper = createNode("p")
            header.textContent = article.title
            mainImg.setAttribute("src", article.urlToImage)
            span.innerHTML = `</p><span class ="image-span">${article.description}</span></p>`
            link.innerHTML = `<p></p><a href=${article.url} target="_blank">Click here for full story<a/></p>`
            swiper.innerHTML = `<p class="swipe">swipe for latest News</p>`
            append(div, header)
            append(div, mainImg)
            append(div, swiper)
            append(div, span)
            append(div, link)
        })
    })
}

const urls = {
    apiKey: "287554a05efe4127bd911a0a216a7b64",
    topBbcNews: "https://newsapi.org/v2/top-headlines -G \
    -d sources=bbc-news \
    -d apiKey=287554a05efe4127bd911a0a216a7b64",
    topUsaNews: "https://newsapi.org/v2/top-headlines?country=us&apiKey=287554a05efe4127bd911a0a216a7b64",
    trumpNews: "https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=287554a05efe4127bd911a0a216a7b64"
}

const div = document.querySelector("#main");
let pageNumber = 1;

getTopStory(1); //reset page back page 1


// const =
// fetch(url)
// .then(response => {
//     return response.json()
// })
// .then(body => {
//     console.log
// })



