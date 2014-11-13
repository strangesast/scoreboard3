$(document).ready(function() {
	console.log('toast Ready toast');
	$('#datetimepicker1').datetimepicker();
});


function getGly(index, css) {
	return (css.match (/(^|\s)glyphicon-\S+/g) || []).join(' ');
}

$('#typeInput').on('input', function(eventObj) {
	if(this.value == 'event') {
		$('#timeRow').removeClass('hidden');
		$('#gameRow').removeClass('hidden');
		$('#teamRow').addClass('hidden');
		$('#prevIcon').removeClass(getGly).addClass('glyphicon-tasks');
	} else if(this.value == 'player') {
		$('#teamRow').removeClass('hidden');
		$('#timeRow').addClass('hidden');
		$('#gameRow').addClass('hidden');
		$('#prevIcon').removeClass(getGly).addClass('glyphicon-user');
	} else if(this.value == 'game') {
		$('#timeRow').addClass('hidden');
		$('#teamRow').addClass('hidden');
		$('#gameRow').addClass('hidden');
		$('#prevIcon').removeClass(getGly).addClass('glyphicon-bullhorn');
	}
});

$('#submit').on('click', function(eventObj) {
	var obj = {'method':'add'};
  obj.what = {};
	var type = document.getElementById('typeInput').value;
	obj.what.type = type;
	if(type == 'event') {
    var date = $('#datetimepicker1').data('DateTimePicker').getDate();
		console.log(date);
		obj.what.date = date;
		obj.what.parent = document.getElementById('gameInput').value;
	} else if(type == 'game') {
	} else if(type == 'player') {
		obj.what.team = document.getElementById('teamInput').value;
	}
	var name = document.getElementById('nameInput').value
	obj.what.name = name;
  console.log(obj);
});


$('#nameInput').on('input', function() {
	$('#objectName').text(this.value);
});
