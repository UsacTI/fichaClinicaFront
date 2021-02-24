$(document).ready(function () {

  showLoader();
  if(tipoUsuario == 2 || tipoUsuario == 3){
    loading2();
  }
  else if(tipoUsuario == 5){
    loadingTS();
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
    url: dominio + 'patients/all/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      //console.log(data)
      for (const value of data.pacientes) {
        //console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.dpi + '</td>'
        fila += '<td style="text-align: center;">' + '<a href="#" onClick= pacienteVisualizacion("'+value.idpaciente+'")> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="#" onClick= pacienteActualizacion("'+value.idpaciente+'")><img src="icon/edit.png"></img></a>' +
                         '<a href="#" onClick= showModalPass("'+value.idpaciente+'")> <i class="fas fa-key" style="font-size: 20px"></i></a>'+'</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
      hideLoader();
    }
  })
}

function loadingTS () {
  $.ajax({
    type: 'GET',
    url: dominio + 'patients/state0/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      //console.log(data)
      for (const value of data.pacientes) {
        //console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.dpi + '</td>'
        fila += '<td style="text-align: center;">' + '<a href="#" onClick= pacienteVisualizacion("'+value.idpaciente+'")> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="#" onClick= pacienteActualizacion("'+value.idpaciente+'")><img src="icon/edit.png"></img></a>' + '</td>'
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
    url: dominio + 'patients/state5/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      //console.log(data)
      for (const value of data.pacientes) {
        //console.log(value)               value.idpaciente
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.dpi + '</td>'
        fila += '<td>' + '<a href="#" onClick= pacienteVisualizacion("'+value.idpaciente+'")> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;' //+
                         //'<a href="https://www.w3schools.com" target="_blank"><img src="icon/table.png"></img></a>' + '&nbsp;&nbsp;' + '</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
      hideLoader();
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


function showModalPass(idpaciente) {
  $('#exampleModal').modal('show');
  document.getElementById('change-pass').setAttribute('onclick',`updatePass(${idpaciente})`)
}

function updatePass(idpaciente) {
  let pass = document.getElementById('pass').value;
  let pass_v = document.getElementById('pass_v').value;
  if (pass != '' && pass != null && pass_v != '' && pass_v != null && pass === pass_v) {
    $.ajax({
      type: 'PUT',
      url: dominio + `patients/updateContrasenia/${idpaciente}/${pass_v}`,
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      async: false,
      success: function (data) {
        console.log(data);
        document.getElementById('pass').value = '';
        document.getElementById('pass_v').value = '';
        alertify.set('notifier','position', 'top-right');
        alertify.success("Contraseña actualizada");
      }
    })  
  } else {
    alertify.set('notifier','position', 'top-right');
    alertify.error("La contraseñas no coinciden");
  }
  
}