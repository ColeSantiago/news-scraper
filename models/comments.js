const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const comments = new Schema({
	body: String
});

let comment = mongoose.model('comment', comments);

module.exports = comment;