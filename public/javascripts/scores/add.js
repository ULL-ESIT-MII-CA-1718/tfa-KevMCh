$(document).ready(function() {
  // Add Score
  function addScore(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addScore input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    $('#addScore select').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      // If it is, compile all score info into one object
      var newScore = {
        'mealID': $('#addScore select#inputMeal').val(),
        'points': $('#addScore input#inputPoints').val()
      }

      // Use AJAX to post the object to our addscore service
      $.ajax({
        type: 'POST',
        data: newScore,
        url: '/scores/add',
        dataType: 'JSON'
      }).done(function( response ) {
        // Check for successful (blank) response
        if (response.msg === '') {
          // Clear the form inputs
          $('#addScore input').val('');

          alert("Puntuación creada correctamente.");
          location.href = "/scoreslist/";

        } else {
          // If something goes wrong, alert the error message that our service returned
          alert('Error: ' + response.msg);
        }
      });
    } else {
      // If errorCount is more than 0, error out
      alert('Por favor, rellene todos los campos.');
      return false;
    }
  };

  // Add Score button click
  $('#btnAddScore').on('click', addScore);
});
