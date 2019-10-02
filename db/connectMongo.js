const mongoose = require('mongoose')
const config = require('../config')

function setUpConnection() {
	mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {useNewUrlParser: true})
}

module.exports = setUpConnection
