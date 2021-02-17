$(document).ready(function () {

  if(tipoUsuario == 2){
    loadingProfesor();
  }
  else{
   loading();
 }

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
    url: dominio + 'users/state3/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
       //console.log(data)
      for (const value of data.usuarios) {
         //console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.carne + '</td>'

        fila += '<td>' + '<a href="#" onClick= estudianteVisualizacion("'+value.idusuario+'")> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="#" onClick= estudianteActualizacion("'+value.idusuario+'")>><img src="icon/edit.png"></img></a>' + '</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
      hideLoader();
    }
  })
}

function loading2 () {
  $.ajax({
    type: 'GET',
    url: dominio + 'patients/state1/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      // console.log(data)
      for (const value of data.pacientes) {
        // console.log(value)               value.idpaciente
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.dpi + '</td>'
        fila += '<td>' + '<a href="#" onClick= pacienteVisualizacion("'+value.idpaciente+'")> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="https://www.w3schools.com" target="_blank"><img src="icon/table.png"></img></a>' + '&nbsp;&nbsp;' + '</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
    }
  })
}

function loadingProfesor () {
  $.ajax({
    type: 'GET',
    url: dominio + 'users/state3/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
       //console.log(data)
      for (const value of data.usuarios) {
         //console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.carne + '</td>'

        fila += '<td>' + '<a href="#" onClick= estudianteVisualizacion("'+value.idusuario+'")> <img src="icon/user.png"></img></a>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
      hideLoader();
    }
  })
}



function estudianteVisualizacion(idestudiante) {

//setCookie('api-idPersonal', idestudiante, 1);
idPersonal = idestudiante;
$('#contenido').load("estudianteVisualizacion.html");

}

function estudianteActualizacion(idestudiante) {

//setCookie('api-idPersonal', idestudiante, 1);
idPersonal = idestudiante;
$('#contenido').load("estudianteActualizacion.html");

}
