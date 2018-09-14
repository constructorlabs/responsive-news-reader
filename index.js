// adds a listener to the search submit button
function formListener () {
	const formElement = document.querySelector("form");
	const formInput = document.querySelector("#form-search");
	formElement.addEventListener('submit', event => {
		event.preventDefault();
		clearArticles();
		search = formInput.value;
		page=1;
		getArticles(1)
	});
}

// adds a listener to the next button
function nextListener () {
	const nextButton = document.querySelector("#next");
	nextButton.addEventListener('click', event => {
		page ++;
		console.log(`getting page: ${page}`)

		getArticles(page);
		addPageLink();
	});
}

// adds listeners that change the colour of the article the mouse is over
function mouseOverArticle(articleNode) {
	articleNode.addEventListener("mouseover", event => {
		articleNode.style.backgroundColor = "red";
	})
	articleNode.addEventListener("mouseout", event => {
		articleNode.style.backgroundColor = "gray";
	})
}

// add a listener to article creating 'click' event that takes user to URL
function clickArticle(articleNode, url) {
	articleNode.addEventListener("click", event => {
	window.location = url;	
	})
}

// clears existing articles from page in preparation for a new search or new page
function clearArticles() {
	const mainNode = document.querySelector('main');
	mainNode.innerHTML = "";
}

function excludeDomain(articleDomain) {
	if (!excludedDomainsArray.includes(articleDomain)) {
		excludedDomainsArray.push(articleDomain);
	}
	console.log(excludedDomainsArray.toString());
	getArticles(1,excludedDomainsArray.toString());
}

function articleTemplate(article, articleDomain) {
	return `
    <div class="article__title"><a href="${article.url}">${article.title}</a></div>
    <div class="article__content">
      <div class="article__description">${article.description}</div>
      <div class="article__image"><img src="${article.urlToImage}"></div>
    </div>
    <div class="article__meta">
        <div class="article__publication">${article.source.name} - exclude articles from <span onclick="excludeDomain('${articleDomain}')">${article.source.name}</span></div>
        <div class="article__date">${article.publishedAt}</div>
    </div>`
}


// takes request body and turns it into html to be appended into 'main'
function createArticles(body) {
	clearArticles();
	body.articles.forEach(article => {
		const articleNode = document.createElement('div');
		articleNode.className = "article";
		let articleDomain = article.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
		articleNode.innerHTML = articleTemplate(article,articleDomain);
		const parentNode = document.querySelector('main');
		parentNode.appendChild(articleNode);
		mouseOverArticle(articleNode)
		//clickArticle(articleNode, article.url);
	});
};

// api request to news api. Returns json and calls createArticles function
function getArticles(page, excludedDomainsStr='') {
	var url = 'https://newsapi.org/v2/everything?' +
		'q=' + search  +
		'&page=' + page +
		'&apiKey=280f7af9f5c448c4a3598861960c947a&sortBy=publishedAt' + 
		'+&excludeDomains=' + excludedDomainsStr;
	var req = new Request(url);
	fetch(req)
		.then(function (response) {
			return response.json();
		})
		.then(function (body) {
			createArticles(body);
		})
}

// adds a link to a new page when the next button is clicked
function addPageLink() {
	const pageLinkNode = document.createElement('li');
	const parentNode = document.querySelector('.pagination__ul');
	pageLinkNode.innerHTML = page;
	pageLinkNode.className = "pagination__page";
	parentNode.appendChild(pageLinkNode);
	pageLinkNode.addEventListener("click", event => {getArticles(pageLinkNode.innerHTML)});
}

const excludedDomainsArray = [];
let search = "uk";
let page = 1;
getArticles();
formListener();
nextListener();
addPageLink();

