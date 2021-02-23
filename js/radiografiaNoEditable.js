$(document).ready(function () {

//console.log("expedientID radiografia" +idExpediente);
document.getElementById("datosPaciente").innerHTML = `<div class="col-xs-12 col-md-6">
                <div class="row">

                    <div class="col-xs-4">
                        <p style="font-size: 1.2em"><img width="100px" height="125px" src="https://www.ashoka.org/sites/default/files/styles/medium_1600x1000/public/thumbnails/images/daniela-kreimer.jpg" alt=""></p>
                    </div>
                    <div class="col-xs-4" style="text-align: left; padding-left: 10px;">
                    <p style="font-size: 1em"><strong>Nombres: ${nombrePaciente} </strong></p>
                    <p style="font-size: 1em"><strong>Apellidos: ${apellidoPaciente}</strong></p>
                    <p style="font-size: 1em"><strong>DPI: ${dpiPaciente} </strong></p>
                    </div>
                </div>`;
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
