// array of unique ID (description)
var $descriptionsArray = [];
// --------------------------------
var $ingredientsArray = [];
// array of selected ingredients
var $selectedIngredietsArray = [];
// --------------------------------
// array of all type of food
var $foodTypeArray = ["", "meat", "pizza", "soup", "drink"];
// array of selected type of food
var $foodTypeSelectedArray;

// regexes
$regexForInputType = "^.{3}.*$";
$regexForInputDescription = "^.{3}.*$";
$regexForInputPrice = "^[0-9]+.[0-9]{2}$";
$regexForInputIngredients = "^.{3}.*$";

function edit_concrete_row(counterOfTheRows) {
    console.log("edit here");
    document.getElementById("edit_button_index_" + counterOfTheRows).style.display = "none";
    document.getElementById("delete_button_index_" + counterOfTheRows).style.display = "none";
    document.getElementById("save_button_index_" + counterOfTheRows).style.display = "inline-block";
    // ukazeme selectpicker
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
    console.log("This is ingredients arrary -> " + $selectedIngredietsArray);
    console.log("This is type of food arary -> " + $foodTypeSelectedArray);

    // naplnenie type selecpickeru na jedlo
    for (var i = 0; i < $foodTypeArray.length; i++) {
        newOption = document.createElement("option");
        selectPickerFoodRow.appendChild(newOption);
        newOption.innerHTML = $foodTypeArray[i];
        $('#selectPickerIDType' + counterOfTheRows + '').selectpicker('refresh');
    }

    // naplnenie jednotliveho selectpickeru...
    for (var i = 0; i < $ingredientsArray.length; i++) {
        newOption = document.createElement("option");
        selectPickerRow.appendChild(newOption);
        newOption.innerHTML = $ingredientsArray[i];
        $('#selectPickerID' + counterOfTheRows + '').selectpicker('refresh');
    }

    // ziskanie ze sa zmeni selectnutych ingredientcii
    $('#selectPickerID' + counterOfTheRows + '').off().on('change', function () {
        $selectedIngredietsArray = $('#selectPickerID' + counterOfTheRows + '').val();
        console.log("Toto je selectpickerIngredicii ->" + $selectedIngredietsArray); // ziskanie vsetkych hodnot z select pickeru..
        $('#selectPickerID' + counterOfTheRows + '').selectpicker('refresh');

    });
    // ziskanie ze sa zmeni selectnutych jedla....
    $('#selectPickerIDType' + counterOfTheRows + '').off().on('change', function () {
        $foodTypeSelectedArray = $('#selectPickerIDType' + counterOfTheRows + '').val();
        console.log("Toto je selectPickerTypJedla ->" + $foodTypeSelectedArray); // ziskanie vsetkych hodnot z select pickeru..
        $('#selectPickerIDType' + counterOfTheRows + '').selectpicker('refresh');

    });

    // budu selectnute vsetky co su v riadku v ingrediecnii
    $('#selectPickerID' + counterOfTheRows + '').selectpicker('val', $selectedIngredietsArray);
    $('#selectPickerID' + counterOfTheRows + '').val();
    // budu selectnuta moznost v type of jedla
    $('#selectPickerIDType' + counterOfTheRows + '').selectpicker('val', $foodTypeSelectedArray);
    $('#selectPickerIDType' + counterOfTheRows + '').val();
}


function save_concrete_row(counterOfTheRows) {

    console.log("save here");
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
        console.log("here");


        console.log("save tohoto jedla" + $foodTypeSelectedArray);
        controlFoodInputs($foodTypeSelectedArray, description_val, price_val, counterOfTheRows, $selectedIngredietsArray);
    }
    else {
        console.log($selectedIngredietsArray);
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
                // handle the response
                console.log(response);
                console.log("PUT method");
                removeAlertTextForFood(counterOfTheRows);
                removeAlertClassesForFood(counterOfTheRows);
            },
        });
        document.getElementById("meal_row_input_" + counterOfTheRows).innerHTML = $foodTypeSelectedArray;
        document.getElementById("description_row_" + counterOfTheRows).innerHTML = description_val;
        document.getElementById("price_row_" + counterOfTheRows).innerHTML = price_val + " EUR";
        document.getElementById("ingredients_row_input_" + counterOfTheRows).innerHTML = ingredients_val;
        // skryt selectpicker
        $('#selectPickerID' + counterOfTheRows + '').selectpicker('hide');
        $('#selectPickerIDType' + counterOfTheRows + '').selectpicker('hide');

        document.getElementById("edit_button_index_" + counterOfTheRows).style.display = "inline-block";
        document.getElementById("delete_button_index_" + counterOfTheRows).style.display = "inline-block";
        document.getElementById("save_button_index_" + counterOfTheRows).style.display = "none";
        // pozastavanie fce inak by doslo k situacii ze by sa prv reloadla a nezachovalavi by sa zmeny
        setTimeout(function () {
            location.reload(true);
        }, 100);
    }
}

function add_concrete_row() {
    console.log("add here");
    var new_type = document.getElementById("new_type").value;
    var new_description = document.getElementById("new_description").value;
    var new_price = document.getElementById("new_price").value;
    var new_ingredients = document.getElementById("new_ingredients").value;

    // kontrola existujuceho description
    for (var i = 0; i < $descriptionsArray.length; i++) {
        console.log("array -> " + $descriptionsArray[i]);
        if ($descriptionsArray[i] === new_description) {
            $('#badDescription').empty().append("Wrong description (already exists)" + '<br>');
            $('#badDescription').addClass("alert alert-danger text-danger font-weight-bold text-center");
            return;
        }
    }

    // sem bude kontrola
    if ($foodTypeSelectedArray == ""
        || $foodTypeSelectedArray == null
        || !new_description.match($regexForInputDescription)
        || !new_price.match($regexForInputPrice)
        || $selectedIngredietsArray == null
        || $selectedIngredietsArray == "") {

        if ($foodTypeSelectedArray == "") {
            console.log("array ma '' ");
        }
        if ($selectedIngredietsArray == "") {
            console.log("food array je prazdny");
        }

        console.log("wrong");
        console.log("This is food selected array -> " + $foodTypeSelectedArray);
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
                // handle the response
                console.log(response);

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


                console.log("POST method");
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

function delete_concrete_row(counterOfTheRows) {
    console.log("delete here");

    // vycistenie
    $('#responseMesssageDeleteFood').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#responseMesssageDeleteFood').empty();

    var meal_val = document.getElementById("meal_row_input_" + counterOfTheRows).innerHTML;
    var description_val = document.getElementById("description_row_" + counterOfTheRows).innerHTML;
    var price_val = document.getElementById("price_row_" + counterOfTheRows).innerHTML;
    var ingredients_val = document.getElementById("ingredients_row_input_" + counterOfTheRows).innerHTML;

    var ingredientsArrayn = ingredients_val.split(",");

    console.log(ingredientsArrayn);

    // orezanie o EUR
    price_val = price_val.replace(" EUR", "");

    console.log("toto posielam" + "\n" +
        "M:" + meal_val + "\n" +
        "D:" + description_val + "\n" +
        "P:" + price_val + "\n" +
        "I:" + JSON.stringify(ingredientsArrayn) + "\n");

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
                // handle the response
                console.log(response);
                console.log("DELETE method");

                $('#responseMesssageDeleteFood').addClass("alert alert-success text-success font-weight-bold text-center");
                $('#responseMesssageDeleteFood').empty().append("Success");
                console.log("delete row");
                document.getElementById("row" + counterOfTheRows + "").outerHTML = "";
                $('#confirmDeleteModal').data('hideInterval', setTimeout(function () {
                    $('#confirmDeleteModal').modal('hide');
                }, 1000));
            },
        });
    });
}

$(document).ready(function () {
    $('#selectPickerID').on('change', function () {
        $selectedIngredietsArray = $('#selectPickerID').val();
        console.log($selectedIngredietsArray); // ziskanie vsetkych hodnot z select pickeru..
        $('#selectPickerID').selectpicker('refresh');
    });

    $('#selectPickerIDType').on('change', function () {
        $foodTypeSelectedArray = $('#selectPickerIDType').val();
        console.log($foodTypeSelectedArray); // ziskanie vsetkych hodnot z select pickeru..
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

    // zobrat si vsetky ingrediencie
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
            console.log(response);
            console.log("GET method");
            for (var key in JsonObject) {
                $ingredientsArray.push(JsonObject[key].name);
            }
            console.log("This is the array -> " + $ingredientsArray);
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
            // handle the response
            var JsonObject = JSON.parse(response);
            console.log(response);
            console.log("GET method");
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

                    // ulozim si taktiez vsetky username do sessionStorage...
                    $descriptionsArray.push(JsonObject[key].description);
                    // schovanie selectpickeru
                    $('selectPickerID' + table_len + '').selectpicker('hide');
                    $('#selectPickerIDType' + table_len + '').selectpicker('hide');
                }
            }, 50);
        },
    });
});


function controlFoodInputs($foodTypeSelectedArray, new_description, new_price, counterOfTheRows, $selectedLength) {
    removeAlertTextForFood(counterOfTheRows);
    removeAlertClassesForFood(counterOfTheRows);

    console.log("Pocet riadkov -> " + counterOfTheRows);
    if (counterOfTheRows < 1) {
        if ($foodTypeSelectedArray == "" || $foodTypeSelectedArray == null) {
            console.log("prazdny znak");
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
        console.log("This is pole ingredincii ->" + $selectedLength);
        console.log("This is pole jedla ->" + $foodTypeSelectedArray);

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

