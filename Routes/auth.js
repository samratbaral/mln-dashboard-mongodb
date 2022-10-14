const express = require("express");
const { check, body } = require("express-validator");
const router = express.Router();

const authController = require("../Controllers/auth");
const User = require("../Models/user");

router.post("/homepage", authController.postHomepage);
router.get("/homepage", authController.getHomepage);

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    check("username")
      .isString()
      .withMessage("Please enter a valid username.")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject(
              "Username isn't register, please register first."
            );
          }
        });
      }),
    body("password", "Password has to be valid.")
      .isLength({ min: 8 })
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
          else{
            return Promise.reject(
              "Username was empty, please pick a different username."
            );
          }

        });
      }),
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Oops looks like your e-mail exists already exist with us."
            );
          }
        });
      })
      ,
      body(
        "phone",
        "Please enter ###-###-#### 10 phone numbers only."
      )
        .isLength({ min: 10 })
        .isNumeric()
        .custom((value, { req }) => {
          return User.findOne({ username: value }).then((userDoc) => {
            if (userDoc) {
              return Promise.reject(
                "Username exits already, please pick a different username."
              );
            }
            else{
              return Promise.reject(
                "Username was empty, please pick a different username."
              );
            }
  
          });
        })
        ,
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
