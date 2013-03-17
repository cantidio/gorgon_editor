/**
 * Class that represents the editor drawing area.
 */
EditorDrawingArea = function()
{
	this.mElement	= $("#spritepack-drawing-area");
	this.mGrid		= this.mElement.children(".draggable");
	this.mHLine		= this.mGrid.children(".horizontal-line");
	this.mVLine		= this.mGrid.children(".vertical-line");
	this.mSprite	= this.mGrid.children("div.sprite");
	this.mOnionSkin	= this.mGrid.children("div.onionskin");
	this.mHotspot	= this.mGrid.children(".hotspot");
	this.mBaseLabel	= this.mGrid.children("span");
	this.mGridScale	= 2;
	this.mZoom		= 1.0;
	
	this.mShortcutListener = new ShortcutListener();
	
	this.mGrid.draggable({ cancel: "div.sprite"  });
	this.mSprite.draggable({ containment: "parent" });
	
	this.updateSize();
	this.registerEvents();
	this.registerShortcuts();
}
/**
 * Method that sets the current zoom of the drawing area
 *
 * @param {Number} pZoom, the new value of the zoom (optional)
 * @return	{EditorDrawingArea} if the zoom were provided it will return the pointer to this object
 * @return	{Number} if the zoom were not provided it will return the current zoom value
 */
EditorDrawingArea.prototype.zoom = function( pZoom )
{
	if( pZoom != undefined )
	{
		this.mZoom = pZoom;
		this.updateSize();
		return this;
	}
	else
	{
		return this.mZoom;
	}
}
/**
 * Method that sets the displaying sprite in the drawing area
 *
 * @param	{Sprite} pSprite, the sprite to be shown
 * if no one is provided then it will clear the current displayed sprite
 */
EditorDrawingArea.prototype.setSprite = function( pSprite )
{
	this.mSprite.empty();
	if( pSprite != undefined )
	{
		this.mSprite.append( pSprite.image ).css
		({
			top:		this.mHotspot.position().top + pSprite.offset.y * this.mZoom,
			left:		this.mHotspot.position().left + pSprite.offset.x * this.mZoom,
			width:		pSprite.width() * this.mZoom,
			height: 	pSprite.height() * this.mZoom
		}).data("sprite", pSprite);
	}
}
/**
 * Method that sets the visible onionskin sprite
 *
 * @param	{Sprite} pSprite, the sprite to be shown as onionskin,
 * if no one is provided then it will clear the current displayed onionskin sprite
 */
EditorDrawingArea.prototype.setOnionSkinSprite = function( pSprite )
{
	this.mOnionSkin.empty();
	if( pSprite != undefined )
	{
		this.mOnionSkin.append( pSprite.image ).css
		({
			top:		this.mHotspot.position().top + pSprite.offset.y * this.mZoom,
			left:		this.mHotspot.position().left + pSprite.offset.x * this.mZoom,
			width:		pSprite.width()	* this.mZoom,
			height: 	pSprite.height() * this.mZoom
		}).data("sprite", pSprite);
	}
}
/**
 * Method that updates the correct sprite position based in the hotspot position
 * and in the sprite offsets
 */
EditorDrawingArea.prototype.updateSprite = function()
{
	if( this.mSprite.data("sprite") )
	{
		this.mSprite.css
		({
			top:	this.mHotspot.position().top	+ this.mSprite.data("sprite").offset.y * this.mZoom,
			left:	this.mHotspot.position().left	+ this.mSprite.data("sprite").offset.x * this.mZoom,
			width:	this.mSprite.data("sprite").width() 	* this.mZoom,
			height:	this.mSprite.data("sprite").height()	* this.mZoom,
		});
	}
	if( this.mOnionSkin.data("sprite") )
	{
		this.mOnionSkin.css
		({
			top:	this.mHotspot.position().top	+ this.mOnionSkin.data("sprite").offset.y * this.mZoom,
			left:	this.mHotspot.position().left	+ this.mOnionSkin.data("sprite").offset.x * this.mZoom,
			width:	this.mOnionSkin.data("sprite").width() 	* this.mZoom,
			height:	this.mOnionSkin.data("sprite").height()	* this.mZoom,
		});
	}
}
/**
 * Method responsable for updating the drawing area size
 * along with its components
 */
EditorDrawingArea.prototype.updateSize = function()
{
	var	width	= this.mElement.width() * this.mGridScale * this.mZoom,
		height	= this.mElement.height() * this.mGridScale * this.mZoom,
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
		width:		this.mZoom * 1.0,
		marginLeft:	-this.mZoom / 2,
		height:		height,
		marginTop:	-height / 2
	});
	this.mHLine.css
	({
		height:		this.mZoom * 1.0,
		marginTop:	-this.mZoom / 2,
		width:		width,
		marginLeft:	-width / 2
	});
	this.mHotspot.css
	({
		width:		this.mZoom 	* 5.0,
		height:		this.mZoom 	* 5.0,
		marginLeft:	-this.mZoom	* 5 / 2,
		marginTop:	-this.mZoom	* 5 / 2
	});
	this.mBaseLabel.css({ zoom: this.mZoom });
	this.mElement.css( "background-size", (30 * this.mZoom) + "px "+ (30 * this.mZoom) + "px" );
	this.mSprite.draggable( "option", "grid", [ this.mZoom, this.mZoom ] );
	this.updateSprite();
}
/**
 * Event called every time a sprite is dragged in the view
 *	Then it sets the correct offset based in the movement made
 *	and updates the spritepackview with the correct values
 */
EditorDrawingArea.prototype.eventSpriteDrag = function( event, ui )
{
	var zoom = Editor.mSpritePackView.mDrawingArea.zoom();
	$(this).data("sprite").offset.x = Math.round(( -$(".hotspot").position().left	+ ui.position.left) / zoom);
	$(this).data("sprite").offset.y = Math.round(( -$(".hotspot").position().top	+ ui.position.top ) / zoom);
	Editor.mSpritePackView.mSpriteProperties.setValues( $(this).data("sprite") );
}
/**
 * Event that is triggered when the user clicks on the sprite
 */
EditorDrawingArea.prototype.eventSpriteClick = function()
{
	Editor.mSpritePackView.mToolBar.mTools.borderToggle.click();
}
/**
 * Event that adds the visual indicationg that the sprite is ready to be moved
 */
EditorDrawingArea.prototype.eventMoveSpriteOn = function()
{
	if( $("input:focus").length == 0 && ! $(".sprite").hasClass("ui-draggable-dragging") )
	{
		Editor.mSpritePackView.mDrawingArea.mSprite.addClass("key-moving");
	}
}
/**
 * Event that removes the visual indicationg that the sprite is ready to be moved
 */
EditorDrawingArea.prototype.eventMoveSpriteOff = function()
{
	Editor.mSpritePackView.mDrawingArea.mSprite.removeClass("key-moving");
}
/**
 * Action that moves the sprite 1px to the left
 */
EditorDrawingArea.prototype.actionMoveSpriteLeft = function()
{
	if( $("input:focus").length == 0 && !this.mSprite.hasClass("ui-draggable-dragging") )
	{
		--this.mSprite.data("sprite").offset.x;
		this.updateSprite();
		Editor.mSpritePackView.mSpriteProperties.setValues( this.mSprite.data("sprite") );
	}
}
/**
 * Action that moves the sprite 1px to the right
 */
EditorDrawingArea.prototype.actionMoveSpriteRight = function()
{
	if( $("input:focus").length == 0 && !this.mSprite.hasClass("ui-draggable-dragging") )
	{
		++Editor.mSpritePackView.mDrawingArea.mSprite.data("sprite").offset.x;
		this.updateSprite();
		Editor.mSpritePackView.mSpriteProperties.setValues( this.mSprite.data("sprite") );
	}
}
/**
 * Action that moves the sprite 1px up
 */
EditorDrawingArea.prototype.actionMoveSpriteUp = function()
{
	if( $("input:focus").length == 0 && !this.mSprite.hasClass("ui-draggable-dragging") )
	{
		--Editor.mSpritePackView.mDrawingArea.mSprite.data("sprite").offset.y;
		this.updateSprite();
		Editor.mSpritePackView.mSpriteProperties.setValues( this.mSprite.data("sprite") );
	}
}
/**
 * Action that moves the sprite 1px down
 */
EditorDrawingArea.prototype.actionMoveSpriteDown = function()
{
	if( $("input:focus").length == 0 && !this.mSprite.hasClass("ui-draggable-dragging") )
	{
		++Editor.mSpritePackView.mDrawingArea.mSprite.data("sprite").offset.y;
		this.updateSprite();
		Editor.mSpritePackView.mSpriteProperties.setValues( this.mSprite.data("sprite") );
	}
}
/**
 * Method that registers all shortcuts used in this view
 */
EditorDrawingArea.prototype.registerShortcuts = function()
{
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Shift],
		down:	this.eventMoveSpriteOn,
		up:		this.eventMoveSpriteOff
	});
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Shift, KeyListener.KEY.Left],
		down:	(function(obj){ return function(){ obj.actionMoveSpriteLeft(); } } ) (this)
	});
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Shift, KeyListener.KEY.Right],
		down:	(function(obj){ return function(){ obj.actionMoveSpriteRight(); } } ) (this)
	});
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Shift, KeyListener.KEY.Up],
		down:	(function(obj){ return function(){ obj.actionMoveSpriteUp(); } } ) (this)
	});
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Shift, KeyListener.KEY.Down],
		down:	(function(obj){ return function(){ obj.actionMoveSpriteDown(); } } ) (this)
	});
}
/**
 * Method responsable for registering the events related to the Drawing area.
 */ 
EditorDrawingArea.prototype.registerEvents = function()
{
	$(window).resize( (function(obj) { return function() { obj.updateSize(); } })(this) ); //register the window resize event
	
	this.mSprite.on( "drag", this.eventSpriteDrag ); //register the sprite drag event
	this.mSprite.click( this.eventSpriteClick );	 //register the sprite click event
}
