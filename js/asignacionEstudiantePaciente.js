function loading () {
  estudiantes()
  paciente()
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

function paciente () {
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
        document.getElementById('paciente').innerHTML += "<option value='" + value.idpaciente + "'>" + value.nombres + '  ' + value.apellidos + '</option>'
      }
    }
  })
}

function asignarEstudiantePaciente () {
  // console.log($('#prof').val())
  // console.log($('#estu').val())
  data = JSON.stringify({
    idpaciente: $('#paciente').val(),
    idusuario: $('#estu').val()
  })
  $.ajax({
    type: 'POST',
    url: dominio + 'EstudiantePaciente/asignacion/',
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
  asignarEstudiantePaciente()
})
