const Image = require('../db/models/Image');

const saveImage = (req, res, next) => {
	const image = new Image({
		body: req.files.file.data
	});
	try {
		image.save().then(image => res.send(JSON.stringify(image._id)));
	} catch (err) {
		next(err);
	}
};

const sendImage =  async(req, res, next) => {
	try {
		const image = await Image.findOne({_id: req.params.id}).then(img => img.body);
		res.type('image/jpeg').send(image);
	} catch (err) {
		next(err);
	}
};

module.exports = {sendImage, saveImage};

