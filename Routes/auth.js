const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../Controllers/auth");
const User = require("../Models/user");

const router = express.Router();

router.post("/homepage", authController.postHomepage);
router.get("/homepage", authController.getHomepage);

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    body("username").isString().withMessage("Please enter a valid username."),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("username")
      .isString()
      .withMessage("Please enter a valid username.")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Username exits already, please pick a different username."
            );
          }
        });
      }),
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Oops looks like your e-mail exists already exist with us."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 8 characters."
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match, please recheck again!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post(
  "/delete-user",
  [
    check("username")
      .isString()
      .withMessage("Please enter a valid username.")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject(
              "Username do not exits, please retry username."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.postDeleteUser
);

router.get("/delete-user", authController.getDeleteUser);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
