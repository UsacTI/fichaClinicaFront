
$(document).ready(function () {
  estudiantes();
  
})

function estudiantes () {
  $.ajax({
    type: 'GET',
    url: dominio + 'users/state3/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      // console.log(data)
      for (const value of data.usuarios) {
        document.getElementById('estu').innerHTML += "<option value='" + value.idusuario + "'>" + value.nombres + '  ' + value.apellidos + '</option>'
      }
      profesores();
    }
  })
}

function profesores () {
  $.ajax({
    type: 'GET',
    url: dominio + 'users/state2/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      // console.log(data)
      for (const value of data.usuarios) {
        document.getElementById('prof').innerHTML += "<option value='" + value.idusuario + "'>" + value.nombres + '  ' + value.apellidos + '</option>'
      }
      hideLoader();
    }
  })
}

function asignarProfEstudiante () {
  // console.log($('#prof').val())
  // console.log($('#estu').val())
  data = JSON.stringify({
    idprofesor: $('#prof').val(),
    estudiante: $('#estu').val()
  })
  $.ajax({
    type: 'POST',
    url: dominio + 'asignacion/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    data: data,
    success: function (data) {
      alertify.set('notifier','position', 'top-right');
      alertify.success("Se asigno Correctamente");
      $('#contenido').load("./asignacionProfesorEstudiante.html");
    }
  })
}

$('#asignar').on('click', function () {
  asignarProfEstudiante()
})
