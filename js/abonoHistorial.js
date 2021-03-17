  var personalId = 0;
$(document).ready(function() {

    //personalId = urlParams.get('id');
    personalId = idPersonal;
    //idExpediente = expedienteId;

    loadAbonos();
    getEstadoCuent();

    $('#table1').DataTable({

           language: {
               search: "Buscar:",
             "info": "Mostrando del _START_ a _END_ de _TOTAL_ registros",
             "lengthMenu":     "Mostrar _MENU_ registros",
             "zeroRecords":    "No se encontro ningun registro",
             "infoEmpty":      "0 registros",
           "infoFiltered":   "(filtrados de _MAX_ registros)",
               paginate: {
                   first:      "Primero",
                   previous:   "Anterior",
                   next:       "Siguiente",
                   last:       "Ultimo"
               }
             }
         });
    //getImagen();
    hideLoader();
} );

function loadAbonos() {
    $.ajax({
        type: 'GET',
        url: dominio + `boleta/consultaAbono/${personalId}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        success: function (data) {
            //console.log(data);
            if (data.pago.length > 0) {
                data.pago.forEach(pago => {
                    let fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td>${pago.idboleta}</td>
                        <td>${pago.descripcion}</td>
                        <td>${getFecha(pago.fecha)}</td>
                        <td>${(pago.tipo == 1)?'+Q'+pago.monto:'-Q'+pago.monto}</td>
                    `;
                    document.getElementById('tabla-historial').appendChild(fila);
                });
            }

        }
    })
}

function getEstadoCuent() {
    $.ajax({
        type: 'GET',
        url: dominio + `boleta/consultaCreditoTotal/${personalId}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        success: function (data) {
            console.log(data);
            document.getElementById('estado-cuenta').innerHTML = `<strong>Estado de cuenta: </strong>Q${data.pago.credito}`;
        }
    })
}

function cargarImagen() {
    $.ajax({
        type: 'PUT',
        url: dominio + `insertarRadiografia/4`,
        contentType: 'application/json',
        dataType: 'HTML',
        crossDomain: true,
        async: false,
        data: new FormData(document.getElementById('imagen')),
        success: function (data) {
            console.log(data);

        }
    })
}

$("#imagen").change(function() {
    console.log(this.files[0]);
    var file = this.files[0];
    var imagefile = file.type;
    var match= ["image/jpeg","image/png","image/jpg"];
    if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
        alert('Please select a valid image file (JPEG/JPG/PNG).');
        $("#imagen").val('');
        return false;
    }
    let formdata = new FormData();
    formdata.append("images", file);
    $.ajax({
        type: 'PUT',
        url: dominio + `insertarRadiografia/4`,
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
    })

});

function getImagen(){
    let img = document.getElementById('in-image');
    $.ajax({
        type: 'GET',
        url: dominio + `consultarRadiografia/4`,
        contentType: false,
        processData: false,
        cache: false,
        //dataType: false,
        //crossDomain: true,
        //async: false,
        success: function (data) {
            console.log(data);
            img.setAttribute('src', `data:image/jpg;base64,${data.expediente.radiografia}`)
            img.style.width = '500px'
        }
    })
}

function goToFijarAbono(){
  //  location.href = `./fijar-abono.html?id=${personalId}`
      $('#contenido').load("fijar-abono.html");
}

$('#regresar').on('click', function () {
    //location.href = "./pacienteEstudiante.html";
    showLoader();
    $('#contenido').load("./abono.html");
  })