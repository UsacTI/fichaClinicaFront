$(document).ready(function () {

if(tipoUsuario == 2){

  $("#cargarRadio").hide();
}
else if(tipoUsuario == 3){

  $("#cargarRadio").show();
}
//console.log("expedientID radiografia" +idExpediente);
expedienteId = idExpediente;
mostrarRadiografia();
hideLoader();
});



function goToExpediente() {
    $('#contenido').load("expediente.html");
}

function goToPlanTratamiento() {
    $('#contenido').load("planTratamiento.html");
}



function mostrar(){
  var archivo = document.getElementById("file").files[0];
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(archivo );
    reader.onloadend = function () {
      document.getElementById("img").src = reader.result;
      guardarRadiografia();
    }
  }
}



function guardarRadiografia() {

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
              url: dominio + `insertarRadiografia/${idExpediente}`,
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

function mostrarRadiografia() {

  let img = document.getElementById('in-image');
  $.ajax({
      type: 'GET',
      url: dominio + `consultarRadiografia/${idExpediente}`,
      contentType: false,
      processData: false,
      cache: false,
      //dataType: false,
      //crossDomain: true,
      //async: false,
      success: function (data) {
          
          if (data.expediente.radiografia != null) {
            document.getElementById("img").src= `data:image/jpg;base64,${data.expediente.radiografia}`;
            hideLoaderWTimer();
          }
          
      }
  })

}
