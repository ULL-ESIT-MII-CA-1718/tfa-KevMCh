$(document).ready(function() {
  // Add Menu
  function addMenu(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addMenu input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    $('#addMenu select').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      // If it is, compile all user info into one object
      var newMenu = {
        'date': $('#addMenu input#inputDate').val(),
        'type': $('#addMenu select#inputType').val(),
        'starters': $('#addMenu select#inputStarters').val(),
        'mainCourses': $('#addMenu select#inputMainCourses').val(),
        'garnishs': $('#addMenu select#inputGarnishs').val(),
        'desserts': $('#addMenu select#inputDesserts').val()
      }

      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'POST',
        data: newMenu,
        url: '/menus/add',
        dataType: 'JSON'
      }).done(function(response) {
        // Check for successful (blank) response
        if (response.msg === '') {
          alert("Menú añadido");
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
  $('#btnAddMenu').on('click', addMenu);
});
