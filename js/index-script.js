$(document).ready(function() {
	"use strict";

	// Removes the img from the media div and prepends it to the start of that same div. Sets some css properties
	// to center it.
	var blog = $(".blog-post");
	if (window.innerWidth < 1024) {
		blog.removeClass("media");
		var img = $(blog).children("img");
		$(img).remove();
		$(blog).each(function(index) {
			$(this).prepend(img[index]);
			$(img[index]).wrap("<div></div>").removeClass("ml-3").css({"margin": "2% auto", "display": "block"});
		});
	}

	// If the window is scrolled beneath the jumbotron (past the start of the greeting cards), then a back to the
	// top button box is added in which the button html is loaded.
	function addButton(event) {
		if (window.scrollY > $("#greetings")[0].offsetTop) {
			$("body").append('<div id="to-top-box"></div>');
			$("#to-top-box").append('<div id="back-to-top"><a href="#page-title"><button>^</button></a></div>');
			// The button is hidden as soon as it is appended to the document, and when it is ready (it is loaded),
			// it fades in.
			$("#back-to-top button").hide();
			$("#back-to-top").ready(function() {
				$("#back-to-top button").fadeIn();
			});
			document.removeEventListener("scroll", addButton);
			document.addEventListener("scroll", removeButton);
		}
	}

	function removeButton(event) {
		if (window.scrollY < $("#greetings")[0].offsetTop) {
			$("#back-to-top button").fadeOut();
			document.removeEventListener("scroll", removeButton);
			document.addEventListener("scroll", addButton);
		}
	}

	document.addEventListener("scroll", addButton);

	
});