/**
 * Class that represents the sprite toolbar
 */
function EditorSpriteToolBar()
{
	this.mElement = $("#sprite-toolbar");
	this.mTools = 
	{
		remove:			this.mElement.children("#removeSprite"),
		crop:			this.mElement.children("#crop"),
		flipHorizontal:	this.mElement.children("#flipHorizontal"),
		flipVertical:	this.mElement.children("#flipVertical"),
		rotateLeft:		this.mElement.children("#rotateLeft"),
		rotateRight:	this.mElement.children("#rotateRight"),
		zoomNormal:		this.mElement.children("#zoomNormal"),
		zoomOut:		this.mElement.children("#zoomOut"),
		zoomIn:			this.mElement.children("#zoomIn"),
		borderToggle:	this.mElement.children(".borderToggle").children("input"),
		lock:			this.mElement.children(".lock").children("input")
	};
	this.mZoomStep	= 1;
	this.mMaxZoom	= 8;
	this.mMinZoom	= 1;
	
	this.registerEvents();
}
/**
 * Event that increases 1 zoom step to the current zoom
 */
EditorSpriteToolBar.prototype.eventZoomIn = function()
{
	var	drawingArea = Editor.mSpritePackView.mDrawingArea,
		currentZoom = drawingArea.zoom();

	if( currentZoom + this.mZoomStep > this.mMaxZoom )
	{
		drawingArea.zoom( this.mMaxZoom );
	}
	else
	{
		drawingArea.zoom( currentZoom + this.mZoomStep );
	}
}
/**
 * Event that decreases 1 zoom step from the current zoom
 */
EditorSpriteToolBar.prototype.eventZoomOut = function()
{
	var	drawingArea = Editor.mSpritePackView.mDrawingArea,
		currentZoom = drawingArea.zoom();
		
	if( (currentZoom - this.mZoomStep) < this.mMinZoom )
	{
		drawingArea.zoom( this.mMinZoom );
	}
	else
	{
		drawingArea.zoom( currentZoom - this.mZoomStep );
	}
}
/**
 * Event that sets the zoom to normal
 */
EditorSpriteToolBar.prototype.eventZoomNormal = function()
{
	Editor.mSpritePackView.mDrawingArea.zoom( 1.0 );
}
/**
 * Event that removes the current displayed sprite
 */
EditorSpriteToolBar.prototype.eventRemoveSprite = function()
{
	Editor.actionRemoveSprite( Editor.mSpriteShown );
}
/**
 * Method that register all events necessary for the toolbar
 */
EditorSpriteToolBar.prototype.registerEvents = function()
{
	this.mTools.remove.click( (function(obj){ return function(){ obj.eventRemoveSprite(); } } )(this) );
	this.mTools.zoomIn.click( (function(obj){ return function(){ obj.eventZoomIn(); } } )(this) );
	this.mTools.zoomOut.click( (function(obj){ return function(){ obj.eventZoomOut(); } } )(this) );
	this.mTools.zoomNormal.click( (function(obj){ return function(){ obj.eventZoomNormal(); } } )(this) );
}