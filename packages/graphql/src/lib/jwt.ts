import jsonwebtoken from 'jsonwebtoken';

const jwt = (id, email) => jsonwebtoken.sign({
  id,
  email,
}, process.env.JWT_SECRET);

export default jwt;
