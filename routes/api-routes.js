const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();
const db = require('../models/index.js');

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

      	console.log(result);

      db.allArticle.create(result)
        .then(function(dbAllArticle) {
        })
        .catch(function(err) {
          return res.json(err);
        });
    });
    res.redirect('back');
  });
});

router.get('/all-articles', function(req, res) {
  db.allArticle.find({})
    .then(function(results) {
    	res.render('index', { articles: results });
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get('/saved-articles', function(req, res) {
	db.savedArticle.find({})
		.then(function(results) {
			res.render('saved', { articles: results });
		})
		.catch(function(err) {
      		res.json(err);
    	});
});

router.post('/api/save/:id', function(req, res) {
	db.savedArticle.create({
		'title': req.body.title,
		'link': req.body.link,
		'summary': req.body.link
	});
	console.log('article saved to saved articles!');
	db.allArticle.remove(
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

router.post('/api/delete-save/:id', function(req, res) {
	db.allArticle.create({
		'title': req.body.title,
		'link': req.body.link,
		'summary': req.body.link
	});
	console.log('article saved to all articles!');
	db.savedArticle.remove(
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















module.exports = router;