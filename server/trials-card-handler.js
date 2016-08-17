var config = require('../config');
var _      = require('underscore');

// variables
// --------------------------------------------
var mainCss = config.server.cssResource + '/' + config.scripts.css;
var indexJs = config.server.jsResource  + '/' + config.scripts.js;

// handler
// --------------------------------------------
module.exports = function(req, res) {
  res.render('trials-counter', {
    mainCss: mainCss,
    indexJs: indexJs
  });
};
