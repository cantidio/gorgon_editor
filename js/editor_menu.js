function EditorMenu()
{
	this.mLogo		= $("#logo");
	this.mElement	= $("#main-menu");
	this.registerEvents();
}
EditorMenu.prototype.toggle = function()
{
	this.mElement.toggle();
}
EditorMenu.prototype.eventSpritePackOpen = function()
{
	console.log("open spritepack");
}

EditorMenu.prototype.eventSpritePackSave = function()
{
	console.log("save spritepack");
}

EditorMenu.prototype.registerEvents = function()
{
	$("spritepack-open").click( this.eventSpritePackOpen );
	$("spritepack-save").click( this.eventSpritePackSave );
}
