$(document).ready(function() {

    document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: white;">'+nombre+ ', '+apellido+'.</a>';
    $('#table1').DataTable();

  } );

///////////////cerrar sesion
  $("#cerrarSesion").on('click', function () {
    setCookie('api-token', 'null', 1);
    window.location.href = "index.html";
  });
