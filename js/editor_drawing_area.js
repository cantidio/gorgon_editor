/**
 * Class that represents the editor drawing area.
 *
 */
EditorDrawingArea = function()
{
	this.mElement	= $("#spritepack-drawing-area");
	this.mGrid		= this.mElement.children(".draggable");
	this.mHLine		= this.mGrid.children(".horizontal-line");
	this.mVLine		= this.mGrid.children(".vertical-line");
	this.mSprite	= this.mGrid.children("div.sprite");
	this.mGridScale	= 2;
	
	
	
	this.mGrid.draggable({ cancel: "div.sprite"  });
	this.mSprite.draggable
	({
		containment: "parent",
		drag: function()
		{
			//console.log( "xoffset: " + -( $(".hotspot").position().left - $(".sprite").position().left ) );
			//console.log( "yoffset: " + -( $(".hotspot").position().top - $(".sprite").position().top ) );
		}
	});
	
	
	this.updateSize();
	this.registerEvents();
}
/**
 * Method responsable for updating the drawing area size
 * along with its components
 */
EditorDrawingArea.prototype.updateSize = function()
{
	var	//parent	= this.mGrid.parent(),
		width	= this.mElement.width() * this.mGridScale,
		height	= this.mElement.height() * this.mGridScale,
		limit 	= { x: width - this.mElement.width(), y: height - this.mElement.height() };
	
	this.mGrid.css
	({
		width:		width,
		height:		height,
		top:		-limit.y / 2,
		left:		-limit.x / 2
	});

	this.mGrid.draggable
	(
		"option", "containment",
		[
			this.mElement.offset().left - limit.x,
			this.mElement.offset().top  - limit.y,
			this.mElement.offset().left,
			this.mElement.offset().top,
		]
	);
	
	this.mVLine.css
	({
		height:		height,
		marginTop:	-height / 2
	});
	this.mHLine.css
	({
		width:		width,
		marginLeft:	-width / 2
	});
}
/**
 * Method responsable for registering the events related to the Drawing area.
 */ 
EditorDrawingArea.prototype.registerEvents = function()
{
	$(window).resize( (function(obj) { return function() { obj.updateSize(); } })(this) ); //register the window resize event
}
