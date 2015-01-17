// Animates the dimensional changes resulting from altering element contents
// Usage examples: 
//    $("#myElement").showHtml("new HTML contents");
//    $("div").showHtml("new HTML contents", 400);
//    $(".className").showHtml("new HTML contents", 400, 
//                    function() {/* on completion */});
(function($) {
	$.fn.showhtml = function(html, speed, callback) {
		return this.each(function() {
			// The element to be modified
			var el = $(this);

			var finish = {
				width : this.style.width,
				height : this.style.height
			};

			var cur = {
				width : el.width() + 'px',
				height : el.height() + 'px'
			};

			// Modify the element's contents. Element will resize.
			el.html(html);

			// Capture the final dimensions of the element
			// (with initial style settings still in effect)
			var next = {
				width : el.width() + 'px',
				height : el.height() + 'px'
			};

			el.css(cur) // restore initial dimensions
			.animate(next, speed, function() // animate to final dimensions
			{
				el.css(finish); // restore initial style settings
				if ($.isFunction(callback))
					callback();
			});
		});
	};
})(jQuery);
