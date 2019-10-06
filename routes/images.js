const fs = require('fs');

module.exports = (req, res) => {
	fs.readFile(`public/images/${req.params.fileName}`, (err, data) => {
		if (err) return res.status(400).send('Error reading file');
		res.send(data);
	});
};

