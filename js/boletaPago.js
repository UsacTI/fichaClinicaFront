$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    let carnet = urlParams.get('carnet');
    let idboleta = urlParams.get('boleta');
    let llave = urlParams.get('llave');
    getBoleta(carnet, idboleta, llave)
} )
  

function getBoleta(carnet, idboleta, llave) {
    
    $.ajax({
        type: 'GET',
        url: dominio + `boleta/consulta/${carnet}/${idboleta}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        //data: JSON.stringify({estado: 3}),
        success: function (data) {
            let boleta = JSON.parse(data);
          console.log(JSON.parse(data));
          document.getElementById('no').textContent = idboleta;
          document.getElementById('carnet').textContent = carnet;
          document.getElementById('nombre').textContent = boleta.nombre;
          document.getElementById('unidad').textContent = boleta.UNIDAD;
          document.getElementById('extension').textContent = boleta.EXTENSION;
          document.getElementById('carrera').textContent = boleta.CARRERA;
          document.getElementById('detalle-monto').textContent = boleta.monto+'.00';
          document.getElementById('total').textContent = boleta.monto+'.00';

          document.getElementById('orden').textContent = idboleta;
          document.getElementById('carnet-banco').textContent = carnet;
          document.getElementById('total-banco').textContent = boleta.monto;
          document.getElementById('unidad-banco').textContent = boleta.UNIDAD;
          document.getElementById('fecha-banco').textContent = boleta.fecha;
          document.getElementById('extension-banco').textContent = boleta.EXTENSION;
          document.getElementById('carrera-banco').textContent = boleta.CARRERA;
          document.getElementById('llave').textContent = llave;
          document.getElementById('fecha-emision').textContent = 'Fecha de emisión: '+String(boleta.fecha).substring(6,8)+'/'+String(boleta.fecha).substring(4,6)+'/'+String(boleta.fecha).substring(0,4);
          let fecha = new Date();
          let dia = '';
          let mes = '';
            if (fecha.getUTCDate() < 10) {
                dia = '0'+fecha.getUTCDate();
            } else {
                dia = fecha.getUTCDate();
            }
            if (fecha.getUTCMonth() < 10) {
                mes = '0'+fecha.getUTCMonth();
            } else {
                mes = fecha.getUTCMonth();
            }

            let limite = Number(String(boleta.fecha).substring(6,8))+1;
            let vigencia = '';
            if (limite < 10) {
                vigencia = '0'+limite;
            }else{
                vigencia = limite;
            }
          document.getElementById('fecha-impresion').textContent = 'Fecha de ímpresión: '+dia+'/'+mes+'/'+fecha.getUTCFullYear();
          document.getElementById('limite').textContent = `** El documento es válido para su pago únicamente hasta el día `+vigencia+'/'+String(boleta.fecha).substring(4,6)+'/'+String(boleta.fecha).substring(0,4)+`.**`
        }
      })
}