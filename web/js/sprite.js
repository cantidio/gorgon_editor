/**
 * Class that represents a RGBA Color
 *
 * @param	{Object} pParam, this can be 2 kinds of object:
 *	1st:	a RGBA Object which is composed of the following properties:
 *		{Integer} r	, the red component
 *		{Integer} g , the green component
 *		{Integer} b , the blue component
 *		{Integer} a , the alpha component
 *	2nd:	a ImageData in this case the second parameter must be given (pIndex)
 * @param	{Integer} pIndex, the index of the color in the ImageData
 */
function Color( pParam, pIndex )
{
	if( Object.prototype.toString.call( pParam ) === "[object Object]" )
	{
		this.r	= pParam.r ? pParam.r : 0;
		this.g	= pParam.g ? pParam.g : 0;
		this.b	= pParam.b ? pParam.b : 0;
		this.a	= pParam.a ? pParam.a : 255;
	}
	else if( Object.prototype.toString.call( pParam ) === "[object ImageData]" && pIndex != undefined )
	{
		this.r	= pParam.data[ pIndex + 0];
		this.g	= pParam.data[ pIndex + 1];
		this.b	= pParam.data[ pIndex + 2];
		this.a	= pParam.data[ pIndex + 3];
	}
	else
	{
		this.r	= 0;
		this.g	= 0;
		this.b	= 0;
		this.a	= 0;
	}
}
/**
 * Function that receives a file name and return its base64 identifier 
 * 
 * @param	{String} pName, the name of the file
 * @return	{String} The base64 data attribute  
 */
function getBase64ImageType( pName )
{
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
/**
 * Method that returns the original height of the sprite
 *
 * @return {Integer}
 */
Sprite.prototype.height = function()
{
	return this._height;
}
/**
 * Method that returns the original width of the sprite
 *
 * @return {Integer}
 */
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
/**
 * Method that flips the sprite horizontally
 *
 * @param {function} onReady, function called when the operation is done
 */
Sprite.prototype.flipHorizontal = function( onReady )
{
	var	canvas			= document.createElement('canvas'),
		canvasContext	= canvas.getContext('2d');
		
	canvas.width		= this.width();
	canvas.height		= this.height();

	canvasContext.translate(canvas.width, 0);
	canvasContext.scale(-1, 1);
	canvasContext.drawImage( this.image, 0, 0 );
	
	this.offset.x = -(canvas.width + this.offset.x);
	this.load( canvas.toDataURL(), onReady );
}
/**
 * Method that flips the sprite vertically
 *
 * @param {function} onReady, function called when the operation is done
 */
Sprite.prototype.flipVertical = function( onReady )
{
	var	canvas			= document.createElement('canvas'),
		canvasContext	= canvas.getContext('2d');

	canvas.width		= this.width();
	canvas.height		= this.height();

	canvasContext.translate(0, canvas.height);
	canvasContext.scale(1, -1);
	canvasContext.drawImage( this.image, 0, 0 );
	
	this.offset.y = -(canvas.height + this.offset.y);
	this.load( canvas.toDataURL(), onReady );
}
/**
 * Method that rotates the Sprite 90 to the Left
 *
 * @param {function} onReady, function called when the operation is done
 */
Sprite.prototype.rotateLeft = function( onReady )
{
	var	canvas			= document.createElement('canvas'),
		canvasContext	= canvas.getContext('2d');
		
	canvas.width		= this.height();
	canvas.height		= this.width();

	canvasContext.translate(0, canvas.height);
	canvasContext.rotate( -90 * Math.PI / 180 );
	canvasContext.drawImage( this.image, 0, 0 );
	
	this._width		= canvas.width;
	this._height	= canvas.height;
	var x			= this.offset.x;
	this.offset.x	= this.offset.y;
	this.offset.y	= -(canvas.height + x);

	this.load( canvas.toDataURL(), onReady );
}
/**
 * Method that rotates the Sprite 90 to the Right
 *
 * @param {function} onReady, function called when the operation is done
 */
Sprite.prototype.rotateRight = function( onReady )
{
	var	canvas			= document.createElement('canvas'),
		canvasContext	= canvas.getContext('2d');
		
	canvas.width		= this.height();
	canvas.height		= this.width();

	canvasContext.translate(canvas.width, 0);
	canvasContext.rotate( 90 * Math.PI / 180 );
	canvasContext.drawImage( this.image, 0, 0 );
	
	this._width 	= canvas.width;
	this._height	= canvas.height;	
	var y			= this.offset.y;
	this.offset.y	= this.offset.x;
	this.offset.x	= -(canvas.width + y);
	
	this.load( canvas.toDataURL(), onReady );
}
/**
 * Method that finds a color checks its tolerance and replaces it for the given color
 *
 * @param	{Object}	pParamList object composed by the following properties:
 *		{Color}		find		, the color to be found
 *		{Color} 	replace		, the color to replace
 *		{Number}	tolerance	, the color tolerance
 *		{Function}	onReady		, function called when the operation is done.
 */
Sprite.prototype.replaceColor = function(  pParamList )
{
	var	canvas			= document.createElement('canvas'),
		canvasContext	= canvas.getContext('2d'),
		imageData		= null,
		colorTolerance	= (pParamList.tolerance != undefined ? pParamList.tolerance : 0 ) / 100 * 255;
	
	canvas.width		= this.width();
	canvas.height		= this.height();
	
	canvasContext.drawImage( this.image, 0, 0 );
	
	imageData 			= canvasContext.getImageData( 0, 0, canvas.width, canvas.height );
	
	for( var y = 0, index = 0; y < canvas.height; ++y )
	{
		for( var x = 0; x < canvas.width; ++x )
		{
			var color = new Color( imageData, index );
			
			if
			(
				color.a > 0 &&
				( color.r - colorTolerance <= pParamList.find.r && color.r + colorTolerance >= pParamList.find.r ) && 
				( color.g - colorTolerance <= pParamList.find.g && color.g + colorTolerance >= pParamList.find.g ) && 
				( color.b - colorTolerance <= pParamList.find.b && color.b + colorTolerance >= pParamList.find.b )
			)
			{
				imageData.data[index++] = pParamList.replace.r;
				imageData.data[index++] = pParamList.replace.g;
				imageData.data[index++] = pParamList.replace.b;
				imageData.data[index++] = pParamList.replace.a;
			}
			else
			{
				index+= 4;
			}
		}
	}
	
	canvasContext.putImageData(imageData, 0, 0);	
	this.load( canvas.toDataURL(), pParamList.onReady );
}
