// const news=document.createElement("p");
const topHeadlines=document.querySelector(".topHeadlines");
const articleList=document.querySelector(".articleList");
const nextPageButton=document.querySelector(".nextPage");


let url = 'https://newsapi.org/v2/top-headlines?' +
          'country=gb&' +
          'pageSize=5&'+
          'page=1&'+
          'apiKey=84e1f3efc2a148dca439f1b5ad3cd201';
let req = new Request(url);
fetch(req)
    .then(response => {
      // console.log(response.json());
      return response.json()
    })
    .then(response => {
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

let p=1
nextPageButton.onclick=function(event)  {
    p++;
   url = `https://newsapi.org/v2/top-headlines?country=gb&pageSize=5&page=${p}&apiKey=84e1f3efc2a148dca439f1b5ad3cd201`;

req = new Request(url);
fetch(req)
    .then(response => {
      // console.log(response.json());
      return response.json()
    })
    .then(response => {
      console.log(response);

      let i=1;
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
