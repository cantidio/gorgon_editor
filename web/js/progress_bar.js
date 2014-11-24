/**
 * Class that represents the editor progress bar
 *
 * @constructor
 */
ProgressBar = new function()
{
	/**
	 * Method that must be called after the DOM is loaded
	 */
	this.init	= function()
	{
		this.mElement		= $("#progressbar");
		this.mOnComplete	= function(){};
	}
	/**
	 * Method that adds a value to the progress bar
	 *
	 * @param {Int} pValue the value to be added
	 */
  this.add	= function( pValue )
    {
		this.mElement.val( this.mElement.val() + 1 );
		if( this.mElement.val() >= this.mElement.attr( "max" ) )
		      {
			this.mOnComplete();
		}
	}
	/**
	 * Method that shows the progressbar
	 *
	 * @param	{Int} pTotal the total amount of the progressbar
	 * @param	{Function} pOnComplete function called when the progress bar reaches its maximum value
	 */
	this.show	= function( pTotal, pOnComplete )
	{
		this.mElement.val( 0 );
		this.mElement.attr( "max", pTotal );
		this.mElement.show( 100 );
		this.mOnComplete	= pOnComplete ? pOnComplete : function(){};
	}
	/**
	 * Method that hides the progressbar
	 */
	this.hide = function()
	{
		this.mElement.hide( 100 );
	}
}