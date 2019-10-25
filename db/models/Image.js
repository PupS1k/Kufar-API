const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	body: {type: String}
});

module.exports = mongoose.model('Image', ImageSchema);
