var Editor = new function()
{
	this.show = function() {
		console.log("show sprite: "+ this.mSpriteShown);
		this.mElement.width		= this.mSize.x;
		this.mElement.height	= this.mSize.y;
		var onionskin 			= SpritePropertiesView.onionskin();
		
		if( onionskin.value == 1 )
		{
			this.drawSprite( this.mSpritePack.sprite( this.mSpriteShown - 1 ) , 0.5 );
		}
		else if( onionskin.value == 2 )
		{
			this.drawSprite( this.mSpritePack.search( onionskin.group, onionskin.index )[0] , 0.5);
		}
		if( this.mSpritePack.size() > 0 )
		{
			//console.log("aqui");
			this.drawSprite( this.mSpritePack.sprite( this.mSpriteShown ) );
		}
		this.drawHotspot();
	}
	this.drawHotspot	= function() {
		var context = this.mElement.getContext('2d');
		
		context.beginPath();
		context.moveTo( this.mHotspot.x , this.mHotspot.y - 5 );
		context.lineTo( this.mHotspot.x , this.mHotspot.y + 5 );
		context.stroke();
		context.beginPath();
		context.moveTo( this.mHotspot.x - 5, this.mHotspot.y );
		context.lineTo( this.mHotspot.x + 5, this.mHotspot.y );
		context.stroke();
	}
	this.drawSprite		= function( pSprite, pAlpha ) {
		if( pSprite )
		{
			var context = this.mElement.getContext('2d');
			context.globalAlpha = pAlpha ? pAlpha : 1.0;
			context.drawImage
			(
				pSprite.image,
				this.mHotspot.x - pSprite.offset.x,
				this.mHotspot.y - pSprite.offset.y
			);
			context.globalAlpha = 1.0;
		}
		else
		{
			console.log("imagem inválida para a impressão");
		}
	}
	this.toggleActive	= function() {
		this.mElement.toggleClass("active");
	}
	this.removeSprite	= function( pSprite ) {
		this.mSpritePack.removeSprite( pSprite );
		this.currentSpriteIndex( this.currentSpriteIndex() );
		SpritePropertiesView.spriteNumber( this.spriteNumber() - 1 ).currentSprite( this.currentSpriteIndex() );
		this.show();
	}
	this.onImageAdd		= function() {
		var items = $("#addimg")[0].files;
		var group = this.mSpritePack.getGreatestGroup() + 100;
		for( var i = 0; i < items.length; ++i )
		{
			var reader		= new FileReader();
			reader.onload	= (function( obj, name, group, index ) {
				return function( event )
				{
				console.log("group: "+group);
					var sprite = new Sprite( name, group, index, new Image(), new Point( 0, 0 ) );
					sprite.image.onload = (function( obj, sprite )
					{
						return function()
						{
							sprite.offset.x = $(sprite.image)[0].width / 2;
							sprite.offset.y = $(sprite.image)[0].height / 2;
							obj.mSpritePack.addSprite( sprite );
							++obj.mSpriteShown;
//SpritePropertiesView							
							SpritePropertiesView
								.spriteNumber( obj.spriteNumber() - 1 )
								.currentSprite( obj.currentSpriteIndex() )
								.updateSpriteVal( obj.currentSprite() );
							
							obj.show();
						}
					})( obj, sprite );
					sprite.image.src = event.target.result;
				};
			})( this, items[i].name, group, i );
			reader.readAsDataURL( items[i] );//Convert the blob from clipboard to base64
		}
	}
	this.spriteNumber	= function() {
		return this.mSpritePack.size();
	}
	this.currentSprite = function() {
		return this.mSpritePack.sprite( this.currentSpriteIndex() );
	}
	this.currentSpriteIndex	= function( pCurrentSprite ) {
		if( pCurrentSprite != undefined )
		{
			if( typeof( pCurrentSprite ) == "string" )
			pCurrentSprite = parseInt(pCurrentSprite);
			this.mSpriteShown = pCurrentSprite;
			if( this.mSpriteShown >= this.spriteNumber() )
			{
				this.mSpriteShown = this.spriteNumber() - 1;
			}
			else if( this.mSpriteShown < 0 )
			{
				this.mSpriteShown = 0;
			}
			return this;
		}
		else
		{
			return this.mSpriteShown;
		}
	}
	this.onKeyRelease	= function( event ) {
		if( event == 16 )
		{
			this.mod.shift = false;
		}
		else if( event == 17 )
		{
			this.mod.control = false;
		}
	}
	this.onKeyPress		= function( event ) {
		if( event == 16 )
		{
			this.mod.shift = true;
		}
		else if( event == 17 )
		{
			this.mod.control = true;
		}
		else if( event == 39 ) //right
		{
			if( this.mod.control )
			{
				++this.mSpritePack.sprite( this.currentSpriteIndex() ).offset.x;
				this.show();
			}
			else
			{
				if( this.currentSpriteIndex() < this.mSpritePack.size() - 1 )
				{
					this.currentSpriteIndex( this.currentSpriteIndex() + 1 );
					var sprite = this.currentSprite();
					this.show();
				}
			}
		}
		else if( event == 37 ) //left
		{
			if( this.mod.control )
			{
				--this.mSpritePack.sprite( this.currentSpriteIndex() ).offset.x;
				this.show();
			}
			else
			{
				if( this.currentSpriteIndex() > 0 )
				{
					this.currentSpriteIndex( this.currentSpriteIndex() - 1 );
					this.show();
				}
			}
		}
		else if( event == 38 ) //up
		{
			if( this.mod.control )
			{
				--this.mSpritePack.sprite( this.currentSpriteIndex() ).offset.y;
				this.show();
			}
		}
		else if( event == 40 ) //down
		{
			if( this.mod.control )
			{
				++this.mSpritePack.sprite( this.currentSpriteIndex() ).offset.y;
				this.show();
			}
		}
		SpritePropertiesView.updateSpriteVal( this.currentSprite() ? this.currentSprite() : new Sprite() );
		SpritePropertiesView.currentSprite( this.currentSpriteIndex() );
		/*console.log("key press");
		console.log( event );
		console.log(" valor: "+this.mSpriteShown);*/
	}
	this.onMousePress	= function( event ) {
		/*console.log("mouse press");
		console.log( event );*/
		if( event.button == 1 )
		{
			if( this.mod.control )
			{
				var sprite = this.currentSprite();
				if( sprite )
				{
					sprite.offset.x += event.x - this.mHotspot.x;
					sprite.offset.y += event.y - this.mHotspot.y;					
					this.show();
				}
			}
		}
		
	}
	this.onResize		= function() {
		this.mSize				= new Point( $(this.mElement).width(), $(this.mElement).height() );
		this.mHotspot			= new Point( this.mSize.x / 2, this.mSize.y / 2 );
		this.mElement.width		= this.mSize.x;
		this.mElement.height	= this.mSize.y;
		
		console.log( "size" );		console.log( this.mSize );
		console.log("hotspot");		console.log( this.mHotspot );
	}
	this.registerCallbacks = function() {
		$(window).blur(
			(function( obj ) {
				return function( event ) 
				{
					obj.mod.shift	= false;
					obj.mod.control	= false;
				}
			})( this )
		);
		$(window).keydown(
			(function( obj ) {
				return function( event ) { /*event.preventDefault();*/ obj.onKeyPress( event.which );  }
			})( this )
		);
		$(window).keyup(
			(function( obj ) {
				return function( event ) { /*event.preventDefault();*/ obj.onKeyRelease( event.which );  }
			})( this )
		);
		
		$(this.mElement).mousedown(
			(function( obj ) {
				return function( event ) 
				{
					obj.onMousePress
					({
						button: event.which,
						x: event.pageX - this.offsetLeft,
						y: event.pageY - this.offsetTop
					});
				}
			})( this )
		);
		
		$( window ).resize
		(
			(function( obj ) {
				return function()
				{
					obj.onResize(); 
					obj.show();
				}
			})( this )
		);
		
		$("#addimg").change(
			(function( obj ) {
				return function( event ) { obj.onImageAdd(); $(this).val(""); }
			})( this )
		);
	}
	
	this.init = function() {
		this.mElement		= document.getElementById("viewport");
		this.mSize			= new Point( 0, 0 );
		this.mHotspot		= new Point( 0, 0 );
		this.mSpritePack	= new SpritePack();
		this.mSpriteShown	= -1;
		this.mod			= { shift: false, control: false };
		this.onResize();
		this.show();
		this.registerCallbacks();
	}
}
