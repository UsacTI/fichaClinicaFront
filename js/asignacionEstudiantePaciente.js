$(document).ready(function () {
  estudiantes();
  paciente();

});


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
    type: 'POST',
    url: dominio + 'patients/search/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    data: JSON.stringify({id: idPersonal}),
    success: function (data) {
      //console.log(data)
      document.getElementById('nombre').textContent = 'Nombre: '+data.paciente.nombres+' '+data.paciente.apellidos;
      document.getElementById('dpi').textContent =   'DPI: '+data.paciente.dpi;
      document.getElementById('direccion').textContent = 'Dirección: '+data.paciente.direccion;
      document.getElementById('consulta').textContent = 'Motivo de cosulta: '+data.paciente.consulta;
    }
  })
}

function asignarEstudiantePaciente () {
  // console.log($('#prof').val())
  // console.log($('#estu').val())
  data = JSON.stringify({
    idpaciente: idPersonal,
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
      //console.log(data)
      alertify.set('notifier','position', 'top-right');
      alertify.success("Se asigno Correctamente");
      $('#contenido').load("./registroPaciente.html");
    }
  })
}

$('#asignar').on('click', function () {
  asignarEstudiantePaciente();
});
