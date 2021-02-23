$(document).ready(function () {
  // document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: white;">'+nombre+ ' '+rol+'</a>';

  $('#paciente').DataTable()
  hideLoader();
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

  if($('#correo').val() == ""){
    correo ="";
  }
  else{
    correo = $('#correo').val()
  }

  if(nombres === "" || apellidos === "" || fechanacimiento === "" || dpi === "" || password === "" || password2 === "" || telefono === "" ||
      direccion === "" || consulta === ""){
    alertify.set('notifier','position', 'top-right');
    alertify.error("Existen campos vacios, revise por favor");
  } else {
  if (password !== password2) {
    alertify.set('notifier','position', 'top-right');
    alertify.warning('La contraseña no coincide')
  } else {
    data = '{"nombres": "' + nombres + '", "apellidos": "' + apellidos + '", "genero": "' + genero + '", "nacimiento": "' +
      fechanacimiento + '", "dpi": "' + dpi + '", "contrasenia": "' + password + '", "direccion": "' + direccion + '", "telefono":' +
      telefono + ', "consulta": "' + consulta + '" , "correo": "' + correo + '"}'
    $.ajax({
      type: 'POST',
      url: dominio + 'patients/createOfiInfo',
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      async: false,
      data: data,
      success: function (data) {
        //console.log(data.paciente.idpaciente);
        guardarFotoPaciente(data.paciente.idpaciente);
        alertify.set('notifier','position', 'top-right');
        alertify.success("Los datos fueron guardados");
        $('#contenido').load("./registroPaciente.html");
      }
    })
  }
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

   if($('#correo').val() == ""){
     correo ="";
   }
   else{
     correo = $('#correo').val()
   }

  if(nombres === "" || apellidos === "" || fechanacimiento === "" || dpi === "" || password === "" || password2 === "" || telefono === "" ||
      direccion === "" || nohijos === "" || escolaridad === "" || nivel === "" || trauoficio === "" || nacionalidad === "" || transporte === "" ||
      doctor === "" || consulta === ""){
    alertify.set('notifier','position', 'top-right');
    alertify.error("Existen campos vacios, revise por favor");
  } else {
  if (password !== password2) {
    alertify.set('notifier','position', 'top-right');
    alertify.warning('La contraseña no coincide')
  } else {
    data = '{"nombres": "' + nombres + '", "apellidos": "' + apellidos + '", "genero": "' + genero + '", "nacimiento": "' + fechanacimiento +
     '", "dpi": "' + dpi + '", "contrasenia": "' + password + '", "direccion": "' + direccion + '", "telefono":' + telefono +
      ', "nohijos": ' + nohijos + ', "escolaridad": "' + escolaridad + '", "nivel": ' + nivel + ', "profesion": "' + trauoficio +
       '", "nacionalidad": "' + nacionalidad + '", "transporte": "' + transporte + '", "consulta": "' + consulta + '", "doctor": "' + doctor +
       '", "tipopaciente": ' + tipopaciente + ' , "correo": "' + correo + '"}'

    $.ajax({
      type: 'POST',
      url: dominio + 'patients/createTrabSocial',
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      async: false,
      data: data,
      success: function (data) {
        // console.log(data)
        guardarFotoPaciente(data.paciente.idpaciente);
        alertify.set('notifier','position', 'top-right');
        alertify.success("Los datos fueron guardados");
        $('#contenido').load("./registroPacienteOficinaTrabaSocial.html");
      }
    })
  }
}
}

function guardarFotoPaciente(idP){

  var file = document.getElementById("file").files[0];
      var imagefile = file.type;
      var match= ["image/jpeg","image/png","image/jpg"];
      if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
          alert('Please select a valid image file (JPEG/JPG/PNG).');
          $("#file").val('');
          return false;
      }
      let formdata = new FormData();
      formdata.append("images", file);

      $.ajax({
              type: 'PUT',
              url: dominio + `patients/insertarfotografia/${idP}`,
              contentType: false,
              processData: false,
              cache: false,
              //dataType: false,
              //crossDomain: true,
              //async: false,
              data: formdata,
              success: function (data) {
                  console.log(data);

              }
          });
}

function isIntegerKey (evt) {
  // console.log(evt)
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode > 31 &&
    (charCode < 48 || charCode > 57)) { return false }
  return true
};

$('#registro').on('click', function () {
  registroPaciente()
})

$('#registro2').on('click', function () {
  registroPacienteTrabSocial()
})
