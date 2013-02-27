var user = require("../model/user");
var make_error = require("../helper/make_error");
var helper = require("../helper/helper");

var mongodb = require("mongodb");

var option = {
	auto_reconnect: true,
	poolSize: 20
}

var mongo_server = new mongodb.Server('localhost', 27017, option);

var db_client = new mongodb.Db("bubble_db", mongo_server);

exports.put_bubble = function(req, res) {

	var uid = req.param("uid");
	var token = req.param("token");
	var res_id = req.param("res_id");
	var type = req.param("bubble_type");

	if(uid != undefined && token != undefined && res_id != undefined && type != undefined) {
		user.check_token(uid, token, function(err, result) {
			if(err != undefined) {
				res.send(make_error.make_error(-2, "Database Error!", err));
			} else {
				if(result != undefined) {

					var bubb = {
						res_id: res_id,
						uid: uid,
						type: type,
						start_at: req.param("start_at"),
						end_at: req.param("end_at"),
						vertical: req.param("vertical_percent"),
						horizontal: req.param("horizontal_percent"),
						content: req.param("content"),
						operation: req.param("operation"),
						signal: req.param("signal"),
						customer: req.param("customer"),
						create_at: helper.gettime()
					}

					// console.log(bubb);
					db_client.open(function(err, client) {
						if(err != undefined) {
							res.send(make_error.make_error(-2, "Database Error!", err));
							client.close();
						} else {
							client.collection("bubbles", function(err, collection) {
								if(err != undefined) {
									res.send(make_error.make_error(-2, "Database Error!", err));
									client.close();
								} else {
									collection.update({
										_id: res_id
									}, {
										$push: {
											bubbles: bubb
										}
									}, {
										safe: true,
										upsert: true
									}, function(err) {
										client.close();
										if(err != undefined) {
											res.send(make_error.make_error(-2, "Database Error!", err));
										} else {
											res.send(bubb);
										}
									});
								}

							});
						}

					});

				} else {

					res.send(make_error.make_error(-5, "Invalid token!"));
				}
			}
		});
	} else {
		res.send(make_error.make_error(-4, "Invalid params!"));
	}

};

exports.take_bubbles = function(req, res) {

	var uid = req.param("uid");
	var token = req.param("token");
	var res_id = req.param("res_id");
	if(uid != undefined && token != undefined && res_id != undefined) {
		user.check_token(uid, token, function(err, result) {
			if(err != undefined) {
				res.send(make_error.make_error(-2, "Database Error!", err));
			} else {
				if(result != undefined) {

					var signal = String(req.param("signal"));
					var start = Number(req.param("start"));
					var count = Number(req.param("count"));
					if(start == undefined || count == undefined || start < 0 || count <= 0) {
						start = 0;
						count = 0;
					}
					console.log(signal);

					db_client.open(function(err, client) {
						if(err != undefined) {
							res.send(make_error.make_error(-2, "Database Error!", err));
							client.close();
						} else {
							client.collection("bubbles", function(err, collection) {
								if(err != undefined) {
									res.send(make_error.make_error(-2, "Database Error!", err));
									client.close();
								} else {

									var projection = {
										_id: false
										// bubbles: {$slice: [start, count]},
									}
									if(count > 0) {
										projection.bubbles = {$slice: [start, count]};
									} else {
										projection.bubbles = true;
									}

									collection.find({
										_id: res_id
									}, projection).nextObject(function(err, results) {
										client.close();
										if(err != undefined) {
											console.log(err);
											res.send(make_error.make_error(-2, "Database Error!", err));
										} else {
											res.send(results);
										}
									});
								}

							});
						}
					});

				} else {

					res.send(make_error.make_error(-5, "Invalid token!"));
				}
			}
		});
	} else {
		res.send(make_error.make_error(-4, "Invalid params!"));
	}
};