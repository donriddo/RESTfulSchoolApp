module.exports = {
  login: function (req, res, next) {
    if (req.body && req.body.username && req.body.password) {
      User.findOne({username: req.body.username}, function (err, user) {
        if (err) return err;
        if(!user) return res.send('You dont have an account on our platform.\n\nVisit »» `post /accountType/create` to signup');
        req.session.authenticated = true;
        delete user.password;
        req.session.user = user;
        res.redirect('/' + user.accountType + '/' + user.id);
      });
    } else {
      res.send('Please Enter your details to sign in');
    }
  },
  logout: function (req, res, next) {
    delete req.session.user;
    req.session.authenticated = false;
    res.redirect('/');
  }
};
