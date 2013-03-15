/**
 * Class that represents a pack of Sprites
 */
function SpritePack()
{
	this.sprites = new Array();
}
SpritePack.prototype.dump = function() 
{
	var out		= new Array();
	var size	= this.size();
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
/**
 * Method that gets a sprite by its real index in the pack
 * 
 * @param	{Int} pIndex, the real index to get the Sprite
 * @return	{Sprite} the sprite requested or null if none could be found
 */
SpritePack.prototype.sprite = function( pIndex ) 
{
	return ( this.size() > pIndex ) ? this.sprites[ pIndex ] : null;
}
/**
 * Method that returns the spritepack size
 * 
 * @return {Int} the number of sprites in the spritepack 
 */
SpritePack.prototype.size = function() 
{
	return this.sprites.length;
}
/**
 * Method that includes a sprite into the pack
 * 
 * @param	{Sprite} pSprite the sprite to be included into the pack
 * @param	{Int} pIndex the index to include the sprite in the pack (optional)
 * @return	{SpritePack} the spritepack
 */
SpritePack.prototype.addSprite = function( pSprite, pIndex ) 
{
	if( pIndex )
	{
		this.sprites.splice( pIndex, 0, pSprite );
	}
	else
	{
		this.sprites.push( pSprite );
	}
	return this;
}
/**
 * Method that removes a sprite from the pack
 * 
 * @param	{Int} pIndex the index of the sprite to be removed
 * @return	{SpritePack} the spritepack
 */
SpritePack.prototype.removeSprite = function( pIndex ) 
{
	if( pIndex < this.sprites.length && pIndex >= 0 )
	{
		this.sprites.splice( pIndex, 1 );
	}
	return this;
}
/**
 * Method that returns the biggest sprite group inside the pack
 * 
 * @return	{Int} the biggest group 
 */
SpritePack.prototype.getGreatestGroup = function() 
{
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
/**
 * Method that sorts the sprites in the pack by Group and Index
 * 
 * @return	{SpritePack} the SpritePack 
 */
SpritePack.prototype.sortSprites = function() 
{
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
	return this;
}
/**
 * Method that searchs the pack for sprites of some group and index( if provided )
 * 
 * @param	{Int}	pGroup	The group of the sprite requested
 * @param	{Int}	pIndex	The index of the sprite requested (optional)
 * @return 	{Array}	Array of Sprites
 */
SpritePack.prototype.search = function( pGroup, pIndex ) 
{
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
/**
 * Method that transforms a spritepack lua script into a JSON object
 * 
 * @param {String} lua, the lua string
 * @return {Object} the JSON object
 */
SpritePack.prototype._lua2JSON = function( lua )
{
	var LUA = lua;
	try
	{
		LUA		= LUA.replace(/(\w+).*=/g," \"$1\" =");			// encapsulates all obj names in ""
		LUA		= LUA.replace(/=.*{/, ":[");					// replaces all "={" for ":["
		LUA		= LUA.replace(/}$/,"]");						// replaces last "}" for "]"
		LUA		= LUA.replace(/\s/g, "");						// remove all spaces including newlines
		LUA		= LUA.replace( /=/g, ":" );						// replaces all "=" for ":"
		LUA		= LUA.replace(/(}.*),.*]$/, "$1 ]");			// removes the last "," preceding the "]" if available
		LUA		= JSON.parse( "{" +LUA + "}" ).spritepack;
	}
	catch( e )
	{
		LUA = { error: true };
	}
	return LUA;
}
/**
 * Method that loads a sprite from a preloaded JSZip file and pack 
 *  
 * @param {Array}		pack	, the pack with the sprites definition
 * @param {Int}			i		, the index of the sprite loaded in the pack
 * @param {JSZip}		zip		, the JSZip file with the spritepack
 * @param {Function}	onload	, the function called when the sprite loads
 */
SpritePack.prototype._loadSprite = function( pack, i, zip, onload )
{
	if( pack && i < pack.length )
	{
		var sprite = new Sprite
		({
			name:	pack[i].name,
			group:	pack[i].group,
			index:	pack[i].index,
			image: 	getBase64ImageType( zip.file( pack[i].image ).name ) + btoa( zip.file( pack[i].image ).data ),
			offset:	new Point( pack[i].xoffset, pack[i].yoffset ),
			onload:	(function( spritepack, pack, i, zip, onload )
			{
				return function( obj )
				{
					++i;
					spritepack.addSprite( obj );
					onload( spritepack, ( i >= pack.length ? true : false) );
					spritepack._loadSprite( pack, i, zip, onload );
				}
			})(this, pack, i, zip, onload)
		});
	}
}
/**
 * Method that loads a spritepack from a JSZip file 
 *  
 * @param {JSZip} zip		, the JSZip file with the spritepack
 * @param {Function} onload	, the function called when the spritepack loads completely
 * @param {Function} onstep	, the function called when each sprite is loaded
 */
SpritePack.prototype.load = function( zip, onload, onstep )
{
	var pack = this._lua2JSON( zip.file("spritepack.lua").data );
	this.sprites.length = 0;
	this._loadSprite
	(
		pack,0,zip,
		(function(onload, onstep) {
			return function( spritepack, finished )
			{
				onstep( spritepack );
				if( finished )
				{					
					onload( spritepack );
				}
			}
		})( onload, onstep )
	);
}
