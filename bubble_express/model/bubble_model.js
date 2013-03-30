var user = require('../model/user');
var make_error = require('../helper/make_error');
var helper = require('../helper/helper');

var mongodb = require('mongodb');

var option = {
	auto_reconnect: true,
	poolSize: 20
}
var db_option = {

}

var mongo_server = new mongodb.Server('localhost', 27017, option);

var db_client = new mongodb.Db('bubble_db', mongo_server, db_option);

exports.take_bids = function(req, res) {

	var uid = req.param('uid');
	var token = req.param('token');
	var tids_str = req.param('tids');
	var tids = JSON.parse(tids_str);

	if (function(tids) {
		if (helper.isnotNull(tids)) {
			return true;
		} else {
			return false;
		}
	}(tids)) {

		user.check_token(uid, token, function(err, result) {
			if (helper.isnotNull(err)) {
				res.send(make_error.make_error(-5, 'Invalid token!'));
			} else {
				if (result) {
					db_client.open(function(err, client) {
						if (err != undefined) {
							res.send(make_error.make_error(-2, 'Database Error!', err));
							client.close();
						} else {
							client.collection('bubbles', function(err, collection) {
								if (err != undefined) {
									res.send(make_error.make_error(-2, 'Database Error!', err));
									client.close();
								} else {

									collection.find({
										tid: {
											$in: tids
										}
									}, {
										_id: 1,
										tid: 1
									}).toArray(function(err, results) {

										client.close();

										if (helper.isnotNull(err)) {
											res.send(make_error.make_error(-2, 'Database Error!', err));

										} else {

											var ret = {};
											for(var i = 0; i< tids.length; i++) {
												ret[tids[i]] = [];
											}
											
											for (var i = 0; i < results.length; i++) {
												if(ret[results[i].tid] != undefined) {
													ret[results[i].tid].push(results[i]._id);
												}

												// console.log(results[i]);
											}

											console.log(results);
											res.send(ret);
										}
									});

									// var ret_obj = {};

									// collection.find({
									// 	'_id': {
									// 		'$in': tids
									// 	}
									// }, {}).each(function(err, results) {

									// 	client.close();
									// 	if (helper.isnotNull(err)) {
									// 		res.send(make_error.make_error(-2, 'Database Error!', err));
									// 	} else {
									// 		if (helper.isnotNull(results)) {
									// 			ret_obj._id = results;
									// 		} else {
									// 			res.send(ret_obj);
									// 		}
									// 	}
									// });
								}
							});
						}
					});

				} else {
					res.send(make_error.make_error(-5, 'Invalid token!'));
				}
			}
		});
	} else {
		res.send(make_error.make_error(-4, 'Invalid token or params!'));
	}
}

exports.take = function(req, res) {

	var uid = req.param('uid');
	var token = req.param('token');
	var bids_str = req.param('bids');
	var bids = JSON.parse(bids_str);

	if (function(bids) {
		if (helper.isnotNull(bids)) {
			for (var i = 0; i < bids.length; i++) {
				console.log(bids[i]);
				bids[i] = new mongodb.ObjectID(bids[i]);
			}
			return true;
		} else {
			return false;
		}
	}(bids)) {
		user.check_token(uid, token, function(err, result) {
			if (helper.isnotNull(err)) {
				res.send(make_error.make_error(-5, 'Invalid token!'));
			} else {
				if (result) {
					db_client.open(function(err, client) {
						if (err != undefined) {
							res.send(make_error.make_error(-2, 'Database Error!', err));
							client.close();
						} else {
							client.collection('bubbles', function(err, collection) {
								if (err != undefined) {
									res.send(make_error.make_error(-2, 'Database Error!', err));
									client.close();
								} else {
									collection.find({
										_id: {
											'$in': bids
										}
									}, {}).toArray(function(err, results) {

										client.close();
										if (helper.isnotNull(err)) {
											res.send(make_error.make_error(-2, 'Database Error!', err));
										} else {
											res.send({
												bubbles: results
											});
										}
									});
								}
							});
						}
					});

				} else {
					res.send(make_error.make_error(-5, 'Invalid token!'));
				}
			}
		});
	} else {
		res.send(make_error.make_error(-4, 'Invalid token or params!'));
	}
}


// 此处可以考虑增加一个集合，用来存储tid与bid的对应关系。
// 用来统计与查询。
// 根据需求来看这个很必要。
exports.put = function(req, res) {

	// res.send("success");

	// return ;
	var uid = req.param('uid');
	var token = req.param('token');
	var bubble_str = req.param('bubble');

	// console.log(bubble_str);

	// console.log(req);

	// console.log(uid);
	// console.log(bubble_str);
	// res.send(bubble_str);
	// return ;
	var bubble = eval('('+bubble_str+')'); //JSON.parse(bubble_str);

	console.log(bubble);

	// 下面函数的检测最好改成新建一个对象，然后按格式赋值。
	// 下面几个接口同样。
	if (function(bubble) {
		// && helper.isnotNull(bubble.tid) && helper.isnotNull(bubble.content) && typeof bubble.content.words == 'array' && typeof bubble.content.image == 'array') {
		if (helper.isnotNull(bubble)) {

			if (helper.isnotNull(bubble._id)) {
				delete bubble._id;
			}
			if (helper.isnotNull(bubble.created_at)) {
				delete bubble.created_at;
			}

			if (helper.isnotNull(bubble.like)) {
				bubble.like = 0;
			}
			if (helper.isnotNull(bubble.unlike)) {
				bubble.unlike = 0;
			}

			bubble.uid = uid;

			return true;

		} else {
			return false;
		}
	}(bubble)) {
		user.check_token(uid, token, function(err, result) {
			if (err != undefined) {
				res.send(make_error.make_error(-2, 'Token Error!', err));
			} else {
				if (result) {


					// console.log(bubb);
					db_client.open(function(err, client) {
						if (err != undefined) {
							res.send(make_error.make_error(-2, 'Database Error!', err));
							client.close();
						} else {
							client.collection('bubbles', function(err, collection) {
								if (err != undefined) {
									res.send(make_error.make_error(-2, 'Database Error!', err));
									client.close();
								} else {

									bubble.like = 0;
									bubble.unlike = 0;
									bubble.created_at = helper.gettime();

									collection.insert(bubble, {
										safe: true
									}, function(err, results) {
										client.close();
										if (helper.isnotNull(err)) {
											res.send(make_error.make_error(-2, 'Database Error!', err));
										} else {

											res.send(results);

											// client.collection('bid_indexs', function(err, collection) {

											// });

											// collection.update({
											// 	_id: bubble.tid
											// }, {
											// 	$push: {
											// 		bids: results
											// 	}
											// }, {
											// 	safe: true,
											// 	upsert: true
											// }, function(err) {
											// 	client.close();
											// 	if (helper.isnotNull(err)) {
											// 		res.send(make_error.make_error(-2, 'Database Error!', err));
											// 	} else {
											// 		res.send(results);
											// 	}
											// });

										}

									});
								}

							});
						}

					});

				} else {

					res.send(make_error.make_error(-5, 'Invalid token!'));
				}
			}
		});
	} else {
		res.send(make_error.make_error(-4, 'Invalid params!'));
	}

};

exports.search = function(req, res) {

	var uid = req.param('uid');
	var token = req.param('token');
	var start = Number(req.param('start'));
	var count = Number(req.param('count'));
	var condition = eval('('+req.param('condition')+')');

	//JSON.parse(req.param('condition'));

	// eval('('+req.param('condition')+')');//

	if (function(condition) {
		if (helper.isnotNull(condition)) {
			return true;
		} else {
			return false;
		}

	}(condition)) {

		user.check_token(uid, token, function(err, result) {
			if (helper.isnotNull(err)) {
				res.send(make_error.make_error(-2, 'Database Error!', err));
			} else {
				if (result) {

					// if (start == undefined || count == undefined || start < 0 || count <= 0) {
					// 	start = 0;
					// 	count = 0;
					// }
					// console.log(signal);

					db_client.open(function(err, client) {
						if (err != undefined) {
							res.send(make_error.make_error(-2, 'Database Error!', err));
							client.close();
						} else {
							client.collection('bubbles', function(err, collection) {
								if (helper.isnotNull(err)) {
									res.send(make_error.make_error(-2, 'Database Error!', err));
									client.close();
								} else {

									// if (count > 0) {
									// 	projection.bubbles = {
									// 		$slice: [start, count]
									// 	};
									// } else {
									// 	projection.bubbles = true;
									// }

									var query_find = {};
									if (helper.isnotNull(condition.uids) && condition.uids.length != 0) {
										query_find.uid = {
											$in: condition.uids
										}
									}

									if (helper.isnotNull(condition) && condition.tids.length != 0) {
										query_find.tid = {
											$in: condition.tids
										}
									}

									if (helper.isnotNull(condition.time)) {

										query_find.created_at = {};
										if (helper.isnotNull(condition.time.from)) {
											query_find.created_at.$gte = condition.time.from;
										}
										if (helper.isnotNull(condition.time.to)) {
											query_find.created_at.$lte = condition.time.to;
										}
									}

									if (helper.isnotNull(condition.signal) && condition.signal.length != 0) {
										query_find.signal = {
											$in: condition.signal
										}
									}

									var option = {};
									if (helper.isnotNull(count) && count > 0) {
										option.limit = count;

										if (helper.isnotNull(start)) {
											if (start < 0) {
												start = 0;
											}
											option.skip = start;
										}
									}


									var cursor = collection.find(query_find, {}, option);

									cursor.toArray(function(err, results) {
										client.close();
										if (helper.isnotNull(err)) {
											res.send(make_error.make_error(-2, 'Database Error!', err));
										} else {
											res.send({
												bubbles: results
											});
										}
									});

									// var cursor = collection.find({
									// 	_id: res_id
									// }).nextObject(function(err, results) {
									// 	client.close();
									// 	if (err != undefined) {
									// 		console.log(err);
									// 		res.send(make_error.make_error(-2, 'Database Error!', err));
									// 	} else {
									// 		res.send(results);
									// 	}
									// });
								}

							});
						}
					});

				} else {

					res.send(make_error.make_error(-5, 'Invalid token!'));
				}
			}
		});
	} else {
		res.send(make_error.make_error(-4, 'Invalid params!'));
	}

};

exports.take_rank = function(req, res) {
	var uid = req.param('uid');
	var token = req.param('token');

	var condition = JSON.parse(req.param('condition'));

	if (function(condition) {
		if (helper.isnotNull(condition)) {

			if (helper.isnotNull(condition.rank) && helper.isnotNull(condition.rank.top)) {
				condition.rank.top = Number(condition.rank.top);
			}

			return true;
		} else {
			return false;
		}
	}(condition)) {

		user.check_token(uid, token, function(err, result) {
			if (helper.isnotNull(err)) {
				res.send(make_error.make_error(-2, 'Database Error!', err));
			} else {
				if (result) {

					db_client.open(function(err, client) {
						if (err != undefined) {
							res.send(make_error.make_error(-2, 'Database Error!', err));
							client.close();
						} else {
							client.collection('bubbles', function(err, collection) {
								if (helper.isnotNull(err)) {
									res.send(make_error.make_error(-2, 'Database Error!', err));
									client.close();
								} else {

									var query_find = {};
									if (condition.uids != null && condition.uids.length != 0) {
										query_find.uid = {
											$in: condition.uids
										};
									}
									var option = {
										sort: [
											['like', 'desc']
										],
										limit: 10,
										skip: 0
									};
									if (helper.isnotNull(condition.rank)) {
										if (helper.isnotNull(condition.rank.type)) {
											if (condition.rank.type == 'unlike') {
												option.sort[0][0] = 'unlike';
											}
										}
										if (helper.isnotNull(condition.rank.top)) {
											option.limit = condition.rank.top;
										}
									}

									console.log(query_find);

									var cursor = collection.find(query_find, {}, option);

									cursor.toArray(function(err, results) {
										client.close();
										if (helper.isnotNull(err)) {
											res.send(make_error.make_error(-2, 'Database Error!', err));
										} else {
											res.send({
												bubbles: results
											});
										}
									});
								}
							});
						}
					});
				}
			}
		});

	} else {
		res.send(make_error.make_error(-4, 'Invalid params!'));
	}

}

exports.take_hot_tweets = function(req, res) {


	// 按现有结构查询性能损耗太大。
	// 考虑以后加入另一张表，记录tid对应bids，以此来查询。

	res.send(make_error.make_error(-11, 'unsupport!'));
}
exports.like = function(req, res) {
	var uid = req.param('uid');
	var token = req.param('token');

	var bid = req.param('bid');
	var type = req.param('type');

	if (function(id) {
		if (helper.isnotNull(id)) {
			bid = new mongodb.ObjectID(id);
			return true;
		} else {
			return false;
		}
	}(bid)) {

		user.check_token(uid, token, function(err, result) {
			if (helper.isnotNull(err)) {
				res.send(make_error.make_error(-2, 'Database Error!', err));
			} else {
				if (result) {
					db_client.open(function(err, client) {
						if (err != undefined) {
							res.send(make_error.make_error(-2, 'Database Error!', err));
							client.close();
						} else {
							client.collection('bubbles', function(err, collection) {
								if (helper.isnotNull(err)) {
									res.send(make_error.make_error(-2, 'Database Error!', err));
									client.close();
								} else {

									var query_find = {
										_id: bid
									};

									var query_set = {
										$inc: {
											like: 1
										}
									}
									if (type == 'unlike') {
										query_set = {
											$inc: {
												unlike: 1
											}
										}
									}

									console.log(query_find);

									collection.findAndModify(query_find, [
										['_id', 'asc']
									], query_set, {}, function(err, results) {
										client.close();
										if (helper.isnotNull(err)) {
											res.send(make_error.make_error(-2, 'Database Error!', err));
										} else {
											console.log("success!");
											res.send(results);

										}
									});
								}

							});
						}
					});

				} else {

					res.send(make_error.make_error(-5, 'Invalid token!'));
				}
			}
		});
	} else {
		res.send(make_error.make_error(-4, 'Invalid params!'));
	}


}

exports.like_count = function(req, res) {

	res.send(make_error.make_error(-10, 'Discard! Call take instead!'));
}
// function check_bubble_format(bubble) {

// 	if (helper.isnotNull(bubble) && helper.isnotNull(bubble.res_id) && helper.isnotNull(bubble.type)) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

// function check_bids_format(bids) {

// 	return true;
// }