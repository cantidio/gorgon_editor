var Editor = new function()
{
	this.mElementId	= "maintabs";
	/**
	 * Event Called when the window is resized. This event will resize the height of the tabs as well.
	 */
	this.onResize = function()
	{
		//this.mElement.height( $(window).height() );
	}
	
	this.registerEvents = function()
	{
		$(window).resize
		(
			(function(obj){
				return function(){ obj.onResize(); }
			})(this)
		);
		
		$("#import_sprites_file").change( this.eventImageAdd );
	}
	
	this.eventImageAdd = function()
	{
		var imgs	= $("#import_sprites_file")[0].files;
		var group	= Editor.mSpritePack.getGreatestGroup() + 100;
		ProgressBar.show( imgs.length, function(){ ProgressBar.hide(); } );
		Editor.onImageAddStep( imgs, 0, group );
	}
	/**
	 * Method that receives a file object and reads it and returns 
	 * a callback with the sprite read
	 * @param	Object pParamList, an object composed of the following properties:
	 *		Object 		file	the file to be read
	 *		Function	onload	the function that will be called when the sprite is ready.
	 *			This function will be called with the sprite read as a param.
	 */
	this.readSpriteData = function( pParamList )
	{
		var reader		= new FileReader();
		reader.onload	= (function( pParamList ){
			return function( event )
			{
				var sprite = new Sprite
				({
					name:	pParamList.file.name,
					image:	event.target.result,
					onload:	pParamList.onload
				});
			}
		})(pParamList);
		
		reader.readAsDataURL( pParamList.file );
	}
	this.onImageAddStep = function( files, i, group )
	{
		this.readSpriteData
		({
			file: 	files[i],
			onload: ( function(files, i, group) 
			{
				return function( sprite )
				{
					Editor.addSprite( sprite );
					ProgressBar.add( 1 );
					if( i + 1 < files.length )
					{
						Editor.onImageAddStep( files, i + 1, group );
					}
				}
			}) (files, i, group)
		});
	}
	this.addSprite = function( pSprite )
	{
		this.mSpritePack.addSprite( pSprite, this.mSpriteShown + 1 );
		Editor.actionNextSprite();
		this.mSpritePackView.mFrameBar.setSliderSize( this.mSpritePack.size() - 1 );
	}
	this.getCurrentSprite = function()
	{
		return this.mSpritePack.sprite( this.mSpriteShown );
	}
	this.actionShowSprite = function( pSpriteNumber )
	{
		if( pSpriteNumber >= 0 && pSpriteNumber < this.mSpritePack.size() )
		{
			this.mSpriteShown = pSpriteNumber;
			this.mSpritePackView.mSpriteProperties.setValues( this.getCurrentSprite() );
			this.mSpritePackView.mDrawingArea.setSprite( this.getCurrentSprite() );
			this.mSpritePackView.mFrameBar.setSliderValue( this.mSpriteShown );
			
			this.actionShowOnionSkin();
		}
	}
	this.actionShowOnionSkin = function()
	{
		this.mSpritePackView.mDrawingArea.setOnionSkinSprite( this.mSpritePackView.mSpriteProperties.getOnionSkin() );
	}
	this.actionFirstSprite = function()
	{
		this.actionShowSprite( 0 );
	}
	this.actionNextSprite = function()
	{
		this.actionShowSprite( this.mSpriteShown + 1 );
	}
	this.actionPreviousSprite = function()
	{
		this.actionShowSprite( this.mSpriteShown - 1 );
	}
	this.actionLastSprite = function()
	{
		this.actionShowSprite( this.mSpritePack.size() - 1 );
	}
	
	this.init = function()
	{
		this.mMenu				= new EditorMenu();
		this.mSpritePackView	= new EditorSpritePackView();
		this.mSpritePack		= new SpritePack();
		this.mSpriteShown		= -1;
		
		this.registerEvents();
	}
}
/*var Editor = new function()
{
	this.show = function() {
		this.mElement.width		= this.mSize.x;
		this.mElement.height	= this.mSize.y;
		var onionskin 			= SpritePropertiesView.onionskin();

		this.drawGrid();
		if( onionskin.value == 1 )
		{
			this.drawSprite( this.mSpritePack.sprite( this.mSpriteShown - 2 ) , 0.3 );
			this.drawSprite( this.mSpritePack.sprite( this.mSpriteShown - 1 ) , 0.5 );
		}
		else if( onionskin.value == 2 )
		{
			this.drawSprite( this.mSpritePack.search( onionskin.group, onionskin.index )[0] , 0.5 );
		}
		if( this.mSpritePack.size() > 0 )
		{
			this.drawSprite( this.mSpritePack.sprite( this.mSpriteShown ) );
		}
		this.drawHotspot();
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
	}
	this.removeSprite	= function( pSprite ) {
		this.mSpritePack.removeSprite( pSprite );
		this.currentSpriteIndex( this.currentSpriteIndex() );
		SpritePropertiesView.spriteNumber( this.spriteNumber() - 1 ).currentSprite( this.currentSpriteIndex() );
		this.show();
	}
	this.onImageAddStep	= function( files, i, group ) {
		var reader		= new FileReader();
		reader.onload	= ( function( obj, name, group, index, items )
		{
			return function( event )
			{
				var sprite = new Sprite
				({
					name:	name,
					group:	group,
					index:	index,
					image:	event.target.result,
					onload:	( function( index, files ) {
						return function( obj )
						{
							obj.offset.x = $(obj.image)[0].width / 2;
							obj.offset.y = $(obj.image)[0].height / 2;
							Editor.mSpritePack.addSprite( sprite );
							Editor.mSpriteShown++;
							SpritePropertiesView
								.spriteNumber( Editor.spriteNumber() - 1 )
								.currentSprite( Editor.currentSpriteIndex() )
								.updateSpriteVal( Editor.currentSprite() );
							ProgressBar.add( 1 );
							if( index + 1 < files.length )
							{
								Editor.onImageAddStep( files, index + 1, group );
							}
							else
							{
								Editor.show();
							}
						}
					})( index, items )
				});
			};
		})( this, files[i].name, group, i, jQuery.extend(true, {}, files) );
		
		reader.readAsDataURL( files[i] );
	}
	this.onImageAdd		= function() {
		var items = $("#addimg")[0].files;
		var group = this.mSpritePack.getGreatestGroup() + 100;
		ProgressBar.show( items.length, function(){ ProgressBar.hide(); } );
		this.onImageAddStep( items, 0, group );
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
			{
				pCurrentSprite = parseInt(pCurrentSprite);
				if( isNaN( pCurrentSprite ) )
				{
					pCurrentSprite = 0;
				}
			}
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
	}
	this.onMousePress	= function( event ) {
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
		
		this.mSize				= new Point( Math.floor( $(this.mElement).width() ), Math.floor( $(this.mElement).height() ) );
		this.mHotspot			= new Point( Math.floor( this.mSize.x / 2 ), Math.floor( this.mSize.y / 2 ) );
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
				return function( event ) { obj.onKeyPress( event.which );  }
			})( this )
		);
		$(window).keyup(
			(function( obj ) {
				return function( event ) { obj.onKeyRelease( event.which );  }
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
		this.mGrid			= { color: "#DDDDDD", width: 15, lineWidth: 0.5 };
		this.onResize();
		this.show();
		this.registerCallbacks();
	}
}
*/