const path = require("path");
const express = require("express");
const request = require("request");
const router = express.Router();

const mlnDashController = require("../Controllers/mln-home");
const isAuth = require("../Middleware/is-auth");


router.get("/", mlnDashController.getIndex);

router.get("/viewfile", mlnDashController.getViewFile);
router.post("/viewfile", mlnDashController.postViewFile);

router.get("/user-directory", mlnDashController.getUserDirectoryFile);
router.post("/user-directory", mlnDashController.postUserDirectoryFile);

router.get("/generation", mlnDashController.getGenerationFile);
router.post("/generation", mlnDashController.postGenerationFile);

router.get("/analysis", mlnDashController.getAnalysisFile);
router.post("/analysis", mlnDashController.postAnalysisFile);

router.get("/visualization", mlnDashController.getVisualizationFile);
router.post("/visualization", mlnDashController.postVisualizationFile);

module.exports = router;
