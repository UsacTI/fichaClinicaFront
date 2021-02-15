var personalId = 0;
$(document).ready(function() {
    $('#table1').DataTable()
    const urlParams = new URLSearchParams(window.location.search)
    personalId = urlParams.get('id');
    //idExpediente = expedienteId;
    
    loadAbonos();
    getEstadoCuent();
    //getImagen();
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
                document.getElementById('tabla-historial').getElementsByTagName('tr')[0].remove();
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
            //console.log(data);
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
    location.href = `./fijar-abono.html?id=${personalId}`
}