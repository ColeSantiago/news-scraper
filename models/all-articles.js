const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	link: {
		type: String,
		required: true,
		unique: true
	},
	summary: {
		type: String,
		required: true,
		unique: true
	}
});

let AllArticle = mongoose.model('AllArticle', allArticleSchema);

module.exports = AllArticle;