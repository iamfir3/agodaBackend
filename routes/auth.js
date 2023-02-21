const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/auth");
const User = require("../models/user");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("invalid email")
      .custom((value, { req }) => {
        return User.findOne({
          where: {
            email: value,
          },
        }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
    body("firstName").trim().not().isEmpty(),
    body("lastName").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
