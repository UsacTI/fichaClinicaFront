$(document).ready(function() {
  showLoader();
    getPacientes();
    $('#paciente').DataTable({

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
  } )


  /*Estados paciente
  0: paciente registrado por oficina de información
  1: aprobado por trabajo social
  2: rechazado por trabajo social
  3: pendiente de pago de boleta de primera cita
  4: pago boleta de primera cita/listo para asignar a estudiante (aparece en el banco de pacientes)
  5: paciente asignado
  6: paciente completado
  */

  function getPacientes() {
    $.ajax({
      type: 'GET',
      url: dominio + `Comprobacion/boleta`,
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      async: false,
      //data: data,
      success: function (data) {

        $.ajax({
          type: 'GET',
          url: dominio + `patients/all`,
          contentType: 'application/json',
          dataType: 'json',
          crossDomain: true,
          async: false,
          //data: data,
          success: function (data) {

            
            for (const value of data.pacientes) {
              var fila = '';
              if (value.aprobacion == 0) {
                fila = `
                  <tr>
                    <td> ${value.nombres} ${value.apellidos}</td>
                    <td> ${value.dpi}</td>
                    <td title="Pendiente aprobación de Trabajo Social"> Pendiente TS</td>
                    <td></td>
                  </tr>
                  `
              } else if(value.aprobacion == 1){
                fila = `
                  <tr>
                    <td> ${value.nombres} ${value.apellidos}</td>
                    <td> ${value.dpi}</td>
                    <td title="Aprobado por Trabajo Social"> Aprobado por TS</td>
                    <td><button class="btn btn-primary btn-sm" onclick="generarBoleta('${value.nombres} ${value.apellidos}', '${value.idpaciente}')">Primera cita</button></td>
                  </tr>
                  `
              } else if(value.aprobacion == 2){
                fila = `
                  <tr>
                    <td> ${value.nombres} ${value.apellidos}</td>
                    <td> ${value.dpi}</td>
                    <td> No aprobado</td>
                    <td></td>
                  </tr>
                  `
              } else if(value.aprobacion == 3){
                fila = `
                  <tr>
                    <td> ${value.nombres} ${value.apellidos}</td>
                    <td> ${value.dpi}</td>
                    <td title="Pendiente pago de Primera Cita"> Pendiente pago PC</td>
                    <td></td>
                  </tr>
                  `
              } else if(value.aprobacion == 4){
                fila = `
                  <tr>
                    <td> ${value.nombres} ${value.apellidos}</td>
                    <td> ${value.dpi}</td>
                    <td> Aprobado</td>
                    <td><a href="#" onClick= AsignarEstudiante("${value.idpaciente}") class="btn btn-success btn-sm">Asignar</a></td>
                  </tr>
                  `
              } else if(value.aprobacion == 5){
                fila = `
                  <tr>
                    <td> ${value.nombres} ${value.apellidos}</td>
                    <td> ${value.dpi}</td>
                    <td> Asignado</td>
                    <td><button  class="btn btn-success btn-sm" disabled>Asignado</a></td>
                  </tr>
                  `
              }

              var btn = document.createElement('TR')
              btn.innerHTML = fila
              document.getElementById('tabla-pacientes').appendChild(btn)
            }
            hideLoader();
          }
        })
      }
    })

  }

  function AsignarEstudiante(idPaciente){
    //alert(idPaciente);
    idPersonal = idPaciente;
    $('#contenido').load("./asignacionEstudiantePaciente.html");

  }

  function generarBoleta(nombre, idpaciente) {

    let dataBoleta = {
      carnet: idpaciente,
      unidad: '0',
      extension: '0',
      carrera: '0',
      nombre: nombre,
      monto: '50.00',
      anio_temporada: '2021',
      id_rubro: '8',
      id_variante_rubro: '1',
      subotal: '50.00',
      idpaciente: idpaciente,
    }
    //console.log(dataBoleta);

    $.ajax({
      type: 'POST',
      url: dominio + `boleta/crear`,
      contentType: 'application/json',
      dataType: 'json',
      crossDomain: true,
      async: false,
      data: JSON.stringify(dataBoleta),
      success: function (data) {
        let boleta = JSON.parse(data.pago);
        //console.log(boleta);

        $.ajax({
          type: 'PUT',
          url: dominio + `paciente/estadoactualizacion/${idpaciente}`,
          contentType: 'application/json',
          dataType: 'json',
          crossDomain: true,
          async: false,
          data: JSON.stringify({estado: 3}),
          success: function (data) {

            location.href = `./boleta-pago.html?carnet=${dataBoleta.carnet}&boleta=${boleta.id_orden_pago}&llave=${boleta.checksum}`;
          }
        })
      }
    })
  }

  $("#registroPaciente").on('click', function () {
          //login(tipoCuenta);
          $('#contenido').load("./registroPacienteOficinaInformacion.html");
  });
