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
        tableContent += '<td><a href="/modifydailymeals/' + this._id + '"><span class="glyphicon glyphicon-pencil modify"></span></a></td>';
        tableContent += '<td><a class="deletemeal" rel="' + this._id + '"><span class="glyphicon glyphicon-remove remove"></span></a></td>';
        tableContent += '</tr>';
      });

      // Inject the whole content string into our existing HTML table
      $('#dailyMealsList table tbody').html(tableContent);
    });
  };

  // Show Daily Meals Info
  function showDailyMealsInfo(event) {
    // jQuery AJAX call for get the daily meals
    $.ajax({
      type: 'GET',
      url: '/dailymeals/' + $(this).attr('rel')
    }).done(function(response) {
      $('#date').text(response[0].date);
      $('#lunch').empty();
      $('#lunch').append(getMenu(response[1]));
      $('#dinner').empty();
      $('#dinner').append(getMenu(response[2]));
    });
  };

  function getMenu(menu) {
    var content = "";
    if (menu !== undefined && menu !== null) {
      content += getMeals("Primer plato", menu[0]);
      content += getMeals("Segundo plato:", menu[1]);
      content += getMeals("Guarnición:", menu[2]);
      content += getMeals("Postre:", menu[3]);
    }
    return content;
  }

  function getMeals(title, listMeals) {
    var content = "<h6>" + title + "</h6>";
    content += "<ul>";
    if (listMeals !== undefined) {
      listMeals.forEach(function(meal) {
        content += "<li>" + meal.name + "( ";

        meal.types.forEach(function(type) {
          content += type.name + " "
        });

        content += ")</li>";
      });
    }
    content += "</ul>";

    return content;
  }

  // DailyMeals name link click
  $('#dailyMealsList table tbody').on('click', 'td a.showdailymeals', showDailyMealsInfo);

  // Delete Meal
  function deleteDailyMeals(event) {
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('¿Seguro qué quieres eliminar las comidas de este día?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
      // If they did, do our delete
      $.ajax({
        type: 'DELETE',
        url: '/dailymeals/delete/' + $(this).attr('rel')
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

  // Delete Daily Meals link click
  $('#dailyMealsList table tbody').on('click', 'td a.deletemeal', deleteDailyMeals);
});
