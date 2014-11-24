/**
 * Class that represents the Editor Menu
 */
function EditorMenu()
{
	this.mLogo		= $("#logo");
	this.mElement	= $("#main-menu");
	this.mAnimVel	= 300;

	this.mElement.menu().hide();
	this.registerEvents();
}
/**
 * Method that toggles the visibility of the menu
 */
EditorMenu.prototype.toggle = function()
{
	this.mElement.fadeToggle( this.mAnimVel );
}
/**
 * Method that hides the menu
 */
EditorMenu.prototype.hide = function()
{
	this.mElement.fadeOut( this.mAnimVel );
}
/**
 * Method that shows the menu
 */
EditorMenu.prototype.show = function()
{
	this.mElement.fadeIn( this.mAnimVel );
}
/**
 * Event that executes the spritepack open event
 */
EditorMenu.prototype.eventSpritePackOpen = function()
{
	$("#import_spritepack_file").val("");
	$("#import_spritepack_file").click();
}
/**
 * Event that executes the spritepack open event
 */
EditorMenu.prototype.eventSpritePackLoad = function()
{
  return;
	var item = $("#import_spritepack_file")[0].files[0];
	if( item.type === "application/zip" || item.type === "application/x-zip-compressed")
	{
		var reader = new FileReader();
		reader.onload = function( e )
		{
			var zip = new JSZip( e.target.result );
			ProgressBar.show( zip.file(/img/).length, function(){ ProgressBar.hide(); } );
			Editor.mSpritePack = new SpritePack();
			Editor.mSpritePack.load
			(
				zip,
				function()
				{
					Editor.mSpritePackView.mFrameBar.setSliderSize( Editor.mSpritePack.size() - 1 );
					Editor.mSpritePackView.mFrameBar.eventLastSprite();
				},
				function()
				{
					ProgressBar.add( 1 );
				}
			);
		}
		reader.readAsArrayBuffer( item );
	}
}
/**
 * Event that executes the spritepack save event
 */
EditorMenu.prototype.eventSpritePackSave = function()
{
  return;
	var pack	= Editor.mSpritePack.dump();
	var zip		= new JSZip();
	var lua		= "spritepack = {\n";

	for( var i = 0; i < pack.length; ++i )
	{
		zip.file("img_" + i + pack[i].image_type, pack[i].image, { base64: true });

		lua += "\t{\n";
		lua +="\t\tname    = \""	+ pack[i].name		+ "\",\n";
		lua +="\t\tgroup   = "		+ pack[i].group		+ ",\n";
		lua +="\t\tindex   = "		+ pack[i].index		+ ",\n";
		lua +="\t\txoffset = "		+ pack[i].xoffset	+ ",\n";
		lua +="\t\tyoffset = "		+ pack[i].yoffset	+ ",\n";
		lua +="\t\timage   = \"img_" + i + pack[i].image_type + "\"\n";
		lua +="\t},\n";
		ProgressBar.add(1);
	}
	lua += "}";
	zip.file( "spritepack.lua", lua );

	var blobLink = document.getElementById('spritepack-save');
	try
	{
		blobLink.download	= "spritepack.zip";
		blobLink.href		= window.URL.createObjectURL( zip.generate({ type: "blob" }) );
	}
	catch(e)
	{
		alert("Oh no! (not supported on this browser).");
	}
}

/**
 * Method that registers all the menu events
 */
EditorMenu.prototype.registerEvents = function()
{
	$("#spritepack-open").click( this.eventSpritePackOpen );															//Menu spritepack open event
	$("#import_spritepack_file").change( this.eventSpritePackLoad );													//Menu spritepack load event
	$("#spritepack-save").click( this.eventSpritePackSave );															//Menu spritepack save event
	this.mElement.children("li").children("a").click( (function( obj ) { return function() { obj.hide(); } })(this) );	//Menu options on click event
	this.mLogo.click( (function( obj ) { return function(e) { e.stopPropagation(); obj.toggle(); } })(this) );			//Logo click event


	$("body :not(#logo)").not("#main-menu").not("#main-menu > li").not("#main-menu > li > a").mousedown
	(
		function()
		{
			$("#main-menu").hide();
		}
	);
}
