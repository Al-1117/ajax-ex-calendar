$(document).ready(function(){

 // Imposto la variabile della data iniziale del calendario (1 gennaio 2018)
  var initialDate = moment("2018-01-01");

  // Recupro il mese corrente
  var month = moment(initialDate).month();

  // Calcolo quanto giorni ci sono nel mese
  var daysMonth = moment(month).daysInMonth();

  var year = moment(initialDate).year();

  console.log(year);

  //Setto il formato del mese da visualizzare nell'html

  var monthInHtml = moment(initialDate).format("MMMM");

  // Lo visualizzo nell'html
  $('#month_displayed').html(monthInHtml + ' ' + year);

  console.log(monthInHtml);

  // TEMPLATE handlebars

  var source = $('#calendar_template').html();
  var template = Handlebars.compile(source);

  // Creo un array vuoto che poi sarà popolato dinamicamente da oggetti
  var currentMonth = [];

  // inizializzo un ciclo FOR per creare il caledario dinamicamente
  for (var i = 1; i <= daysMonth; i++) {
    // Setto il formato dei giorni della settimana
    days = moment(initialDate).format("dddd");
    // Creo l'oggetto contenente il numero del giorno corrente e il giorno della settimana
    var context = {
      dayNumber: i,
      DayOfWeek: days,
    };
    // Aggiungo un giorno ad ogni giro fino all'ultimo giorno del mese
    initialDate.add(1,'days');


    var html = template(context);

    // Inserisco l'oggetto nell'array vuoto creato precedentemente
    currentMonth.push(context);

    // Stampo i giorni del calendario
    $('.calendar_container').append(html);

  }

  console.log(currentMonth);

  nDays = moment(initialDate).format('MMMM dddd');

  console.log(initialDate);


  // FACCIO LA CHIAMATA AJAX ALL'API BOOLEAN PER OTTENERE LE FESTIVITA

  var holidays = $.ajax(
    {
      url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method: "GET",

      // SE LA CHIAMATA HA SUCCESSO:

      success: function(request){

        var dataRequest = request.response;
        // console.log(dataRequest);
        var  arrayCalendar = [];
        var  arrayRequest = [];

        for (var j = 0; j < dataRequest.length; j++) {

          var singleElement = dataRequest[j];

          var dateInRequest = singleElement.date;

          var nameHoliday = singleElement.name;

          var dayInRequest = moment(dateInRequest).day();

          arrayRequest.push(dayInRequest)

          console.log(dayInRequest);
          console.log(nameHoliday);

          for (var a = 0; a < currentMonth.length; a++) {
            var currentMonthElement = currentMonth[a];
            var dayInCurrentMonth = currentMonthElement.dayNumber;

            arrayCalendar.push(dayInCurrentMonth);

            var control = false;

            if (arrayCalendar.includes(dayInRequest)) {
              var control = true;


            }

          }

          if (control) {
            $('.calendar_container').find('li').append(nameHoliday);
          }


        }






        console.log(control);
        console.log(arrayCalendar);


        console.log(dayInCurrentMonth);
        //
        // if (control) {
        //   console.log("sono nella if");
        // }









      },


      // SE LA CHIAMATA DOVESSE FALLIRE
      // visualizzo un errore
      error: function(){
        alert("Si è verificato un errore");
      }

  }
  )





































});
