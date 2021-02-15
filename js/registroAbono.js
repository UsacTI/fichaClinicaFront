var personalId = 0;
$(document).ready(function () {
    document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: yellow;"><strong>'+nombre+ ', '+apellido+'.</strong></a>';
    const urlParams = new URLSearchParams(window.location.search)
    personalId = urlParams.get('id');
    getPaciente(personalId);
});



function registroAbono() {
    let monto = $("#monto").val();
    let nombre = $("#nombre").val()+' '+$("#apellido").val();
    
    let dataBoleta = {
      carnet: personalId,
      unidad: '0',
      extension: '0',
      carrera: '0',
      nombre: nombre,
      monto: monto,
      anio_temporada: '2021',
      id_rubro: '8',
      id_variante_rubro: '1',
      subotal: monto,
      idpaciente: personalId,
      descripcion: 'Abono al estado de cuenta'
    }
    //console.log(dataBoleta);

    $.ajax({
      type: 'POST',
      url: dominio + `boleta/crearAbono`,
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      async: false,
      data: JSON.stringify(dataBoleta),
      success: function (data) {
        let boleta = JSON.parse(data.pago);
        //console.log(boleta);

        $.ajax({
          type: 'PUT',
          url: dominio + `paciente/estadoactualizacion/${personalId}`,
          contentType: 'application/json',
          dataType: 'json',
          crossDomain: true,
          async: false,
          data: JSON.stringify({estado: 3}),
          success: function (data) {

            location.href = `./boleta-pago.html?carnet=${dataBoleta.carnet}&boleta=${boleta.id_orden_pago}&llave=${boleta.checksum}`;
          }
        })
      }
    })
  }

function getPaciente(id) {
    $.ajax({
        type: 'POST',
        url: dominio + `patients/search`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: JSON.stringify({id: id}),
        success: function (data) {
            //console.log(data);
            document.getElementById('nombre').value = data.paciente.nombres;
            document.getElementById('apellido').value = data.paciente.apellidos;
            document.getElementById('dpi').value = data.paciente.dpi;
            
        }
    })
}

$("#registro-abono").on('click', function () {
    
    registroAbono();
});
