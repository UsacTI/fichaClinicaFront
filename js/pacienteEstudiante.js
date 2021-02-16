$(document).ready(function() {
  
  loading();

  $('#table1').DataTable({

         language: {
             search: "Buscar:",
           "info": "Mostrando del _START_ a _END_ de _TOTAL_ registros",
           "lengthMenu":     "Mostrar _MENU_ registros",
           "zeroRecords":    "No se encontro ningun registro",
           "infoEmpty":      "0 registros",
         "infoFiltered":   "(filtrados de _MAX_ registros)",
             paginate: {
                 first:      "Primero",
                 previous:   "Anterior",
                 next:       "Siguiente",
                 last:       "Ultimo"
             }
           }
       });

} );


function loading () {

  $.ajax({
    type: 'GET',
    url: dominio + 'buscarPacientesEsutdiantes/'+ idUsuario,
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    success: function (data) {
       //console.log(data)
      for (const value of data.pacientes) {
        //console.log(value)
        var fila = `<tr>
          <td>${value.nombres}</td>
          <td>${value.apellidos}</td>
          <td>${value.dpi}</td>
          <td>${(value.aprobar_expediente != null && value.aprobar_expediente == 1)?'<button class="btn btn-success btn-sm" disabled>Aprobado</button>':'<button class="btn btn-danger btn-sm" disabled>Revisar</button>'}</td>
          <td>${(value.aprobar_plan != null && value.aprobar_plan == 1)?'<button class="btn btn-success btn-sm" disabled>Aprobado</button>':'<button class="btn btn-danger btn-sm" disabled>Revisar</button>'} </td>
          <td><a href="#" onClick= goToExpediente("${value.idpaciente}","${value.aprobar_expediente}")> <img src="icon/ficha.png"></a>&nbsp;&nbsp;
              <a href="#" onClick= goToCalendario("${value.idexpediente}","${value.idpaciente}")><img src="icon/calendar.png"></a></td>
        </tr>`
        var btn = document.createElement('TR')
        btn.innerHTML = fila
        document.getElementById('tablita').appendChild(btn)
      }
    }
  })
}

function goToCalendario(idExpediente, idPaciente) {
  //console.log(idExpediente);
  idPersonal = idPaciente;
  expedienteId = idExpediente;
  //console.log(expedienteId);

$('#contenido').load("calendario.html");
}

function goToExpediente(idPaciente, estadoExpediente) {
  //console.log(idPaciente);
  $.ajax({
    type: 'GET',
    url: dominio + `expediente/all/${idPaciente}`,
    contentType: 'application/json',
    dataType: 'json',
    crossDomain: true,
    async: false,
    //data: JSON.stringify({id: id}),
    success: function (data) {
      //console.log(data);
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
          idpaciente:  idPaciente,
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
              //console.log(data)
              //location.href = './expediente.html'
              $('#contenido').load("expediente.html");
            }
          })
      } else if (data['expediente'].length == 1) {
        //console.log('hola 2');
        //location.href = './expediente.html?id='+data['expediente'][0].idexpediente;
        //console.log(data['expediente'][0].idexpediente);
        console.log(estadoExpediente);
        if (Number(estadoExpediente) == 1) {
          expedienteId = data['expediente'][0].idexpediente;
          $('#contenido').load("expedienteEstudianteNoEditable.html");
          //location.href = './expedienteEstudianteNoEditable.html?id='+data['expediente'][0].idexpediente;
        } else {
          //console.log('vamos al expediente editable');
          expedienteId = data['expediente'][0].idexpediente;
          $('#contenido').load("expediente.html");
        }

      } else {
        console.log('hola 3');
      }
    }
  })
}
