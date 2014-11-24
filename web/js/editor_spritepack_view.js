/**
 * Class that represents the SpritePackView and all its components
 */
function EditorSpritePackView()
{
	this.mDrawingArea		= new EditorDrawingArea();
	this.mSpriteProperties	= new EditorSpriteProperties();
	this.mFrameBar			= new EditorSpritePackFrameBar();
	this.mToolBar			= new EditorSpriteToolBar();
	this.mShortcutListener	= new ShortcutListener();
	
	this.registerEvents();
	this.registerShortcuts();
	
}
/**
 * Method that registers the shortcuts to be used in the spritepack view
 */
EditorSpritePackView.prototype.registerShortcuts = function()
{
	this.mShortcutListener.shortcut
	({
		keys: [ KeyListener.KEY.Control, KeyListener.KEY.Left ],
		down: this.mFrameBar.eventPreviousSprite
	});
	this.mShortcutListener.shortcut
	({
		keys: [ KeyListener.KEY.Control, KeyListener.KEY.Alt, KeyListener.KEY.Left ],
		down: this.mFrameBar.eventFirstSprite
	});
	this.mShortcutListener.shortcut
	({
		keys: [ KeyListener.KEY.Control, KeyListener.KEY.Right ],
		down: this.mFrameBar.eventNextSprite
	});
	this.mShortcutListener.shortcut
	({
		keys: [ KeyListener.KEY.Control, KeyListener.KEY.Alt, KeyListener.KEY.Right ],
		down: this.mFrameBar.eventLastSprite
	});
}
/**
 * Method that registers the necessary events callbacks
 */
EditorSpritePackView.prototype.registerEvents = function()
{
}
