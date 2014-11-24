(function( $ ) {
	$.fn.scrollable = function() {
		$(this).each( function()
		{
			$(this).addClass("scrollable-content");
			$(this).wrap( $('<div class="scrollable"/>' ).css({width: "100%", height: "100%" }) );
			$(this).wrap( $('<div class="scrollable-content-closure"/>') );
			
			var content_closure	= $(this).parent(),
				scroll_area		= content_closure.parent(),
				vertical		= $(this)[0].scrollHeight	> scroll_area.height()	? true : false,
				horizontal		= $(this)[0].scrollWidth	> scroll_area.width()	? true : false;
			
			if( vertical )
			{
				content_closure.css({ width: scroll_area.width() - 12 });
			}
			if( horizontal )
			{
				content_closure.css({ height: scroll_area.height() - 12 });
			}			
			if( vertical )
			{
				var slider		= $('<div/>').slider
				({
					orientation: 	"vertical",
					max:			0,
					value:			0,
					step:			1,
					min:			scroll_area.height() - $(this)[0].scrollHeight - 16,
					slide:			function()
					{
						$(this).parent().parent().children(".scrollable-content-closure").children(".scrollable-content").css("margin-top", $(this).slider("value") );
					}
				 });
				var scrollbar	= $('<div class="scroll slider-closure-vertical">').append ( slider ).css({ height: content_closure.height() - 42 });
				scroll_area.append( scrollbar );
				$(this).css({ width: $(this)[0].scrollWidth + 20 });
			}
			
			if( horizontal )
			{
				var slider		= $('<div/>').slider
				({
					min:			0,
					value:			0,
					step:			1,
					max:			$(this)[0].scrollWidth - scroll_area.width() + 16,
					slide:			function()
					{
						$(this).parent().parent().children(".scrollable-content-closure").children(".scrollable-content").css("margin-left", -$(this).slider("value") );
					}
				 });
				var scrollbar	= $('<div class="scroll slider-closure">').append ( slider ).css({ width: content_closure.width() - 30 });
				scroll_area.append( scrollbar );
				
				$(this).css({ height: $(this)[0].scrollHeight + 20 });
			}
		});
	};
})( jQuery );