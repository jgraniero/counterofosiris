var config            = require('./config')
  , express           = require('express')
  , http              = require('http')
  , lossHandler       = require('./server/loss-handler')
  , mercyHandler      = require('./server/mercy-handler')
  , resetHandler      = require('./server/reset-handler')
  , socketio          = require('socket.io')
  , trialsCardHandler = require('./server/trials-card-handler')
  , winHandler        = require('./server/win-handler.js')
  , _                 = require('underscore');

// variables
// -------------------------------------------
var mainCss = config.server.cssResource + '/' + config.scripts.css;
var mainJs  = config.server.jsResource  + '/' + config.scripts.js;

// server config
// -------------------------------------------
// create express app, http server, and socket io
var app    = express();
var server = http.Server(app);
var io     = socketio(server);

// configure app local variables
app.locals._ = _;

if (config.nodeEnv !== 'production') {
  app.locals.pretty = true;
}

// configure view engine
app.set('view engine', 'jade');

// sockets 
// -------------------------------------------
io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

// endpoints
// -------------------------------------------
app.get('/trialscard', function(req, res) {
  trialsCardHandler(req, res);
});

app.get('/trialscard/win', function(req, res) {
  winHandler(req, res, io);
});

app.get('/trialscard/loss', function(req, res) {
  lossHandler(req, res, io);
});

app.get('/trialscard/mercy', function(req, res) {
  mercyHandler(req, res, io);
});

app.get('/trialscard/reset', function(req, res) {
  resetHandler(req, res, io);
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
//app.listen(config.server.port);
server.listen(config.server.port);
console.log('server started on http://localhost:' + config.server.port);
