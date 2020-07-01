$(document).ready(function(){

 // Imposto la variabile della data iniziale del calendario (1 gennaio 2018)
  var initialDate = moment({
  day: 1,
  month: 0,
  year: 2018
  });

  displayMonth(initialDate);

  addHolidays(initialDate);

  // displayNextMonth();

  $(document).on('click', '.arrow_right',
    function(){
      displayNextMonth();



    }
  );


  // //
  // if (event.wich == 39  || event.keyCode == 39) {
  //   displayNextMonth();
  //
  // };
  //
  // if (event.wich == 37  || event.keyCode == 37) {
  //   displayNextMonth();
  //
  // };

  $(document).on('click', '.arrow_left',
    function(){
      displayPreviousMonth();

    }
  );






  // var ciao = initialDate.month(0);
  //
  // console.log(ciao);






  // FUNZIONI


  // Funzione per visualizzare il prossimo mese
  // function displayNextMonth(){
  //
  // }

  function displayNextMonth(){

    var thisMonth = $('#month_displayed').attr('current_month');
    var momentthisMonth = moment(thisMonth);
    momentthisMonth.add(1, 'months');

    displayMonth(momentthisMonth);
    addHolidays(momentthisMonth);

    console.log(momentthisMonth);
  }

  function displayPreviousMonth(){

    var thisMonth = $('#month_displayed').attr('current_month');
    var momentthisMonth = moment(thisMonth);
    momentthisMonth.subtract(1, 'months');

    displayMonth(momentthisMonth);
    addHolidays(momentthisMonth);

    console.log(momentthisMonth);
  }

  // Funzione per stampare i giorni del mese
  function displayMonth(initialDate){
    //
    // // Recupro il mese corrente
    // var month = moment(initialDate).month();
    $('.list').html('');
    // Calcolo quanto giorni ci sono nel mese
    var daysMonth = initialDate.daysInMonth();

    // var year = moment(initialDate).year();

    // console.log(year);

    //Setto il formato del mese da visualizzare nell'html

    var monthInHtml = moment(initialDate).format("MMMM");

    // Lo visualizzo nell'html
    $('#month_displayed').text(initialDate.format('MMMM YYYY'));
    $('#month_displayed').attr('current_month', initialDate.format('YYYY-MM-DD'));

    // TEMPLATE handlebars

    var source = $('#calendar_template').html();
    var template = Handlebars.compile(source);

    // inizializzo un ciclo FOR per creare il caledario dinamicamente
    for (var i = 1; i <= daysMonth; i++) {
      // Setto il formato dei giorni della settimana
      // days = moment(initialDate).format("dddd");
      // Creo l'oggetto contenente il numero del giorno corrente e il giorno della settimana
      var singleDay = moment({
        day: i,
        // DayOfWeek: days,
        month: initialDate.month(),
        year: initialDate.year()

      });

      var context = {
        date: singleDay.format('D MMMM'),
        day_attr: singleDay.format('YYYY-MM-DD'),
      };

      // console.log(context);
      // Aggiungo un giorno ad ogni giro fino all'ultimo giorno del mese
      // var initialDateInFor = initialDate;
      //
      // initialDateInFor.add(1,'days');

      // console.log(context);

      var html = template(context);

      // Stampo i giorni del calendario
      $('.list').append(html);

    }


  }

  // Funzione per aggiungere le festività
  function addHolidays(initialDate){
    // console.log(initialDate.year());
    // console.log(initialDate.month());
    // Faccio la chiamata alla corrispondente API di Boolean per ottenere le festività
    $.ajax(
      {
        url:'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data: {
          year: initialDate.year(),
          month: initialDate.month(),
        },


        // SE LA CHIAMATA HA SUCCESSO:
        success: function(request){
          var holidays = request.response;

          // console.log(holidays);

          // Aggiungo le classi create agli elementi per evidenziare ogni festività
          // utilizzando un ciclo for

          for (var j = 0; j < holidays.length; j++) {
            var thisHoliday = holidays[j];


            var thisDay = $('.day[data_current_day="'+ thisHoliday.date +'"]');

            // console.log(thisDay);

            thisDay.addClass('holiday');

            thisDay.append('-' + thisHoliday.name);



            // $('.day').each(function(){
            //
            //
            //   var thisDay = $(this);
            //   var thisDayDate = thisDay.attr('data_current_day');
            //
            //
            //   console.log(thisDay);
            //
            //   if (thisDay === holidays.date) {
            //     console.log('sono nella if');
            //     $(thisDay).addClass('holiday');
            //     $(thisDay).append(' - ' + holidays.name);
            //
            //   }







            // var thisDay = $('.day[data_current_day="'+ thisHoliday.date +'"]');
            //
            // console.log(thisDay);
            //
            // thisDay.addClass('holiday');
            //
            // thisDay.append('-' + thisHoliday.name);
            //

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
