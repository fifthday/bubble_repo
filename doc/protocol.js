var protocol = {

	"v1.0": {
		"structure": {
			"Bubble": {
				"_id": "string",
				"tid": "string",
				"uid": "string",
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
				"created_at": "string"
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
				"created_at": "string",
				"expire": "string"
			}
		},
		"bubble/take_bids": {
			"comment": "通过微博tid，获取一组微博的吐槽条数",
			"url": "/bubble/take_bids",
			"method": "get|post",
			"request": {
				"uid": "string", // 用户uid
				"token": "string", // 用户操作令牌
				"tids": [] //"array" // 新浪微博tid数组，格式[tid0,tid1,tid2]
			},
			"response": {
				"sample": {
					"tid0": ["bids"],
					"tid1": ["bids"],
					"tid2": ["bids"]
				}
			}
		},
		"bubble/put": {
			"comment": "发布一条吐槽",
			"url": "bubble/publish",
			"method": "post",
			"request": {
				"uid": "string", // 
				"token": "string", //
				"bubble": "protocol.structure.Bubble"
			},
			"response": {
				"bid": "string"
			}
		},
		"bubble/take": {
			"comment": "通过一组bid，获取对应的吐槽内容",
			"url": "/bubble/take",
			"method": "get|post",
			"request": {
				"uid": "string",
				"token": "string",
				"bids": []
			},
			"response": {
				"bubbles": ["protocol.structure.Bubble"]
			}
		},
		"bubble/search": {
			"comment": "获取吐槽",
			"url": "bubble/search",
			"method": "get|post",
			"request": {
				"uid": "string", // 
				"token": "string", //
				"start": "int", //
				"count": "int", //
				"condition": {
					"uids": [],
					"tids": [],
					"time": {
						"from": "string",
						"to": "string"
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
				"uid": "string", //
				"token": "string", //
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
			"url": "bubble/take_hot_tweets",
			"method": "get|post",
			"request": {
				"uid": "string",
				"token": "string",
				"top": "int"
			},
			"response": {
				"tids": []
			}
		},
		// 为了保证每个用户只能一次like，须重新考虑协议
		"bubble/like": {
			"comment": "喜欢/不喜欢本条吐槽",
			"url": "bubble/like",
			"method": "post",
			"request": {
				"uid": "string",
				"token": "string",
				"bid": "string",
				"type": "string" // like or unlike
			},
			"response": protocol.structure.Bubble
			// 修改为直接返回bubble
			// {
			// 	// "tid": "int",
			// 	// "bid": "int",
			// 	// "like": "int",
			// 	// "unlike": "int"

			// }
		},
		"bubble/like_count": {
			"comment": "喜欢/不喜欢本条吐槽的用户查询",
			"url": "bubble/like_count",
			"method": "post",
			"request": {
				"bid": "string"
			},
			"response": {
				"tid": "string",
				"bid": "string",
				"like": [],
				"unlike": []
			}
		},
		"status/hot_tweets": {
			"comment": "获取热点微博",
			"url": "status/hot_tweets",
			"method": "get|post",
			"request": {
				"uid": "string",
				"token": "string",
				"top": "int", //
				"time": {
					"from": "string",
					"to": "string"
				}
			},
			"response": {
				"tweets": [{
					"time": "string",
					"tids": []
				}]
			}
		}
	}
}