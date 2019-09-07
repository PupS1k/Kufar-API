const jwt = require('jsonwebtoken');
const config = require('../etc/config');

module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Access Denied');

  try{
      const dataToken = jwt.verify(token,  config.secretKey);
      req.user = {
          _id: dataToken._id,
          mail: dataToken.mail,
          password: dataToken.password,
          sellerStatus: dataToken.sellerStatus,
      };
      next();
  }catch (err) {
      res.status(400).send('Invalid token');
  }
};