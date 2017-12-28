$(document).ready(function() {
  // Modify Meal
  function updateMeal(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#updateMeal input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    $('#updateMeal select').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      // If it is, compile all user info into one object
      var updateMeal = {
        'name': $('#updateMeal input#inputName').val(),
        'typesMeal': $('#updateMeal select#inputTypes').val()
      }

      // Use AJAX to post the object to our modifyuser service
      $.ajax({
        type: 'PUT',
        data: updateMeal,
        url: '/meals/update/' + $('#updateMeal input#inputID').val(),
        dataType: 'JSON'
      }).done(function(response) {
        // Check for successful (blank) response
        if (response.msg === '') {
          alert('Comida actualizada.');

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

  // Update User button click
  $('#btnUpdateMeal').on('click', updateMeal);
});
