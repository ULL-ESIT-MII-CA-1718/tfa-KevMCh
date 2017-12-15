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
});
