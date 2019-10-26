const Image = require('../db/models/Image');

const sendImage =  async(req, res, next) => {
	try {
		const image = await Image.findOne({_id: req.params.fileName}).then(img => img.body);
		res.send(JSON.stringify(image));
	} catch (err) {
		next(err);
	}
};
module.exports = {sendImage};

