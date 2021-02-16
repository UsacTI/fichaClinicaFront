$(document).ready(function() {

  getEstudiantes();

  $('#table7').DataTable({

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
      console.log(data)
      data.detalle.forEach(element => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${element.nombresUs} ${element.apellidoUs}</td>
          <td>${element.nombres} ${element.apellidos}</td>
          <td>${(element.aprobar_plan == 1)?'<button class="btn btn-success btn-sm" disabled>Aprobado</button>':'<button class="btn btn-danger btn-sm" disabled>Revisar</button>'}</td>
          <td> <a href="#" onClick= planTratamientoProfesor("${element.idexpediente}")><img src="icon/check-list.png"></a> |
          <a href="#" onClick= goToRadiografia("${element.idexpediente}")><i class="fas fa-images"></i></a></td>
        `
        document.getElementById('tabla-plan').appendChild(fila);
      });

    }
  })
}


function planTratamientoProfesor(idExpediente) {
  expedienteId = idExpediente;
$('#contenido').load("planTratamientoProfesor.html");
}

function goToRadiografia(idExpediente) {
  expedienteId = idExpediente;
  alert(expedienteId);
    $('#contenido').load("radiografiaNoEditableProfesor.html");
}
