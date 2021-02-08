$(document).ready(function() {
  $('#table7').DataTable()
  getEstudiantes();
} )

function getEstudiantes() {
  document.getElementById('tabla-plan').getElementsByTagName('tr')[0].remove();
  
  $.ajax({
    type: 'GET',
    url: dominio + 'BuscarDetallePacienteUsuario/'+12,
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
          <td> <a href="./planTratamientoProfesor.html?id=${element.idexpediente}"><img src="icon/check-list.png"></> </td>
        `
        document.getElementById('tabla-plan').appendChild(fila);  
      });
      
    }
  })
}
