const jsonwebtoken = require("jsonwebtoken");

const generateAccessToken = (userData) => {
  return jsonwebtoken.sign(userData, "My Token Secret");
};

const validateEmail =(email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

module.exports = {
  generateAccessToken,
  validateEmail
};
