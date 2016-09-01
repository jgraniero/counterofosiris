module.exports = function(req, res, io) {
  io.emit('win message');
  res.sendStatus(200);
};
