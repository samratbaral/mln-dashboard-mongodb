const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const http = require("http");
const express = require("express");
const request = require("request");
const { validationResult } = require("express-validator");

const GenFiles = require("../Models/generation");
const Order = require("../Models/analysis");
//const Backup = require('../Models/backup');
//Backup.fetchAll()
//documentation: https://mongoosejs.com

exports.getIndex = (req, res, next) => {
  GenFiles.find({}, (err, docs) => {
    res.status(200).json(docs);
  })
    .then((products) => {
      res.render("research/index", {
        prods: products,
        pageTitle: "Research",
        path: "/",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getViewFile = (req, res, next) => {
  request("http://127.0.0.1:5000/flask", (error, response, body) => {
    //console.log('error:',error);
    //console.log('statusCode:', response && response.statusCode);
    //console.log('body',body);
    res.render("research/viewfile", {
      path: "/viewfile",
      pageTitle: "View Files",
      jsonData: JSON.stringify(body),
    });
  });
};

exports.postViewFile = (req, res, next) => {
  console.log("jeeeeeee");
  const body = req.body.body;
  const errors = validationResult(req);
};
