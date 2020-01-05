<?php

echo "1_refresh_markers.php : modify http://www.cartocasse.fr/cache_data.json from overpass<br/>";
echo "-------<br/>";
// overpass query
$overpass = 'http://overpass-api.de/api/interpreter?data=[out:json];(area["ISO3166-1"="FR"];)->.searchArea;(node["amenity"="givebox"];node["second_hand"="only"](area.searchArea););out;';

// collecting results in JSON format
$html = file_get_contents($overpass);
$jsonout = json_decode($html);
$fp = fopen('../cache_data.json', 'w');
fwrite($fp, $html);
fclose($fp);
// this line just checks what the query would give as output
var_dump($html);
?>
