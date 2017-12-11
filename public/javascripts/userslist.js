// Userlist data array for filling in info box
var userListData = [];

// DOM Ready
$(document).ready(function() {
  // Populate the user table on initial page load
  fillTable();
});

// Fill table with data
function fillTable() {
  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/users/userslist', function(data) {
    // Stick our user data array into a userlist variable in the global object
    userListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="showuser" rel="' + this._id + '">' + this.user + '</a></td>';
      tableContent += '<td>' + this.rol + '</td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#userList table tbody').html(tableContent);
  });
};

// Show User Info
function showUserInfo(event) {
  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve user id from link rel attribute
  var idUser = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = userListData.map(function(arrayItem) {
    return arrayItem._id;
  }).indexOf(idUser);

  // Get our User Object
  var thisUser = userListData[arrayPosition];

  //Populate Info Box
  $('#user').text(thisUser.user);
  $('#password').text(thisUser.password);
  $('#rol').text(thisUser.rol);
};

// Username link click
$('#userList table tbody').on('click', 'td a.showuser', showUserInfo);
