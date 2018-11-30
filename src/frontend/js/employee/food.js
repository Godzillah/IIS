$(document).ready(function () {
    $.ajax({
        url: "https://restaurant.memonil.com/meals",
        type: "GET",
        headers: {
            "Authorization": sessionStorage.getItem("jwtToken")
        },
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            var JsonObject = JSON.parse(response);
            console.log(response);
            console.log("GET method");
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

