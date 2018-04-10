const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
const db = require('../models/index.js');
const router = express.Router();
const app = express();

// the scrape route that will go to the website, scrape the specified items from the page and return them in an object
// to update the all articles database
router.get('/scrape', function(req, res) {
  axios.get('https://nerdreactor.com/latest-posts/').then(function(response) {
    let $ = cheerio.load(response.data);
    let result = {};
    $('.item_content').each(function(i, element) {

      result.title = $(this)
      	.children('h4')
        .text();
      result.link = $(this)
      	.children('h4')
        .children('a')
        .attr('href');
      result.summary = $(this)
      	.children('p')
      	.text();

      db.AllArticle.create(result)
        .then(function(dbAllArticle) {
        })
        .catch(function(err) {
          return res.json(err);
        });
    });
    res.redirect('back');
  });
});

// this route will pull all the the scraped articles from the database and display them with handlebars
router.get('/all-articles', function(req, res) {
  db.AllArticle.find({})
    .then(function(results) {
    	res.render('index', { articles: results });
    })
    .catch(function(err) {
      res.json(err);
    });
});

// this route will pull all the the saved articles from the database and display them with handlebars
router.get('/saved-articles', function(req, res) {
	db.SavedArticle.find({})
		.populate('articleComments')
		.then(function(articles) {
			res.render('saved', { articles: articles });
		})
		.catch(function(err) {
      		res.json(err);
    	});
});

// this route updates the saved article database with the article object passed in and deletes the same one from the 
// all articles database 
router.post('/api/save/:id', function(req, res) {
	db.SavedArticle.create({
		'title': req.body.title,
		'link': req.body.link,
		'summary': req.body.summary
	});
	console.log('article saved to saved articles!');
	db.AllArticle.remove(
		{
			_id: req.params.id
		},
		function(error, removed) {
		    if (error) {
		        console.log(error);
		        res.send(error);
		    } else {
		    	console.log('removed from all articles');
		     }
		}
	);
});

// this route updates the all article database with the article object passed in and deletes the same one from the 
// saved articles database 
router.post('/api/delete-save/:id', function(req, res) {
	db.AllArticle.create({
		'title': req.body.title,
		'link': req.body.link,
		'summary': req.body.summary
	});
	console.log('article saved to all articles!');
	db.SavedArticle.remove(
		{
			_id: req.params.id
		},
		function(error, removed) {
		    if (error) {
		        console.log(error);
		        res.send(error);
		    } else {
		    	console.log('removed from saved articles');
		     }
		}
	);
});

// this route saves the submited comment to the databse, as well as updated the specific saved article it is saved to 
router.post('/api/submit/:id', function(req, res) {
	console.log(req.body.comment)
	db.Comment.create({
		'body': req.body.comment
	})
	.then(function(data) {
		console.log(req.params.id);
		return db.SavedArticle.findOneAndUpdate(
			{ _id: req.params.id }, 
			{ $push: { articleComments: data._id } }, { new: true });
	})
	res.redirect('back');
});

// this route will delete the comment from the database specified by the id
router.post('/api/delete-comment/:id', function(req, res) {
	db.Comment.remove(
		{
			'_id': req.params.id
		},
		function(error, removed) {
			if (error) {
		        console.log(error);
		       	res.send(error);
		    } else {
		    	console.log('removed from saved articles');
		    	res.redirect('back');
		    }
		}
	)	
});

module.exports = router;