$(document).ready(function() {
  // Populate the user table on initial page load
  fillTable();

  // Fill table with data
  function fillTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/users/', function(data) {
      // Stick our user data array into a userlist variable in the global object
      userListData = data;

      // For each item in our JSON, add a table row and cells to the content string
      $.each(data, function(){
        tableContent += '<tr>';
        tableContent += '<td><a href="#" class="showuser" rel="' + this._id + '">' + this.user + '</a></td>';
        tableContent += '<td>' + this.rol.name + '</td>';
        tableContent += '<td><a href="modifyuser/' + this._id + '">modify</a></td>';
        tableContent += '<td><a class="deleteuser" rel="' + this._id + '">delete</a></td>';
        tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#userList table tbody').html(tableContent);
    });
  };

  // Show User Info
  function showUserInfo(event) {
    // jQuery AJAX call for get the user
    $.ajax({
      type: 'GET',
      url: 'users/' + $(this).attr('rel')
    }).done(function(response) {
      $('#user').text(response.user);
      $('#password').text(response.password);
      $('#rol').text(response.rol.name);
    });
  };

  // Username link click
  $('#userList table tbody').on('click', 'td a.showuser', showUserInfo);

  // Delete User
  function deleteUser(event) {
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('¿Seguro qué quieres eliminar este usuario?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

      // If they did, do our delete
      $.ajax({
        type: 'DELETE',
        url: '/users/delete/' + $(this).attr('rel')
      }).done(function( response ) {

        // Check for a successful (blank) response
        if (response.msg !== '') {
          alert('Error: ' + response.msg);
        }

        // Update the table
        fillTable();
      });
    } else {
      // If they said no to the confirm, do nothing
      return false;
    }
  };

  // Delete User link click
  $('#userList table tbody').on('click', 'td a.deleteuser', deleteUser);
});
