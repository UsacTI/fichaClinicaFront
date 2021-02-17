$(document).ready(function() {

  getEstudiantes();
  $('#table6').DataTable({

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
} )

function getEstudiantes() {

  $.ajax({
    type: 'GET',
    url: dominio + 'BuscarDetallePacienteUsuario/'+idUsuario,
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      //console.log(data)
      data.detalle.forEach(element => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${element.nombresUs} ${element.apellidoUs}</td>
          <td>${element.nombres} ${element.apellidos}</td>
          <td>${(element.aprobar_expediente == 1)?'<button class="btn btn-success btn-sm" disabled>Aprobado</button>':'<button class="btn btn-danger btn-sm" disabled>Revisar</button>'}</td>
          <td> <a href="#" onClick= goToExpediente("${element.idexpediente}")><img src="icon/check-list.png"></a> |
          <a href="#" onClick= goToRadiografia("${element.idexpediente}")><i class="fas fa-images"></i></a></td>
        `
        document.getElementById('tabla-aprobacion').appendChild(fila);
      });
      hideLoader();
    }
  })
}


function goToExpediente(idExpediente) {
  expedienteId = idExpediente;
$('#contenido').load("expedienteProfesor.html");
}

function goToRadiografia(idExpediente) {
  expedienteId = idExpediente;
    $('#contenido').load("radiografiaNoEditableProfesor.html");
}
