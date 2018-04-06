const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const exphbs = require('express-handlebars');
const request = require('request');

const db = require('./models');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const PORT = 3000;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const apiRoutes = require('./routes/api-routes.js');
// require('./routes/html-routes.js')(app);
app.use(apiRoutes);

app.listen(PORT, function() {
  console.log('App now listening at localhost:' + PORT);
});