
// Contains all the urls needed throughout the project
const urls = {
    apiKey: "287554a05efe4127bd911a0a216a7b64",
    topBbcNews:"https://newsapi.org/v2/top-headlines -G \
    -d sources=bbc-news \
    -d apiKey=287554a05efe4127bd911a0a216a7b64",
    topUsaNews: "https://newsapi.org/v2/top-headlines?country=us&apiKey=287554a05efe4127bd911a0a216a7b64",
    trumpNews: "https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=287554a05efe4127bd911a0a216a7b64"
}
const ul = document.querySelector("#main")

function createNode( element){
    return document.createElement(element)
}

function append(parent, element){
    return parent.appendChild(element)
}


fetch(urls.trumpNews)
.then(response => {
    return response.json()
})
.then(body => {
    console.log(body)
    let trumpNewsArticles = body.articles
    return trumpNewsArticles.map(article => {
        let li = createNode("li")
        mainImg = createNode("img")
        header = createNode("h1")
        span = createNode("span")
        link = createNode("a")
        swiper = createNode("p")
        // img.src = article.urlToImage
        header.textContent = article.title
        mainImg.setAttribute("src", article.urlToImage)
        span.innerHTML = `</p><span class ="image-span">${article.description}</span></p>`
        link.innerHTML = `<p></p><a href=${article.url} target="_blank">Click here for full story<a/></p>`
        swiper.innerHTML = `<p class="swipe">swipe for latest News</p>`
        append(li,header)
        append(li, mainImg)
        append(li, swiper)
        append(li, span)
        append(li, link)
        append(ul, li)
    })
})
