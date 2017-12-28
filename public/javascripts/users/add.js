$(document).ready(function() {
  // Add User
  function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    $('#addUser select').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      // If it is, compile all user info into one object
      var newUser = {
        'user': $('#addUser input#inputUser').val(),
        'password': $('#addUser input#inputPassword').val(),
        'rol': $('#addUser select#inputRol').val()
      }

      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'POST',
        data: newUser,
        url: '/users/add',
        dataType: 'JSON'
      }).done(function( response ) {
        // Check for successful (blank) response
        if (response.msg === '') {
          // Clear the form inputs
          $('#addUser input').val('');

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

  // Add User button click
  $('#btnAddUser').on('click', addUser);
});
