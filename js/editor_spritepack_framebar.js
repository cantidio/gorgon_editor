function EditorSpritePackFrameBar()
{
	this.mElement	= $("#sprite-framebar");
	this.mSlider 	= this.mElement.children("div.slider-closure").children("div");
	
	this.mSlider.slider({ min: 0, max: 0, value: 0, step: 1});
	this.registerEvents();
}
EditorSpritePackFrameBar.prototype.setSliderSize = function( pSize )
{
	this.mSlider.slider( "option", "max", pSize );
}
EditorSpritePackFrameBar.prototype.setSliderValue = function( pValue )
{
	this.mSlider.slider( "option", "value", pValue );
}
EditorSpritePackFrameBar.prototype.eventFirstSprite = function()
{
	Editor.actionFirstSprite();
}
EditorSpritePackFrameBar.prototype.eventPreviousSprite = function()
{
	Editor.actionPreviousSprite();
}
EditorSpritePackFrameBar.prototype.eventNextSprite = function()
{
	Editor.actionNextSprite();
}
EditorSpritePackFrameBar.prototype.eventLastSprite = function()
{
	Editor.actionLastSprite();
}
EditorSpritePackFrameBar.prototype.eventSlide = function( event, ui )
{
	Editor.actionShowSprite( ui.value );
}
EditorSpritePackFrameBar.prototype.registerEvents = function()
{
	this.mElement.children(".framebar_first_button").click( this.eventFirstSprite );
	this.mElement.children(".framebar_previous_button").click( this.eventPreviousSprite );
	this.mElement.children(".framebar_next_button").click( this.eventNextSprite );
	this.mElement.children(".framebar_last_button").click( this.eventLastSprite );
	this.mSlider.on( "slide", this.eventSlide );
}