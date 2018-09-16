let itemId = 1;


// adds a listener to the search submit button
const formListener = () => {
	const formElement = document.querySelector("form");
	const formInput = document.querySelector("#form-search");
	formElement.addEventListener('submit', event => {
		event.preventDefault();
		search = formInput.value;
		page=1;
		getArticles(1,excludedDomainsArray);
	});
}

// api request to news api. Returns json and calls createArticles function
const getArticles = (page=1, excludedDomainsStr='', filterDomains="") => {
	var url = 'https://newsapi.org/v2/everything?' +
		'q=' + search  +
		'&page=' + page +
		'&apiKey=280f7af9f5c448c4a3598861960c947a&sortBy=publishedAt' + 
		'+&excludeDomains=' + excludedDomainsStr + '&domains=' + filterDomains;
	var req = new Request(url);
	fetch(req)
		.then(function (response) {
			return response.json();
		})
		.then(function (body) {
			createArticles(body)
			createExcluded();;
			publisherCount(body.articles);
			addPagination(body.totalResults);

		})
}


// takes request body and turns it into html to be appended into '.articles'
const createArticles = (body) => {
	clearDiv('.articles');
	itemId = 0;
	body.articles.forEach(article => {
		itemId ++
		const articleNode = document.createElement('div');
		articleNode.className = "article";
		let articleDomain = article.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
		articleNode.innerHTML = articleTemplate(article,articleDomain, itemId);
		const parentNode = document.querySelector('.articles');
		parentNode.appendChild(articleNode);

		const excludeDomainSpan = document.createElement('span');
		excludeDomainSpan.textContent = "Exclude Publisher";
		excludeDomainSpan.className = "excludeButton";
		const excludeDomainSpanParent = document.querySelector(`#item${itemId}`);
		excludeDomainSpanParent.appendChild(excludeDomainSpan);
		excludeDomainSpan.addEventListener("click", event => {
			excludeDomain(articleDomain);
		})
		mouseOverArticle(articleNode)
		clickArticle(articleNode, article.url);
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	});
};

const articleTemplate = (article, articleDomain) => {
	return `
    <div class="article__title"><a href="${article.url}">${article.title}</a></div>
    <div class="article__content">
      <div class="article__description">${article.description}</div>
      <div class="article__image"><img src="${article.urlToImage}"></div>
    </div>
    <div class="article__meta">
        <div class="article__publication">${article.source.name}<p id="item${itemId}"></p></div>
        <div class="article__date">${article.publishedAt}</div>
    </div>`
}

// add a listener to article creating 'click' event that takes user to URL
const clickArticle = (articleNode, url) => {
	articleNode.addEventListener("click", event => {	
		window.location = url;		
	})
}


function excludeDomain(articleDomain) {
	event.stopPropagation();
	if (!excludedDomainsArray.includes(articleDomain)) {
		excludedDomainsArray.push(articleDomain);
	}
	getArticles(1,excludedDomainsArray.toString());
}

// creates red buttons for excluded domains / publishers at top of page.
function createExcluded() {
	document.querySelector('.excludedDomains').innerHTML = "";
	if (excludedDomainsArray.length>0) {
		document.querySelector('.excludedDomains__message').style.display = 'flex';
		excludedDomainsArray.forEach(domain => {
			const parentNode = document.querySelector('.excludedDomains');
			const childNode = document.createElement('li');
			childNode.className = "excludedDomains__li";
			childNode.innerHTML = domain;
			parentNode.appendChild(childNode);
			childNode.addEventListener("click", event => {
				excludedDomainsArray.splice(excludedDomainsArray.indexOf(domain),1);
				getArticles();
			})
		})
		document.querySelector('.excludedDomainsDiv').style.display = 'flex';
	} else {
		document.querySelector('.excludedDomainsDiv').style.display = 'none';
	}
	if (excludedDomainsArray.length > 4) {
		document.querySelector('.excludedDomainsDiv').style.flexDirection = 'column';
	}
}









// adds 5 page links to bottom of page
function addPagination(totalResults) {
	clearDiv('.pagination__ul');
	let numberOfPages = Math.floor(totalResults/20)+1;
	if (numberOfPages > 5) {numberOfPages = 5};
	for (i=1;i<=numberOfPages;i++) {
		const pageLinkNode = document.createElement('li');
		const parentNode = document.querySelector('.pagination__ul');
		pageLinkNode.innerHTML = i;
		pageLinkNode.className = "pagination__page";
		parentNode.appendChild(pageLinkNode);
		pageLinkNode.addEventListener("click", event => {getArticles(pageLinkNode.innerHTML)});
	}
}

// counts the articles on the  search query by publisher and sorts them. Publisher can be clicked to show search by term + publishers filter.
// can definitely be re-written. Seems like a pretty messy way of sortinging that I've used.

const publisherCount = (articles) => {
	clearDiv('.publisher__list');
	let publishersNames = [];
	const publishersObjects = {};
	const publishersCount = [];

	articles.forEach(article =>  {
		if (!publishersNames.includes(article.source.name)) {
			let articleDomain = article.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
			publishersNames.push(article.source.name)
			publishersObjects[article.source.name]= {name:article.source.name,domain:articleDomain,count:1}
		} else {
			publishersObjects[article.source.name].count++;
		}
	})
	
	publishersNames.forEach(publisher => {
		publishersCount.push([publishersObjects[publisher].name,publishersObjects[publisher].count]);
	})

	publishersCount.sort(function(b, a) {
		return a[1] - b[1];
	});

	publishersNames =[];

	publishersCount.forEach(publisher => {
		publishersNames.push(publisher[0]);
	})

	publishersNames.forEach(publisher => {
		const parentNode = document.querySelector('.publisher__list');
		const childNode = document.createElement('div');
		childNode.textContent = `${publisher} (${publishersObjects[publisher].count})`;
		parentNode.appendChild(childNode);
		childNode.addEventListener("click", event => {getArticles(1,"",publishersObjects[publisher].domain)})
	})
}


// adds listeners that change the colour of the article the mouse is over - move to css
const mouseOverArticle = (articleNode) => {
	articleNode.addEventListener("mouseover", event => {
		articleNode.style.backgroundColor = "#ffc754";
	})
	articleNode.addEventListener("mouseout", event => {
		articleNode.style.backgroundColor = "white";
	})
}


const clearDiv = (divClass) => {
	const mainNode = document.querySelector(divClass);
	mainNode.innerHTML = "";
	console.log(`div cleared: ${divClass}`);
};

const publisherObject = [];
const excludedDomainsArray = [];
let search = "uk";


getArticles();
formListener();





