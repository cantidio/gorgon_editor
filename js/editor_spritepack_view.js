/**
 * Class that represents the SpritePackView and all its components
 */
function EditorSpritePackView()
{
	this.mDrawingArea		= new EditorDrawingArea();
	this.mSpriteProperties	= new EditorSpriteProperties();
	this.mFrameBar			= new EditorSpritePackFrameBar();
	this.mToolBar			= new EditorSpriteToolBar();
	this.registerEvents();
}
/**
 * Event that controls the movement throught the sprite list if the key Shift is pressed
 * Left go to the previous sprite, right go to the next sprite
 */
EditorSpritePackView.prototype.eventKeyDown = function( key, listener )
{
	if( listener.key( listener.KEY.Control ) && !this.mDrawingArea.mSprite.hasClass("ui-draggable-dragging"))
	{
		switch( key )
		{
			case listener.KEY.Left:
				var input = $("input:focus");
				
				input.blur();						//if you were edditing some field, then blur to submit its changes
				
				if( listener.key( listener.KEY.Alt ) )
				{
					Editor.actionFirstSprite();		//show the first sprite if available
				}
				else
				{
					Editor.actionPreviousSprite();	//show the previous sprite if available
				}
				
				input.focus();						//return the focus in the field
													//select the input text after the keypress event
				setTimeout( (function(input) { return function() { input.select(); } })(input), 100 );
				break;
			case listener.KEY.Right:
				var input = $("input:focus");
				
				input.blur();						//if you were edditing some field, then blur to submit its changes
				if( listener.key( listener.KEY.Alt ) )
				{
					Editor.actionLastSprite();		//show the last sprite if available
				}
				else
				{
					Editor.actionNextSprite();		//show the next sprite if available
				}
				input.focus();						//return the focus in the field
													//select the input text after the keypress event
				setTimeout( (function(input) { return function() { input.select(); } })(input), 100 );
				break;
		}
	}
}
/**
 * Method that registers the necessary events callbacks
 */
EditorSpritePackView.prototype.registerEvents = function()
{
	Editor.mKeyListener.keydown(
		(function( obj ) {
			return function( key, list ) { obj.eventKeyDown( key, list );  }
		})( this )
	);
	
}
