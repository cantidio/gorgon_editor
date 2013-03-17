/**
 * Class that represents a key listener
 * It keeps track of the keys pressed on a key buffer
 * so you can check any time if a key is pressed
 */
function KeyListener()
{
	this.mKeyNumber			= 220;
	this.mKeyDownCallback	= new Array();
	this.mKeyUpCallback		= new Array();
	this.mKeyBuffer			= new Array( this.mKeyNumber );
	this.mRunning			= true;
	
	this.clearKeyBuffer();	//sets all keys in the buffer to not pressed
	this.registerEvents();
}
/**
 * Method that makes the listener stop listing to key events
 */
KeyListener.prototype.stopListing = function()
{
	this.mRunning = false;
}
/**
 * Method that makes the listener starts listing to key events
 */
KeyListener.prototype.startListing = function()
{
	this.mRunning = true;
}
/**
 * Method that registers a function that will be called every 
 * time a key is pressed down
 *
 * @param	{function} pCallback, the callback
 */
KeyListener.prototype.keydown = function( pCallback )
{
	if( typeof pCallback == "function" )
	{
		this.mKeyDownCallback.push( pCallback );
	}
}
/**
 * Method that registers a function that will be called every 
 * time a key is released
 *
 * @param	{function} pCallback, the callback
 */
KeyListener.prototype.keyup = function( pCallback )
{
	if( typeof pCallback == "function" )
	{
		this.mKeyUpCallback.push( pCallback );
	}
}
/**
 * Method that registers the necessary events
 */
KeyListener.prototype.registerEvents = function()
{
	$(window).keydown	( (function(listener) { return function(e) { listener._onKeyDown(event);	} })(this) );
	$(window).keyup		( (function(listener) { return function(e) { listener._onKeyUp	(event);	} })(this) );
	$(window).blur		( (function(listener) { return function(e) { listener.clearKeyBuffer(); 	} })(this) );
}
/**
 * Method that returns the status of a Key
 *
 * @param	{Integer} key, the key code of the desired key ( KeyListener.KEY )
 * @return	{boolean} true if the key is pressed, false otherwise
 */
KeyListener.prototype.key = function( key )
{
	if( key >= 0 && key < this.mKeyNumber )
	{
		return this.mKeyBuffer[key];
	}
}
/**
 * Method that clears the keybuffer
 */
KeyListener.prototype.clearKeyBuffer = function()
{
	for( var i = 0; i < this.mKeyNumber; ++i )
	{
		this.mKeyBuffer[i] = false;
	}
}
/**
 * Method that sets the correct key as pressed and
 * calls all callbacks registed on key down with the correct key and listener
 *
 * @param	{integer} key, the last key pressed
 */
KeyListener.prototype._onKeyDown = function( event )
{
	if( this.mRunning )
	{
		if( event.which >= 0 && event.which < this.mKeyNumber )
		{
			this.mKeyBuffer[event.which] = true;
		}
		for( var i = 0; i < this.mKeyDownCallback.length; ++i )
		{
			this.mKeyDownCallback[i]( event.which, this, event );
		}
	}
}
/**
 * Method that sets the correct key as not pressed and
 * calls all callbacks registed on key up with the correct key and listener
 *
 * @param	{integer} key, the last key released
 */
KeyListener.prototype._onKeyUp = function( event )
{
	if( this.mRunning )
	{
		if( event.which >= 0 && event.which < this.mKeyNumber )
		{
			this.mKeyBuffer[event.which] = false;
		}
		for( var i = 0; i < this.mKeyUpCallback.length; ++i )
		{
			this.mKeyUpCallback[i]( event.which, this, event );
		}
	}
}
/**
 * Enum with the Keys
 */
KeyListener.prototype.KEY = 
{
	Backspace:	8,
	Tab:		9,
	Enter:		13,
	Shift:		16,
	Control:	17,
	Alt:		18,
	Capslock:	20,
	Esc:		27,
	Space:		32,
	Left: 		37,
	Up:			38,
	Right:		39,
	Down:		40,
	
	Num_0:		48,
	Num_1:		49,
	Num_2:		50,
	Num_3:		51,
	Num_4:		52,
	Num_5:		53,
	Num_6:		54,
	Num_7:		55,
	Num_8:		56,
	Num_9:		57,
	
	A : 		65,
	B : 		66,
	C : 		67,
	D : 		68,
	E : 		69,
	F : 		70,
	G : 		71,
	H : 		72,
	I : 		73,
	J :			74,
	K :			75,
	L :			76,
	M :			77,
	N :			78,
	O :			79,
	P :			80,
	Q :			81,
	R :			82,
	S :			83,
	T :			84,
	U :			85,
	V :			86,
	W :			87,
	X :			88,
	Y :			89,	
	Z :			90,
};
