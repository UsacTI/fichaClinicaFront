$(document).ready(function() {
  $('#table3').DataTable();
  loading();
} );


function loading () {
  document.getElementById('tablita').getElementsByTagName('tr')[0].remove();
  $.ajax({
    type: 'GET',
    url: dominio + 'buscarPacientesEsutdiantes/13',
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
       //console.log(data)
      for (const value of data.pacientes) {
         //console.log(value)
        var fila = ''
        fila += '<tr>'
        fila += '<td>' + value.nombres + '</td>'
        fila += '<td>' + value.apellidos + '</td>'
        fila += '<td>' + value.dpi + '</td>'

        fila += '<td>' + '<a href="#" onClick= goToExpediente("'+value.idpaciente+'")> <img src="icon/ficha.png"></a>' + '&nbsp;&nbsp;' +
                         '<a href="#" onClick= goToExpediente("'+value.idPaciente+'")><img src="icon/calendar.png"></a>' + '</td>'
        fila += '</tr>'
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
    }
  })
}


function goToExpediente(idPaciente) {
  console.log(idPaciente);
  $.ajax({
    type: 'GET',
    url: dominio + `expediente/all/${idPaciente}`,
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    //data: JSON.stringify({id: id}),
    success: function (data) {
      console.log(data);
      if (data['expediente'].length == 0) {
        //console.log('hola 1');
        let expediente = {
          mc: '',
          hpe: '',
          hma: '',
          hma_comentario: '',
          hoa: '',
          hoa_comentario: '',
          dolor_dentario: '',
          habitos: '',
          roentgenologia: '',
          precauciones: '',
          evaluacion_clinica: '',
          oclusion: '',
          oclusion_comentario: '',
          roentoenogramas: '',
          roentoenogramas_descripcion: '',
          opciones: '',
          opciones_descripcion: '',
          consulta: '',
          estudios_especiales: '',
          equipo_diagnostico: '',
          diagnostico:  '',
          idpaciente:  id,
        }
        let data = JSON.stringify(expediente);

        $.ajax({
            type: 'POST',
            url: dominio + 'Expediente/crear',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            async: false,
            data: data,
            success: function (data) {
              console.log(data)
              location.href = './expediente.html'
            }
          })
      } else if (data['expediente'].length == 1) {
        //console.log('hola 2');
        //location.href = './expediente.html?id='+data['expediente'][0].idexpediente;
        //console.log(data['expediente'][0].idexpediente);
        expedienteId = data['expediente'][0].idexpediente;
        $('#contenido').load("expediente.html");
      } else {
        console.log('hola 3');
      }
    }
  })
}
