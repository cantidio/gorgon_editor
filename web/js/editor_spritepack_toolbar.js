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
	
	this.mShortcutListener = new ShortcutListener();
	this.mZoomStep	= 1;
	this.mMaxZoom	= 8;
	this.mMinZoom	= 1;
	
	this.registerEvents();
	this.registerShortcuts();
}
/**
 * Event that flips the sprite horizontally 
 */
EditorSpriteToolBar.prototype.eventFlipHorizontal = function()
{
	var sprite = Editor.getCurrentSprite();
	if( sprite )
	{
		sprite.flipHorizontal( function( sprite ) { Editor.mSpritePackView.mDrawingArea.setSprite( sprite ); } );
	}
}
/**
 * Event that flips the sprite vertically 
 */
EditorSpriteToolBar.prototype.eventFlipVertical = function()
{
	var sprite = Editor.getCurrentSprite();
	if( sprite )
	{
		sprite.flipVertical( function( sprite ) { Editor.mSpritePackView.mDrawingArea.setSprite( sprite ); } );
	}
}
/**
 * Event that rotates the current sprite 90 to the left
 */
EditorSpriteToolBar.prototype.eventRotateLeft = function()
{
	var sprite = Editor.getCurrentSprite();
	if( sprite )
	{
		sprite.rotateLeft( function( sprite ) { Editor.mSpritePackView.mDrawingArea.setSprite( sprite ); } );
	}
}
/**
 * Event that rotates the current sprite 90 to the right
 */
EditorSpriteToolBar.prototype.eventRotateRight = function()
{
	var sprite = Editor.getCurrentSprite();
	if( sprite )
	{
		sprite.rotateRight( function( sprite ) { Editor.mSpritePackView.mDrawingArea.setSprite( sprite ); } );
	}
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
 * Event that toggles the border in the sprite
 */
EditorSpriteToolBar.prototype.eventBorderToggle = function()
{
	Editor.mSpritePackView.mDrawingArea.mSprite.toggleClass("borderOn");
}
/**
 * Method that register all events necessary for the toolbar
 */
EditorSpriteToolBar.prototype.registerEvents = function()
{
	this.mTools.flipHorizontal.click( (function(obj){ return function(){ obj.eventFlipHorizontal(); } } )(this) );
	this.mTools.flipVertical.click	( (function(obj){ return function(){ obj.eventFlipVertical(); 	} } )(this) );
	this.mTools.rotateLeft.click	( (function(obj){ return function(){ obj.eventRotateLeft(); 	} } )(this) );
	this.mTools.rotateRight.click	( (function(obj){ return function(){ obj.eventRotateRight(); 	} } )(this) );
	this.mTools.borderToggle.change	( (function(obj){ return function(){ obj.eventBorderToggle();	} } )(this) );
	this.mTools.remove.click		( (function(obj){ return function(){ obj.eventRemoveSprite(); 	} } )(this) );
	this.mTools.zoomIn.click		( (function(obj){ return function(){ obj.eventZoomIn(); 		} } )(this) );
	this.mTools.zoomOut.click		( (function(obj){ return function(){ obj.eventZoomOut();		} } )(this) );
	this.mTools.zoomNormal.click	( (function(obj){ return function(){ obj.eventZoomNormal(); 	} } )(this) );
}
/**
 * Method that registers all the shortcuts used in this view
 */
EditorSpriteToolBar.prototype.registerShortcuts = function()
{
	this.mShortcutListener.shortcut
	({
		keys: [ KeyListener.KEY.Delete ],
		down: (function(obj){ return function() { obj.mTools.remove.click(); } } ) (this)
	});
	this.mShortcutListener.shortcut
	({
		keys: [ KeyListener.KEY.Control, KeyListener.KEY.Num_0 ],
		down: (function(obj){ return function() { obj.mTools.zoomNormal.click(); } } ) (this)
	});
	this.mShortcutListener.shortcut
	({
		keys: [ KeyListener.KEY.Control, KeyListener.KEY.Pad_0 ],
		down: (function(obj){ return function() { obj.mTools.zoomNormal.click(); } } ) (this)
	});
	this.mShortcutListener.shortcut
	({
		keys: [ KeyListener.KEY.F ],
		down: (function(obj){ return function() { obj.mTools.borderToggle.click(); } } ) (this)
	});
}
