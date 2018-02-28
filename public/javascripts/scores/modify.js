$(document).ready(function() {
  // Modify Score
  function updateScore(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#updateScore input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    $('#updateScore select').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      // If it is, compile all user info into one object
      var updateScore = {
        'mealID': $('#updateScore select#inputMeal').val(),
        'points': $('#updateScore input#inputPoints').val()
      }

      // Use AJAX to post the object to our modifyuser service
      $.ajax({
        type: 'PUT',
        data: updateScore,
        url: '/scores/update/' + $('#updateScore input#inputID').val(),
        dataType: 'JSON'
      }).done(function( response ) {
        // Check for successful (blank) response
        if (response.msg === '') {
          alert('Puntuación actualizada.');

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

  // Update Score button click
  $('#btnUpdateScore').on('click', updateScore);
});
