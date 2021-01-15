$(document).ready(function () {

  //document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: white;">'+nombre+ ' '+rol+'</a>';
  $('#paciente').DataTable();
});


function registroPaciente() {

nombres = $("#nombre").val();
apellidos = $("#apellido").val();
genero = $("input[name='gender']:checked").val()
fechanacimiento = $("#fechanacimiento").val();
dpi = $("#dpi").val();
password = $("#contrasenia").val();
direccion = $("#direccion").val();
telefono = $("#telefono").val();
consulta = $("#consulta").val();


    data     = '{"nombres": "' + nombres + '", "apellidos": "' + apellidos + '", "genero": "'+genero+'", "nacimiento": "'
                +fechanacimiento+'", "dpi": "'+dpi+'", "contrasenia": "'+password+'", "direccion": "'+direccion+'", "telefono":'
                +telefono+', "consulta": "'+consulta+'"}';
      $.ajax({
          type: 'POST',
          url:  dominio + "patients/createOfiInfo",
          contentType: "application/json",
          dataType: 'json',
          crossDomain: true,
          async: false,
          data: data,
          success: function (data) {
            console.log(data);

          }
      });
}

$("#registro").on('click', function () {
        //login(tipoCuenta);
        registroPaciente();
});
