$(document).ready(function() {
  // Populate the user table on initial page load
  fillTable();

  // Fill table with data
  function fillTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/dailymeals/', function(data) {
      console.log("Hola")
      console.log(data)
      // For each item in our JSON, add a table row and cells to the content string
      $.each(data, function(){
        tableContent += '<tr>';
        tableContent += '<td><a rel="' + this._id + '">' + this.date + '</a></td>';
        tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#dailyMeals table tbody').html(tableContent);
    });
  };
});
