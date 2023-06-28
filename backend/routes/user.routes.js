const { authenticateToken } = require("../middlewares/auth.js");


module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/register", users.create);

  router.post("/login", users.login);

  router.post("/profile", authenticateToken , users.getUserData);

  app.use("/api", router);
};
