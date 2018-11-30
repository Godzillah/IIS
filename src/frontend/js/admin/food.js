// array of unique ID (description)
var $descriptionsArray = [];
// array of all ingredients
var $ingredientsArray = [];
// array of selected ingredients
var $selectedIngredietsArray = [];
// array of all type of food
var $foodTypeArray = ["", "meat", "pizza", "soup", "drink"];
// array of selected type of food
var $foodTypeSelectedArray;

// regexes
$regexForInputType = "^.{3}.*$";
$regexForInputDescription = "^.{3}.*$";
$regexForInputPrice = "^[0-9]+.[0-9]{2}$";
$regexForInputIngredients = "^.{3}.*$";

/**
 * Function for edit concrete row in the table...
 * @param counterOfTheRows concrete number of row
 */
function edit_concrete_row(counterOfTheRows) {
    document.getElementById("edit_button_index_" + counterOfTheRows).style.display = "none";
    document.getElementById("delete_button_index_" + counterOfTheRows).style.display = "none";
    document.getElementById("save_button_index_" + counterOfTheRows).style.display = "inline-block";

    // show selecpickers
    $('#selectPickerID' + counterOfTheRows + '').selectpicker('show');
    $('#selectPickerIDType' + counterOfTheRows + '').selectpicker('show');

    var meal = document.getElementById("meal_row_input_" + counterOfTheRows);
    var description = document.getElementById("description_row_" + counterOfTheRows);
    var price = document.getElementById("price_row_" + counterOfTheRows);
    var ingredients = document.getElementById("ingredients_row_input_" + counterOfTheRows);
    var selectPickerRow = document.getElementById("selectPickerID" + counterOfTheRows);
    var selectPickerFoodRow = document.getElementById("selectPickerIDType" + counterOfTheRows);

    var meal_data = meal.innerHTML;
    var description_data = description.innerHTML;
    var price_data = price.innerHTML;
    var ingredients_data = ingredients.innerHTML;

    var price_data = price_data.replace(" EUR", "");

    meal.innerHTML = "<input class='form-control' type='text' id='meal_text" + counterOfTheRows + "' value='" + meal_data + "' hidden>";
    price.innerHTML = "<input class='form-control' type='text' id='price_text" + counterOfTheRows + "' value='" + price_data + "'>";
    description.innerHTML = "<input class='form-control' type='text' id='description_text" + counterOfTheRows + "' value='" + description_data + "' disabled>";
    ingredients.innerHTML = "<input class='form-control' type='text' id='ingredients_text" + counterOfTheRows + "' value='" + ingredients_data + "' hidden>";

    $selectedIngredietsArray = ingredients_data.split(",");
    $foodTypeSelectedArray = meal_data;

    // fill type selectpicker on food
    for (var i = 0; i < $foodTypeArray.length; i++) {
        newOption = document.createElement("option");
        selectPickerFoodRow.appendChild(newOption);
        newOption.innerHTML = $foodTypeArray[i];
        $('#selectPickerIDType' + counterOfTheRows + '').selectpicker('refresh');
    }

    // fill concrete selecpicker on ingrediets
    for (var i = 0; i < $ingredientsArray.length; i++) {
        newOption = document.createElement("option");
        selectPickerRow.appendChild(newOption);
        newOption.innerHTML = $ingredientsArray[i];
        $('#selectPickerID' + counterOfTheRows + '').selectpicker('refresh');
    }

    // onclick change status of selecpicker ingredients
    $('#selectPickerID' + counterOfTheRows + '').off().on('change', function () {
        $selectedIngredietsArray = $('#selectPickerID' + counterOfTheRows + '').val();
        $('#selectPickerID' + counterOfTheRows + '').selectpicker('refresh');

    });
    // onclick change status of selecpicker foood
    $('#selectPickerIDType' + counterOfTheRows + '').off().on('change', function () {
        $foodTypeSelectedArray = $('#selectPickerIDType' + counterOfTheRows + '').val();
        $('#selectPickerIDType' + counterOfTheRows + '').selectpicker('refresh');

    });

    // sets all  selected ingredients
    $('#selectPickerID' + counterOfTheRows + '').selectpicker('val', $selectedIngredietsArray);
    $('#selectPickerID' + counterOfTheRows + '').val();
    // set selected food
    $('#selectPickerIDType' + counterOfTheRows + '').selectpicker('val', $foodTypeSelectedArray);
    $('#selectPickerIDType' + counterOfTheRows + '').val();
}

/**
 * Function for saving concrete row in the table...
 * @param counterOfTheRows concrete number of row
 */
function save_concrete_row(counterOfTheRows) {
    var meal_val = document.getElementById("meal_text" + counterOfTheRows).value;
    var description_val = document.getElementById("description_text" + counterOfTheRows).value;
    var price_val = document.getElementById("price_text" + counterOfTheRows).value;
    var ingredients_val = document.getElementById("ingredients_text" + counterOfTheRows).value;

    if ($foodTypeSelectedArray == ""
        || $foodTypeSelectedArray == null
        || !description_val.match($regexForInputDescription)
        || !price_val.match($regexForInputPrice)
        || $selectedIngredietsArray == null
        || $selectedIngredietsArray == "") {
        controlFoodInputs($foodTypeSelectedArray, description_val, price_val, counterOfTheRows, $selectedIngredietsArray);
    }
    else {
        $.ajax({
            url: "https://restaurant.memonil.com/meal",
            headers: {
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "PUT",
            data: JSON.stringify(
                {
                    "type": $foodTypeSelectedArray,
                    "description": description_val,
                    "price": price_val,
                    "ingredients": $selectedIngredietsArray,
                }),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                removeAlertTextForFood(counterOfTheRows);
                removeAlertClassesForFood(counterOfTheRows);
            },
        });
        document.getElementById("meal_row_input_" + counterOfTheRows).innerHTML = $foodTypeSelectedArray;
        document.getElementById("description_row_" + counterOfTheRows).innerHTML = description_val;
        document.getElementById("price_row_" + counterOfTheRows).innerHTML = price_val + " EUR";
        document.getElementById("ingredients_row_input_" + counterOfTheRows).innerHTML = ingredients_val;

        // hide selectpicker
        $('#selectPickerID' + counterOfTheRows + '').selectpicker('hide');
        $('#selectPickerIDType' + counterOfTheRows + '').selectpicker('hide');

        document.getElementById("edit_button_index_" + counterOfTheRows).style.display = "inline-block";
        document.getElementById("delete_button_index_" + counterOfTheRows).style.display = "inline-block";
        document.getElementById("save_button_index_" + counterOfTheRows).style.display = "none";
        // stops fce, otherwise it can happen that changes will be not stored beacuse location.reload will be quickier
        // as saving
        setTimeout(function () {
            location.reload(true);
        }, 100);
    }
}

/**
*  Function for adding concrete row in the table...
*/
function add_concrete_row() {
    var new_type = document.getElementById("new_type").value;
    var new_description = document.getElementById("new_description").value;
    var new_price = document.getElementById("new_price").value;
    var new_ingredients = document.getElementById("new_ingredients").value;

    // checking existing description because of (unique ID)
    for (var i = 0; i < $descriptionsArray.length; i++) {
        if ($descriptionsArray[i] === new_description) {
            $('#badDescription').empty().append("Wrong description (already exists)" + '<br>');
            $('#badDescription').addClass("alert alert-danger text-danger font-weight-bold text-center");
            return;
        }
    }

    // controller
    if ($foodTypeSelectedArray == ""
        || $foodTypeSelectedArray == null
        || !new_description.match($regexForInputDescription)
        || !new_price.match($regexForInputPrice)
        || $selectedIngredietsArray == null
        || $selectedIngredietsArray == "") {
        controlFoodInputs($foodTypeSelectedArray, new_description, new_price, 0, $selectedIngredietsArray);
    }
    else {
        $.ajax({
            url: "https://restaurant.memonil.com/meal",
            headers: {
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "POST",
            data: JSON.stringify(
                {
                    "type": $foodTypeSelectedArray,
                    "description": new_description,
                    "price": new_price,
                    "ingredients": $selectedIngredietsArray,
                }),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                var table = document.getElementById("foodTable");
                var table_len = (table.rows.length) - 1;
                table.insertRow(table_len).outerHTML =
                    "<tr id='row" + table_len + "' class='text-center'>" +
                    "<td id='meal_row_" + table_len + "'>" +
                    "<div class=\"row justify-content-center\">" +
                    "<div id='meal_row_input_" + table_len + "'>" + $foodTypeSelectedArray + "</div>" +
                    "<select id='selectPickerIDType" + table_len + "' class='selectpicker' data-live-search='true'></select>" +
                    "</div>" +
                    "<div id='badSelectType" + table_len + "'></div>" +
                    "</td>" +
                    "<td id='description_row_" + table_len + "'>" + new_description + "</td>" +
                    "<td id='price_row_" + table_len + "'>" + new_price + " EUR</td>" +
                    "<td id='ingredients_row_" + table_len + "'>" +
                    "<div class=\"row justify-content-center\">" +
                    "<div id='ingredients_row_input_" + table_len + "'>" + $selectedIngredietsArray + "</div>" +
                    "<select id='selectPickerID" + table_len + "' class='selectpicker' multiple data-live-search='true'></select>" +
                    "</div>" +
                    "<div id='badSelect" + table_len + "'></div>" +
                    "</td>" +
                    "<td>" +
                    "<div id=first class='row justify-content-center'>" +
                    "<input type='button' id='save_button_index_" + table_len + "' value='Save' class='save btn btn-green' onclick='save_concrete_row(" + table_len + ")'>" +
                    "<i id='edit_button_index_" + table_len + "' style='font-size: 40px;color:teal;' class='fa fa-edit edit' aria-hidden='true' onclick='edit_concrete_row(" + table_len + ")'></i>" +
                    "<i id='delete_button_index_" + table_len + "' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row(" + table_len + ")'></i>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";

                removeAlertTextForFood(table_len);
                removeAlertClassesForFood(table_len);

                // reset values of selectpicker
                $('#selectPickerID option').attr("selected", false);
                $('#selectPickerID option').selectpicker('refresh');
                $('#selectPickerIDType option').attr("selected", false);
                $('#selectPickerIDType option').selectpicker('refresh');

                document.getElementById("new_type").value = "";
                document.getElementById("new_description").value = "";
                document.getElementById("new_price").value = "";
                document.getElementById("new_ingredients").value = "";

                document.getElementById("edit_button_index_" + table_len).style.display = "inline-block";
                document.getElementById("save_button_index_" + table_len).style.display = "none";
            },
        });
    }
}

/**
 * Function for deleting concrete row in the table...
 * @param counterOfTheRows concrete number of row
 */
function delete_concrete_row(counterOfTheRows) {

    // cleaning
    $('#responseMesssageDeleteFood').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#responseMesssageDeleteFood').empty();

    var meal_val = document.getElementById("meal_row_input_" + counterOfTheRows).innerHTML;
    var description_val = document.getElementById("description_row_" + counterOfTheRows).innerHTML;
    var price_val = document.getElementById("price_row_" + counterOfTheRows).innerHTML;
    var ingredients_val = document.getElementById("ingredients_row_input_" + counterOfTheRows).innerHTML;

    var ingredientsArrayn = ingredients_val.split(",");

    // trim  EUR
    price_val = price_val.replace(" EUR", "");

    $('#confirmDeleteModalYes').off().on('click', function () {
        $.ajax({
            url: "https://restaurant.memonil.com/meal",
            headers: {
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "DELETE",
            data: JSON.stringify(
                {
                    "type": meal_val,
                    "description": description_val,
                    "price": price_val,
                    "ingredients": ingredientsArrayn,
                }),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                $('#responseMesssageDeleteFood').addClass("alert alert-success text-success font-weight-bold text-center");
                $('#responseMesssageDeleteFood').empty().append("Success");
                document.getElementById("row" + counterOfTheRows + "").outerHTML = "";
                $('#confirmDeleteModal').data('hideInterval', setTimeout(function () {
                    $('#confirmDeleteModal').modal('hide');
                }, 1000));
            },
        });
    });
}

/**
 * On ready function which fetch all data from API  https://restaurant.memonil.com/ with GET method
 * also checking selectpickers on change method which detects if something changed
 */
$(document).ready(function () {
    $('#selectPickerID').on('change', function () {
        $selectedIngredietsArray = $('#selectPickerID').val();
        $('#selectPickerID').selectpicker('refresh');
    });

    $('#selectPickerIDType').on('change', function () {
        $foodTypeSelectedArray = $('#selectPickerIDType').val();
        $('#selectPickerIDType').selectpicker('refresh');
    });

    var selectpickerID = document.getElementById('selectPickerID');
    var selectpickerIDType = document.getElementById('selectPickerIDType');

    for (var i = 0; i < $foodTypeArray.length; i++) {
        newOption = document.createElement("option");
        selectpickerIDType.appendChild(newOption);
        newOption.innerHTML = $foodTypeArray[i];
        $('#selectpickerIDType').selectpicker('refresh');
    }

    // take all ingredients
    $.ajax({
        url: "https://restaurant.memonil.com/ingredient",
        type: "GET",
        headers: {
            "Authorization": sessionStorage.getItem("jwtToken")
        },
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            var JsonObject = JSON.parse(response);
            for (var key in JsonObject) {
                $ingredientsArray.push(JsonObject[key].name);
            }
            for (var i = 0; i < $ingredientsArray.length; i++) {
                newOption = document.createElement("option");
                selectpickerID.appendChild(newOption);
                newOption.innerHTML = $ingredientsArray[i];
                $('#selectPickerID').selectpicker('refresh');
            }
        }
    });

    $.ajax({
        url: "https://restaurant.memonil.com/meals",
        type: "GET",
        headers: {
            "Authorization": sessionStorage.getItem("jwtToken")
        },
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            var JsonObject = JSON.parse(response);
            // timeout for selecpicker... 0.05s
            setTimeout(function () {
                for (var key in JsonObject) {
                    var table = document.getElementById("foodTable");
                    var table_len = (table.rows.length) - 1;
                    table.insertRow(table_len).outerHTML =
                        "<tr id='row" + table_len + "' class='text-center'>" +
                        "<td id='meal_row_" + table_len + "'>" +
                        "<div class='row justify-content-center'>" +
                        "<div id='meal_row_input_" + table_len + "'>" + JsonObject[key].type + "</div>" +
                        "<select id='selectPickerIDType" + table_len + "' class='selectpicker' data-live-search='true'></select>" +
                        "</div>" +
                        "<div id='badSelectType" + table_len + "'></div>" +
                        "</td>" +
                        "<td id='description_row_" + table_len + "'>" + JsonObject[key].description + "</td>" +
                        "<td id='price_row_" + table_len + "'>" + JsonObject[key].price + " EUR</td>" +
                        "<td id='ingredients_row_" + table_len + "'>" +
                        "<div class='row justify-content-center'>" +
                        "<div id='ingredients_row_input_" + table_len + "'>" + JsonObject[key].ingredients + "</div>" +
                        "<select id='selectPickerID" + table_len + "' class='selectpicker' multiple data-live-search='true'></select>" +
                        "</div>" +
                        "<div id='badSelect" + table_len + "'></div>" +
                        "</td>" +
                        "<td>" +
                        "<div id=first class='row justify-content-center'>" +
                        "<input type='button' id='save_button_index_" + table_len + "' value='Save' class='save btn btn-green' onclick='save_concrete_row(" + table_len + ")'>" +
                        "<i id='edit_button_index_" + table_len + "' style='font-size: 40px;color:teal;' class='fa fa-edit edit' aria-hidden='true' onclick='edit_concrete_row(" + table_len + ")'></i>" +
                        "<i id='delete_button_index_" + table_len + "' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row(" + table_len + ")'></i>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                    document.getElementById("delete_button_index_" + table_len).style.display = "inline-block";
                    document.getElementById("save_button_index_" + table_len).style.display = "none";

                    // storing all descriptions in the array
                    $descriptionsArray.push(JsonObject[key].description);
                    // hide selectpicker
                    $('selectPickerID' + table_len + '').selectpicker('hide');
                    $('#selectPickerIDType' + table_len + '').selectpicker('hide');
                }
            }, 50);
        },
    });
});

/**
 * Controller of inputs
 * @use removeAlertTextForFood()
 * @use removeAlertClassesForFood()
 * @param $foodTypeSelectedArray array of selected foods
 * @param new_description description of food in the concrete row
 * @param new_price price of food in the concrete row
 * @param counterOfTheRows concrete row
 * @param $selectedLength array of selected ingredients
 */
function controlFoodInputs($foodTypeSelectedArray, new_description, new_price, counterOfTheRows, $selectedLength) {
    removeAlertTextForFood(counterOfTheRows);
    removeAlertClassesForFood(counterOfTheRows);

    if (counterOfTheRows < 1) {
        if ($foodTypeSelectedArray == "" || $foodTypeSelectedArray == null) {
            $('#badSelectType').empty().append("Wrong select (you must select 1 option)" + '<br>');
            $('#badSelectType').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if (!new_description.match($regexForInputDescription)) {
            $('#badDescription').empty().append("Wrong description (at least 3 chars long)" + '<br>');
            $('#badDescription').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if (!new_price.match($regexForInputPrice)) {
            $('#badPrice').empty().append("Wrong format (example: 0.00)" + '<br>');
            $('#badPrice').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if ($selectedLength == "" || $selectedLength == null) {
            $('#badSelect').empty().append("Wrong select (at least 1 select)" + '<br>');
            $('#badSelect').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
    }
    else {
        if ($foodTypeSelectedArray == "" || $foodTypeSelectedArray == null) {
            $('#meal_row_' + counterOfTheRows + '').append("<div " + "id='badSelectType" + counterOfTheRows + "'>Wrong select (you must select 1 option)</div>");
            $('#badSelectType' + counterOfTheRows + '').addClass("alert alert-danger text-danger font-weight-bold text-center")
        }
        if (!new_description.match($regexForInputDescription)) {
            $('#description_row_' + counterOfTheRows + '').append("<div " + "id='badDescription" + counterOfTheRows + "'>Wrong description (at least 3 chars long)</div>");
            $('#badDescription' + counterOfTheRows + '').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if (!new_price.match($regexForInputPrice)) {
            $('#price_row_' + counterOfTheRows + '').append("<div " + "id='badPrice" + counterOfTheRows + "'>Wrong format (example: 0.00)</div>");
            $('#badPrice' + counterOfTheRows + '').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if ($selectedLength == null || $selectedLength == "") {
            $('#ingredients_row_' + counterOfTheRows + '').append("<div " + "id='badSelect" + counterOfTheRows + "'>Wrong select (at least 1 select)</div>");
            $('#badSelect' + counterOfTheRows + '').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
    }
}

/**
 * Cleaning function for text
 * @param counterOfTheRows concrete row in the table
 */
function removeAlertTextForFood(counterOfTheRows) {
    // removing text
    // for first only
    $('#badSelectType').empty();
    $('#badDescription').empty();
    $('#badPrice').empty();
    $('#badSelect').empty();
    if (counterOfTheRows > 0) {
        $('#badSelectType' + counterOfTheRows + '').remove();
        $('#badDescription' + counterOfTheRows + '').remove();
        $('#badPrice' + counterOfTheRows + '').remove();
        $('#badSelect' + counterOfTheRows + '').remove();
    }
}

/**
 * Cleaning function for classes
 * @param counterOfTheRows concrete row in the table
 */
function removeAlertClassesForFood(counterOfTheRows) {
    // removing alert classes
    $('#badSelectType').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badDescription').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badPrice').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badSelect').removeClass("alert alert-success text-success font-weight-bold text-center");
    if (counterOfTheRows > 0) {
        $('#badSelectType' + counterOfTheRows + '').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badDescription' + counterOfTheRows + '').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badPrice' + counterOfTheRows + '').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badSelect' + counterOfTheRows + '').removeClass("alert alert-success text-success font-weight-bold text-center");
    }
}

