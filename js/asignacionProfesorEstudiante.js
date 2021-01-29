function loading () {
  estudiantes()
  profesores()
}

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
      console.log(data)
    }
  })
}

$('#asignar').on('click', function () {
  asignarProfEstudiante()
})
