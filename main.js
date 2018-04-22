$(document).ready(function() {
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

	var weekday = new Array(7);
	weekday[0] = 'Sun';
	weekday[1] = 'Mon';
	weekday[2] = 'Tues';
	weekday[3] = 'Wed';
	weekday[4] = 'Thurs';
	weekday[5] = 'Fri';
	weekday[6] = 'Sat';

	/**
	 * Preference Code
	 */
	var term = localStorage.getItem('uplifter-keyword') || 'Cats';
	let pagination = 0;
	$('#keyword').val(term);

	function setGraph() {
		var today = new Date();
		var dateKey = 'uplifter-' + today.toDateString();
		var dayCount = localStorage.getItem(dateKey);
		if (!dayCount) {
			localStorage.setItem(dateKey, 1);
			dayCount = 0;
		} else {
			localStorage.setItem(dateKey, parseInt(dayCount) + 1);
		}

		dayCount++;

		$('#clicks')
			.text(dayCount)
			.attr('color', '#a4defb');

		let dates = [
			today,
			new Date(new Date().setDate(today.getDate() - 1)),
			new Date(new Date().setDate(today.getDate() - 2)),
			new Date(new Date().setDate(today.getDate() - 3)),
			new Date(new Date().setDate(today.getDate() - 4)),
			new Date(new Date().setDate(today.getDate() - 5)),
			new Date(new Date().setDate(today.getDate() - 6)),
		];

		dates.reverse();

		let xAxisLabels = dates.map(v => {
			return weekday[v.getDay()];
		});

		let data = dates.map(v => {
			return localStorage.getItem('uplifter-' + v.toDateString()) || 0;
		});

		// Chart JS
		var ctx = $('#myChart');
		Chart.defaults.global.maintainAspectRatio = false;
		var myChart = new Chart(ctx, {
			type: 'bar',
			responsive: true,
			maintainAspectRatio: false,
			data: {
				labels: xAxisLabels,
				datasets: [
					{
						label: '# of Opens',
						data,
						backgroundColor: [
							'rgb(164,222,251)',
							'rgb(164,222,251)',
							'rgb(164,222,251)',
							'rgb(164,222,251)',
							'rgb(164,222,251)',
							'rgb(164,222,251)',
							'rgb(164,222,251)',
						],
						borderColor: [],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		});

		getGiphyData();
	}

	function getGiphyData(paginationToken) {
		var xhr = $.get(
			`http://api.giphy.com/v1/gifs/search?q=${term}&api_key=f45de3pN5Sbl176lzuuTOy6luCX51mRU&offset=${pagination}`
		);
		xhr.done(function(data) {
			for (var d in data.data) {
				$('#contentList').append(
					`<li><img height="200px" style="padding: 20px" src="${
						data.data[d].images.original.url
					}"/></li>`
				);
			}
			pagination += 25;
		});
	}

	function changeKeyword(val) {
		$('#contentList').empty();
		localStorage.setItem('uplifter-keyword', val);
		term = val;
		getGiphyData();
	}

	$('#btnSubmit').click(function() {
		var k = $('#keyword').val();
		console.log(k);
		if (!k) {
			alert('Input cannot be blank');
		} else {
			changeKeyword(k);
		}
	});

	$('#loadMore').click(function() {
		getGiphyData();
	});

	function loadMore(val) {
		getGiphyData();
	}

	setGraph();
});
