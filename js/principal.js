$(document).ready(function () {
  menu(tipoUsuario);


  document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: yellow;"><strong>'+nombre+ ', '+apellido+'.</strong></a>';
});



function menu(tipoU) {

  if(tipoU == 3){
    document.getElementById('rol-name').textContent = "Estudiante";
  $('#contenido').load("./profesorBancoPaciente.html");

  data = '{"tipomenu": ' + tipoU + '}'
  $.ajax({
    type: 'POST',
    url: dominio + 'menus',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    data: data,
    success: function (data) {
      //console.log(data)
      html = '';

      for(i = 0; i < data.Menus.length; i++){
        //console.log(data.Menus[i]);
        html += '<li><a href="#" onClick= contentUrl("'+data.Menus[i].url+'")>'+data.Menus[i].icono+' '+data.Menus[i].nombre+'</a></li>';
      }


      document.getElementById("llenarMenu").innerHTML = html;

    },
    error: function (response) {
         window.location.href = "index.html";
        }
  });
}
else if(tipoU == 4){
  document.getElementById('rol-name').textContent = "Administrador";
$('#contenido').load("./bancoEstudiante.html");

data = '{"tipomenu": ' + tipoU + '}'
$.ajax({
 type: 'POST',
 url: dominio + 'menus',
 contentType: 'application/json',
 dataType: 'json',
 crossDomain: true,
 async: false,
 data: data,
 success: function (data) {
   //console.log(data)
   html = '';

   for(i = 0; i < data.Menus.length; i++){
     //console.log(data.Menus[i]);
     html += '<li><a href="#" onClick= contentUrl("'+data.Menus[i].url+'")>'+data.Menus[i].icono+' '+data.Menus[i].nombre+'</a></li>';
   }


   document.getElementById("llenarMenu").innerHTML = html;

 },
 error: function (response) {
      window.location.href = "index.html";
     }
});
}
else if(tipoU == 2){
  document.getElementById('rol-name').textContent = "Catedrático";
$('#contenido').load("./profesorAprobacion.html");

data = '{"tipomenu": ' + tipoU + '}'
$.ajax({
 type: 'POST',
 url: dominio + 'menus',
 contentType: 'application/json',
 dataType: 'json',
 crossDomain: true,
 async: false,
 data: data,
 success: function (data) {
   //console.log(data)
   html = '';

   for(i = 0; i < data.Menus.length; i++){
     //console.log(data.Menus[i]);
     html += '<li><a href="#" onClick= contentUrl("'+data.Menus[i].url+'")>'+data.Menus[i].icono+' '+data.Menus[i].nombre+'</a></li>';
   }


   document.getElementById("llenarMenu").innerHTML = html;

 },
 error: function (response) {
      window.location.href = "index.html";
     }
});
}
else if(tipoU == 1){
  document.getElementById('rol-name').textContent = "Gestor Oficina";
$('#contenido').load("./abono.html");

data = '{"tipomenu": ' + tipoU + '}'
$.ajax({
 type: 'POST',
 url: dominio + 'menus',
 contentType: 'application/json',
 dataType: 'json',
 crossDomain: true,
 async: false,
 data: data,
 success: function (data) {
   //console.log(data)
   html = '';

   for(i = 0; i < data.Menus.length; i++){
     //console.log(data.Menus[i]);
    html += '<li><a href="#" onClick= contentUrl("'+data.Menus[i].url+'")>'+data.Menus[i].icono+' '+data.Menus[i].nombre+'</a></li>';
   }


   document.getElementById("llenarMenu").innerHTML = html;

 },
 error: function (response) {
      window.location.href = "index.html";
     }
});
}

else if(tipoU == 5){
  document.getElementById('rol-name').textContent = "Trabajo Social";
$('#contenido').load("./bancoPaciente.html");

data = '{"tipomenu": ' + tipoU + '}'
$.ajax({
 type: 'POST',
 url: dominio + 'menus',
 contentType: 'application/json',
 dataType: 'json',
 crossDomain: true,
 async: false,
 data: data,
 success: function (data) {
   //console.log(data)
   html = '';

   for(i = 0; i < data.Menus.length; i++){
     //console.log(data.Menus[i]);
     html += '<li><a href="#" onClick= contentUrl("'+data.Menus[i].url+'")>'+data.Menus[i].icono+' '+data.Menus[i].nombre+'</a></li>';
   }


   document.getElementById("llenarMenu").innerHTML = html;

 },
 error: function (response) {
      window.location.href = "index.html";
     }
});
} else {

    if(token === 'null'){

        window.location.href = "index.html";
      }
}

}

function contentUrl(url) {
  showLoader();
  $('#contenido').load("./"+url);

}


///////////////cerrar sesion
  $("#cerrarSesion").on('click', function () {
    setCookie('api-token', 'null', 1);
    setCookie('api-nombreUsuario', 'null', 1);
    setCookie('api-apellidoUsuario', 'null', 1);
    setCookie('api-usuario', 'null', 1);
    setCookie('api-tipoUsuario', 'null', 1);
    setCookie('api-idUsuario', 'null', 1);
    var idPersonal = 0;
    var expedienteId = 0;
    var fechaNuevaCita = "";

    /////////////////para la info del paciente en expediente
    var nombrePaciente = "";
    var apellidoPaciente = "";
    var dpiPaciente = "";
    var fotoPaciente = "";

    ///////////para genera la boleta en primera cita
    var carnetBoleta = 0;
    var id_orden_pago = 0;
    var checksum = 0;

    window.location.href = "index.html";
  });

  function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 500);
}

function hideLoaderWTimer() {
        document.getElementById('loader').style.display = 'none';
}

function getFecha(f) {
  let fecha = new Date(f);
  let dia = fecha.getUTCDate();
  let mes = fecha.getMonth();
  if (fecha.getUTCDate() < 10) {
      dia = `0${fecha.getUTCDate()}`
  }
  if (fecha.getMonth() < 10) {
      mes = `0${fecha.getMonth()}`
  }
  return `${dia}/${mes}/${fecha.getUTCFullYear()}`
}

function getHora(f) {
  let fecha = new Date(f);
  let hora = fecha.getUTCHours();
  if (fecha.getUTCHours() < 10) {
      hora = `0${fecha.getUTCHours()}`
  }
  let min = fecha.getUTCMinutes()
  if (fecha.getUTCMinutes() < 10) {
      min = `0${fecha.getUTCMinutes()}`
  }
  return `${hora}:${min}`
}
