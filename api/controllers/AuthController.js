module.exports = {
  login: function (req, res, next) {
    if (req.body && req.body.username && req.body.password && req.body.who) {
      if (req.body.who == 'student') {
        Student.findOne({username: req.body.username}, function (err, student) {
          if (err) return err;
          req.session.authenticated = true;
          delete student.password;
          student.who = 'student';
          req.session.user = student;
          res.redirect('/student/' + student.id);
        });
      } else if (req.body.who == 'teacher') {
        Teacher.findOne({username: req.body.username}, function (err, teacher) {
          if (err) return err;
          req.session.authenticated = true;
          delete teacher.password;
          teacher.who = 'teacher';
          req.session.user = teacher;
          res.redirect('/student/' + student.id);
        });
      }
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
