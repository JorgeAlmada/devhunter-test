const db = require("../models");
const { generateAccessToken, validateEmail } = require("../utils/utils");
const User = db.users;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.email) {
    res.status(400).send({ message: "You must fill every field" });
    return;
  } else if(!validateEmail(req.body.email)){
    res.status(400).send({ message: "Invalid email" });
    return;
  }

  const user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });

  User.findOne({email: req.body.email})
  .then((response) => {
    if(!response){
      user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
    } else{
      res.status(500).send({
        message:
          "There's already a user registered with that email"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  });


};

exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "You must fill every field" });
    return;
  }
  const {password, email} = req.body
  User.findOne({email, password})
  .then(data =>{
    if(data){
      const token = generateAccessToken({
        email,
        password
      })
      res.send({userData: data, token})
    } else{
      res.status(401).send({
        message: "Wrong mail or password"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while logging."
    });
  });
}

exports.getUserData = (req, res) => {
  const id = req.body.id;

  User.findById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user info."
      });
    });
};
