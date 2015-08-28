/**
 * TeacherController
 *
 * @description :: Server-side logic for managing teachers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res, next) {
		Teacher.findOneByEmail(req.body.email, function (err, teacher) {
			if (!teacher) {
				Teacher.create(req.params.all(), function (err, teacher) {
					if (err) console.log(err);
					console.log(teacher, 'created');
					req.session.authenticated = true;
					delete teacher.password;
					teacher.who = 'teacher';
					req.session.user = teacher;
					res.redirect('/teacher/' + teacher.id);
				});
			} else if (teacher) {
				res.json({err: 'username/email has been chosen'});
			} else {
				console.log(err);
			}
		});

	},
	find: function (req, res, next) {
		Teacher.findOne(req.param('id'), function (err, teacher) {
			if (err) console.log(err);
			console.log(req.session);
			res.json(teacher);
		});
	},
	update: function (req, res, next) {
		if (req.session.user.isAdmin || (req.session.user.id == req.param('id'))) {
			Teacher.update(req.param('id'), req.params.all(), function (err, teacher) {
				if (err) console.log(err);
				console.log(teacher, 'updated');
				res.json(teacher);
			});
		} else {
			res.send('You are not permitted to edit/update someone else\'s profile');
		}
	},
	destroy: function (req, res, next) {
		teacher.destroy(req.param('id'), function (err, teacher) {
			if (err) console.log(err);
			console.log(teacher, 'destroyed');
			res.redirect('/teacher');
		});
	},
	index: function (req, res, next) {
		Teacher.find(function (err, teachers) {
			if (err) console.log(err);
			console.log(teachers, 'all our teachers');
			res.json(teachers);
		});
	}

};
