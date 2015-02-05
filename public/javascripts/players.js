var localUrl = '/api';

$(document).ready(function() {
	var obj = {"method": "get", "what": [{"type":"player"}]};
	ajaxy(localUrl, JSON.stringify(obj), arrangePlayers);
});

function arrangePlayers(playerArray) {
	var source = $('#playerCard').html();
	var template = Handlebars.compile(source);

	for(var i=0; i<playerArray[0].length; i++) {
		var current = playerArray[0][i];
		var data = {
			'id' : current._id,
		  'name': current.name,
			'team': current.team
		}
		console.log(data);
		$('.list').append(template(data));
	}
}


function removePlayer(playerCard) {
	$(playerCard).prop('disabled', true);
	var _parent = $(playerCard).parent();
	var _id = _parent.attr('id');
	var obj = {'method':'remove', 'what': [{'type':'player', '_id': _id}]};
	ajaxy(localUrl, JSON.stringify(obj), function(res) {console.log(res); removeDiv(_parent)});
	//removeDiv(_parent);
}

function removeDiv(domObj) {
	domObj.animate({'height': '0px'}, 500).fadeOut(500, function() {$(this).remove();});
}


function ajaxy(url, obj, callback) {
  var promise = $.ajax({
		url: url,
		contentType:"application/json", // this is essential
		type: 'POST',
		data: obj
	});

	promise.done(function(data, err) {
		callback(data);
	});
}
