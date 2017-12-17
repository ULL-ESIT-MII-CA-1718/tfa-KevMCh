$(document).ready(function() {
  // Populate the user table on initial page load
  fillTable();

  // Fill table with data
  function fillTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/dailymeals/', function(data) {
      // For each item in our JSON, add a table row and cells to the content string
      $.each(data, function(){
        tableContent += '<tr>';
        tableContent += '<td><a class="showdailymeals" rel="' + this._id + '">' + this.date + '</a></td>';
        tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#dailyMeals table tbody').html(tableContent);
    });
  };

  // Show User Info
  function showDailyMealsInfo(event) {
    // jQuery AJAX call for get the user
    $.ajax({
      type: 'GET',
      url: '/dailymeals/' + $(this).attr('rel')
    }).done(function(response) {
      $('#date').text(response.date);
      $('#lunch').empty();
      $('#lunch').append(getMenu(response.lunch));
      $('#dinner').empty();
      $('#dinner').append(getMenu(response.dinner));
    });
  };

  function getMenu(menu) {
    var content = "";
    if (menu !== undefined) {
      content += getMeals("Primer plato", menu.starters);
      content += getMeals("Segundo plato:", menu.mainCourses);
      content += getMeals("Guarnición:", menu.garnishs);
      content += getMeals("Postre:", menu.desserts);
    }
    return content;
  }

  function getMeals(title, listMeals) {
    var content = "<h6>" + title + "</h6>";
    content += "<ul>";
    if (listMeals !== undefined) {
      listMeals.forEach(function(element) {
        content += "<li>" + element + "</li>";
      });
    }
    content += "</ul>";

    return content;
  }

  // Username link click
  $('#dailyMeals table tbody').on('click', 'td a.showdailymeals', showDailyMealsInfo);

});
