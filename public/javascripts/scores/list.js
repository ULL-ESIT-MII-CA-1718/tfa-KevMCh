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
        tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#scoreList table tbody').html(tableContent);
    });
  };
});
