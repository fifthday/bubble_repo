var bubble = require('../model/bubble_model');
var user = require('../model/user');

exports.put = function(req, res) {
	bubble.put_bubble(req, res);
};
exports.take = function(req, res) {
	bubble.take_bubbles(req, res);
};
exports.login = function(req, res) {
	user.quick_login(req, res);
};