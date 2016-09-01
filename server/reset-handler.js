module.exports = function(req, res, io) {
  io.emit('reset message');
  res.sendStatus(200);
};
