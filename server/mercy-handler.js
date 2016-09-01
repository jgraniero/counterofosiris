module.exports = function(req, res, io) {
  io.emit('mercy message');
  res.sendStatus(200);
};
