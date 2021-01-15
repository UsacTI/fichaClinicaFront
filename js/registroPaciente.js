$(document).ready(function () {
  // document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: white;">'+nombre+ ' '+rol+'</a>';
  $('#paciente').DataTable()
})

function registroPaciente () {
  nombres = $('#nombre').val()
  apellidos = $('#apellido').val()
  genero = $("input[name='gender']:checked").val()
  fechanacimiento = $('#fechanacimiento').val()
  dpi = $('#dpi').val()
  password = $('#contrasenia').val()
  password2 = $('#contrasenia2').val()
  direccion = $('#direccion').val()
  telefono = $('#telefono').val()
  consulta = $('#consulta').val()

  if (password != password2) {
    alertify.alert('La contraseña no coincide')
  } else {
    data = '{"nombres": "' + nombres + '", "apellidos": "' + apellidos + '", "genero": "' + genero + '", "nacimiento": "' +
      fechanacimiento + '", "dpi": "' + dpi + '", "contrasenia": "' + password + '", "direccion": "' + direccion + '", "telefono":' +
      telefono + ', "consulta": "' + consulta + '"}'
    $.ajax({
      type: 'POST',
      url: dominio + 'patients/createOfiInfo',
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
}

function registroPacienteTrabSocial () {
  nombres = $('#nombre').val()
  apellidos = $('#apellido').val()
  genero = $("input[name='gender']:checked").val()
  fechanacimiento = $('#fechanacimiento').val()
  dpi = $('#dpi').val()
  password = $('#contrasenia').val()
  password2 = $('#contrasenia2').val()
  direccion = $('#direccion').val()
  telefono = $('#telefono').val()
  nohijos = $('#Nohijos').val()
  escolaridad = $('#escolaridad').val()
  nivel = $('#nivel').val()
  trauoficio = $('#trauoficio').val()
  nacionalidad = $('#nacionalidad').val()
  transporte = $('#transporte').val()
  tipopaciente = $('#tipopaciente').val()
  doctor = $('#doctor').val()
  consulta = $('#consulta').val()

  if (password !== password2) {
    alertify.warning('La contraseña no coincide')
  } else {
    data = '{"nombres": "' + nombres + '", "apellidos": "' + apellidos + '", "genero": "' + genero + '", "nacimiento": "' + fechanacimiento +
     '", "dpi": "' + dpi + '", "contrasenia": "' + password + '", "direccion": "' + direccion + '", "telefono":' + telefono +
      ', "nohijos": ' + nohijos + ', "escolaridad": "' + escolaridad + '", "nivel": ' + nivel + ', "profesion": "' + trauoficio +
       '", "nacionalidad": "' + nacionalidad + '", "transporte": "' + transporte + '", "consulta": "' + consulta + '", "doctor": "' + doctor +
       '", "tipopaciente": ' + tipopaciente + '}'

    $.ajax({
      type: 'POST',
      url: dominio + 'patients/createTrabSocial',
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
}

$('#registro').on('click', function () {
  registroPaciente()
})

$('#registro2').on('click', function () {
  registroPacienteTrabSocial()
})
