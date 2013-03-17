var Editor = new function()
{
	/**
	 * Event called when the import button is pressed.
	 */
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
	 * @param	{Object} pParamList, an object composed of the following properties:
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
	/**
	 * Callback that is called for every sprite to be added in the Editor.
	 * This callback will be called for every image in the files array.
	 *
	 * @param	{Array} 	files	, array of image files
	 * @param	{Integer} 	i		, the number of the sprite to be added
	 * @param	{Integer}	group	, the group of the added sprite
	 */
	this.onImageAddStep = function( files, i, group )
	{
		this.readSpriteData
		({
			file: 	files[i],
			onload: ( function(files, i, group) 
			{
				return function( sprite )
				{
					sprite.index = i;
					sprite.group = group;
					Editor.actionAddSprite( sprite );
					ProgressBar.add( 1 );
					if( i + 1 < files.length )
					{
						Editor.onImageAddStep( files, i + 1, group );
					}
				}
			}) (files, i, group)
		});
	}
	/**
	 * Method that returns the current shown sprite Object
	 *
	 * @return	{Sprite} the current sprite or null if none is found
	 */
	this.getCurrentSprite = function()
	{
		return this.mSpritePack.sprite( this.mSpriteShown );
	}
	/**
	 * Action that adds a Sprite in the Editor
	 *
	 * @param	{Sprite} pSprite the sprite to be added in the Editor
	 */
	this.actionAddSprite = function( pSprite )
	{
		this.mSpritePack.addSprite( pSprite, this.mSpriteShown + 1 );
		Editor.actionNextSprite();
		this.mSpritePackView.mFrameBar.setSliderSize( this.mSpritePack.size() - 1 );
	}
	/**
	 * Action that removes a sprite from the editor. If the sprite to be removed is currently displayed in the editor,
	 * it will remove this sprite and then display the sprite after it, if there's one, or one before it.
	 *
	 * @param	{Integer} pSpriteNumber, the index of the sprite to be removed
	 */
	this.actionRemoveSprite = function( pSpriteNumber )
	{
		if( pSpriteNumber >= 0 && pSpriteNumber < this.mSpritePack.size() )
		{
			this.mSpritePack.removeSprite( pSpriteNumber );
			
			if( pSpriteNumber === this.mSpriteShown )
			{			
				if( this.mSpriteShown + 1 >= this.mSpritePack.size() )
				{
					--this.mSpriteShown;
				}
				this.actionShowSprite( this.mSpriteShown );
			}
			else
			{
				if( pSpriteNumber < this.mSpriteShown )
				{
					--this.mSpriteShown;
				}
			}
			this.mSpritePackView.mFrameBar.setSliderSize( this.mSpritePack.size() - 1 );
		}
	}
	/**
	 * Action that shows a sprite in the editor. This action do not check if the sprite requested exists or not.
	 * If it not exists then it will not show any sprite.
	 *
	 * @param {Integer} pSpriteNumber, the index of the sprite to be shown in the editor
	 */
	this.actionShowSprite = function( pSpriteNumber )
	{
		this.mSpriteShown = pSpriteNumber;
		var sprite = this.getCurrentSprite();
		
		this.mSpritePackView.mSpriteProperties.setValues( sprite );
		this.mSpritePackView.mDrawingArea.setSprite( sprite );
		this.mSpritePackView.mFrameBar.setSliderValue( this.mSpriteShown );
		
		this.actionShowOnionSkin();
	}
	/**
	 * Action that shows the correct onionskin sprite
	 */
	this.actionShowOnionSkin = function()
	{
		this.mSpritePackView.mDrawingArea.setOnionSkinSprite( this.mSpritePackView.mSpriteProperties.getOnionSkin() );
	}
	/**
	 * Action that shows the first sprite in the editor
	 */
	this.actionFirstSprite = function()
	{
		this.actionShowSprite( 0 );
	}
	/**
	 * Action that shows the next sprite in the editor
	 */
	this.actionNextSprite = function()
	{
		if( this.mSpriteShown + 1 < this.mSpritePack.size() )
		{
			this.actionShowSprite( this.mSpriteShown + 1 );
		}
	}
	/**
	 * Action that shows the previous sprite in the editor
	 */
	this.actionPreviousSprite = function()
	{
		if( this.mSpriteShown > 0 )
		{
			this.actionShowSprite( this.mSpriteShown - 1 );
		}
	}
	/**
	 * Action that shows the last sprite in the editor
	 */
	this.actionLastSprite = function()
	{
		this.actionShowSprite( this.mSpritePack.size() - 1 );
	}
	/**
	 * Method that creates the Editor and all its components. 
	 * Registering all the necessary events as well.
	 */
	this.init = function()
	{
		this.mElement			= $( "#tabs" ).tabs();
		this.resize();
		
		this.mKeyListener		= new KeyListener();
		this.mMenu				= new EditorMenu();
		this.mSpritePackView	= new EditorSpritePackView();
		this.mSpritePack		= new SpritePack();
		this.mSpriteShown		= -1;
		
		this.registerEvents();
	}
	/**
	 * Event Called when the window is resized. This event will resize the height of the tabs as well.
	 */
	this.resize = function()
	{
		console.log("resize");
		
		var window_height	= $(window).height()
		this.mElement.height( window_height );
		
		var nav_height		= this.mElement.children("ul").height();
		var offset			= this.mElement.children("div").offset();
		this.mElement.children("div").height( window_height - nav_height - offset.top );
	}
	/**
	 * Method that registers all the necessary events for the Editor.
	 */
	this.registerEvents = function()
	{
		$(window).resize
		(
			(function(obj){
				return function(){ obj.resize(); }
			})(this)
		);
		
		$("#import_sprites_file").change( this.eventImageAdd );
	}
}
