$(document).ready(function () {
  document.getElementById("nombreUsuario").innerHTML = '<a class="nav-link" style="color: yellow;"><strong>'+nombre+ ', '+apellido+'.</strong></a>';
});

function registroAbono() {
    monto = $("#monto").val();
    idpaciente = $("#idpaciente").val();
    data = '{"monto": "' + monto + '", "idpaciente": "'+idpaciente+'"}';
    console.log(data);
    $.ajax({
        type: 'POST',
        url:  dominio + "abonos/crear",
        contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: data,
        success: function (data) {
            console.log(data);
            location.href = './boleta-pago.html'
        }
    });
}

$("#registro-abono").on('click', function () {
    
    registroAbono();
});
