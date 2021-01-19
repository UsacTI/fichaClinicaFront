$(document).ready(function () {
  $('#table1').DataTable()
})

function loading () {
  $.ajax({
    type: 'GET',
    url: dominio + 'patients/state1/',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
      // console.log(data)
      for (const value of data.pacientes) {
        // console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.dpi + '</td>'
        fila += '<td>' + '<a href="https://www.w3schools.com" target="_blank"> <img src="icon/user.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="https://www.w3schools.com" target="_blank"><img src="icon/table.png"></img></a>' + '&nbsp;&nbsp;' +
                         '<a href="https://www.w3schools.com" target="_blank"><img src="icon/update.png"></img></a>' + '</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
    }
  })
}
