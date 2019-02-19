var valores=[];
var link = $("#googleAPI").attr("src");
$("#googleAPI").attr("src", link + config.GOOGLE_KEY);

$("#botonDibujar").click(function(e){
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
        initMap(valores);
      }); 
  });


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
      strokeWeight: 10
    });

    flightPath.setMap(map);
  }

  $("#botonCompartir").click(function(){
    var nombredeRuta= $("#select").val();
    var nombredeUsuario=$("#selectUser").val();

    var data={
      user:nombredeUsuario,
      ruta: nombredeRuta
    }

    console.log(data);

    var url="/sesion/compartir";

    $.post(url,data,function(data,status){
      //$(".alert").toggleClass('show');
    })
  })