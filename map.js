//load in basemap
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

//load in food layer
var food = L.esri.featureLayer({
    url: 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/Vermont_Food/FeatureServer/0?token=Xzzt-GI2g7sCfeR5Grjd7ThASjfLKH29N068ydB4Vdm1P1TyT8jIHwTkun_c_VFQpqBQS_4Bqyqeu_0SvWdpQTKkSxPGOmGoLl6eD2jMfCtmcYo_e4AUeC6mCAq_1zvvqeLgZkWA-S4PUFDy0vJ04X2RuSM2DMC1J0JEFdjhZpzbOO8Kt2Ix8Sf28s0KEfQQ6XJ2ytXJ7oMcTDk8UM0-GbtY5YkA3AjyvReJHOpTF5B7XWkA3Yte3s_GkZHj81le-eO1YpLvctzxq8iXO-_okA..',
    simplifyFactor: 0.5,
    precision: 5,
    onEachFeature: foodFeature,
})

//load in naturey things layer
var nature = L.esri.featureLayer({
    url: 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/VT_nature_things/FeatureServer/0?token=MfrjVFgUdXCNiF7Pt7BmM8F__dNRJLJ_W9jPFq2r837uCaKXbzBLNvFvgPvIgZXxdKGX_KcTJtbqS-MkEEGOo2kIJiT_WoF5oWefLXFTxeCmMHVt4CYEAGXLe8Q5MlPDzJo5A1OsM5f_nZDuuxgj93gkLgTgo4773ePTsuVSTciQr79a-feRWt3pzmejkSU2fOjjSzaw6R8prdkGXGdMlCiiLFHRPBpK0QI0z5sBOzzCOhwqRrj4XL6Kd_q69r2d3AEMdoY1eu7OeZkZJ1HGjA..',
    simplifyFactor: 0.5,
    precision: 5,
//popup and map-legend on click of features 	
    onEachFeature: onEachFeature,
})

//set bounds of map
var corner1 = L.latLng(47, -75),
    corner2 = L.latLng(42, -71),
    bounds = L.latLngBounds(corner1, corner2);


//add map to page, set cetner & zoom, add layers
var map = L.map('map', {
    center: [43.9877379, -72.6569752],
    zoom: 8,
    minZoom: 8,
    maxZoom: 15,
    layers: [CartoDB_Positron, food, nature],
//use bounds var to limit panning
    maxBounds: bounds,
    maxBoundsViscosity: 1,
})


//function to create a popup on click of a food feature
function foodFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(`
        <h3>${feature.properties.Name}</h3>
        <p><b>Type of Food:</b> ${feature.properties.Type}</p>
        <a href='${feature.properties.Website}'>Check out their website!</a>
        `);
    }
}

//function to create popup on click of nature feature
function naturePopup(e){
    var layer =e.target;
    layer.bindPopup(`
        <h3>${layer.feature.properties.Name}</h3>
        <p><b>Where is it?</b> ${layer.feature.properties.Location}</p>
        <p><b>What can I do there?</b> ${layer.feature.properties.Activities}</p>
        `,)
    }
//function to fill in map-legend with a photo on click of nature feature
function imageLegend (e){
    var layer = e.target;
    var mapLegend = document.getElementById('map-legend');
    mapLegend.innerHTML = layer.feature.properties.Name
    mapLegend.innerHTML = layer.feature.properties.pics
    }

//function that can be passed to nature layer onEachFeature
//wouldn't allow me to set them both to click but when I wrote it this
//way they both work on a click (??)
function onEachFeature(feature, layer){
    layer.on({
        mouseover:naturePopup,
        click: imageLegend,
    })
}
