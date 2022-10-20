const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const http = require("http");
const express = require("express");
const request = require("request");
const { validationResult } = require("express-validator");
const { readdir } = require("fs").promises;

const bison = require("bison");
const encode = bison.encode;
const decode = bison.decode;

const GenFiles = require("../Models/generation");
const Order = require("../Models/analysis");
const { type } = require("os");
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
    // console.log("first : "+JSON.parse(body));
    // console.log(JSON.parse(body)["FILES"][0]);
    console.log(JSON.parse(body));
    const file = [];
    file.push(JSON.parse(body));

    res.render("research/viewfile", {
      path: "/viewfile",
      pageTitle: "View Files",
      jsonData: JSON.parse(body),
    });
  });
};

exports.postViewFile = (req, res, next, body) => {
  console.log("jeeeeeee");
  // request("http://127.0.0.1:5000/view", (error, response, body) => {
  //   //console.log('error:',error);
  //   //console.log('statusCode:', response && response.statusCode);
  //   //console.log('body',body);
  //   // console.log("first : "+JSON.parse(body));
  //   // console.log(JSON.parse(body)["FILES"][0]);
  //   const file = [];
  //   file.push(JSON.parse(body));

  //   res.render("research/viewfile", {
  //     path: "/viewfile",
  //     pageTitle: "View Files",
  //     jsonData: JSON.parse(body),
  //   });
  // });
};
