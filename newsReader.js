// const news=document.createElement("p");
const topHeadlines=document.querySelector(".topHeadlines");
const articleList=document.querySelector(".articleList");
const nextPageButton=document.querySelector(".nextPage");
const searchForm=document.querySelector(".searchForm");
const keyword=document.querySelector(".keyword");
const body=document.querySelector("body");
let p=1;

const urlBase = 'https://newsapi.org/v2/'
let queries = 'top-headlines?' +
'country=gb&'
let page = `page=${p}&`;
const pageSize = 'pageSize=5&';
const apiKey = 'apiKey=84e1f3efc2a148dca439f1b5ad3cd201';
let url = urlBase + queries + pageSize + page + apiKey;
const newsDetail=document.createElement("ul");
newsDetail.classList.add("onePieceofNews");
articleList.appendChild(newsDetail);


function getNews(piece){
  const newsContent=document.createElement("li")
  if(piece.description!==null){
    newsContent.innerHTML=`
    <h3 class="title">${piece.title}</h3>
    <img src=${piece.urlToImage} width=100% alt="image">
    <p class="description">${piece.description}</p>
    <p class="source">${piece.source.name}</p>
    <p class="date">${piece.publishedAt}</p>
    <a href=${piece.url}>Read more</a>
    `;
    newsDetail.appendChild(newsContent);


  }
}



function fetchNews(){

  return fetch(url)
      .then(response =>  response.json())
      .then(response => {
        newsDetail.innerHTML="";
          response.articles.forEach(piece => getNews(piece))
          })
      .catch(error => console.log(error));

}

fetchNews();

function fetchNewsNextPage(pageNumber){
  page = `page=${pageNumber}&`
  url = urlBase + queries + pageSize + page + apiKey;
  return fetch(url)
  .then(response => response.json())
  .then(response => {
    newsDetail.innerHTML="";
    return response.articles.forEach(piece => getNews(piece))
  })
  .catch(error => console.log(error));
}

body.addEventListener("click", event => {

  if(event.target.matches(".nextPage")){
    p++;
    fetchNewsNextPage(p)
  }
})
// nextPageButton.onclick=function(event)  {
//     p++;
//     page = `page=${p}&`
//     url = urlBase + queries + pageSize + page + apiKey;
//     console.log("url: ", url);
//
// req = new Request(url);
// fetch(req)
//     .then(response => {
//       return response.json()
//     })
    // .then(response => {
    //   console.log(response);
    //
    //   i=1;
    //     response.articles.forEach(function(item){
    //
    //       if(item.description!==null){
    //       newsDetail=document.getElementById(`${i}`)
    //       newsDetail.innerHTML=`<li class=title >${item.title}</li>
    //                             <img src=${item.urlToImage} width=100% alt="image">
    //                             <li class=description>${item.description}</li>
    //                             <li class=source>${item.source.name}</li>
    //                             <li class=date>${item.publishedAt}</li>
    //                             <a href=${item.url}>Read more</a>
    //                             `;
    //
    //
    //
    //       i++;
    //       document.documentElement.scrollTop = 0;
    //     }
    //       return;
    //     })
    //
    // })
  //   .catch(error => console.log(error));
  // }

searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    p=1;
    page = `page=${p}&`
    queries = `everything?q=${keyword.value}&from=2018-09-16&to=2018-09-16&sortBy=popularity&`;
    url = urlBase + queries + pageSize + page + apiKey;
    console.log("url: ", url);

 req = new Request(url);
 fetch(req)
     .then(response => {
       // console.log(response.json());
       return response.json()
     })
     .then(response => {
       console.log(response);

       i=1;
         response.articles.forEach(function(item){

           if(item.description!==null){
           newsDetail=document.getElementById(`${i}`)
           newsDetail.innerHTML=`<li class=title >${item.title}</li>
                                 <img src=${item.urlToImage} width=100% alt="image">
                                 <li class=description>${item.description}</li>
                                 <li class=source>${item.source.name}</li>
                                 <li class=date>${item.publishedAt}</li>
                                 <a href=${item.url}>Read more</a>
                                 `;

           i++;
           document.documentElement.scrollTop = 0;
         }
           return;
         })

     })
     .catch(error => console.log(error));

})
