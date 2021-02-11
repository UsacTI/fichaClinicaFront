$(document).ready(function () {

//console.log("expedientID radiografia" +idExpediente);
expedienteId = idExpediente;
  showLoader();
mostrarRadiografia();
});



function goToExpediente() {
    $('#contenido').load("expedienteEstudianteNoEditable.html");
}

function goToPlanTratamiento() {
    $('#contenido').load("planTratamientoEstudianteNoEditable.html");
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
              //console.log(data);
            hideLoaderWTimer();
              document.getElementById("img").src= `data:image/jpg;base64,${data.expediente.radiografia}`;
          }
      })

}
