var dominio = 'http://10.0.0.127:8080/' // 'http://localhost:8080'  'http://10.0.0.127:8080/'
// var baseUrl    = Dominio+ ':4000/';
var nombre = getCookie('api-nombreUsuario')
var apellido = getCookie('api-apellidoUsuario')

function get (url, param) {
  var url_string = url
  var url = new URL(url_string)
  var param = url.searchParams.get(param)
  return param
}
