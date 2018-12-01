/**
 * On ready function which fetch all data from API  https://restaurant.memonil.com/ with GET method
 * this is for employee so he will see only all meals and have no permission to edit save and delete
 */
$(document).ready(function () {
    $.ajax({
        url: "https://restaurant.memonil.com/meals",
        type: "GET",
        headers: {
            "Authorization": sessionStorage.getItem("jwtToken")
        },
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            var JsonObject = JSON.parse(response);
            for (var key in JsonObject) {
                var table = document.getElementById("foodTable");
                var table_len = (table.rows.length) - 1;
                table.insertRow(table_len).outerHTML =
                    "<tr id='row" + table_len + "' class='text-center'>" +
                    "<td id='meal_row_" + table_len + "'>" + JsonObject[key].type + "</td>" +
                    "<td id='description_row_" + table_len + "'>" + JsonObject[key].description + "</td>" +
                    "<td id='price_row_" + table_len + "'>" + JsonObject[key].price + " EUR</td>" +
                    "<td id='ingredients_row_" + table_len + "'>" +
                    "<div id='ingredients_row_input_" + table_len + "'>" + JsonObject[key].ingredients + "</div>" +
                    "</td>" +
                    "</tr>";
            }
        },
    });
});

