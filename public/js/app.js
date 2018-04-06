$(document).ready(function() {
	
	 // save article button on click
	 // this will send the ajax call to the post that will put the passed in object into the database
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

	// delete saved article on click
	// this will send the ajax call to the post that will delete the article matching the id
	// it will also pass in an object of the deleted article to put back into the all articles database
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

	// delete comment on click
	// this will send the ajax call to delete the comment form the database with the specific id
	$('.delete-comment-button').on('click', function() {
		let id = ($(this).data('id'));
		$.post('/api/delete-comment/' + id)
		.then(function() {
			location.reload();
		})
	});
});