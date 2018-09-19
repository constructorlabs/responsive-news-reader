# Newsroom - A Responsive News Reader

Newsroom is a responsive news website that uses News API to fetch relevant articles and displays them in a user friendly format. 

## Features

- The default behaviour is to fetch 20 articles with keyword 'Politics'. Clicking on the "Newsroom" logo at the top also has the same effect. 

- Every article has a title (that is also the link to the original news website), a publish date and source field, a summary of the news content and an image. Images are displayed on tablets and desktop but are supressed on mobile devices to improve user experience. 

- On the top left corner is a hamburger menu icon that activates the side navigation menu, where the user can choose the news category to be displayed.

- A toggle button allows the user to filter between UK and US based news - the default selection is UK. 

- A search icon resides on the top right corner which toggles the search input field when clicked. Users can submit a search query which would fetch relevant news articles.

- The top menu that includes the hamburger icon, the logo and the search icon disappear as the user scrolls down and pops back up as the user scrolls up, to maximize screen space for article content. 

- Pagination buttons at the bottom of the page allows users to go back and forward. Note: pagination only works for articles fetched using a search keyword due to the way News API queries work - to improve the user experience pagination buttons are hidden in scenarios where the API does not allow their use.