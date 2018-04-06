const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const savedArticleSchema = new Schema({
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
	articleComments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

let SavedArticle = mongoose.model('SavedArticle', savedArticleSchema);

module.exports = SavedArticle;