// adds a listener to the search submit button
function formListener () {

function articleTemplate(article, articleDomain) {
        return 
        
 // takes request body and turns it into html to be appended into 'main'
function createArticles(body) {
        
// api request to news api. Returns json and calls createArticles function
function getArticles(page=1, excludedDomainsStr='', filterDomains="") {

// add a listener to article creating 'click' event that takes user to URL
function clickArticle(articleNode, url) {

// adds listeners that change the colour of the article the mouse is over
function mouseOverArticle(articleNode) {



// clears existing articles from page in preparation for a new search or new page
function clearArticles() {

// clears publishers
function clearPublishers() {

// clears pagination
function clearPagination() {

function excludeDomain(articleDomain) {

// creates red buttons for excluded domains / publishers at top of page.
function createExcluded() {



// adds 5 page links to bottom of page
function addPagination(totalResults) {

function publisherCount(articles) {
clearPublishers();

global

const publisherObject = [];
const excludedDomainsArray = [];
let search = "uk";
let itemId = 1;
