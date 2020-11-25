


function login() {
    username = $("#inputEmail").val();
    password = $("#inputPassword").val();

    if(username==="oliver@mail.com" && password==="12345678"){
        window.location.href = "principal.html";
        var  nombre = "Oliver Rodas";
        var rol = "Prueba";

        setCookie('api-nombre', nombre, 1);
        setCookie('api-rol', rol, 1);
    }
    else{
      alert("datos incorrectos");
    }
/*    data     = ' {"username": "' + username + '", "password": "' + password + '"}';

    $.ajax({
        type: 'POST',
        url:  baseUrl + "auth_user",
        contentType: "application/json",
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: data,
        success: function (data) {


         var acceso = data.acceso;
         var error = data.error;

            if (acceso === "autorizado") {

              var  token = data.auth_token;
              var rol = data.role_id
              var nombreRol = data.nombrerole;
              var correo = data.email;
              var username = data.username;
              var idUsuario = data.id;
              var nombreUsuario = data.nombres_empleado;
              var codigoUsuario = data.cod_emp;
              var fotoUsuario = data.foto;
              var ccoDesc = data.cco_des;
              var ccoNomen =data.cco_nomen;
              var cambio = data.cambio;
              var jefeId = data.jefe_id;
              var jefe = data.es_jefe;
              var flag_user = data.flag_user;
              var empleadoId = data.empleado_id;
              var empresaId = data.empresa_id;
              var db_sap_b1 = data.db_sap_b1;

              setCookie('api-token', token, 1);
              setCookie('api-rol', rol, 1);
              setCookie('api-nombrerole', nombreRol, 1);
              setCookie('api-correo', correo, 1);
              setCookie('api-idUsuario', idUsuario, 1);
              setCookie('api-nombreUsuario', nombreUsuario, 1);
              setCookie('api-codEmpleado', codigoUsuario, 1);
              setCookie('api-fotoEmpleado', fotoUsuario, 1);
              setCookie('api-ccoDes', ccoDesc, 1);
              setCookie('api-ccoNomen', ccoNomen, 1);
              setCookie('api-password', password, 1);
              setCookie('api-jefeId', jefeId,1);
              setCookie('api-jefe', jefe,1);
              setCookie('api-username', username,1);
              setCookie('api-empleadoId', empleadoId,1);
              setCookie('api-empresa', empresaId,1);
              setCookie('api-db_sap_b1', db_sap_b1,1);
                console.log("empresa: "+empresaId);

              if (flag_user == 1){
                window.location.href = "cambiarc.html";
              }
              else{
             //   alert("token"+token);
                 window.location.href = "contenido.html";
             //   window.location.href = "dash.html";
           }
         }
         else if (error === "Usuario no tiene asignado codigo de empledo en el sistema."){

            alert("Usuario no tiene asignado codigo de empledo en el sistema.");

         }
         else if (error === "Usuario no tiene asignada una empresa."){

            alert("Usuario no tiene asignada una empresa.");

         }
         else if (error === "No tiene un role asignado."){

            alert("No tiene un role asignado.");

         }
          else  {

                alert("Credenciales incorrectas");

            }

        }
    });
*/
}

$("#log").on('click', function () {
        login();
});


$('body').keyup(function (e) {
    if (e.keyCode == 13) {
          login();
    }
});
