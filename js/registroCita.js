  
  
function registroCita() {
    tratamiento = $("#tratamiento").val();
    fecha = $("#fecha").val();
    idpaciente = $("#idpaciente").val();
    data = '{"tratamiento": "' + tratamiento + '", "fecha": "' + fecha +'", "idpaciente": "'+idpaciente+'"}';
    console.log(data);
    $.ajax({
        type: 'POST',
        url:  dominio + "citas/crear",
        contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: data,
        success: function (data) {
            console.log(data);

        }
    });
}

$("#registro-cita").on('click', function () {
    //login(tipoCuenta);
    registroCita();
});
  