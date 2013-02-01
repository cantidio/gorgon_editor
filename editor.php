<?php
	$date		= new DateTime();
	$timestamp	= $date->getTimestamp();
	$spritepack = $_POST['spritepack'];
	$filename	= "out/saida.zip";
	
	if(file_exists($filename))
	{
		unlink($filename);
	}
  
	$zip = new ZipArchive;
	$res = $zip->open( $filename, ZipArchive::CREATE );
	if( $res === TRUE )
	{
		$lua = "spritepack = {\n";
		for( $i =0; $i < sizeof( $spritepack ); ++$i )
		{	
			$zip->addFromString("img_$i.png", base64_decode( $spritepack[$i]['image'] ) );
			
			$lua .= "\t{\n";
			$lua .="\t\tname    = \"" . $spritepack[$i]['name'] . "\",\n";
			$lua .="\t\tgroup   = " . $spritepack[$i]['group'] . ",\n";
			$lua .="\t\tindex   = " . $spritepack[$i]['index'] . ",\n";
			$lua .="\t\txoffset = " . $spritepack[$i]['xoffset'] . ",\n";
			$lua .="\t\tyoffset = " . $spritepack[$i]['yoffset'] . ",\n";
			$lua .="\t\timage   = \"img_$i.png\"\n";
			$lua .="\t},\n";
		}
		$lua .= "}";
		$zip->addFromString('spritepack.lua', $lua);
		$zip->close();
		echo $filename;
	}
	else
	{
    	echo 'failed';
	}
	
