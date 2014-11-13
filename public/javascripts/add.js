$(document).ready(function() {
	console.log('toast Ready toast');
	$('.thumbnail').css("background-color", "yellow");
	$('#datetimepicker1').datetimepicker();
});


function getDesc() {
	return document.getElementById('descInput').value;
}

function getType() {
	return document.getElementById('typeInput').value;
}

function getTeam() {
	var input = document.getElementById('teamInput');
	var value = input.options[input.selectedIndex].value;
	return value;
}

function getAddTeam() {
	var input = document.getElementById('addTeamInput');
	var inputOption = input.options[input.selectedIndex];
	if(inputOption !== undefined) {
		var value = inputOption.value;
	} else {
		var value = undefined;
	}
	return value;
}

function getGly(index, css) {
	return (css.match (/(^|\s)glyphicon-\S+/g) || []).join(' ');
}

// control which rows are visible for each type
$('#typeInput').on('input', function(eventObj) {
  $('#objectName').text('Example Name');
	$('#objectDesc').text('Lorum ipsum dolorem...');
	$('input[type=text]').each(function() {this.value = ""});
	if(this.value == 'event') {
		$('#compRow').addClass('hidden');
		$('#nameRow').removeClass('hidden');
    $('#descRow').removeClass('hidden');
		$('.thumbnail').css("background-color", "lightgreen");
		$('#timeRow').removeClass('hidden');
		$('#gameRow').removeClass('hidden');
		$('#teamRow').addClass('hidden');
		$('#prevIcon').removeClass(getGly).addClass('glyphicon-tasks');
	} else if(this.value == 'player') {
		$('#compRow').addClass('hidden');
		$('#nameRow').removeClass('hidden');
    $('#descRow').addClass('hidden');
		$('.thumbnail').css("background-color", "lightblue");
		$('#teamRow').removeClass('hidden');
		$('#timeRow').addClass('hidden');
		$('#gameRow').addClass('hidden');
		$('#prevIcon').removeClass(getGly).addClass('glyphicon-user');
		$('#objectDesc').text(getTeam());
	} else if(this.value == 'game') {
		$('#compRow').removeClass('hidden');
		$('#nameRow').removeClass('hidden');
		$('.thumbnail').css("background-color", "yellow");
    $('#descRow').addClass('hidden');
		$('#timeRow').addClass('hidden');
		$('#teamRow').addClass('hidden');
		$('#gameRow').addClass('hidden');
		$('#prevIcon').removeClass(getGly).addClass('glyphicon-bullhorn');
	} else if(this.value == 'team') {
		$('#compRow').addClass('hidden');
		$('#nameRow').removeClass('hidden');
		$('.thumbnail').css("background-color", "purple");
		$('#timeRow').addClass('hidden');
		$('#teamRow').addClass('hidden');
		$('#gameRow').addClass('hidden');
		$('#prevIcon').removeClass(getGly).addClass('glyphicon-link');
	}
});


$('#teamInput').on('input', function() {
  if(['player'].indexOf(getType() > -1)) {
		$('#objectDesc').text(getTeam());
	}
});


$('#nameInput').on('input', function() {
	$('#objectName').text(this.value);
});


$('#descInput').on('input', function() {
	if(['event', 'team'].indexOf(getType()) > -1) {
    $('#objectDesc').text(this.value);
	}
});


$('#addTeam').on('click', function() {
	var source = $('#testTemplate').html();
	var template = Handlebars.compile(source);
	var value = getAddTeam();
	if(value) {
	  var data = {'name' : value};
	  $('#compRow > .form-group').append(template(data));
	  $('#addTeamInput > option[value=' + value + ']').prop('disabled', true);
	  $('#addTeamInput').val('0');
	  refreshDescription();
	}
});

function removeGame(obj) {
	var _parent = $(obj).parent();
	var value = _parent.children(":first").text();
	$('#addTeamInput > option[value=' + value + ']').prop('disabled', false);
	_parent.remove();
	$('#addTeamInput').val('0');
	refreshDescription();
}

// refresh preview description
function refreshDescription() {
	document.getElementById('objectDesc').innerHTML = "";
	var teams = [];
	var teamList = $('.team-box');
	console.log(teamList)
	console.log(teamList.length)
	teamList.each(function() {
		teams.push($(this).children(':first').text())
		if(teams.length == teamList.length) {
			if(teams.length > 4) {
				teams = teams.slice(0, 4);
		    var text = teams.join([separator=' vs '])
		    text = text + '...';
			} else {
		    var text = teams.join([separator=' vs '])
			}
		  document.getElementById('objectDesc').innerHTML = text;
		}
	});
}

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
