$(document).ready(function() {
	let modal = $('#myModal');

	$('.save-button').on('click', function() {
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

	$('.delete-article-button').on('click', function() {
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

	$('.submit-comment').on('click', function() {
		let id = ($(this).attr('data-id'));
		let comment = $('.comment-area').val();
		let newComment = {
			body: comment
		}

		$.post('/submit/' + id, newComment)
			.then(function() {
				console.log('comment posted');
			});
	});

	$('.delete-comment-button').on('click', function() {
		let id = ($(this).attr('data-id'));
		$.delete('/api/delete-comment' + id)
		.then(function() {
			location.reload();
		})
	})

});