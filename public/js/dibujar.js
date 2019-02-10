var valores=[];
var link = $("#googleAPI").attr("src");
$("#googleAPI").attr("src", link + config.GOOGLE_KEY);

$("#botonTomar").click(function () {

  var nombre = $("#select").val();

  var data={
      option: nombre,
  }

  var url="/obtenerRuta";
  $.post(url, data, function(data, status){
      data.puntos.forEach(punto => {
        var lat = Number(punto.lat);
        var lng = Number(punto.lon);
        valores.push({lat, lng});
        console.log(lat);
        console.log(lng);
      }); 
  });
});

$("#botonDibujar").click(function(e){
  initMap(valores);
});


function initMap(valores) {
    console.log("funcionando");
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 20,
      center: {lat: valores[0].lat, lng: valores[0].lng},
      mapTypeId: 'terrain',
      gestureHandling: 'cooperative'
    });

    var flightPath = new google.maps.Polyline({
      path: valores,
      geodesic: true,
      strokeColor: '#FF4000',
      strokeOpacity: 1.0,
      strokeWeight: 15
    });

    flightPath.setMap(map);
  }