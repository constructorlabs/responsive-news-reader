// const news=document.createElement("p");
const topHeadlines=document.querySelector(".topHeadlines");
const articleList=document.querySelector(".articleList");


const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=84e1f3efc2a148dca439f1b5ad3cd201';
let req = new Request(url);
fetch(req)
    .then(response => {
      // console.log(response.json());
      return response.json()
    })
    .then(response => {
      console.log(response);
        response.articles.forEach(function(item){
          const newsDetail=document.createElement("ul");
          newsDetail.classList.add("onePieceofNews");
          if(item.description!==null){
          newsDetail.innerHTML=`<li class=title >${item.title}</li>
                                <img src=${item.urlToImage} width=100% alt="image">
                                <li class=description>${item.description}</li>
                                <li class=source>${item.source.name}</li>
                                <li class=date>${item.publishedAt}</li>
                                <a href=${item.url}>Read more</a>
                                `;

          console.log(newsDetail.innerHTML);

          articleList.appendChild(newsDetail);
        }
          return;
        })

    })
    .catch(error => console.log(error));
