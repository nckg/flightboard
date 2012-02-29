<?php

$target = 'http://www.schiphol.nl/nosj2va/departures_today_passenger.txt?_=' . time();

curlGet($target);

function curlGet($target) {
	// create a new cURL resource
	$ch = curl_init();
	
	// set URL and other appropriate options
	curl_setopt($ch, CURLOPT_URL, $target);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	
	// grab URL and pass it to the browser
	curl_exec($ch);
	
	// close cURL resource, and free up system resources
	curl_close($ch);
}
?>
