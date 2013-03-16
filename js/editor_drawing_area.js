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
	this.mGridScale	= 2;
	
	this.mGrid.draggable({ cancel: "div.sprite"  });
	this.mSprite.draggable({ containment: "parent" });
	
	this.updateSize();
	this.registerEvents();
}
/**
 * Method that sets the displaying sprite in the drawing area
 *
 * @param	{Sprite} pSprite, the sprite to be shown
 */
EditorDrawingArea.prototype.setSprite = function( pSprite )
{
	this.mSprite.empty().append( pSprite.image ).css
	({
		width:		pSprite.image.width,
		height: 	pSprite.image.height,
		top:		this.mHotspot.position().top + pSprite.offset.y,
		left:		this.mHotspot.position().left + pSprite.offset.x
	}).data("sprite", pSprite);
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
			width:		pSprite.image.width,
			height: 	pSprite.image.height,
			top:		this.mHotspot.position().top + pSprite.offset.y,
			left:		this.mHotspot.position().left + pSprite.offset.x
		}).data("sprite", pSprite);
	}
}
/**
 * Method that updates the correct sprite position based in the hotspot position
 * and in the sprite offsets
 */
EditorDrawingArea.prototype.updateSpritePosition = function()
{
	if( this.mSprite.data("sprite") )
	{
		this.mSprite.css
		({
			top:	this.mHotspot.position().top	+ this.mSprite.data("sprite").offset.y,
			left:	this.mHotspot.position().left	+ this.mSprite.data("sprite").offset.x
		});
	}
	if( this.mOnionSkin.data("sprite") )
	{
		this.mOnionSkin.css
		({
			top:	this.mHotspot.position().top	+ this.mOnionSkin.data("sprite").offset.y,
			left:	this.mHotspot.position().left	+ this.mOnionSkin.data("sprite").offset.x
		});
	}
}
/**
 * Method responsable for updating the drawing area size
 * along with its components
 */
EditorDrawingArea.prototype.updateSize = function()
{
	var	width	= this.mElement.width() * this.mGridScale,
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
	
	this.updateSpritePosition();
}
/**
 * Event called every time a sprite is dragged in the view
 *	Then it sets the correct offset based in the movement made
 *	and updates the spritepackview with the correct values
 */
EditorDrawingArea.prototype.eventSpriteDrag = function( event, ui )
{
	$(this).data("sprite").offset.x = parseInt( -$(".hotspot").position().left	+ ui.position.left );
	$(this).data("sprite").offset.y = parseInt( -$(".hotspot").position().top	+ ui.position.top );
	Editor.mSpritePackView.mSpriteProperties.setValues( $(this).data("sprite") );
}
/**
 * Event that removes the visual indicationg that the sprite is ready to be moved
 */
EditorDrawingArea.prototype.eventKeyUp = function( key, listener )
{
	if( key == listener.KEY.Shift )
	{
		this.mSprite.removeClass("key-moving");
	}
}
/**
 * Event that controls the sprite movement when the key shift is pressed
 * You can only control the sprite if there is none input on focus.
 */
EditorDrawingArea.prototype.eventKeyDown = function( key, listener )
{
	//you can't control the sprite if you are editing something
	if( $("input:focus").length > 0 || this.mSprite.hasClass("ui-draggable-dragging")) 
	{
		return;
	}
	if( key == listener.KEY.F )
	{
		this.mSprite.toggleClass("borderOn");
	}	
	else if( key == listener.KEY.Shift )
	{
		this.mSprite.addClass("key-moving");
	}
	else if( this.mSprite.hasClass("key-moving") )
	{
		var sprite = this.mSprite.data("sprite");
		if( listener.key( listener.KEY.Shift ) )
		{
			switch( key )
			{
				case listener.KEY.Left:
					--sprite.offset.x;
					break;
				case listener.KEY.Up:
					--sprite.offset.y;
					break;
				case listener.KEY.Right:
					++sprite.offset.x;
					break;
				case listener.KEY.Down:
					++sprite.offset.y;
					break;
			}
			this.updateSpritePosition();
			Editor.mSpritePackView.mSpriteProperties.setValues( sprite );
		}
		if( key == listener.KEY.Esc )
		{
			this.mSprite.removeClass("borderOn");
		}
	}
}
/**
 * Method responsable for registering the events related to the Drawing area.
 */ 
EditorDrawingArea.prototype.registerEvents = function()
{
	$(window).resize( (function(obj) { return function() { obj.updateSize(); } })(this) ); //register the window resize event
	
	this.mSprite.on( "drag", this.eventSpriteDrag ); //register the sprite drag event
	this.mSprite.click( function(e){ e.stopPropagation();  $(this).toggleClass("borderOn"); } ); //register the sprite click event
	this.mGrid.not(".sprite").not(".sprite > img").click( (function( sprite ) { return function() { sprite.removeClass("borderOn"); } })(this.mSprite) );
	
	Editor.mKeyListener.keydown(
		(function( obj ) {
			return function( key, list ) { obj.eventKeyDown( key, list );  }
		})( this )
	);
	Editor.mKeyListener.keyup(
		(function( obj ) {
			return function( key, list ) { obj.eventKeyUp( key, list );  }
		})( this )
	);
}
