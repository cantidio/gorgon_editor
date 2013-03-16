/**
 * Class that represents the spritepack framebar
 */
function EditorSpritePackFrameBar()
{
	this.mElement	= $("#sprite-framebar");
	this.mSlider 	= this.mElement.children("div.slider-closure").children("div");
	
	this.mSlider.slider({ min: 0, max: 0, value: 0, step: 1});
	this.registerEvents();
}
/**
 * Method that sets the slider maximum value
 *
 * @param	{Integer} pSize the size of the slider
 */
EditorSpritePackFrameBar.prototype.setSliderSize = function( pSize )
{
	this.mSlider.slider( "option", "max", pSize );
}
/**
 * Method that changes the slider current value
 *
 * @param {Integer} pValue, the new value of the slider
 */
EditorSpritePackFrameBar.prototype.setSliderValue = function( pValue )
{
	this.mSlider.slider( "option", "value", pValue );
}
/**
 * Event triggered when the first sprite icon is pressed.
 */
EditorSpritePackFrameBar.prototype.eventFirstSprite = function()
{
	Editor.actionFirstSprite();
}
/**
 * Event triggered when the previous sprite icon is pressed.
 */
EditorSpritePackFrameBar.prototype.eventPreviousSprite = function()
{
	Editor.actionPreviousSprite();
}
/**
 * Event triggered when the next sprite icon is pressed.
 */
EditorSpritePackFrameBar.prototype.eventNextSprite = function()
{
	Editor.actionNextSprite();
}
/**
 * Event triggered when the last sprite icon is pressed.
 */
EditorSpritePackFrameBar.prototype.eventLastSprite = function()
{
	Editor.actionLastSprite();
}
/**
 * Event triggered when the frame slide changes its value
 */
EditorSpritePackFrameBar.prototype.eventSlide = function( event, ui )
{
	Editor.actionShowSprite( ui.value );
}
/**
 * Method that registers all the framebar events
 */
EditorSpritePackFrameBar.prototype.registerEvents = function()
{
	this.mElement.children(".framebar_first_button").click( this.eventFirstSprite );
	this.mElement.children(".framebar_previous_button").click( this.eventPreviousSprite );
	this.mElement.children(".framebar_next_button").click( this.eventNextSprite );
	this.mElement.children(".framebar_last_button").click( this.eventLastSprite );
	this.mSlider.on( "slide", this.eventSlide );
	
	this.mSlider.children('a.ui-slider-handle').focus//remove the focus of the slider so it can not get keypress events
	(
		function()
		{
			setTimeout( function() { $('#frame-slider').children('a.ui-slider-handle').blur(); }, 100 );
		}
	);	
}
