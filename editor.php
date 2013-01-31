<?php
	print "carregando a bagaça!<br><pre>";
	$spritepack = $_POST['spritepack'];
	for( $i = 0; $i < sizeof($spritepack); ++$i )
	{
		$spritepack[$i]['image'] =  base64_decode( $spritepack[$i]['image'] );
	}
	print_r( $spritepack );
	print "</pre>";
	
