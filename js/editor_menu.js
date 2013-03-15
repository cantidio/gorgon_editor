/**
 * Class that represents the Editor Menu
 */
function EditorMenu()
{
	this.mLogo		= $("#logo");
	this.mElement	= $("#main-menu");
	this.mAnimVel	= 300;
	
	this.mElement.menu().hide();
	this.registerEvents();	
}
/**
 * Method that toggles the visibility of the menu
 */
EditorMenu.prototype.toggle = function()
{
	this.mElement.fadeToggle( this.mAnimVel );
}
/**
 * Method that hides the menu
 */
EditorMenu.prototype.hide = function()
{
	this.mElement.fadeOut( this.mAnimVel );
}
/**
 * Method that shows the menu
 */
EditorMenu.prototype.show = function()
{
	this.mElement.fadeIn( this.mAnimVel );
}
/**
 * Event that executes the spritepack open event
 */
EditorMenu.prototype.eventSpritePackOpen = function()
{
	$("#import_sprites_file").click();
}
/**
 * Event that executes the spritepack save event
 */
EditorMenu.prototype.eventSpritePackSave = function()
{

}

EditorMenu.prototype.registerEvents = function()
{
	$("#spritepack-open").click( this.eventSpritePackOpen );															//Menu spritepack open event
	$("#spritepack-save").click( this.eventSpritePackSave );															//Menu spritepack save event
	this.mElement.children("li").children("a").click( (function( obj ) { return function() { obj.hide(); } })(this) );	//Menu options on click event
	this.mLogo.click( (function( obj ) { return function(e) { e.stopPropagation(); obj.toggle(); } })(this) );			//Logo click event
	
	
	$("body :not(#logo)").not("#main-menu").not("#main-menu > li").not("#main-menu > li > a").mousedown
	(
		function()
		{
			$("#main-menu").hide();
		}
	);
}
