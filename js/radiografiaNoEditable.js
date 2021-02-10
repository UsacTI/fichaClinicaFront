$(document).ready(function () {

if(tipoUsuario == 2){

  $("#cargarRadio").hide();
}
else if(tipoUsuario == 3){

  $("#cargarRadio").show();
}
//console.log("expedientID radiografia" +idExpediente);
expedienteId = idExpediente;

});



function goToExpediente() {
    $('#contenido').load("expedienteEstudianteNoEditable.html");
}

function goToPlanTratamiento() {
    $('#contenido').load("planTratamientoEstudianteNoEditable.html");
}

function mostrar(){
  var archivo = document.getElementById("file").files[0];
  var reader = new FileReader();

  if (file) {
    reader.readAsDataURL(archivo);
    obtenerBase(reader);
      console.log(reader);
    reader.onloadend = function () {
      document.getElementById("img").src = reader.result;
      //obtenerBase(reader.result);


    }
  }
}

function obtenerBase(base){

  //console.log(base.length);

  //var str = "This is my compression test.";
//  console.log("Size of sample is: " + base.length);
  //var compressed = LZString.compress(base);
  //console.log("Size of compressed sample is: " + compressed.length);
  //str = LZString.decompress(compressed);
  //console.log("Sample is: " + str);

  guardarRadiografia(base);

}

function guardarRadiografia(comprimido) {
  //console.log("com´primiodo es: " + comprimido);

  let expediente = {
      radiografia: comprimido
  }

  let data = JSON.stringify(expediente);

 $.ajax({
      type: 'PUT',
      url: dominio + `insertarRadiografia/4`,
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      async: false,
      data: data,
      success: function (data) {
         console.log(data)
      }
    });
}
