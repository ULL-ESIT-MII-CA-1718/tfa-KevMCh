$(document).ready(function() {
  // Add Meal
  function addMeal(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addMeal input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    $('#addMeal select').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      // If it is, compile all user info into one object
      var newMeal = {
        'name': $('#addMeal input#inputName').val(),
        'typesMeal': $('#addMeal select#inputTypes').val()
      }

      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'POST',
        data: newMeal,
        url: '/meals/add',
        dataType: 'JSON'
      }).done(function( response ) {
        // Check for successful (blank) response
        if (response.msg === '') {
          alert("Comida añadida");
          // window.location.replace("");

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

  // Add Meal button click
  $('#btnAddMeal').on('click', addMeal);
});
