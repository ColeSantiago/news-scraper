const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allArticles = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	// summary: {
	// 	type: String,
	// 	required: true
	// }
});

const allArticle = mongoose.model('article', allArticles);

module.exports = allArticle;