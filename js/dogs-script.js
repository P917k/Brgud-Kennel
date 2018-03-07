$(document).ready(function() {
	"use strict";

	// Removes the carousel and inserts it before the 'dog-info' classes. Since in the desktop view the carousel
	// is positioned left or right, this way we ensure that in mobile view the carousel is always on top of the
	// dog-info
	if (window.innerWidth < 800) {
		var pic = $(".carousel");
		$(pic).remove();
		$(pic).each(function(index) {
			$(this).insertBefore($(".dog-info")[index]);
		});

		$(".carousel-item img").removeClass("h-100");
	}
})
