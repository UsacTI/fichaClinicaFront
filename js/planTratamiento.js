

var tratamientos = [];
//var idExpediente = 0;
var clasificaciones = [
    {text: 'Diagnóstico', value: 1, tratamientos: []},
    {text: 'Radiología', value: 2, tratamientos: []},
    {text: 'Periodoncia', value: 3, tratamientos: []},
    {text: 'Cirugía', value: 4, tratamientos: []},
    {text: 'Endodoncia', value: 5, tratamientos: []},
    {text: 'Operatoria', value: 6, tratamientos: []},
    {text: 'Restaurativa', value: 7, tratamientos: []},
    {text: 'Odontopediatría', value: 8, tratamientos: []}
]

var estadoExpediente = 0;

function loadClasificaciones() {
    clasificaciones.forEach(element => {
        let opcion = document.createElement('option');
        opcion.value = element.value;
        opcion.textContent = element.text;
        //console.log(opcion);
        document.getElementById('select-calsificacion').appendChild(opcion);
    });

    $.ajax({
        type: 'GET',
        url: dominio + `tratamiento/`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        //data: data,
        success: function (data) {
           //console.log(data)
           tratamientos = data['tratamiento'];
           //console.log(tratamientos);
           clasificaciones.forEach(clasificacion => {
                tratamientos.forEach(tratamiento => {
                   if (clasificacion.value == Number(tratamiento.clasificacion)) {
                        clasificacion.tratamientos.push(tratamiento)
                   }
               });
           });
           //console.log(clasificaciones);
        }
      })
}

function loadTratamiento(e){
    //console.log(e.value);
    $("#select-tratamiento").empty();
    let opcion = document.createElement('option');
    opcion.setAttribute('selected', true);
    opcion.text = '-- Seleccione un tratamiento --';
    document.getElementById('select-tratamiento').appendChild(opcion);
    clasificaciones.forEach(clasificacion => {
        if (e.value == clasificacion.value) {
            clasificacion.tratamientos.forEach(tratamiento => {
                let opcion = document.createElement('option');
                opcion.value = tratamiento.idtratamiento;
                opcion.textContent = tratamiento.descripcion;
                document.getElementById('select-tratamiento').appendChild(opcion);
            });

        }
    });
}

function goToExpediente() {
    if (estadoExpediente == 1) {
        $('#contenido').load("expedienteEstudianteNoEditable.html");
    } else {
        $('#contenido').load("expediente.html");
    }

}

function goToRadiografia() {
    $('#contenido').load("radiografia.html");
}

function getTratamientos() {
    $.ajax({
        type: 'GET',
        url: dominio + `buscardetalleProcedimiento/${idExpediente}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        //data: data,
        success: function (data) {
           //console.log(data)
           let tratamientos = []
           tratamientos = data['tratamientos'];
           let n = 1;
           tratamientos.forEach(element => {
               let fila = document.createElement('tr');
               fila.innerHTML = `
                    <td>${n}</td>
                    <td>${element.pieza}</td>
                    <td>${element.descripcion}</td>
                    <td>${element.valor}</td>
                    <td><button class="btn btn-danger btn-sm" onclick="deleteDetalle(this, ${element.id_detalle_procedimiento_tratamiento})">Eliminar</button></td>
               `
               document.getElementById('table-tratamientos').appendChild(fila)
               n++;
           });
        }
      })
}

function agregarDetalle() {
    showLoader();
    let tratamiento = {
        idtratamiento: document.getElementById('select-tratamiento').value,
        idexpediente: idExpediente,
        idusuario: idUsuario,
        pieza: document.getElementById('pieza').value
    }

    $.ajax({
        type: 'POST',
        url: dominio + `detalleProcedimiento`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: JSON.stringify(tratamiento),
        success: function (data) {
            //console.log(data);
            let t;
            clasificaciones.forEach(clasificacion => {
                let d = clasificacion.tratamientos.filter(x => x.idtratamiento == tratamiento.idtratamiento)[0];
                //console.log(d);
                if (d) {
                    t = d;
                }
            });

            let fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${document.getElementById('table-tratamientos').getElementsByTagName('tr').length+1}</td>
                <td>${tratamiento.pieza}</td>
                <td>${t.descripcion}</td>
                <td>${t.valor}</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteDetalle(this, ${data['tratamientos'].id_detalle_procedimiento_tratamiento})">Eliminar</button></td>
            `
            //console.log(fila);
            document.getElementById('table-tratamientos').appendChild(fila);
            document.getElementById('pieza').value = '';
            document.getElementById('select-calsificacion').value = '';
            document.getElementById('select-tratamiento').value = '';
            alertify.set('notifier','position', 'top-right');
            alertify.success("Tratamiento guardado");
            hideLoader();
        }
      })
}

function deleteDetalle(e, id) {
    //console.log(e.parentNode.parentNode);
    alertify.confirm('Advertencia',"¿Seguro que quiere eliminar este registro de tratamiento?",
    function(){
        alertify.set('notifier','position', 'top-right');
        alertify.success('Registro eliminado');
        let row = e.parentNode.parentNode;
        let table = row.parentNode;

        //console.log(table);
        $.ajax({
            type: 'DELETE',
            url: dominio + `tratamiento/deleteDetalle/${id}`,
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            async: false,
            success: function (data) {
                //console.log(data);
                table.deleteRow(row.rowIndex-1);
                alertify.set('notifier','position', 'top-right');
                alertify.success("Tratamiento eliminado");

            }
        })
    },
    function(){
        alertify.set('notifier','position', 'top-right');
        alertify.error('Cancelado');
    }).set('labels', {ok:'Sí', cancel:'Cancelar'});

}

function comprobarPlan() {
    $.ajax({
        type: 'GET',
        url: dominio + `expediente/search/${idExpediente}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        //data: data,
        success: function (data) {
            //console.log(data.expediente.aprobar_plan);
            console.log(data);
            document.getElementById('diagnostico').value = data.expediente.diagnostico;
            estadoExpediente = data.expediente.aprobar_expediente;
            idPaciente = data.expediente.idpaciente;
            if (data.expediente.aprobar_plan == 1) {
                document.getElementById('aprobar').removeAttribute('hidden');
            }
        }
    })
}


$(document).ready(function() {
  mostrarfoto(idPa);

    loadClasificaciones();
    const urlParams = new URLSearchParams(window.location.search)
    //idExpediente = urlParams.get('id');
    idExpediente = expedienteId;
    //console.log("el id expediente en Plan"+idExpediente);
    getTratamientos()
    comprobarPlan();
    $('#table-plan').DataTable();
} )

$('#regresar').on('click', function () {
    //location.href = "./pacienteEstudiante.html";
    $('#contenido').load("./pacienteEstudiante.html");
  })


function guardarDiagnostico() {
    $.ajax({
        type: 'PUT',
        url: dominio + `createDiagnostico/${idExpediente}`,
        contentType: 'application/json',
        dataType: 'json',
        crossDomain: true,
        async: false,
        data: JSON.stringify({diagnostico: document.getElementById('diagnostico').value}),
        success: function (data) {
            //console.log(data);
            alertify.set('notifier','position', 'top-right');
            alertify.success("Diagnostico guardado");
        }
    })
}
  

  function mostrarfoto(idpaciente) {

    $.ajax({
        type: 'GET',
        url: dominio + `patients/buscarfotografia/${idpaciente}`,
        contentType: false,
        processData: false,
        cache: false,
        //dataType: false,
        //crossDomain: true,
        //async: false,
        success: function (data) {
          //console.log(data);

           if (data.expediente.fotografia != null) {

              hideLoaderWTimer();
              document.getElementById("datosPaciente").innerHTML = `<div class="col-xs-12 col-md-6">
                              <div class="row">

                                  <div class="col-xs-4">
                                      <p style="font-size: 1.2em"><img width="100px" height="125px" src="data:image/jpg;base64,${data.expediente.fotografia}" alt=""></p>
                                  </div>
                                  <div class="col-xs-4" style="text-align: left; padding-left: 10px;">
                                  <p style="font-size: 1em"><strong>Nombres: ${nombrePaciente} </strong></p>
                                  <p style="font-size: 1em"><strong>Apellidos: ${apellidoPaciente}</strong></p>
                                  <p style="font-size: 1em"><strong>DPI: ${dpiPaciente} </strong></p>
                                  </div>
                              </div>`;
            } else {
              document.getElementById("datosPaciente").innerHTML = `<div class="col-xs-12 col-md-6">
                              <div class="row">

                                  <div class="col-xs-4">
                                      <p style="font-size: 1.2em"><img width="100px" height="125px" src="img/fotoperfil.jpg" alt=""></p>
                                  </div>
                                  <div class="col-xs-4" style="text-align: left; padding-left: 10px;">
                                  <p style="font-size: 1em"><strong>Nombres: ${nombrePaciente} </strong></p>
                                  <p style="font-size: 1em"><strong>Apellidos: ${apellidoPaciente}</strong></p>
                                  <p style="font-size: 1em"><strong>DPI: ${dpiPaciente} </strong></p>
                                  </div>
                              </div>`;
            }

        }
    })

  }
