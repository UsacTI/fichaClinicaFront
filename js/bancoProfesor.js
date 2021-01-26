$(document).ready(function () {
  $('#table1').DataTable()
  loading ();
})

function loading () {
  $.ajax({
    type: 'GET',
    url: dominio + 'users/state2/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      console.log(data)
      for (const value of data.usuarios) {
        // console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.carne + '</td>'
        fila += '<td>' + value.area + '</td>'
        fila += '<td>' + value.subarea + '</td>'

        fila += '<td>' + '<a href="#" onClick= profesorVisualizacion("'+value.idusuario+'")> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="#" onClick= profesorActualizacion("'+value.idusuario+'")><img src="icon/edit.png"></img></a>' + '</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
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
        fila += '<td>' + '<a href="./pacienteVisualizacion.html?usr=' + value.idpaciente + '" target="_blank"> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="https://www.w3schools.com" target="_blank"><img src="icon/table.png"></img></a>' + '&nbsp;&nbsp;' + '</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
    }
  })
}


function profesorVisualizacion(idProfesor) {

//setCookie('api-idPersonal', idestudiante, 1);
idPersonal = idProfesor;
$('#contenido').load("profesorVisualizacion.html");

}

function profesorActualizacion(idProfesor) {

//setCookie('api-idPersonal', idestudiante, 1);
idPersonal = idProfesor;
$('#contenido').load("profesorActualizacion.html");

}
