"use strict";
const express = require('express');
const router = express.Router();
const ping = require("ping");
const host = "google.com";
const _ = require("lodash");

let percentage;
let counter = 0;
let successCounter = 0;

/* GET home page. */
router.get('/health', function(req, res, next) {
  res.json({
    health: percentage
  });
});

function pingOnce() {
  return ping.promise.probe(host, {
    extra: ["-c 1", "-i 0.2"]
  })
    .then(result => {
      console.log(result);
      return !!result.time;
    });
}

setInterval(() => {
  pingOnce()
    .then(success => {
      counter++;
      if (success) {
        successCounter++;
      }
      if (counter === 60) {
        percentage = (successCounter / counter) * 100;
        counter = 0;
        successCounter = 0;
      }
    });
}, 250);

module.exports = router;
