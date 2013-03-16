var bubble = require('../model/bubble_model');

exports.take_bids = function(req, res) {
	bubble.take_bids(req, res);
};
exports.take = function(req, res) {
	bubble.take(req, res);
};
exports.put = function(req, res) {
	bubble.put(req, res);
};
exports.search = function(req, res) {
	bubble.search(req, res);
}
exports.take_rank = function(req, res) {
	bubble.take_rank(req, res);
}
exports.take_hot_tweets = function(req, res) {
	bubble.take_hot_tweets(req, res);
}
exports.like = function(req, res) {
	bubble.like(req, res);
}
exports.like_count = function(req, res) {
	bubble.like_count(req, res);
}