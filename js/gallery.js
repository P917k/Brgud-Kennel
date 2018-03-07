/*
Author: Luka Abramović
E-mail: lukaabramovic2@gmail.com
Date:
Name: gallery.js

------------------------------------------------------------

REQUIREMENTS:
In the HTML document the intended pictures that are going to be shown in the gallery must be contained in a
following fashion:

<div class="gallery">
	<div class="gallery-row">
		<div class="gallery-picture">
			<img src="...">
			<span>Title</span>
			<p class="image-description">Something something in the month of May</p>
		</div>
		<div class="gallery-picture">
			<img src="...">
			<span>Title</span>
			<p class="image-description">Something something in the month of May</p>
		</div>
		...
	</div>
</div>

jQuery is also a requirement for the module to work.

*/

// Setting up "assert" to easily test inputs
$(document).ready(function() {
	function AssertionFailed(message) {
		this.message = message;
	}

	AssertionFailed.prototype = Object.create(Error.prototype);

	function assert(test, message) {
		if (!test)
			throw new AssertionFailed(message);
	}

	assert(typeof $ === "function", "jQuery is needed for this module to work");

	(function(exports) {

		var Gallery = {
			ROWS: $(".gallery-row"),
			PICTURES: $(".gallery-picture"),

			// Default CSS values for the gallery, rows and pictures.
			defaultValues: {
				galleryWidth: "100%",
				rowHeight: "250px",
				rowWidth: "95%",
				pictureWidth: Math.floor(100 / this.ROWS[0].children(".gallery-picture").length) + "%",
				pictureHeight: "225px"
			},

			addListeners: function() {
				console.log(this.pictures);
			}
		}

		Gallery.addListeners();

		var Lightbox = {
			setElements: function(thumbnail) {
				this.title = $(thumbnail).children("span");
				this.description = $(thumbnail).children(".image-description");
				this.current = null;
			}
		}

	})(this.gallery = {})
})