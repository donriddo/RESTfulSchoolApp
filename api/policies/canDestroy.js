module.exports = function (req, res, next) {
  if (req.session.authenticated && (req.session.user.isAdmin || (req.session.user.id == req.param('id')))) {
    return next();
  } else {
    res.send('You are not permitted to do that, please contact an Administrator');
  }
};
