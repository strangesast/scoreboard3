var express = require('express');
var router = express.Router();

router.get('/', handleIndexRequest);
router.post('/', handleIndexRequest);

function handleIndexRequest(req, res) {
	var method = req.method;
	if(method=='GET') {
		// handle get
	  res.render('index');

	} else if(method=='POST') {
		// handle post
		res.send('post');

	}
}

// add a player/game/event to the db
router.get('/add', function(req, res) {
	res.render('add');
});

module.exports = router;
