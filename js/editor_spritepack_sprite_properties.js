function EditorSpriteProperties()
{
	this.mElement = $("#sprite_properties");
	this.registerEvents();
}
/**
 * Method that sets the values of the fields based in the sprite given
 *
 * @param	{Sprite} pSPrite, the sprite that the values will fill the form
 */
EditorSpriteProperties.prototype.setValues = function( pSprite )
{
	$("#input_sprite_group")	.val( pSprite.group );
	$("#input_sprite_index")	.val( pSprite.index );
	$("#input_sprite_name")		.val( pSprite.name );
	$("#input_sprite_xoffset")	.val( pSprite.offset.x );
	$("#input_sprite_yoffset")	.val( pSprite.offset.y );
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
		Editor.mSpritePackView.mDrawingArea.updateSpritePosition();
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
		Editor.mSpritePackView.mDrawingArea.updateSpritePosition();
	}
}

EditorSpriteProperties.prototype.registerEvents = function()
{
	$("#btn_import_sprites").click( this.eventImportSprites );
	$("#input_sprite_group").change( this.eventChangeSpriteGroup );
	$("#input_sprite_index").change( this.eventChangeSpriteIndex );
	$("#input_sprite_name").change( this.eventChangeSpriteName );
	$("#input_sprite_xoffset").change( this.eventChangeSpriteXOffset );
	$("#input_sprite_yoffset").change( this.eventChangeSpriteYOffset );
}