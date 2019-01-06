const jsonwebtoken = require('jsonwebtoken');

const jwt = (id, email) => jsonwebtoken.sign({
  id,
  email,
}, process.env.JWT_SECRET);

module.exports = jwt;
