$(document).ready(function() {
	"use strict";

	// If the screen is extra large then all the container classes are replaced with "container-fluid" so the
	// content isn't squeezed.
	if (window.innerWidth > 1800) {
		$(".container").each(function() {
			for (var i = 0; i < $(this).attr("class").split(" ").length; i++) {
				 if ($(this).attr("class").split(" ")[i] == "container")
				 	$(this).removeClass("container").addClass("container-fluid");
			}
		});
	}

	// Collapse the collapsable nav if it loses focus.
	$(".navbar-toggler").blur(function(event) {
		if (window.innerWidth < 576) 
			$(".navbar-collapse").collapse("hide");
	})

})