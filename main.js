//var mymap = L.map('mapid').setView([10.3323919, -74.8885843], 13);
var mymap = L.map('mapid');

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
}).addTo(mymap);

let geojson_url = "https://gist.githubusercontent.com/john-guerra/c9c14729b8d15b2884d358fa9e368013/raw/d0a1bd65c926623869d62a64d9acd9cecd59d502/Puesto_Votacion_2018.geojson";

// var marker = L.marker([51.505, -0.09]).addTo(mymap);

fetch(
    geojson_url
).then(
    res => res.json()
).then(
    data => {
        let geojsonlayer = L.geoJson(data, {
            onEachFeature: function(feature, layout) {
                layout.bindPopup(feature.properties['LOCCODIGO'])
            }
        }).addTo(mymap)
        mymap.fitBounds(geojsonlayer.getBounds());
    }
)