var status = require('../model/status');

exports.hot_tweets = function(req, res) {
	status.hot_tweets(req, res);
};