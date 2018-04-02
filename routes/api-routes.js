const express = require('express');
const request = require("request");
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();
const db = require('../models/index.js');

router.get("/scrape", function(req, res) {
  axios.get("https://nerdreactor.com/latest-posts/").then(function(response) {
    let $ = cheerio.load(response.data);
    $("h4").each(function(i, element) {
      let result = {};
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.allArticle.create(result)
        .then(function(dbAllArticle) {
        })
        .catch(function(err) {
          return res.json(err);
        });
    });
    res.send("Scrape Complete");
  });
});

router.get("/all-articles", function(req, res) {
  db.allArticle.find({})
    .then(function(results) {
    	res.render('index', { articles: results });
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;