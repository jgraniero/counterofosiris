module.exports = function(req, res, io) {
  io.emit('loss message');
  res.sendStatus(200);
};
