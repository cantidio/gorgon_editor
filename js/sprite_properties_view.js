var SpritePropertiesView = new function()
{
	this.registerCallbacks		= function() {
		$("#sprite_properties > div > div > span > #add").click( function() { $("#addimg").click(); } );
		$("#sprite_properties > div > div > span > #del").click( (function( obj ){ return function() { obj.onSpriteDelete(); } })( this ) );
		$("#sprite_properties > #sprite_slider > input").change
		(
			(function( obj ){ return function() { obj.onChangeSpriteShown( this.value ); } })( this )
		);
		
		$("#sprite_properties > #sprite_slider > #forward")		.click( (function( obj ){ return function() { obj.onSpriteForward(); } })( this ) );
		$("#sprite_properties > #sprite_slider > #backward")	.click( (function( obj ){ return function() { obj.onSpriteBackward(); } })( this ) );
		$("#sprite_properties > div > div > #name")				.change( (function( obj ){ return function() { obj.onChangeSpriteVal(); } })( this ) );
		$("#sprite_properties > div > div > span >  #group")	.change( (function( obj ){ return function() { obj.onChangeSpriteVal(); } })( this ) );
		$("#sprite_properties > div > div > span > #index")		.change( (function( obj ){ return function() { obj.onChangeSpriteVal(); } })( this ) );
		$("#sprite_properties > div > div > span > #xoffset")	.change( (function( obj ){ return function() { obj.onChangeSpriteVal(); } })( this ) );
		$("#sprite_properties > div > div > span > #yoffset")	.change( (function( obj ){ return function() { obj.onChangeSpriteVal(); } })( this ) );
		
		$('input[name=onionskin]').click
		(
			function()
			{
				Editor.show();
			}
		)
		$("#onionskin").click
		(
			function()
			{
				if( this.value == "+" )
				{
					$("#onionskin_menu").slideDown(200); 
					this.value = "-";
				}
				else
				{
					$("#onionskin_menu").slideUp(200); 
					this.value = "+";
				}
			} 
		);
	}
	this.onionskin				= function() {
		return {
			value: $('input[name=onionskin]:checked').val(),
			group: $("#onionskin_group").val(),
			index: $("#onionskin_index").val()
		};
	}
	this.onSpriteForward		= function() {
		Editor.currentSpriteIndex( Editor.currentSpriteIndex() + 1 );
		this.currentSprite( Editor.currentSpriteIndex() );
		Editor.show();
		this.updateSpriteVal( Editor.currentSprite() );
	}
	this.onSpriteBackward		= function() {
		Editor.currentSpriteIndex( Editor.currentSpriteIndex() - 1 );
		this.currentSprite( Editor.currentSpriteIndex() );
		Editor.show();
		this.updateSpriteVal( Editor.currentSprite() );
	}
	this.onChangeSpriteShown	= function( pCurrent ) {
		this.currentSprite( pCurrent );
		Editor.currentSpriteIndex( pCurrent )
		Editor.show();
		this.updateSpriteVal( Editor.currentSprite() );
	}
	this.onChangeSpriteVal		= function() {
		Editor.currentSprite().name 	= this.spriteName();
		Editor.currentSprite().group	= this.spriteGroup();
		Editor.currentSprite().index	= this.spriteIndex();
		Editor.currentSprite().offset.x	= this.spriteXOffset();
		Editor.currentSprite().offset.y	= this.spriteYOffset();
		Editor.show();
	}
	this.onSpriteDelete			= function() {
		Editor.removeSprite( Editor.currentSpriteIndex() );
		this.updateSpriteVal( Editor.currentSprite() );
	}
	this.updateSpriteVal 		= function( pSprite ) {
		if( !pSprite )
		{
			pSprite = new Sprite();
		}
		return this.spriteName( pSprite.name )
			.spriteGroup( pSprite.group )
			.spriteIndex( pSprite.index )
			.spriteXOffset( pSprite.offset.x )
			.spriteYOffset( pSprite.offset.y );
	}
	this.currentSprite			= function( pCurrentSprite ) {
		if( pCurrentSprite != undefined )
		{
			$("#sprite_properties > #sprite_slider > input").val( pCurrentSprite )
			return this;
		}
		else
		{
			return parseInt( $("#sprite_properties > #sprite_slider > input").val() );
		}
	}
	this.spriteNumber			= function( pSpriteNumber ) {
		if( pSpriteNumber != undefined )
		{
			if(  pSpriteNumber > 0 )
			{
				$("#sprite_properties > #sprite_slider > input").attr( "max", pSpriteNumber );
			}
			else
			{
				$("#sprite_properties > #sprite_slider > input").attr( "max", 0 );
			}
			return this;
		}
		else
		{
			return $("#sprite_properties > #sprite_slider > input").attr("max");
		}
	}
	this.spriteName				= function( pName ) {
		if( pName != undefined )
		{
			$("#sprite_properties > div > div > #name").val( pName );
			return this;
		}
		else
		{
			return $("#sprite_properties > div > div > #name").val();
		}
	}
	this.spriteGroup			= function( pGroup ) {
		if( pGroup != undefined )
		{
			$("#sprite_properties > div > div > span > #group").val( pGroup );
			return this;
		}
		else
		{
			return $("#sprite_properties > div > div > span > #group").val();
		}
	}
	this.spriteIndex			= function( pIndex ) {
		if( pIndex != undefined )
		{
			$("#sprite_properties > div > div > span > #index").val( pIndex );
			return this;
		}
		else
		{
			return $("#sprite_properties > div > div > span > #index").val();
		}
	}
	this.spriteXOffset			= function( pXOffset ) {
		if( pXOffset != undefined )
		{
			$("#sprite_properties > div > div > span > #xoffset").val( pXOffset );
			return this;
		}
		else
		{
			return $("#sprite_properties > div > div > span > #xoffset").val();
		}
	}
	this.spriteYOffset			= function( pYOffset ) {
		if( pYOffset != undefined )
		{
			$("#sprite_properties > div > div > span > #yoffset").val( pYOffset );
			return this;
		}
		else
		{
			return $("#sprite_properties > div > div > span > #yoffset").val();
		}
	}
	this.init					= function() {
		this.registerCallbacks();
	}
	
	//this
}
