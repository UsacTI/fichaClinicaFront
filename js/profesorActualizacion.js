$(document).ready(function () {

  loading();
  //console.log(idPersonal);
})

var usuarios = ''
function loading () {
  const urlParams = new URLSearchParams(window.location.search)
  const profesor = idPersonal
  // alert(usuario)

  data = JSON.stringify({
    id: profesor
  })

  $.ajax({
    type: 'POST',
    url: dominio + 'users/search/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    data: data,
    success: function (data) {
      // console.log(data.paciente)
      document.getElementById('nombre').value = data.paciente.nombres
      document.getElementById('apellido').value = data.paciente.apellidos
      document.getElementById('dpi').value = data.paciente.cui
      document.getElementById('telefono').value = data.paciente.telefono
      document.getElementById('fechanacimiento').value = data.paciente.nacimiento
      if (data.paciente.genero === 1) {
        document.getElementById('genero2').checked = true
      } else {
        document.getElementById('genero').checked = true
      }
      document.getElementById('area').value = data.paciente.area
      document.getElementById('subarea').value = data.paciente.subarea
      document.getElementById('regestudiante').value = data.paciente.carne
      usuarios = data.paciente.idusuario
    }
  })
}

function actualizarRegistro () {
  nombres = $('#nombre').val()
  apellidos = $('#apellido').val()
  genero = $("input[name='gender']:checked").val()
  fechanacimiento = $('#fechanacimiento').val()
  dpi = $('#dpi').val()
  telefono = $('#telefono').val()
  carne = $('#regestudiante').val()
  area = $('#area').val()
  subarea = $('#subarea').val()

  data = JSON.stringify({
    nombres: nombres,
    apellidos: apellidos,
    genero: genero,
    nacimiento: fechanacimiento,
    cui: dpi,
    telefono: telefono,
    carne: carne,
    area: area,
    subarea: subarea,
    id: usuarios
  })
  $.ajax({
    type: 'POST',
    url: dominio + 'users/update/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    data: data,
    success: function (data) {
      // console.log(data)
      alertify.set('notifier','position', 'top-right');
      alertify.success("Los datos fueron actualizados");
      $('#contenido').load("./bancoProfesor.html");
    }

  })
}

$('#actualizar').on('click', function () {
  actualizarRegistro()
})
