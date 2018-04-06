$(document).ready(function() {

	$('.save-button').on('click', function() {
		let id = ($(this).data('id'));
		let title = ($(this).data('title'));
		let link = ($(this).data('link'));
		let summary = ($(this).data('summary'));

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
		let id = ($(this).data('id'));
		let title = ($(this).data('title'));
		let link = ($(this).data('link'));
		let summary = ($(this).data('summary'));

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
		let id = ($(this).data('id'));
		console.log(id);
		let comment = $('.comment-area').val().trim();
		console.log(comment);
		let newComment = {
			body: comment
		}

		// $.post('/submit/' + id, newComment)
		// 	.then(function() {
		// 		console.log('comment posted');
		// 	});
	});

	$('.delete-comment-button').on('click', function() {
		let id = ($(this).data('id'));
		$.post('/api/delete-comment/' + id)
		.then(function() {
			location.reload();
		})
	});



});