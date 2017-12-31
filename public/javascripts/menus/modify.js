$(document).ready(function() {
  function checkType() {
    if($("input[name='menu']:radio").is(':checked')) {

      return true;
    }
    alert("Debe seleccionar el tipo de comida (Almuerzo/Cena)")

    return false;
  }

  // Modify Menu
  function updateMenu(event) {
    event.preventDefault();

    if(checkType()) {
      // Super basic validation - increase errorCount variable if any fields are blank
      var errorCount = 0;
      $('#addMenu select').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
      });

      // Check and make sure errorCount's still at zero
      if(errorCount === 0) {
        // If it is, compile all user info into one object
        var updateMenu = {
          'starters': $('#updateDailyMeals select#inputStarters').val(),
          'mainCourses': $('#updateDailyMeals select#inputMainCourses').val(),
          'garnishs': $('#updateDailyMeals select#inputGarnishs').val(),
          'desserts': $('#updateDailyMeals select#inputDesserts').val()
        }

        // Use AJAX to post the object to our update menu service
        $.ajax({
          type: 'PUT',
          data: updateMenu,
          url: '/menus/update/' + $('input:radio[name=menu]:checked').val(),
          dataType: 'JSON'
        }).done(function(response) {
          // Check for successful (blank) response
          if (response.msg === '') {
            alert("Menú modificado");
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
    }
  }

  // Update Menu button click
  $('#btnUpdateMenu').on('click', updateMenu);

  // Delete Menu
  function deleteMenu(event) {
    event.preventDefault();

    if(checkType()) {
      // Pop up a confirmation dialog
      var confirmation = confirm('¿Seguro qué quieres eliminar la comida?');

      // Check and make sure the user confirmed
      if (confirmation === true) {
        // If they did, do our delete
        $.ajax({
          type: 'DELETE',
          url: '/menus/delete/' + $('input:radio[name=menu]:checked').val()
        }).done(function( response ) {

          // Check for a successful (blank) response
          if (response.msg !== '') {
            alert('Error: ' + response.msg);
          } else {
            alert('Menú eliminado.');
          }
        });
      } else {
        // If they said no to the confirm, do nothing
        return false;
      }
    }
  }

  // Update Menu button click
  $('#btnDeleteMenu').on('click', deleteMenu);

  $('input[type=radio][name=menu]').change(function() {
    $.ajax({
      type: 'GET',
      url: '/menus/' + $(this).attr('value')
    }).done(function(response) {
      if(response) {
        // Select the values
      }
    });
  });
});
