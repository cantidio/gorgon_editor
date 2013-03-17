/**
 * Class that represents a shortcut listener
 */
function ShortcutListener()
{
	this.mShortcutList	= [];
	this.mListening		= true;
	this.mKeyListener	= new KeyListener();
	
	this.registerEvents();
}
/**
 * Method that sets the listening or get it
 *
 * @param {Boolean} plistening, if this param is set, then it will set the listening to the value provided.
 * If false it will not check for the shortcuts.
 * @return {Boolean} If no parameter were submited then it will return the value of the listening
 * @return {ShortcutListener} If the listening were provided then it willl return a reference to the object
 */
ShortcutListener.prototype.listening = function( pListening ) {
	if( pListening != undefined )
	{
		this.mListening = pListening;
		return this;
	}
	else
	{
		return this.mListening;
	}
}
/**
 * Method that registers a new shortcut
 *
 * @param	{Object}	pShortcut, the shortcut to be registered. is composed of the following properties:
 *		{Array}		keys:	Array with the keys that activate the shortcurt, The last key must be pressed last
 *		{Function}	up:		Function that will be called when the shortcut is actived
 *		{Function}	down:	Function that will be called when the shortcut is released
 * @return	{ShortcutListener}
 */
ShortcutListener.prototype.shortcut = function( pShortcut )
{
	if( Object.prototype.toString.call( pShortcut ) === "[object Object]" )
	{
		this.mShortcutList.push
		({
			keys:	pShortcut.keys,
			down:	pShortcut.down,
			up:		pShortcut.up,
			active:	false
		});
	}
	return this;
}
/**
 * Method that register the events
 */
ShortcutListener.prototype.registerEvents = function()
{
	this.mKeyListener.keydown
	(
		( function(obj) {
			return function(key,listener)
			{
				var i, j, error;
				if( !obj.mListening ) return;
				for( i = 0; i < obj.mShortcutList.length; ++i )
				{
					if( Object.prototype.toString.call( obj.mShortcutList[i].down) === "[object Function]" )
					{
						error = false;
						for( j = 0; obj.mShortcutList[i].keys && j < obj.mShortcutList[i].keys.length - 1; ++j )
						{
							if( !listener.key( obj.mShortcutList[i].keys[j] ) )
							{
								error = true; break;
							}
						}
						if( !error && key == obj.mShortcutList[i].keys[j] )
						{
							obj.mShortcutList[i].active = true;
							obj.mShortcutList[i].down();
						}
					}
				}
			}
		})(this)
	);
	
	this.mKeyListener.keyup
	(
		( function(obj) {
			return function(key,listener)
			{
				var i, j, error;
				if( !obj.mListening ) return;
				for( i = 0; i < obj.mShortcutList.length; ++i )
				{
					if( obj.mShortcutList[i].active && Object.prototype.toString.call( obj.mShortcutList[i].up) === "[object Function]" )
					{
						error = false;
						for( j = 0; obj.mShortcutList[i].keys && j < obj.mShortcutList[i].keys.length; ++j )
						{
							if( !listener.key( obj.mShortcutList[i].keys[j] ) )
							{
								error = true; break;
							}
						}
						if( error )
						{
							obj.mShortcutList[i].active = false;
							obj.mShortcutList[i].up();
						}
					}
				}
			}
		})(this)
	);
}
