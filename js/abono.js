$(document).ready(function() {
  
    document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: yellow;"><strong>'+nombre+ ', '+apellido+'.</strong></a>';
    loadPacientes();
    $('#table1').DataTable({

      language: {
          search: "Buscar:",
        "info": "Mostrando del _START_ a _END_ de _TOTAL_ registros",
        "lengthMenu":     "Mostrar _MENU_ registros",
        "zeroRecords":    "No se encontro ningun registro",
        "infoEmpty":      "0 registros",
      "infoFiltered":   "(filtrados de _MAX_ registros)",
          paginate: {
              first:      "Primero",
              previous:   "Anterior",
              next:       "Siguiente",
              last:       "Ultimo"
          }
        }
    });
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
          data.pacientes.forEach(paciente => {
            let fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${paciente.nombres} ${paciente.apellidos}</td>
                <td>${paciente.dpi}</td>
                <td><a href="#" onClick= abonoHistorial(${paciente.idpaciente}) title="Historial de abonos"><img src="icon/check-list.png"></a></td>
            `
            document.getElementById('tabla-abonos').appendChild(fila);
          });
        }
        hideLoader();
      }
    })
  }

  function abonoHistorial(idPaciente) {

  //setCookie('api-idPersonal', idestudiante, 1);
  showLoader();
  idPersonal = idPaciente;
  $('#contenido').load("abonoHistorial.html");

  }
