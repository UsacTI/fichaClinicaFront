$(document).ready(function () {
tipoCuenta = 0;
$(".divDoctor").hide();
$(".divPaciente").hide();
});


function login(cuenta) {

  if(cuenta==2){
    username = $("#correoPaciente").val();
    password = $("#passwordPaciente").val();

  data     = '{"usuario": "' + username + '", "contrasenia": "' + password + '"}';
    $.ajax({
        type: 'POST',
        url:  dominio + "api/customers/login",
        contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: data,
        success: function (data) {
          console.log(data);
          var acceso = data.paciente;
        //console.log(acceso);
        if(acceso===null){
          alertify.error("Usuario o Contraseña Incorrecto!");
        }else{
            var nombres = data.paciente.nombres;
            var apellidos = data.paciente.apellidos;
            setCookie('api-nombreUsuario', nombres, 1);
            setCookie('api-apellidoUsuario', apellidos, 1);
            window.location.href = "principal.html";

        }
        }
    });
}
}

$("#doctor").on('click', function () {
        this.style.background="#2DEE3E";
        $("#paciente").attr('style',  'background-color:#F1F0F0');
        tipoCuenta = 1;
        $(".divDoctor").show();
        $(".divPaciente").hide();
});

$("#paciente").on('click', function () {
        this.style.background="#2DEE3E";
        $("#doctor").attr('style',  'background-color:#F1F0F0');
        tipoCuenta = 2;
        $(".divPaciente").show();
        $(".divDoctor").hide();
});

$("#logDoctor").on('click', function () {
        login(tipoCuenta);
});

$("#logPaciente").on('click', function () {
        //login(tipoCuenta);
        login(tipoCuenta);
});

$('body').keyup(function (e) {
    if (e.keyCode == 13) {
          login(tipoCuenta);
    }
});
