/**
 * Function that receives a file name and return its base64 identifier 
 * 
 * @param	{String} pName, the name of the file
 * @return	{String} The base64 data attribute  
 */
function getBase64ImageType( pName ) {
	if( pName.search(/.png$/,"") != -1 )
	{
		return 'data:image/png;base64,';
	}
	else if( pName.search(/.gif$/,"") != -1 )
	{
		return 'data:image/gif;base64,';
	}
	else if( pName.search(/.bmp$/,"") != -1 )
	{
		return 'data:image/bmp;base64,';
	}
	else if( pName.search(/.jpg$/,"") != -1 )
	{
		return 'data:image/jpg;base64,';
	}
	else if( pName.search(/.jpeg$/,"") != -1 )
	{
		return 'data:image/jpeg;base64,';
	}
	else 
	{
		return null;
	}
}

/**
 * Class that represents a sprite
 * 
 * @param	{Object} data composed by the following properties:{
 *	{String}	name	sprite's name
 * 	{Numberic}	group	sprite's group
 * 	{Int}		index	sprite's index
 * 	{Point}		offset	sprite's offset
 *  {Image}		image	sprite's image or its base64 data
 * @constructor
 */
function Sprite( data )
{
	if( typeof(data) == "object" )
	{
		this.name	= data.name		? data.name		: "";
		this.group	= data.group	? data.group 	: 0;
		this.index	= data.index 	? data.index 	: 0;
		this.offset	= data.offset	? data.offset	: new Point( 0, 0 );
		this.image	= ( typeof( data.image ) == "object" ) ? data.image 	: null;
		this._width	= (this.image) ? this.image.width : 0;
		this._height= (this.image) ? this.image.height : 0;
		
		if( this.image == null && typeof( data.image ) == "string" )
		{
			this.load( data.image, data.onload );
		}
	}
	else
	{
		this.name	= "";
		this.group	= 0;
		this.index	= 0;
		this.offset	= new Point( 0, 0 );
		this.image	= null;
		this._width	= 0;
		this._height= 0;
	}
}
Sprite.prototype.height = function()
{
	return this._height;
}
Sprite.prototype.width = function()
{
	return this._width;
}
/**
 * load the sprite image
 *  
 * @param {String} base64 the base64 of the image
 * @param {Function} onLoad the function called when the sprite's image is loaded
 */
Sprite.prototype.load = function( base64, onLoad ) {
	this.image			= new Image();
	this.image.onload	= (function( obj, onLoad )
	{
		return function()
		{
			obj._width	= obj.image.width;
			obj._height	= obj.image.height;
			onLoad( obj );
		}
	})( this, onLoad );
	
	this.image.src		= base64;
}
/**
 * Returns the Image extension based on it's base64 data
 * 
 * @return {String} the image file extension 
 */
Sprite.prototype.getImageType = function() {

	if( this.image.src.search(/^data:image\/png;base64,/,"") != -1 )
	{
		return ".png";
	}
	else if( this.image.src.search(/^data:image\/gif;base64,/,"") != -1 )
	{
		return ".gif";
	}
	else if( this.image.src.search(/^data:image\/bmp;base64,/,"") != -1 )
	{
		return ".bmp";
	}
	else if( this.image.src.search(/^data:image\/jpg;base64,/,"") != -1 )
	{
		return ".jpg";
	}
	else if( this.image.src.search(/^data:image\/jpeg;base64,/,"") != -1 )
	{
		return ".jpeg";
	}
	else
	{
		return null;
	}
}
