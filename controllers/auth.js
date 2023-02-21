const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.firstName + " " + req.body.lastName;
  bcrypt
    .hash(password, 12)
    .then((hassedPw) => {
      return (user = User.create({
        name: name,
        password: hassedPw,
        email: email,
        rank: "Fronze",
        cash:0,
      }));
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "User created", userId: result.userId, status: 0 });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const phone = req?.body?.phone;
  const password = req.body.password;
  if (!phone)
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          const error = new Error("Invalid account");
          error.statusCode = 401;
          throw error;
        }
        loadedUser = user;
        bcrypt.compare(password, user.password);
        const token = jwt.sign(
          { email: loadedUser.email, userId: loadedUser.userId.toString() },
          "longdeptrai",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          userId: loadedUser.userId.toString(),
          status: 0,
          userCurrent:{name:loadedUser.name,}
        });
      })
      .then((isEqual) => {
        if (!isEqual) {
          const error = new Error("Wrong password");
          error.statusCode = 401;
          throw error;
        }
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  else
    User.findOne({
      where: {
        phone: phone,
      },
    })
      .then((user) => {
        if (!user) {
          const error = new Error("Invalid account");
          error.statusCode = 401;
          throw error;
        }
        loadedUser = user;
        bcrypt.compare(password, user.password);
        const token = jwt.sign(
          { phone: loadedUser.phone, userId: loadedUser.userId.toString() },
          "longdeptrai",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          userId: loadedUser.userId.toString(),
          status: 0,
          userCurrent:{name:loadedUser.name,}
        });
      })
      .then((isEqual) => {
        if (!isEqual) {
          const error = new Error("Wrong password");
          error.statusCode = 401;
          throw error;
        }
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};
