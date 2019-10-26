const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	body: {type: Buffer}
});

module.exports = mongoose.model('Image', ImageSchema);
