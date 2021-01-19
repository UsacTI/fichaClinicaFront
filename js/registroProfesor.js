$(document).ready(function () {
  document.getElementById('nombreUsuario').innerHTML = '<a class="nav-link" style="color: white;">' + nombre + ' ' + rol + '</a>'
  $('#paciente').DataTable()
})

function registroProfesor () {
  nombres = $('#nombre').val()
  apellidos = $('#apellido').val()
  genero = $("input[name='gender']:checked").val()
  fechanacimiento = $('#fechanacimiento').val()
  dpi = $('#dpi').val()
  password = $('#contrasenia').val()
  password2 = $('#contrasenia2').val()
  telefono = $('#telefono').val()
  regestudiante = $('#regestudiante').val()
  area = $('#area').val()
  subarea = $('#subarea').val()

  if (password != password2) {
    alertify.alert('La contraseña no coincide')
  } else {
    data = JSON.stringify({
      nombres: nombres,
      apellidos: apellidos,
      genero: genero,
      contrasenia: password,
      cui: dpi,
      telefono: telefono,
      carnet: regestudiante,
      nacimiento: fechanacimiento,
      area: area,
      subarea: subarea
    })
    $.ajax({
      type: 'POST',
      url: dominio + 'users/createProfessor/',
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
  registroProfesor()
})
