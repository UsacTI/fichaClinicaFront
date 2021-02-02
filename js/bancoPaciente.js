$(document).ready(function () {
  $('#table1').DataTable()

  if(tipoUsuario == 2 || tipoUsuario == 3){
    loading2();
  }
  else{
   loading();
 }
})

function loading () {
  $.ajax({
    type: 'GET',
    url: dominio + 'patients/state1/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
       console.log(data)
      for (const value of data.pacientes) {
        // console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.dpi + '</td>'
        fila += '<td style="text-align: center;">' + '<a href="#" onClick= pacienteVisualizacion("'+value.idpaciente+'")> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="google.com' + value.idpaciente + '" target="_blank"><img src="icon/table.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="#" onClick= pacienteActualizacion("'+value.idpaciente+'")><img src="icon/edit.png"></img></a>' + '</td>'
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
        fila += '<td>' + value.apellidos + '</td>'
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

function pacienteVisualizacion(idPaciente) {

//setCookie('api-idPersonal', idestudiante, 1);
idPersonal = idPaciente;
$('#contenido').load("pacienteVisualizacion.html");

}


function pacienteActualizacion(idPaciente) {

//setCookie('api-idPersonal', idestudiante, 1);
idPersonal = idPaciente;
$('#contenido').load("pacienteActualizacion.html");

}
