const Image = require('../db/models/Image');

const sendImage =  async(req, res, next) => {
	const image = await Image.findOne({_id: req.params.fileName}).then(img => img.body);
	res.send(JSON.stringify(image));
};
module.exports = {sendImage};

