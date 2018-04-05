$(document).ready(function() {

	$('.save-button').on('click', function(result) {
		let id = ($(this).attr('data-id'));
		let title = ($(this).attr('data-title'));
		let link = ($(this).attr('data-link'));
		let summary = ($(this).attr('data-summary'));

		let savedArticle = {
			title: title,
			link: link,
			summary: summary
		};

		$.post('/api/save/' + id , savedArticle)
		.then(function() {
			console.log('article saved to saved articles')
		});
		location.reload();
	});

	$('.delete-article-button').on('click', function(result) {
		let id = ($(this).attr('data-id'));
		let title = ($(this).attr('data-title'));
		let link = ($(this).attr('data-link'));
		let summary = ($(this).attr('data-summary'));

		let articleToPutBack = {
			title: title,
			link: link,
			summary: summary
		};

		$.post('/api/delete-save/' + id , articleToPutBack)
		.then(function() {
			console.log('article saved to all articles')
		});
		location.reload();
	});
});