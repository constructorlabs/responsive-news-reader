// const news=document.createElement("p");
const topHeadlines=document.querySelector(".topHeadlines");
const articleList=document.querySelector(".articleList");
const nextPageButton=document.querySelector(".nextPage");
const searchForm=document.querySelector(".searchForm");
const keyword=document.querySelector(".keyword");
let p=1;

let urlBase = 'https://newsapi.org/v2/'
let queries = 'top-headlines?' +
              'country=gb&'
let page = `page=${p}&`;
let pageSize = 'pageSize=5&';
let apiKey = 'apiKey=84e1f3efc2a148dca439f1b5ad3cd201';
let url = urlBase + queries + pageSize + page + apiKey;

let req = new Request(url);
fetch(req)
    .then(response => {

      return response.json()
    })
    .then(response => {
      console.log(response);
      let i=1
        response.articles.forEach(function(item){
          const newsDetail=document.createElement("ul");
          newsDetail.classList.add("onePieceofNews");
          newsDetail.setAttribute("id",i)
          if(item.description!==null){
          newsDetail.innerHTML=`<li class=title >${item.title}</li>
                                <img src=${item.urlToImage} width=100% alt="image">
                                <li class=description>${item.description}</li>
                                <li class=source>${item.source.name}</li>
                                <li class=date>${item.publishedAt}</li>
                                <a href=${item.url}>Read more</a>
                                `;

          articleList.appendChild(newsDetail);
          i++;
        }
          return;
        })

    })
    .catch(error => console.log(error));


nextPageButton.onclick=function(event)  {
    p++;
    page = `page=${p}&`
    url = urlBase + queries + pageSize + page + apiKey;
    console.log("url: ", url);

req = new Request(url);
fetch(req)
    .then(response => {
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
  }

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
