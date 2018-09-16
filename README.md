# Responsive News Reader

## A responsive news website. Powered by [News API](https://newsapi.org/).

## Features

- A responsive mobile-first layout that works well and looks good at mobile, tablet and desktop screen sizes.

- News articles fetched from News API and displayed. Each story includes title, image, description, publication source, publication date and a link to the original article.

- Publication date is shown as time elapsed since publication of the story.

- Images only display on tablet and desktop screens.

- Category navigation allows the user to see the top stories in Entertainment, Science, Technology, Health, Food & Cycling.

- Pagination links at the foot of the page allow the user to see the next page of results. The current page number and total number of available pages are also displayed.

- Search functionality to allows the user to retrieve news about a particular topic.

- Sidebar of most popular stories from the _Daily Mail_

- Hidden redact feature when the user searches for 'Trump'

## Code

- Clean, well-commented code.

- Concise functions, each with a clear purpose.

- `redact()` function wraps any 5,6,8 or 9 character word in the headline and story with a `<span>` when the user types 'Trump' in the search query input.

- `cleanData()` function takes the data returned by the News API and filters out any stories that do not have an image link or content in the 'description' field.

## Performance

- Using `window.innerWidth`, images only load in the tablet and desktop views.

- App handles edge cases (reasonably) gracefully, alerting the user if there is an error with the News API.

## CSS

- Clean, well commented CSS.

- Font used throughout is FF Meta a new Variable Font based on the original typeface designed by Erik Spiekermann.

- Grid CSS used to layout tablet and desktop views.

## To Do

- Sanitise news feed to detect broken image links.

- Give the user the choice of where they get most popular stories from in the sidebar.
