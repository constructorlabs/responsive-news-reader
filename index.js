function formListener () {
	const formElement = document.querySelector("form");
	const formInput = document.querySelector("#form-search");
	formElement.addEventListener('submit', event => {
		event.preventDefault();
		clearArticles();
		search = formInput.value;
		page=1;
		getArticles(1)
		console.log("HI");
	});
}

function nextListener () {
	const nextButton = document.querySelector("#next");
	nextButton.addEventListener('click', event => {
		page ++;
		console.log(`getting page: ${page}`)

		getArticles(page);
		addPageLink();
	});
}


function mouseOverArticle(articleNode) {
	articleNode.addEventListener("mouseover", event => {
		articleNode.style.backgroundColor = "red";
	})
	articleNode.addEventListener("mouseout", event => {
		articleNode.style.backgroundColor = "white";
	})
}

function clearArticles() {
	const mainNode = document.querySelector('main');
	mainNode.innerHTML = "";
}

function createArticles(body) {
	clearArticles();
	body.articles.forEach(article => {
		const articleNode = document.createElement('div');
		articleNode.innerHTML = `
    <div class="article__title"><a href="${article.url}">${article.title}</a></div>
    <!--<div class="article__content">
      <div class="article__description">${article.description}</div>
      <div class="article__image"><img src="${article.urlToImage}"></div>
    </div>
    <div class="article__meta">
        <div class="article__publication">${article.source.name}</div>
        <div class="article__date">${article.publishedAt}</div>
    </div>-->`
		const parentNode = document.querySelector('main');
		parentNode.appendChild(articleNode);
		mouseOverArticle(articleNode);
	});
};

function getArticles(page) {
	var url = 'https://newsapi.org/v2/everything?' +
		'q=' + search  +
		'&page=' + page +
		'&apiKey=280f7af9f5c448c4a3598861960c947a';
	var req = new Request(url);
	fetch(req)
		.then(function (response) {
			return response.json();
		})
		.then(function (body) {
			createArticles(body);
		})
}

function addPageLink() {
	const pageLinkNode = document.createElement('li');
	const parentNode = document.querySelector('.pagination__ul');
	console.log(parentNode);
	pageLinkNode.innerHTML = page;
	pageLinkNode.className = "pagination__page";
	parentNode.appendChild(pageLinkNode);
	pageLinkNode.addEventListener("click", event => {getArticles(pageLinkNode.innerHTML)});
}


let search = "cycling";
let page = 1;
getArticles();
formListener();
nextListener();
addPageLink();

