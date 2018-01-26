$(document).foundation();

$('.ani').click(function(e) {
	$('#mp').addClass('bounceUp');
	e.preventDefault();
	setTimeout(function() {
	  window.location.href = "major-project.html";
	}, 900);
	console.log("I got this far");
});
$('.visit').click(function(e) {
	$(this).addClass('rubberBand');
	e.preventDefault();
	setTimeout(function() {
	  window.location.href = "sites/mp";
	}, 500);
	console.log("I got this far");
});