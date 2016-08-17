var config            = require('./config')
  , trialsCardHandler = require('./server/trials-card-handler')
  , express           = require('express')
  , _                 = require('underscore');

// variables
// -------------------------------------------
var mainCss = config.server.cssResource + '/' + config.scripts.css;
var mainJs  = config.server.jsResource  + '/' + config.scripts.js;

// server config
// -------------------------------------------
// create server
var app = express();

// configure app local variables
app.locals._ = _;

if (config.nodeEnv !== 'production') {
  app.locals.pretty = true;
}

// configure view engine
app.set('view engine', 'jade');

// endpoints
app.get('/trialscard', function(req, res) {
  trialsCardHandler(req, res);
});

// static
// -------------------------------------------
// css
app.use(config.server.cssResource, express.static(config.server.cssDir));

// js
app.use(config.server.jsResource, express.static(config.server.jsDir));

// fonts
app.use(config.server.fontsResource, express.static(config.server.fontsDir));

// run server
// -------------------------------------------
app.listen(config.server.port);
console.log('server started on http://localhost:' + config.server.port);
