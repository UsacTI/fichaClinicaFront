$(document).ready(function () {
  menu(tipoUsuario);


  document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: white;">'+nombre+ ' '+apellido+'</a>';
});



function menu(tipoU) {

    if(tipoU == 3){

    $('#contenido').load("./inicioEstudiante.html");

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
        console.log(data)
        html = '';

        for(i = 0; i < data.Menus.length; i++){
          console.log(data.Menus[i]);
          html += '<li><a href="#" onClick= contentUrl("'+data.Menus[i].url+'")>'+data.Menus[i].nombre+'</a></li>';
        }


        document.getElementById("llenarMenu").innerHTML = html;

      },
      error: function (response) {
           window.location.href = "index.html";
          }
    });
}

}

function contentUrl(url) {

$('#contenido').load("./"+url);

}


///////////////cerrar sesion
  $("#cerrarSesion").on('click', function () {
    setCookie('api-token', 'null', 1);
    window.location.href = "index.html";
  });
