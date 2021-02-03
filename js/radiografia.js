
let tratamientos = [];
let idExpediente = 0;



function goToExpediente() {
    location.href = `./expediente.html?id=${idExpediente}`;
}

function goToPlanTratamiento() {
    location.href = `./planTratamiento.html?id=${idExpediente}`;
}

function mostrar(){
  var archivo = document.getElementById("radio").files[0];
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(archivo );
    reader.onloadend = function () {
      document.getElementById("img").src = reader.result;
    }
  }
}

function mostrar(){
  var archivo = document.getElementById("file").files[0];
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(archivo );
    reader.onloadend = function () {
      document.getElementById("img").src = reader.result;
    }
  }
}
