var currentActiveTab = '#mainView';
$('#userView').hide();

$('#mainButton').click(function() {
	currentActiveTab = '#mainView';
	$('#mainButton').attr('src', './assets/logo.png');
	$('#userButton').attr('src', './assets/profile_grey.png');
	$('#userView').hide();
	$('#mainView').show();
});

$('#userButton').click(function() {
	currentActiveTab = '#userView';
	$('#mainButton').attr('src', './assets/lgoo_grey.png');
	$('#userButton').attr('src', './assets/profile_color.png');
	$('#userView').show();
	$('#mainView').hide();
});

function setGraph() {
	var dateKey = 'uplifter-' + new Date().toDateString();
	var dayCount = localStorage.getItem(dateKey);
	if (!dayCount) {
		localStorage.setItem(dateKey, 1);
	} else {
		localStorage.setItem(dateKey, parseInt(dayCount) + 1);
	}

	$('#clicks')
		.text(dayCount)
		.attr('color', '#a4defb');
}

setGraph();
