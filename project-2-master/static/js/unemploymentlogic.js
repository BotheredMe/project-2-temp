//Selecting our json file to use and printing to the console
d3.json("unemploymentData.json").then(function(data) {

    // Selecting our json file to use and printing to the console
    // Nested loop for the state coordinates and the unemployment rate per state
    // function stateRate() {d3.json("unemploymentData.json").then(function(data) {
    // rate = []
    
    
    
        // Promise Pending
    // const dataPromise = d3.json("unemploymentData.json");
    // console.log("Data Promise: ", dataPromise);
    
    
    // Creating a map with an outline and adding other feautures
    
    var map = L.map('map').setView([37.8, -96], 4);
    
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox/light-v9",
        accessToken: API_KEY
      }).addTo(map);
    
    
      L.geoJson(statesData).addTo(map);
    
    
    // Adding color to the states according to the unemployment rate %
    
    function getColor(state) { 
        d=0
            Object.entries(data.UnemploymentRate).forEach(([key, value]) => {
                console.log(key+' '+state);
                if (key == state) {d=value;
                // break;
                }
            });
       
                    return d > 8.8  ? '#800026' :
                        d > 5.2  ? '#BD0026' :
                        d > 4.5  ? '#E31A1C' :
                        d > 3.8  ? '#FC4E2A' :
                        d > 3.5   ? '#FD8D3C' :
                        d > 3.1   ? '#FEB24C' :
                        d > 2.6   ? '#FED976' :
                                   '#FFEDA0';
    }
    
    
    // Styling function for our GeoJson later so the fill color depends on it's feature 
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.name),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }
    
    L.geoJson(statesData, {style: style}).addTo(map);
    
    
    // // Highlighting states when hovering over with a mouse
    
    // function highlightFeature(e) {
    //     var layer = e.target;
    
    //     layer.setStyle({
    //         weight: 5,
    //         color: '#666',
    //         dashArray: '',
    //         fillOpacity: 0.7
    //     });
    
    //     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    //         layer.bringToFront();
    //     }
    // }
    
    // // When the mouse is off the page, it resets what you have highlighted
    // function resetHighlight(e) {
    //     geojson.resetStyle(e.target);
    // }
    
    
    // // -------------------------------------// 
    
    
    // // var geojson;
    // // // ... our listeners
    // // geojson = L.geoJson(...);
    
    
    // //Zooms into the state
    // function zoomToFeature(e) {
    //     map.fitBounds(e.target.getBounds());
    // }
    
    // // Add listeners on each state layer
    // function onEachFeature(feature, layer) {
    //     layer.on({
    //         mouseover: highlightFeature,
    //         mouseout: resetHighlight,
    //         click: zoomToFeature
    //     });
    // }
    
    // // add in stateRate variable here 
    // geojson = L.geoJson(statesData, {
    //     style: style,
    //     onEachFeature: onEachFeature
    // }).addTo(map);
    
    // // Custom Controls
    // var info = L.control();
    
    // info.onAdd = function (map) {
    //     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    //     this.update();
    //     return this._div;
    // };
    
    // // method that we will use to update the control based on feature properties passed
    // info.update = function (props) {
    //     this._div.innerHTML = '<h4>US Unemployment Rate by State</h4>' +  (props ?
    //         '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
    //         : 'Hover over a state');
    // };
    
    // info.addTo(map);
    
    // // Updates controls when user hovers over a state
    // function highlightFeature(e) {
    //     ...
    //     info.update(layer.feature.properties);
    // }
    
    // function resetHighlight(e) {
    //     ...
    //     info.update();
    // }
    
    
    
    // // Control with a legend
    // var legend = L.control({position: 'bottomright'});
    
    // legend.onAdd = function (map) {
    
    //     var div = L.DomUtil.create('div', 'info legend'),
    //         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    //         labels = [];
    
    //     // loop through our density intervals and generate a label with a colored square for each interval
    //     for (var i = 0; i < grades.length; i++) {
    //         div.innerHTML +=
    //             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
    //             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    //     }
    
    //     return div;
    // };
    
    // legend.addTo(map);
    
    
    });