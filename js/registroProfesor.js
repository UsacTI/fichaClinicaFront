$(document).ready(function () {

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

  if(nombres === "" || apellidos === "" || fechanacimiento === "" || dpi === "" || password === "" || password2 === "" || telefono === "" || regestudiante === "" || area === "" || subarea === ""){
    alertify.set('notifier','position', 'top-right');
    alertify.error("Existen campos vacios, revise por favor");
  } else {
  if (password != password2) {
    alertify.set('notifier','position', 'top-right');
    alertify.warning('La contraseña no coincide')
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
        // console.log(data)
        alertify.set('notifier','position', 'top-right');
        alertify.success("Los datos fueron guardados");
        $('#contenido').load("./profesorRegistro.html");
      }
    })
  }
}
}

function isIntegerKey (evt) {
  // console.log(evt)
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode > 31 &&
    (charCode < 48 || charCode > 57)) { return false }
  return true
};

$('#registro').on('click', function () {
  registroProfesor()
})
