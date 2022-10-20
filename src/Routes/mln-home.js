const path = require("path");
const express = require("express");
const request = require("request");
const router = express.Router();

const mlnDashController = require("../Controllers/mln-home");
const isAuth = require("../Middleware/is-auth");


router.get("/", mlnDashController.getIndex);

router.get("/viewfile", mlnDashController.getViewFile);
router.get("/viewfile", mlnDashController.postViewFile);

module.exports = router;
