/**
 * StudentController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res, next) {
		User.findOneByEmail(req.body.email, function (err, user) {
			if (!user) {
				User.create(req.params.all(), function (err, user) {
					if (err) { console.log(err); return err; }
					console.log(user, 'created');
					req.session.authenticated = true;
					delete user.password; // saving this for later...
					req.session.user = user;
					res.redirect('/student/' + user.id);
				});
			} else if (user) {
				res.json({err: 'username/email has been chosen'});
			} else {
				console.log(err);
			}
		});

	},
	find: function (req, res, next) {
		User.findOne(req.param('id'), function (err, user) {
			if (err) console.log(err);
			console.log(req.session);
			res.json(user);
		});
	},
	update: function (req, res, next) {
		if (req.session.user.isAdmin || (req.param('id') == req.session.user.id)) {
			User.update(req.param('id'), req.params.all(), function (err, user) {
				if (err) console.log(err);
				console.log(user, 'updated');
				res.json(user);
			});
		} else {
			res.send('You are not permitted to edit/update someone else\'s profile');
		}
	},
	destroy: function (req, res, next) {
		User.destroy(req.param('id'), function (err, user) {
			if (err) console.log(err);
			console.log(user, 'destroyed');
			res.redirect('/student');
		});
	},
	index: function (req, res, next) {
		User.find(function (err, users) {
			if (err) console.log(err);
			console.log(users, 'all our students');
			res.json(users);
		});
	}

};
