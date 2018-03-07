$(document).ready(function() {
	$(".ppy").on("click", function(event) {
		// Sets the loading div while ajax requests are being performed
		var $loading = $('<div id="loading">Loading...</div>').insertBefore($("#lightbox-container"));
		$(document).ajaxStart(function() {
			$loading.show();
		}).ajaxStop(function() {
			$loading.hide();
		});

		$.ajax({
			url: "snippets/lightbox.html",
			success: function(data) {
				$("#lightbox-container").html(data);
				populateLightbox(event.target, $("#lightbox"));
			}
		});

		// Populates the lightbox with the clicked ('target') picture, current number of picture, title, description.
		function populateLightbox(target, lightbox) {
			// Declaring 'i' here as to avoid multiple unneccesary declarations of the same 
			// variable at the time of its assignment at the declaration of 'current'.
			var i = 0;
			// Ensures that even if the user clicks on the span element, the script will not break
			if ($(target).siblings("img").length != 0)
				target = $(target).siblings("img")[0];

			// Sets the title of the picture in the lightbox to be the span text content.
			var title = $(lightbox).find("h3");
			$(title).text($(target).siblings("span").text());

			// Sets the description of the lightbox to be the description of the thumbnail picture that was clicked
			$("#lightbox-pic-desc p").text($(target).parent(".ppy").children("p").text());

			//Adds the image that was clicked to the lightbox
			var img = $(target).attr("src");
			var imgPath = /^(.*\/)(thumbnail\/)(.*)$/.exec(img)[1] + /^(.*\/)(thumbnail\/)(.*)$/.exec(img)[3];
			var lightboxImage = $("<img />").attr("src", imgPath).on("load", function() {
				if (!this.complete) {
					$("#lightbox-pic-space").prepend("<p>There was an error!</p>");
				}
				else {
					$("#lightbox-pic-space").find("img").remove();
					$("#lightbox-pic-space").prepend(lightboxImage);
				}
			});


			// Gets the total number of images per litter and finds the clicked picture and sets its current number
			var imgNumber = $(target).parents(".row").children().length;
			$(target).parents(".row").siblings(".row").each(function(index) {
				imgNumber += $(this).children(".col-lg-2").length;
			});
			var current = $(".litter-pics .row").each(function(index) {
				$(this).children(".col-lg-2").each(function(index) {
					// Checks if the 'target' parents div which hold all the thumbnails (".litter-pics") is the same
					// as the current one of the iteration. If not, that means the picture belongs to a different
					// "gallery" (different set of pictures/different litter) so the counter for the picture number
					// is set back to zero.
					if ($(this).parents(".litter-pics").is($(target).parents(".litter-pics")))
						i++;
					else
						i = 0;
					if ($(this).children(".ppy").children("img").is($(target)))
						$("#lightbox-current").text(i + "/" + imgNumber);
				});
			});

			// Adds the event listeners for the escape button and previous and next buttons.
			function addEvents(target) {
				// 'target' is the picture that will be showed after the next or previous buttons are clicked.
				var escButton = $("#lightbox-escape");
				var nextButton = $(".frwrd");
				var backButton = $(".back");

				// Event listener for escape
				$(escButton).on("click", function(event) {
					$("#lightbox-container").empty();
				})

				// Clicking outside of the lightbox exits the lightbox
				if ($("#lightbox").length > 0) {
					$(document).off("click.esc").on("click.esc", function(event) {
						if ($(event.target).parents("#lightbox").length == 0){
							if ($(event.target)[0] != $("#lightbox")[0])
								$(escButton).trigger("click");
						}
					})
				}

				// Adds an event for sliding picture in mobile view

				// Adds key bindings for certain actions
				$(document).off("keydown").on("keydown", function(event) {
					if (event.which === 39)
						$(".frwrd").trigger("click");
					else if (event.which === 37)
						$(".back").trigger("click");
					else if (event.which === 27)
						$(escButton).trigger("click");
				})

				// Adds the event listeners for next and back
				$("#lightbox").off("click").on("click", function(event) {
					// Checks if the clicked elements of the lightbox are the next and prev buttons to avoid
					// iterating through each button and adding event listeners for each.
					if ($(event.target).is($(nextButton)) || $(event.target).is($(backButton))) {

						var next = $(target).parents(".col-lg-2").next().find("img");
						var previous = $(target).parents(".col-lg-2").prev().find("img");

						if ($(event.target).is($(nextButton))) {
							try {
								populateLightbox(next, $("#lightbox"));
							} catch(error) {
								// If a TypeError occurs, that means that the next picture is in the next row
								if (error instanceof TypeError) {
									next = $(target).parents(".row").next().children(".col-lg-2:first").find("img");
									// If the current picture is the last of the gallery (litter picture collection)
									// the next picture is set to the first picture of the batch (litter).
									if (next.length === 0)
										next = $(target).parents(".litter-pics").children(".row:first").children(".col-lg-2:first").find("img");
									populateLightbox(next, $("#lightbox"));
								} else {
									throw error;
								}
							}
						} else if ($(event.target).is($(backButton))){
							try {
								populateLightbox(previous, $("#lightbox"));
							} catch(error) {
								// If a TypeError occurs, that means that the previous picture is in the previous row
								if (error instanceof TypeError) {
									previous = $(target).parents(".row").prev().children(".col-lg-2:last").find("img");
									// If the current picture is the first of the gallery (litter picture collection)
									// the previous picture is set to the last picture of the batch (litter).
									if (previous.length === 0)
										previous = $(target).parents(".litter-pics").children(".row:last").children(".col-lg-2:last").find("img");
									populateLightbox(previous, $("#lightbox"));
								} else {
									throw error;
								}
							}
						}
					}
				});
			}

			addEvents(target);	
		}
	})
})