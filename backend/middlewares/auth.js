const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, "My Token Secret", (err, userData) => {
    if (err) return res.sendStatus(403)
    req.userData = userData

    next()
  })
}

module.exports = {
    authenticateToken
}