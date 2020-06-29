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





































});
