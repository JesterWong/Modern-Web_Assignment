var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var mongodb = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
require("events").EventEmitter.prototype._maxListeners = 100;

var mongodbServer = new mongodb.Server("localhost", 27017, {
	auto_reconnect: true,
	poolSize: 10
});
var db = new mongodb.Db("dataB", mongodbServer);
var usersssssss = "";
var isTriedLogin = false,
	isLoginSuccessful = false;
var canRegis = true;

var server = http.createServer(function(request, response) {
	
	
// 	if(request.method == "GET") {
		
// 		var url = require('url');
// 		var url_parts = url.parse(request.url, true);
// 		var query = url_parts.query;
		
// 		var keyword = query.search;
		
		
// 		if(keyword != null) {
// 		console.log("keyword:"+ keyword)
// 			db.open(function() {
				
// 				//var regex = {$regex : "*." + keyword +".*"}
				
//   			var search = { address: keyword };
// 				db.collection("customers").find(search).toArray(function(err, result) {
//     		if (err) throw err;
//     		console.log(result);
// 				});
// 			});
// 		}
// 	}
	
	
	if (request.method == "POST") {
		console.log("post call");
		// Switch msg into a JSON object
		var formData = "",
			msg = "",
			obj = "";
		return request.on("data", function(data) {
			formData += data;


		}).on('end', function(chunk) {
			var user;
			user = qs.parse(formData);
			msg = JSON.stringify(user);
			console.log("305cde=" + msg);

			obj = JSON.parse(msg);
			
			
			
			console.log("aa123=" + obj['action']);
			if (request.url == "/login.html") {
				console.log("login page comes");

				if (obj['action'] == "add_song") {
					console.log("add song h");
					if (request.url == "/addsong") {
						console.log("add song here");
					}
				}



				if (obj['act'] == "signup") {
					//if (obj.signup != null) {

					console.log("SIGNUP");
					// Send obj data to dataB

					db.open(function() {

						db.collection("user", function(err, collection) {

							collection.insert({

								username: obj.ac,
								password: obj.pw
							}, function(err, data) {

								if (data) {
									console.log("Successfully Insert");
									//response.end(200, {'success': "apple"});
									response.end('{"success" : "Updated Successfully", "status" : 200}');
								} else {
									console.log("Failed to Insert");
								}
							});
						});
						
					});

				} else if (obj['act'] == "login") {
					//if (obj.signup != null) {
					//	response.end('{"success" : "Updated Successfully", "status" : 200}');
					console.log("LOGIN");
					// Send obj data to dataB
					//	db.open(function() {

					//		db.collection("user", function(err, collection) {

					//collection.find({

					//		username: obj.ac,
					//			password: obj.pw
					//		}, function(err, data) {

					//	if (data) {
					console.log("Successfullyfound");





					var username = obj.ac;
					var password = obj.pw;

					console.log("input login=" + obj.ac);
					console.log("input pass=" + obj.pw);

					MongoClient.connect("mongodb://localhost:27017/dataB", function(err, db) {
						db.collection("user", function(err, collection) {
							collection.find().toArray(function(err, items) {
								if (err) throw err;
								// Check whether there is data in the dataB
								console.log(items.length);
								if (items != "") {
									// Check whether the user account exists
									for (var i = 0; i < items.length; i++) {

										//	if (username == items[i].ac && password == items[i].pw) {
										console.log("user=" + items[i].username);
										console.log("pass=" + items[i].password);
										console.log("user1=" + obj.ac);
										console.log("pass1=" + obj.pw);
										if (items[i].username == obj.ac && items[i].password == obj.pw) {
											usersssssss = items[i].username;

											console.log("user=" + items[i].username);
											console.log("pass=" + items[i].password);
											console.log("USER FOUND CONFIGURATION");
											//response.end('{"success" : "Updated Successfully", "status" : 200}');
											isLoginSuccessful = true;
										} else {
											isLoginSuccessful = false;
											//response.end('{"success" : "Updated Successfully", "status" : 200}');
										}


									}


									/*	  fs.readFile('./json.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
											console.log("end here");
                });*/

									if (isLoginSuccessful == false) {
										console.log("Fail to login");
										response.end('LOGIN FAIL');

									} else {
										console.log("LOGIN OK");
										response.end('LOGIN OK');
									}
								}
							});
						});
					});
					//	} else {
					//	console.log("Failed to Insert");
					//	}
					//	});
					//});
					//	});

				}
			} //if request.url = login.html

		})
	} else if (request.url == "/search2") {
		fs.readFile('./search.html', function(error, content) {
			console.log("search page");
			response.writeHead(200, {
				'Content-Type': 'text/html'
			});
			response.end(content, 'utf-8');
		});
	} else {

		// Get
		fs.readFile("./" + request.url, function(err, data) {
			var dotoffset = request.url.lastIndexOf(".");
			var mimetype = dotoffset == -1 ?
				"text/plain" : {
					".html": "text/html",
					".ico": "photo/x-icon",
					".jpg": "photo/jpeg",
					".png": "photo/png",
					".gif": "photo/gif",
					".css": "text/css",
					".js": "text/javascript"
				}[request.url.substr(dotoffset)];
			if (!err) {
				response.setHeader("Content-Type", mimetype);
				response.end(data);
				console.log(request.url, mimetype);
			} else {
				response.writeHead(302, {
					"Location": "./webproject/index.html"
				});
				response.end();
			}
		});
	}
});

server.listen(5001);

console.log("Server running at http://127.0.0.1:5001/");

// 						 var myobj = [
//     { name: 'John', address: 'Highway 71'},
//     { name: 'Peter', address: 'Lowstreet 4'},
//     { name: 'Amy', address: 'Apple st 652'},
//     { name: 'Hannah', address: 'Mountain 21'},
//     { name: 'Michael', address: 'Valley 345'},
//     { name: 'Sandy', address: 'Ocean blvd 2'},
//     { name: 'Betty', address: 'Green Grass 1'},
//     { name: 'Richard', address: 'Sky st 331'},
//     { name: 'Susan', address: 'One way 98'},
//     { name: 'Vicky', address: 'Yellow Garden 2'},
//     { name: 'Ben', address: 'Park Lane 38'},
//     { name: 'William', address: 'Central st 954'},
//     { name: 'Chuck', address: 'Main Road 989'},
//     { name: 'Viola', address: 'Sideway 1633'}
//   ];

// 					db.open(function() {

// 						db.collection("customers").insertMany(myobj, function(err, res) {
//     				if (err) throw err;
//    				 	console.log("Number of records inserted: " + res.insertedCount);
//   					});
// 					});