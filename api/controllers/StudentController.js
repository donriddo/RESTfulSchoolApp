/**
 * StudentController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res, next) {
		Student.findOneByEmail(req.body.email, function (err, student) {
			if (!student) {
				Student.create(req.params.all(), function (err, student) {
					if (err) console.log(err);
					console.log(student, 'created');
					req.session.authenticated = true;
					delete student.password;
					student.who = 'student';
					req.session.user = student;
					res.redirect('/student/' + student.id);
				});
			} else if (student) {
				res.json({err: 'username/email has been chosen'});
			} else {
				console.log(err);
			}
		});

	},
	find: function (req, res, next) {
		Student.findOne(req.param('id'), function (err, student) {
			if (err) console.log(err);
			console.log(req.session);
			res.json(student);
		});
	},
	update: function (req, res, next) {
		if (req.session.user.isAdmin || (req.param('id') == req.session.user.id)) {
			Student.update(req.param('id'), req.params.all(), function (err, student) {
				if (err) console.log(err);
				console.log(student, 'updated');
				res.json(student);
			});
		} else {
			res.send('You are not permitted to edit/update someone else\'s profile');
		}
	},
	destroy: function (req, res, next) {
		Student.destroy(req.param('id'), function (err, student) {
			if (err) console.log(err);
			console.log(student, 'destroyed');
			res.redirect('/student');
		});
	},
	index: function (req, res, next) {
		Student.find(function (err, students) {
			if (err) console.log(err);
			console.log(students, 'all our students');
			res.json(students);
		});
	}

};
