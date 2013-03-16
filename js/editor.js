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
		this.mKeyListener		= new KeyListener();
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
	
	
	this.removeSprite	= function( pSprite ) {
		this.mSpritePack.removeSprite( pSprite );
		this.currentSpriteIndex( this.currentSpriteIndex() );
		SpritePropertiesView.spriteNumber( this.spriteNumber() - 1 ).currentSprite( this.currentSpriteIndex() );
		this.show();
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