$(document).ready(function(){

 // Imposto la variabile della data iniziale del calendario (1 gennaio 2018)
  var initialDate = moment("2018-01-01");

  displayMonth(initialDate);

  addHolidays(initialDate);







  // FUNZIONI

  // Funzione per stampare i giorni del mese
  function displayMonth(initialDate){

    // Recupro il mese corrente
    var month = moment(initialDate).month();

    // Calcolo quanto giorni ci sono nel mese
    var daysMonth = moment(month).daysInMonth();

    var year = moment(initialDate).year();

    // console.log(year);

    //Setto il formato del mese da visualizzare nell'html

    var monthInHtml = moment(initialDate).format("MMMM");

    // Lo visualizzo nell'html
    $('#month_displayed').html(monthInHtml + ' ' + year);
    $('#month_displayed').attr('current_month', initialDate.format('YYYY-MM-DD'));

    // console.log(monthInHtml);

    // TEMPLATE handlebars

    var source = $('#calendar_template').html();
    var template = Handlebars.compile(source);

    // inizializzo un ciclo FOR per creare il caledario dinamicamente
    for (var i = 1; i <= daysMonth; i++) {
      // Setto il formato dei giorni della settimana
      days = moment(initialDate).format("dddd");
      // Creo l'oggetto contenente il numero del giorno corrente e il giorno della settimana
      var singleDay = moment({
        dayNumber: i,
        DayOfWeek: days,
        month: month,
        year: year
      });

      var context = {
        date: days + ' ' + i + ' ' + moment(month).format('MMMM'),
      };

      console.log(context);
      // Aggiungo un giorno ad ogni giro fino all'ultimo giorno del mese
      var initialDateInFor = initialDate;

      initialDateInFor.add(1,'days');

      // console.log(context);

      var html = template(context);

      // Stampo i giorni del calendario
      $('.list').append(html);

    }


  }

  // Funzione per aggiungere le festività
  function addHolidays(initialDate){
    // Faccio la chiamata alla corrispondente API di Boolean per ottenere le festività
    $.ajax(
      {
        url:'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data: {
          year: moment(initialDate).year(),
          month: moment(initialDate).month(),
        },
        // SE LA CHIAMATA HA SUCCESSO:
        success: function(request){
          var holidays = request.response;

          console.log(holidays);

          // Aggiungo le classi create agli elementi per evidenziare ogni festività
          // utilizzando un ciclo for

          for (var j = 0; j < holidays.length; j++) {
            var thisHoliday = holidays[j];

            var thisDay = $('.day[data_current_day="'+ thisHoliday.date +'"]');

            console.log(thisDay);

            thisDay.addClass('holiday');

            thisDay.append('-' + thisHoliday.name);


          }


        },
        // SE LA CHIAMATA DOVESSE FALLIRE
        // visualizzo un errore
        error: function(){
          alert("Qualcosa è andato storto");
        }
      }
    );

  }


});
