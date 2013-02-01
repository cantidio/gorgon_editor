ProgressBar = new function()
{
	this.init	= function()
	{
		this.mElement		= $("#progressbar");
		this.mOnComplete	= function(){};
	}
	this.add	= function( pValue )
	{
		this.mElement.val( this.mElement.val() + 1 );
		if( this.mElement.val() >= this.mElement.attr( "max" ) )
		{
			this.mOnComplete();
		}
	}
	this.show	= function( pTotal, pOnComplete )
	{
		this.mElement.val( 0 );
		this.mElement.attr( "max", pTotal );
		this.mElement.show( 100 );
		this.mOnComplete	= pOnComplete ? pOnComplete : function(){};
	}
	this.hide = function()
	{
		this.mElement.hide( 100 );
	}
}