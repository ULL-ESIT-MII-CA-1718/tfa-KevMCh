// Modify User
function updateUser(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#updateUser input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  $('#updateUser select').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {
    // If it is, compile all user info into one object
    var updateUser = {
      'user': $('#updateUser input#inputUser').val(),
      'password': $('#updateUser input#inputPassword').val(),
      'rol': $('#updateUser select#inputRol').val()
    }

    // Use AJAX to post the object to our modifyuser service
    $.ajax({
      type: 'PUT',
      data: updateUser,
      url: '/users/update/' + $('#updateUser input#inputID').val(),
      dataType: 'JSON'
    }).done(function( response ) {
      // Check for successful (blank) response
      if (response.msg === '') {
        alert('Usuario actualizado.');

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
$('#btnUpdateUser').on('click', updateUser);
