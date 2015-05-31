function bigParks () {
  geoJsonLayer.clearLayers()
$.get('https://a.tiles.mapbox.com/v4/sdukes.m8434ap4/features.json?access_token=' + accessToken, function(Acres) {
  console.log(Acres);
  var featureCollection = {
    features: [],
    type: "FeatureCollection"
  };

   for (var i = 0; i < Acres.features.length; i++) {
     if (Acres.features[i].properties.Acreage > 1) {
       featureCollection.features.push(Acres.features[i]);
     }
   }

   geoJsonLayer.addData(featureCollection);
});
}


function smallParks () {
geoJsonLayer.clearLayers()
$.get('https://a.tiles.mapbox.com/v4/sdukes.m8434ap4/features.json?access_token=' + accessToken, function(Acres) {
console.log(Acres);
var featureCollection = {
  features: [],
  type: "FeatureCollection"
};

 for (var i = 0; i < Acres.features.length; i++) {
   if (Acres.features[i].properties.Acreage < 1) {
     featureCollection.features.push(Acres.features[i]);
   }
 }

 geoJsonLayer.addData(featureCollection);
});
}

function smallDogs () {
geoJsonLayer.clearLayers()
$.get('https://a.tiles.mapbox.com/v4/sdukes.m8434ap4/features.json?access_token=' + accessToken, function(Acres) {
console.log(Acres);
var featureCollection = {
  features: [],
  type: "FeatureCollection"
};

 for (var i = 0; i < Acres.features.length; i++) {
   if (Acres.features[i].properties.ParkServiceArea === "PSA 1" || Acres.features[i].properties.ParkType === "Mini Park") {
     featureCollection.features.push(Acres.features[i]);
   }
 }

 geoJsonLayer.addData(featureCollection);
});
}

function bigDogs () {
geoJsonLayer.clearLayers()
$.get('https://a.tiles.mapbox.com/v4/sdukes.m8434ap4/features.json?access_token=' + accessToken, function(Acres) {
console.log(Acres);
var featureCollection = {
 features: [],
 type: "FeatureCollection"
};

for (var i = 0; i < Acres.features.length; i++) {
  if (Acres.features[i].properties.ParkServiceArea === "PSA 1" || Acres.features[i].properties.ParkType === "Regional Park") {
    featureCollection.features.push(Acres.features[i]);
  }
}

geoJsonLayer.addData(featureCollection);
});
}

function offLeash () {
geoJsonLayer.clearLayers()
$.get('https://a.tiles.mapbox.com/v4/sdukes.m8434ap4/features.json?access_token=' + accessToken, function(Acres) {
console.log(Acres);
var featureCollection = {
 features: [],
 type: "FeatureCollection"
};

for (var i = 0; i < Acres.features.length; i++) {
  if (Acres.features[i].properties.ParkType !== "Neighborhood Park or Playground" && Acres.features[i].properties.Acreage > 1) {
    featureCollection.features.push(Acres.features[i]);
  }
}

geoJsonLayer.addData(featureCollection);
});
}

function onLeash () {
geoJsonLayer.clearLayers()
$.get('https://a.tiles.mapbox.com/v4/sdukes.m8434ap4/features.json?access_token=' + accessToken, function(Acres) {
console.log(Acres);
var featureCollection = {
 features: [],
 type: "FeatureCollection"
};

for (var i = 0; i < Acres.features.length; i++) {
  if (Acres.features[i].properties.ParkType === "Neighborhood Park or Playground" && Acres.features[i].properties.Acreage < 1) {
    featureCollection.features.push(Acres.features[i]);
  }
}

geoJsonLayer.addData(featureCollection);
});
}

function getAll () {
 geoJsonLayer.clearLayers()
 $.get('https://a.tiles.mapbox.com/v4/sdukes.m8434ap4/features.json?access_token=' + accessToken, function(Acres) {
   console.log(Acres);
   var featureCollection = {
     features: [],
     type: "FeatureCollection"
   };

    for (var i = 0; i < Acres.features.length; i++) {
      if (Acres.features[i].properties.ParkType === "Neighborhood Park or Playground" && Acres.features[i].properties.Acreage < 1) {
        featureCollection.features.push(Acres.features[i]);
      }
    }

    geoJsonLayer.addData(featureCollection);
  });
}

function whereAmI() {
map.locate({ setView: true });
}
