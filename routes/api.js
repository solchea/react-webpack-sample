var express = require('express');
var router = express.Router();

router.get('/status', function(req, res, next) {
  res.json({
    status: process.env.NODE_ENV
  });
});

module.exports = router;