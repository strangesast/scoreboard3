var express = require('express');
var router = express.Router();

router.get('/', handleRequest);
router.post('/', handleRequest);

function handleRequest(req, res) {
	var method = req.method;
	if(method=='GET') {
		// handle get
	  res.render('index');

	} else if(method=='POST') {
		// handle post
		res.send('post');

	}
}

module.exports = router;
