$(document).ready(function() {
  $('#table6').DataTable();
  getEstudiantes()
} )

function getEstudiantes() {
  document.getElementById('tabla-aprobacion').getElementsByTagName('tr')[0].remove();
  
  $.ajax({
    type: 'GET',
    url: dominio + 'BuscarDetallePacienteUsuario/'+0,
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
          <td> <a href="./expedienteProfesor.html?id=${element.idexpediente}"><img src="icon/check-list.png"></> </td>
        `
        document.getElementById('tabla-aprobacion').appendChild(fila);  
      });
      
    }
  })
}
