// var dominio = 'http://localhost:8080/';
//var dominio = 'http://10.0.0.127:8080/';
//var dominio = 'http://168.234.75.64:8080/';
var dominio = 'http://odontosystem.usac.edu.gt:8080/';
var dominioUrl = 'http://localhost/fichaClinica/';
//var baseUrl    = Dominio+ ':4000/';
var nombre    = getCookie('api-nombreUsuario');
var apellido    = getCookie('api-apellidoUsuario');
var token    = getCookie('api-token');
var usuario    = getCookie('api-usuario');
var tipoUsuario = getCookie('api-tipoUsuario');
var idUsuario = getCookie('api-idUsuario');
//var profesorId = getCookie('api-idUsuario');

/////id para Visualizacion de personal

//var idPersonal = getCookie('api-idPersonal');
var idPersonal = 0;
var expedienteId = 0;
var fechaNuevaCita = "";

/////////////////para la info del paciente en expediente
var nombrePaciente = "";
var apellidoPaciente = "";
var dpiPaciente = "";
var fotoPaciente = "";
var idPa = 0;

///////////para genera la boleta en primera cita
var carnetBoleta = 0;
var id_orden_pago = 0;
var checksum = 0;

function get(url, param) {
    var url_string = url;
    var url = new URL(url_string);
    var param = url.searchParams.get(param);
    return param;
}
