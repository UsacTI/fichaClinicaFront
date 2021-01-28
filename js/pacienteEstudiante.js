$(document).ready(function() {
  $('#table3').DataTable()
} )

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
        location.href = './expediente.html?id='+data['expediente'][0].idexpediente;
      } else {
        console.log('hola 3');
      }
    }
  })
}