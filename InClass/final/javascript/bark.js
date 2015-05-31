<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>

var findLike = document.querySelector(".like");
var likeCount = document.querySelector(".like-count");
var likes = 0;

var map = L.map('map', {
    center: [37.779, -122.443],
    zoom: 12
});

var accessToken = 'pk.eyJ1Ijoic2R1a2VzIiwiYSI6ImZuTW80czQifQ.3pf72TkZauDP9mbYqlcIXQ';
var url = 'https://{s}.tiles.mapbox.com/v4/sdukes.m8434ap4/{z}/{x}/{y}.png?access_token=' + accessToken;
var tileLayer = L.tileLayer(url, {
   attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
 }).addTo(map);
 var geoJsonLayer;
 $.get('https://a.tiles.mapbox.com/v4/sdukes.m8434ap4/features.json?access_token=' + accessToken, function(data) {
   // Now that we've got our data we can just let leaflet read it and add it to the map
     geoJsonLayer = L.geoJson(data, {
       onEachFeature: function(feature, layer) {
         layer.bindPopup(feature.properties.title + ' ' +
         '<br>' + feature.properties.description +
         '<br>' + feature.properties.Acreage + ' Acres'
         );
       },
     }).addTo(map);
    // console.log(data);
 });

 //Watch for the submit action so that we can start querying parks
var formSubmit = document.querySelector(".form-options");

function submitClicked(clickEvent) {
  event.preventDefault();

    var parkSize = clickEvent.target["park-size"];
    var dogSize = clickEvent.target["dog-size"];
    var leash = clickEvent.target["leash"];

    //create object that contains answers to the following
    //What size parks the user is looking for
    //What kind of dogs they want to be around
    //If they are looking for on or off leash parks
    var userInput = {
      parkSize: parkSize.value,
      dogSize: dogSize.value,
      leash: leash.value
    }

    updateParks(userInput)

}

formSubmit.addEventListener("submit", submitClicked);

//Take user input and add the fitered results to the map
function updateParks (userInput) {
  geoJsonLayer.clearLayers()
  $.get('https://a.tiles.mapbox.com/v4/sdukes.m8434ap4/features.json?access_token=' + accessToken, function(Acres) {
    console.log(Acres);
    var featureCollection = {
      features: [],
      type: "FeatureCollection"
    };

    // filter data based on userInput
    for (var i = 0; i < Acres.features.length; i++) {
      var isBigPark = Acres.features[i].properties.Acreage > 1;
      var isBigDog = Acres.features[i].properties.ParkServiceArea === "PSA 1" || Acres.features[i].properties.ParkType === "Regional Park";
      var isOffLeash = Acres.features[i].properties.ParkType !== "Neighborhood Park or Playground" && Acres.features[i].properties.Acreage > 1;

      var parkMatches = true;
        if (userInput.parkSize !=="All") {
          if (userInput.parkSize === "Small Parks" && isBigPark) {
            parkMatches = false;
          } else if (userInput.parkSize === "Big Parks" && !isBigPark) {
            parkMatches = false;
          }
        }

      var dogMatches = true;
       if (userInput.dogSize !=="All") {
        if (userInput.dogSize === "Small Dogs" && isBigDog) {
          dogMatches = false;
        } else if (userInput.dogSize === "Big Dogs" && !isBigDog) {
          dogMatches = false;
        }
      }

      var leashMatches = true;
       if (userInput.leash !=="All") {
        if (userInput.leash === "On Leash" && isOffLeash) {
          leashMatches = false;
        } else if (userInput.leash === "Off Leash" && !isOffLeash) {
          leashMatches = false;
        }
      }

      if (parkMatches && leashMatches && dogMatches) {
        featureCollection.features.push(Acres.features[i]);
      }
    }

     geoJsonLayer.addData(featureCollection);
   });
}
