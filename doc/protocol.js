var protocol = {

	"v1.0": {
		"structure": {
			"Bubble": {
				"tid": "int64",
				"bid": "int64",
				"uid": "int64",
				"content": {
					"words": [{
						"type": "int",
						"start_at": "int",
						"end_at": "int",
						"text": "string",
						"user_data": "string"
					}],
					"image": [{
						"type": "int",
						"vertical": "float",
						"horizontal": "float",
						"text": "string",
						"user_data": "string"
					}]
				},
				"like": "int",
				"unlike": "int",
				"signal": "int",
				"user_data": "string",
				"created_at": "int64"
			},
			"error_response": {
				"error_code": "int", //
				"error_msg": "string" //
			}
		},
		"user/sina_login": {
			"comment": "使用新浪账号快速登录。",
			"url": "user/sina_login",
			"method": "post",
			"request": {
				"access_token": "string"
			},
			"response": {
				"uid": "int",
				"token": "string",
				"created_at": "int64",
				"expire": "int64"
			}
		},
		"bubble/count": {
			"comment": "通过微博tid，获取一组微博的吐槽条数",
			"url": "/bubble/count",
			"method": "get|post",
			"request": {
				"uid": "int64", 	// 用户uid
				"token": "string", 	// 用户操作令牌
				"tids": []			//"array" // 新浪微博tid数组，格式[tid0,tid1,tid2]
			},
			"response": {
				"sample": {
					"tid0": 19,
					"tid1": 20,
					"tid2": 5
				}
			}
		},
		"bubble/publish": {
			"comment": "发布一条吐槽",
			"url": "bubble/publish",
			"method": "post",
			"request": {
				"uid": "int64", // 
				"token": "string", //
				"bubble": "protocol.structure.Bubble"
			},
			"response": {
				"tid": "int64",
				"bid": "int64"
			}
		},
		"bubble/take": {
			"comment": "获取吐槽",
			"url": "bubble/take",
			"method": "get|post",
			"request": {
				"uid": "int64", // 
				"token": "string", //
				"start": "int", //
				"count": "int", //
				"condition": {
					"uids": [],
					"tids": [],
					"time": {
						"from": "int64",
						"to": "int64"
					},
					"type": {
						"words": [],
						"image": []
					},
					"signal": []
				}
			},
			"response": {
				"bubbles": ["protocol.structure.Bubble"]
			}
		},
		"bubble/take_rank": {
			"comment": "获取排行",
			"url": "bubble/take_rank",
			"method": "get|post",
			"request": {
				"uid": "int64", //
				"token": "int64", //
				"condition": {
					"uids": [],
					"rank": {
						"type": "string", // like or unlike
						"top": "int"
					}
				}
			},
			"response": {
				"bubbles": ["protocol.structure.Bubble"]
			}
		},
		"bubble/take_hot_tweets": {
			"comment": "获取热门吐槽",
			"url": "bubble/get_hot_bubble",
			"method": "get|post",
			"request": {
				"uid": "int64",
				"token": "string",
				"top": "int"
			},
			"response": {
				"tids": []
			}
		},
		"bubble/like": {
			"comment": "喜欢本条吐槽",
			"url": "bubble/like",
			"method": "post",
			"request": {
				"uid": "int64",
				"token": "string",
				"tid": "int64",
				"bid": "int64",
				"type": "string" // like or unlike
			},
			"response": {
				"like": "int",
				"unlike": "int"
			}
		},
		"status/hot_tweets": {
			"comment": "获取热点微博",
			"url": "status/hot_tweets",
			"method": "get|post",
			"request": {
				"uid": "int64",
				"token": "string",
				"top": "int", //
				"time": {
					"from": "int64",
					"to": "int64"
				}
			},
			"response": {
				"tweets": [
                {
					"time": "int64",
					"tids": []
				}
                ]
			}
		}
	}
}