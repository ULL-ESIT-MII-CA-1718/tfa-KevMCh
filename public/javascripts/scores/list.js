$(document).ready(function() {
  // Populate the user table on initial page load
  fillTable();

  // Fill table with data
  function fillTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/scores/', function(data) {
      // For each item in our JSON, add a table row and cells to the content string
      $.each(data, function(){
        tableContent += '<tr>';
        tableContent += '<td>' + this.meal.name + '</td>';
        tableContent += '<td>' + this.points + '</td>';
        tableContent += '<td><a href="/modifyscore/' + this._id + '"><span class="glyphicon glyphicon-pencil modify"></span></a></td>'
        tableContent += '<td><a class="deletescore" rel="' + this._id + '"><span class="glyphicon glyphicon-remove remove"></span></a></td>';
        tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#scoreList table tbody').html(tableContent);
    });
  };

  // Delete Score
  function deleteScore(event) {
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('¿Seguro qué quieres eliminar la comida?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
      // If they did, do our delete
      $.ajax({
        type: 'DELETE',
        url: '/scores/delete/' + $(this).attr('rel')
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
  $('#scoreList table tbody').on('click', 'td a.deletescore', deleteScore);
});
