$(document).ready(function () {

  loading();
})

var usuarios = ''
function loading () {
  const urlParams = new URLSearchParams(window.location.search)
  const usuario = idPersonal
  // alert(usuario)

  data = JSON.stringify({
    id: usuario
  })

  $.ajax({
    type: 'POST',
    url: dominio + 'patients/search/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    data: data,
    success: function (data) {
      // console.log(data.paciente)
      document.getElementById('nombre').value = data.paciente.nombres
      document.getElementById('apellido').value = data.paciente.apellidos
      document.getElementById('dpi').value = data.paciente.dpi
      document.getElementById('direccion').value = data.paciente.direccion
      document.getElementById('telefono').value = data.paciente.telefono
      document.getElementById('nacionalidad').value = data.paciente.nacionalidad
      document.getElementById('doctor').value = data.paciente.doctor
      document.getElementById('consulta').value = data.paciente.consulta
      document.getElementById('trauoficio').value = data.paciente.profesion
      document.getElementById('fechanacimiento').value = data.paciente.nacimiento
      if (data.paciente.genero === 1) {
        document.getElementById('genero2').checked = true
      } else {
        document.getElementById('genero').checked = true
      }
      document.getElementById('Nohijos').value = data.paciente.nohijos
      document.getElementById('escolaridad').value = data.paciente.escolaridad
      document.getElementById('transporte').value = data.paciente.transporte
      document.getElementById('tipopaciente').value = data.paciente.tipopaciente
      document.getElementById('nivel').value = data.paciente.nivel
      usuarios = data.paciente.idpaciente
      hideLoader();
    }
  })
}

function actualizarRegistro () {
  nombres = $('#nombre').val()
  apellidos = $('#apellido').val()
  genero = $("input[name='gender']:checked").val()
  fechanacimiento = $('#fechanacimiento').val()
  dpi = $('#dpi').val()
  direccion = $('#direccion').val()
  telefono = $('#telefono').val()
  nohijos = $('#Nohijos').val()
  escolaridad = $('#escolaridad').val()
  nivel = $('#nivel').val()
  trauoficio = $('#trauoficio').val()
  nacionalidad = $('#nacionalidad').val()
  transporte = $('#transporte').val()
  doctor = $('#doctor').val()
  consulta = $('#consulta').val()
  tipoPaciente = $('#tipopaciente').val();


  data = JSON.stringify({
    nombres: nombres,
    apellidos: apellidos,
    genero: genero,
    nacimiento: fechanacimiento,
    cui: dpi,
    direccion: direccion,
    telefono: telefono,
    nohijos: nohijos,
    escolaridad: escolaridad,
    nivel: nivel,
    trauoficio: trauoficio,
    transporte: transporte,
    nacionalidad: nacionalidad,
    doctor: doctor,
    consulta: consulta,
    tipopaciente: tipoPaciente,
    id: usuarios
  })
  $.ajax({
    type: 'POST',
    url: dominio + 'patients/update/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    data: data,
    success: function (data) {
      // console.log(data)}
      alertify.set('notifier','position', 'top-right');
      alertify.success("Los datos fueron actualizados");
      $('#contenido').load("./bancoPaciente.html");
    }
  })
}

$('#actualizar').on('click', function () {
  actualizarRegistro()
})

$('#regresar').on('click', function () {
  $('#contenido').load("./bancoPaciente.html");
})


function isIntegerKey (evt) {
  // console.log(evt)
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode > 31 &&
    (charCode < 48 || charCode > 57)) { return false }
  return true
};
