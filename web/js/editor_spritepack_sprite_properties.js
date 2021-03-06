/**
 * Class that represents the sprite properties of the spritepack view
 */
function EditorSpriteProperties()
{
	this.mElement 			= $("#sprite_properties");
	$( "#viewport_input" ).buttonset();
	$( "#onionskin_input" ).buttonset();
	this.mShortcutListener	= new ShortcutListener();
	
	this.registerEvents();
	this.registerShortcuts();
}
EditorSpriteProperties.prototype.registerShortcuts = function()
{
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Control, KeyListener.KEY.I],
		down:	this.eventImportSprites,
	});
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Alt, KeyListener.KEY.G],
		down:	function() { $("#input_sprite_group").focus(); },
	});
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Alt, KeyListener.KEY.I],
		down:	function() { $("#input_sprite_index").focus(); },
	});
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Alt, KeyListener.KEY.N],
		down:	function() { $("#input_sprite_name").focus(); },
	});
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Alt, KeyListener.KEY.X],
		down:	function() { $("#input_sprite_xoffset").focus(); },
	});
	this.mShortcutListener.shortcut
	({
		keys:	[KeyListener.KEY.Alt, KeyListener.KEY.Y],
		down:	function() { $("#input_sprite_yoffset").focus(); },
	});
}
/**
 * Method that returns the onionskin sprite based in the sprite properties selected option
 *
 * @return	{Sprite}
 */
EditorSpriteProperties.prototype.getOnionSkin = function()
{
	switch( parseInt( $( "#onionskin_input input[type=radio]:checked" ).val() ) )
	{
		case 0://none
			return null;
		case 1://last
			return Editor.mSpritePack.sprite( Editor.mSpriteShown - 1 );
		case 2://fixed
			var sprite = Editor.mSpritePack.search
			(
				parseInt( $("#oninskin_fixed_group").val() ),
				parseInt( $("#oninskin_fixed_index").val() )
			)[0];
			return ( sprite !== Editor.getCurrentSprite() ) ? sprite : null;
	}
}
/**
 * Method that sets the values of the fields based in the sprite given
 *
 * @param	{Sprite} pSPrite, the sprite that the values will fill the form
 */
EditorSpriteProperties.prototype.setValues = function( pSprite )
{
	if( pSprite != undefined )
	{
		$("#input_sprite_group")	.val( pSprite.group );
		$("#input_sprite_index")	.val( pSprite.index );
		$("#input_sprite_name")		.val( pSprite.name );
		$("#input_sprite_xoffset")	.val( pSprite.offset.x );
		$("#input_sprite_yoffset")	.val( pSprite.offset.y );
	}
	else
	{
		$("#input_sprite_group")	.val( 0 );
		$("#input_sprite_index")	.val( 0 );
		$("#input_sprite_name")		.val( "" );
		$("#input_sprite_xoffset")	.val( 0 );
		$("#input_sprite_yoffset")	.val( 0 );
	}
}
/**
 * Event triggered when the import sprites button is clicked
 */
EditorSpriteProperties.prototype.eventImportSprites = function()
{
	$("#import_sprites_file").val("");
	$("#import_sprites_file").click();
}
/**
 * Event triggered when the group field value has changed
 */
EditorSpriteProperties.prototype.eventChangeSpriteGroup = function()
{
	var sprite = Editor.getCurrentSprite();
	if( sprite )
	{
		sprite.group = parseInt( $(this).val() );		
	}
}
/**
 * Event triggered when the index field value has changed
 */
EditorSpriteProperties.prototype.eventChangeSpriteIndex = function()
{
	var sprite = Editor.getCurrentSprite();
	if( sprite )
	{
		sprite.index = parseInt( $(this).val() );		
	}
}
/**
 * Event triggered when the name field value has changed
 */
EditorSpriteProperties.prototype.eventChangeSpriteName = function()
{
	var sprite = Editor.getCurrentSprite();
	if( sprite )
	{
		sprite.name = $(this).val();
	}
}
/**
 * Event triggered when the xOffset field value has changed
 */
EditorSpriteProperties.prototype.eventChangeSpriteXOffset = function()
{
	var sprite = Editor.getCurrentSprite();
	if( sprite )
	{
		sprite.offset.x = parseInt( $(this).val() );		
		Editor.mSpritePackView.mDrawingArea.updateSprite();
	}
}
/**
 * Event triggered when the yOffset field value has changed
 */
EditorSpriteProperties.prototype.eventChangeSpriteYOffset = function()
{
	var sprite = Editor.getCurrentSprite();
	if( sprite )
	{
		sprite.offset.y = parseInt( $(this).val() );		
		Editor.mSpritePackView.mDrawingArea.updateSprite();
	}
}
/**
 * Event triggered when the onionskin mode or the fixed values have changed 
 */
EditorSpriteProperties.prototype.eventChangeOnionSkinMode = function()
{
	Editor.actionShowOnionSkin();
	
	var div = $("#oninskin_fixed_input_container");
	if( parseInt( $( "#onionskin_input input[type=radio]:checked" ).val() ) != 2 )
	{
		div.css("opacity","0.6");
		div.children("span").children("input").attr("disabled",true);
	}
	else
	{
		div.css("opacity","1.0");
		div.children("span").children("input").attr("disabled",false);
	}
}
/**
 * Method that registers all events related with the sprite properties
 */
EditorSpriteProperties.prototype.registerEvents = function()
{
	$("#btn_import_sprites").click( this.eventImportSprites );
	$("#input_sprite_group").change( this.eventChangeSpriteGroup );
	$("#input_sprite_index").change( this.eventChangeSpriteIndex );
	$("#input_sprite_name").change( this.eventChangeSpriteName );
	$("#input_sprite_xoffset").change( this.eventChangeSpriteXOffset );
	$("#input_sprite_yoffset").change( this.eventChangeSpriteYOffset );
	
	$("#onionskin_input input[type=radio],#oninskin_fixed_group,#oninskin_fixed_index" ).change( this.eventChangeOnionSkinMode );
	$("#spritepack-drawing-area *").click( function(e){ $("* input").blur(); } );//when clicking in the drawing area if a input has focus it loses it
}
