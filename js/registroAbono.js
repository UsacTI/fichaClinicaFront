var personalId = 0;
$(document).ready(function () {
    document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: yellow;"><strong>'+nombre+ ', '+apellido+'.</strong></a>';
    const urlParams = new URLSearchParams(window.location.search)
    //personalId = urlParams.get('id');
    personalId = idPersonal
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
        carnetBoleta = dataBoleta.carnet;
        id_orden_pago = boleta.id_orden_pago;
        checksum = boleta.checksum;

        $('#contenido').load("./boletaCita.html");
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
            hideLoader();
        }
    })
}

$("#registro-abono").on('click', function () {

    registroAbono();
});
