
$(document).ready(function () {
nombreA = "";
cuerpo = []
});

window.addEventListener('load', inicio, false);

function inicio() {
    document.getElementById('archivo').addEventListener('change', cargar, false);
}

function cargar(ev) {

    var arch=new FileReader();
    arch.addEventListener('load',leer,false);
    arch.readAsText(ev.target.files[0]);
        nombreA = ev.target.files[0].name;
}

function leer(ev) {
    //document.getElementById('editor').value=ev.target.result;
    //console.log(ev.target.result);

    convertor(ev.target.result);
}

function convertor(csv) {
  contactList = [];
const lines = csv.split('\n');

lines.map((el, i) => {
const obj = {};
if (i > 0) {
obj[lines[0].split(',')[0]] = el.split(',')[0];
obj[lines[0].split(',')[1].split('\r')[0]] = el.split(',')[1].split('\r')[0];
obj[lines[0].split(',')[2].split('\r')[0]] = el.split(',')[2].split('\r')[0];
obj[lines[0].split(',')[3].split('\r')[0]] = el.split(',')[3].split('\r')[0];
obj[lines[0].split(',')[4].split('\r')[0]] = el.split(',')[4].split('\r')[0];
contactList.push(obj);
}
});

//console.log(contactList);
//document.getElementById('json').value=JSON.stringify(contactList);
}


function enviardata() {
padre = $('input[name="padres"]:checked').val();
criterio = $('input[name="criteriFinalizacion"]:checked').val();
nombreArchivo = nombreA;

  data     = ' {"padre": "' + padre + '", "criterio": "' + criterio + '", "nombreArchivo": "' + nombreArchivo + '"}';

  $.ajax({
          type: 'POST',
          url:  "http://localhost:5000/data",
          contentType: "application/json",
          dataType: 'json',
          crossDomain: true,
          async: false,
          data: data,
          success: function (data) {

                //console.log(data);

          }
      });
}

function enviarCuerpo() {
padre = $('input[name="padres"]:checked').val();
data     = JSON.stringify(contactList);


  $.ajax({
          type: 'POST',
          url:  "http://localhost:5000/cuerpo",
          contentType: "application/json",
          dataType: 'json',
          crossDomain: true,
          async: false,
          data: data,
          beforeSend: function(){
 // Show image container
          $("#loadingmessage").show();
          },
          success: function (data) {
              //  console.log(data);
                cuerpo = data;
          },
          complete:function(data){
 // Hide image container
              $("#loadingmessage").hide();
              }
      });
}


function evaluarNotas(){


  p1 = $("#proyecto1").val();
  p2 = $("#proyecto2").val();
  p3 = $("#proyecto3").val();
  p4 = $("#proyecto4").val();
    if(p1 ==="" || p2 ==="" || p3 ==="" || p4 ==="" ){
      alertify.error("debe llenar todos los campos de las notas!");
    }
    else {
      f1  = cuerpo.success[0];
      f2  = cuerpo.success[1];
      f3  = cuerpo.success[2];
      f4  = cuerpo.success[3];
      nf = (p1*f1) + (p2*f2) + (p3*f3) + (p4*f4);
      alertify.success("la nota final es: " + nf);
    }

}

$("#generar").on('click', function () {
  if( !$('input[name="criteriFinalizacion"]:radio').is(':checked')){
    alertify.warning("debe seleccionar un criterio de finalización");
  }
  else if (!$('input[name="padres"]:radio').is(':checked')) {
      alertify.warning("debe seleccionar un Modo de Padres");
  }
  else{

    enviardata();
    enviarCuerpo();
  }

});

$("#notaFinal").on('click', function () {
evaluarNotas();
});
