$(document).ready(function() {
  // Modify Daily Meals Date
  function updateDailyMeals(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#updateDailyMeals input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      // If it is, compile all user info into one object
      var updateDailyMeals = {
        'date': $('#updateDailyMeals input#inputDate').val()
      }

      // Use AJAX to post the object to our modifyuser service
      $.ajax({
        type: 'PUT',
        data: updateDailyMeals,
        url: '/dailymeals/update/' + $('#updateDailyMeals input#inputID').val(),
        dataType: 'JSON'
      }).done(function(response) {
        // Check for successful (blank) response
        if (response.msg === '') {
          alert('Fecha actualizada.');

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
  }

  // Update DailyMeals button click
  $('#btnUpdateDate').on('click', updateDailyMeals);
});
