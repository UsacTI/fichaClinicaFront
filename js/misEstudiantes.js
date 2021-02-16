$(document).ready(function () {

  loading();

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
})

function loading () {
  $.ajax({
    type: 'GET',
    url: dominio + 'misestudiantes/' + idUsuario,
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      console.log(data)
      for (const value of data.estudiante) {
        // console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.carne + '</td>'

        fila += '<td>' + '<a href="#" onClick= estudianteVisualizacion("'+value.idusuario+'")> <img src="icon/user.png"></img></a>'
                          + '</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
    }
  })
}

function estudianteVisualizacion(idestudiante) {

//setCookie('api-idPersonal', idestudiante, 1);
idPersonal = idestudiante;
$('#contenido').load("estudianteVisualizacion.html");

}
