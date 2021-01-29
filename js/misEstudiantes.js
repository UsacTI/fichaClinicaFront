$(document).ready(function () {
  $('#table1').DataTable()
})

function loading (idprofesor = 10) {
  $.ajax({
    type: 'GET',
    url: dominio + 'misestudiantes/' + idprofesor,
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      console.log(data)
      for (const value of data.estudiante) {
        // console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.carne + '</td>'

        fila += '<td>' + '<a href="./estudianteVisualizacion.html?usr=' + value.idusuario + '" target="_blank"> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;'
                          + '</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
    }
  })
}
