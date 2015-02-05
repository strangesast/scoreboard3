var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var config = require('../config');
var mongoUrl = config.mongoUrl;
var maxWait = config.wait;

var Db;

function connect(firstCallback, secondCallback, secondParameters) {
	if (Db === undefined) {
		mongodb.connect(mongoUrl, function(err, db) {
			var string = 'mongo connection to ' + mongoUrl;
			if(err) {console.log(string + ' unsuccessful');}
			Db = db;
			console.log(string + ' successfull');
		  firstCallback(secondCallback, secondParameters);
		});
	} else {
		firstCallback(secondCallback, secondParameters);
	}
}


function count(callback, data) {
	get(function(_data) {
    var response =  [];
		for(var i=0; i<_data.length; i++) {
			response[i] = _data[i].length;
		}
		callback(response);
	}, data);
}


function get(callback, data) {
	var what = data.what;
	var response = [];

	function buildResponse(i) {
		return function(err, docs) {
			if(err) {
				response[i] = err;
			} else {
				response[i] = docs;
			}
			if(response.indexOf(undefined) == -1 && response.length == what.length) {
				callback(response);
			}
		};
	}

  for(var i=0; i<what.length; i++) {
		var each = what[i];
		if(config.validTypes.indexOf(each.type) == -1) {
			response[i] = null;
		} else {
		  Db.collection(each.type).find(each).toArray(buildResponse(i));
		}
	}
}


function remove(callback, data) {
	var what = data.what;
	var response = [];

	function buildResponse(i) {
		return function(err, docs) {
			if(err) {
				response[i] = err;
			} else {
				response[i] = docs;
			}
			if(response.indexOf(undefined) == -1 && response.length == what.length) {
				callback(response);
			}
		};
	}

  for(var i=0; i<what.length; i++) {
		var each = what[i];
		if(config.validTypes.indexOf(each.type) == -1) {
			response[i] = null;
		} else {
		  Db.collection(each.type).remove(each, buildResponse(i));
		}
	}
}


function add(callback, data) {
	var what = data.what;
	var response = [];

	function buildResponse(i) {
		console.log('tosat');
		return function(err, docs) {
			if(err) {
				response[i] = err;
			} else {
				response[i] = docs;
			}
			if(response.indexOf(undefined) == -1 && response.length == what.length) {
				callback(response);
			}
		};
	}

	for(var i=0; i<what.length; i++) {
		var each = what[i];
		console.log(each);
		if(config.validTypes.indexOf(each.type) == -1) {
			response[i] = null;
		} else {
			console.log('good');
		  Db.collection(each.type).insert(each, buildResponse(i));
		}
	}
}

var routing = {'count': count, 'get': get, 'remove': remove, 'add': add};

router.post('/', handle);
router.get('/', handle);

function handle(req, res) {
	var incomingObj = req.body;

	if(validate(incomingObj)) {
    var method = routing[incomingObj.method];
	  connect(method, function(obj) {res.send(obj);}, incomingObj);

	} else {
		res.send('invalid');
	}
}

function validate(obj) {
	// check for method and what in incoming object
	if(!('method' in obj)) { console.log('bad method'); return false;}
	if(!('what' in obj)) { console.log('bad what'); return false;}
	// verify each what has a type
	for(var i=0; i<obj.what.length; i++) {
		if(!('type' in obj.what[i])) {
			console.log(obj.what[i]);
			return false;
		}
	}
	return true;
}

module.exports = router;
