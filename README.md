# news-scraper

This a web app that lets users view and leave comments on the latest news from nerdreactor.com.

This app was built with a Mongodb database and primaily uses Mongoose and Cheerio to scrape news from the website.

### Other technologies used:

* HTML5
* CSS
* Javascript
* Jquery
* express
* express-handlebars
* mongoose
* body-parser
* cheerio
* request

## User Walkthrough

When the page is fist visited, there will be only the header until the scrape new articles button is clicked. This will populate the page with all of the lastest articles. **Duplicate articles will not populate.** If there are no new articles nothing will be loaded.

![app photo 1](https://github.com/ColeSantiago/news-scraper/blob/master/public/img/readme-1.png)

![app photo 2](https://github.com/ColeSantiago/news-scraper/blob/master/public/img/readme-2.png)

The user is able to go through the articles and either click to read more which will direct them to the actual article link, or they can save the article.

![app photo 3](https://github.com/ColeSantiago/news-scraper/blob/master/public/img/readme-3.png)

When the user goes to the saved article page, the page will be populated with all of the articles they have saved.

Another feature of this page is the option to add comments to each of the saved articles.

![app photo 4](https://github.com/ColeSantiago/news-scraper/blob/master/public/img/readme-4.png)

Each article has a comment box and each comment will be linked specifially to whatever saved article it is posted to.

The user is also able to delete articles from their saved list, which will out it back on the all articles page.

They can also delete their comments on each article.

---------

This app can be run on a node server with mongodb, or it can be found [here](https://news-scraper-colesantiago.herokuapp.com/all-articles)