function Sprite( name, group, index, image, offset )
{
	this.name	= name		? name		: "";
	this.group	= group		? group 	: 0;
	this.index	= index 	? index 	: 0;
	this.image	= image 	? image 	: null;
	this.offset	= offset	? offset	: new Point( 0, 0 );
	
	this.getImageType = function() {
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
}

function SpritePack()
{
	this.sprites = new Array();
	this.sprite = function( pIndex ) {
		return ( this.size() > pIndex ) ? this.sprites[ pIndex ] : null;
	}
	this.size = function() {
		return this.sprites.length;
	}
	this.addSprite = function( pSprite, pIndex ) {
		if( pIndex )
		{
			this.sprites.splice( pIndex, 0, pSprite );
		}
		else
		{
			this.sprites.push( pSprite );
		}
	}
	this.removeSprite = function( pIndex ) {
		if( pIndex < this.sprites.length && pIndex >= 0 )
		{
			this.sprites.splice( pIndex, 1 );
		}
	}
	this.search = function( pGroup, pIndex ) {
		var sprites = new Array();
		var size	= this.size();
		if( pGroup != undefined )
		{
			if( pIndex != undefined )
			{
				for( var i = 0; i < size; ++i )
				{
					if( this.sprites[i].group == pGroup && this.sprites[i].index == pIndex )
					{
						sprites.push( this.sprites[i] );
					}
				}
			}
			else
			{
				for( var i = 0; i < size; ++i )
				{
					if( this.sprites[i].group == pGroup )
					{
						sprites.push( this.sprites[i] );
					}
				}
			}
		}
		return sprites;
	}
	this.getGreatestGroup = function() {
		var size	= this.size();
		if( size > 0 )
		{
			var group	= this.sprites[0].group;
			for( var i = 1; i < size; ++i )
			{
				if( this.sprites[i].group > group )
				{
					group = this.sprites[i].group;
				}
			}
			return group;
		}
		return 0;
	}
	this.sortSprites = function() {
		this.sprites.sort
		(
			function( a, b )
			{
				if( a.group < b.group )			{ return -1;	}
				else if( a.group > b.group )	{ return 1;		}
				else
				{
					if( a.index < b.index )			{ return -1;	}
					else if( a.index > b.index )	{ return 1;		}
					else 							{ return 0;		}
				}
			}
		);
	}
	this.dump = function() {
		var out = new Array();
		var size = this.size();
		for( var i = 0; i < size; ++i )
		{
			out.push
			({
				name:		this.sprites[i].name,
				group:		this.sprites[i].group,
				index:		this.sprites[i].index,
				xoffset:	this.sprites[i].offset.x,
				yoffset:	this.sprites[i].offset.y,
				image:		this.sprites[i].image.src.replace(/^data:image\/.*;base64,/, ""),
				image_type: this.sprites[i].getImageType()
			});
		}
		return out;
	}
}
