$(document).ready(function() {

    document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: yellow;"><strong>'+nombre+ ', '+apellido+'.</strong></a>';
    $('#table1').DataTable();
    loadPacientes();
  } );

///////////////cerrar sesion
  $("#cerrarSesion").on('click', function () {
    setCookie('api-token', 'null', 1);
    window.location.href = "index.html";
  });


  function loadPacientes() {
    $.ajax({
      type: 'GET',
      url: dominio + `patients/state5`,
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      async: false,
      success: function (data) {
        if (data.pacientes.length > 0) {
          document.getElementById('tabla-abonos').getElementsByTagName('tr')[0].remove();
          data.pacientes.forEach(paciente => {
            let fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${paciente.nombres} ${paciente.apellidos}</td>
                <td>${paciente.dpi}</td>
                <td><a href="./abonoHistorial.html?id=${paciente.idpaciente}"><img src="icon/check-list.png"></a></td>
            `
            document.getElementById('tabla-abonos').appendChild(fila);
          });
        }
      }
    })
  }
