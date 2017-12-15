$(document).ready(function() {
  // Populate the user table on initial page load
  fillTable();

  // Fill table with data
  function fillTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/meals/', function(data) {
      // For each item in our JSON, add a table row and cells to the content string
      $.each(data, function(){
        tableContent += '<tr>';
        tableContent += '<td><a class="showmeal" rel="' + this._id + '">' + this.name + '</a></td>';
        tableContent += '<td><a href="modifymeal/' + this._id + '">modify</a></td>';
        tableContent += '<td><a class="deletemeal" rel="' + this._id + '">delete</a></td>';
        tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#mealList table tbody').html(tableContent);
    });
  };

  // Show User Info
  function showMealInfo(event) {
    // jQuery AJAX call for get the user
    $.ajax({
      type: 'GET',
      url: 'meals/' + $(this).attr('rel')
    }).done(function(response) {
      $('#name').text(response.name);

      var typesList = "<ul>";
      $.each(response.types, function(key, type) {
        typesList += "<li>" + type.name + "</li>";
      });
      typesList += "</ul>";

      $('#type').append(typesList);
    });
  };

  // Username link click
  $('#mealList table tbody').on('click', 'td a.showmeal', showMealInfo);

  // Delete Meal
  function deleteMeal(event) {
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('¿Seguro qué quieres eliminar la comida?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
      // If they did, do our delete
      $.ajax({
        type: 'DELETE',
        url: '/meals/delete/' + $(this).attr('rel')
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
  $('#mealList table tbody').on('click', 'td a.deletemeal', deleteMeal);
});
