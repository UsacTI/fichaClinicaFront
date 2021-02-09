
function onReady() {
  var calendarEl = document.getElementById('calendar');
  let citas = []
  $.ajax({
      type: 'GET',
      url:  dominio + "citas/consultarTodasIdusuario/1",
      contentType: "application/json",
      dataType: 'json',
      crossDomain: true,
      async: false,
      success: function (data) {
          //console.log(data);
          data.citas.forEach(element => {
              let fecha = String(element.fecha).replaceAll('-','');
              let hh = Number(String(element.hora).substring(0,2));
              let min = String(element.hora).substring(3,5);
              hh+=1;
              let horaI = String(element.hora).replaceAll(':','');
              let horaF = `${hh}${min}00`;
              if (hh < 10) {
                  horaF = `0${hh}${min}00`;
              }

              citas.push({
                  title: element.descripcion,
                  start: element.fecha,
                  description: '',
                  url: 'https://calendar.google.com/calendar/r/eventedit?' +
                      'text='+ element.descripcion +
                      '&dates='+fecha+'T'+horaI+'/'+fecha+'T'+horaF+
                      '&details=Cita para realizar ' +element.descripcion+
                      '&location=Guatemala' +
                      '&ctz=America/Guatemala (GMT -6)'+
                      '&add=bryan.moga95@gmail.com&add=javierhc22@gmail.com&add=benjamin@profesor.usac.edu.gt'
              })
          });
      }
  });
  //console.log(citas);
  var calendar = new FullCalendar.Calendar(calendarEl, {
      dateClick: function (info) {
          //console.log(info);
          //alert('Date: ' + info.dateStr);
          location.href = `./registroCita.html?fecha=${info.dateStr}&idpaciente=4`;
      },
      headerToolbar: {
          // left: 'prevYear,prev,next,nextYear today',
          // center: 'title',
          //right: 'dayGridMonth,dayGridWeek,dayGridDay',
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,dayGridDay'
      },
      navLinks: true, // puede hacer clic en los nombres de los días / semanas para navegar por las vistas
      editable: true,
      displayEventTime: true, // permitir el enlace "más" cuando hay demasiados eventos

      // THIS KEY WON'T WORK IN PRODUCTION!!!
      // To make your own Google API key, follow the directions here:
      // http://fullcalendar.io/docs/google_calendar/
      googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',

      // US Holidays
      // events: 'en.usa#holiday@group.v.calendar.google.com',

      // año / mes / día la fecha de date luego T hora minutos y segundos
      events: citas,

      eventClick: function (arg) {
          // opens events in a popup window
          window.open(arg.event.url, 'google-calendar-event', 'width=700,height=600');

          arg.jsEvent.preventDefault() // don't navigate in main tab
      },

      loading: function (bool) {
          document.getElementById('loading').style.display =
              bool ? 'block' : 'none';
      }

  });
  calendar.render();
}
if (document.readyState !== "loading") {
onReady();

} else {
document.addEventListener("DOMContentLoaded", onReady);
}
