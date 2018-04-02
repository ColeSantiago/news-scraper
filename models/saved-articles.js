const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const savedArticles = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "comment"
	}
});

const savedArticle = mongoose.model('saved', savedArticles);

module.exports = savedArticle;