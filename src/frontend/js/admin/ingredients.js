// array of ingredients
$ingredientsArray = ["wheat", "crustaceans", "eggs", "fish", "peanuts", "soybeans", "milk", "nuts", "celery"];
// selected array of ingredeints
$selectedIngredientsArray = [];

$regexForInputNameOfIngredient = "^.{3}.*$";

function add_concrete_row() {
    console.log("add here");
    var new_nameOfAlergen = document.getElementById("new_nameOfAlergen").value;

    // musi zadat nejaky input...
    if (!new_nameOfAlergen.match($regexForInputNameOfIngredient)) {
        $('#badNameOfAlergen').empty().append("Wrong name of alergen (at least 3 chars long)" + '<br>');
        $('#badNameOfAlergen').addClass("alert alert-danger text-danger font-weight-bold text-center");
        return;
    }
    else {
        var table = document.getElementById("ingredientsTable");
        var table_len = (table.rows.length) - 1;
        table.insertRow(table_len).outerHTML =
            "<tr id='row" + table_len + "'>" +
            "<td id='nameOfAlergen_row_" + table_len + "'>" + new_nameOfAlergen + "</td>" +
            "<td id='alergens_row_" + table_len + "' class='text-center'>" + $selectedIngredientsArray + "</td>" +
            "<td>" +
            "<div id=first class='row justify-content-center'>" +
            "<i id='delete_button_index_" + table_len + "' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row(" + table_len + ")'></i>" +
            "</div>" +
            "</td>" +
            "</tr>";

        // TODO: spravit to s
        $.ajax({
            url: "https://restaurant.memonil.com/ingredient",
            headers: {
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "POST",
            data: JSON.stringify(
                {
                    "name": new_nameOfAlergen,
                    "allergens": $selectedIngredientsArray,
                }),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("POST method");
                $('#badNameOfAlergen').empty();
                $('#badNameOfAlergen').removeClass("alert alert-danger text-danger font-weight-bold text-center");

                // unchecknutie po pridani
                $('#selectPickerID option').attr("selected", false);
                $('#selectPickerID').selectpicker('refresh');
            },
        });

        document.getElementById("new_nameOfAlergen").value = "";
    }
}

function delete_concrete_row(counterOfTheRows) {
    console.log("delete here");

    // vycistenie
    $('#responseMessageDeleteEmployee').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#responseMessageDeleteEmployee').empty();

    var nameOfAlergen_val = document.getElementById("nameOfAlergen_row_" + counterOfTheRows).innerHTML;

    console.log($selectedIngredientsArray);

    console.log("toto posielam" + "\n" +
        "N:" + nameOfAlergen_val + "\n" +
        "A:" + JSON.stringify($selectedIngredientsArray) + "\n");

    $('#confirmDeleteModalYes').off().on('click', function () {
        $.ajax({
            url: "https://restaurant.memonil.com/ingredient",
            headers: {
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "DELETE",
            data: JSON.stringify(
                {
                    "name": nameOfAlergen_val,
                    "allergens": $selectedIngredientsArray,
                }),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("DELETE method");
                $('#responseMessageDeleteEmployee').addClass("alert alert-success text-success font-weight-bold text-center");
                $('#responseMessageDeleteEmployee').empty().append("Success");
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
    console.log("hi i am hrere...");

    $('#selectPickerID').on('change', function () {
        $selectedIngredientsArray = $('#selectPickerID').val();
        console.log($selectedIngredientsArray); // ziskanie vsetkych hodnot z select pickeru..
        console.log("This is out of ->" + $selectedIngredientsArray); // ziskanie vsetkych hodnot z select pickeru..
    });

    var selectpickerID = document.getElementById('selectPickerID');
    // naplnenie selecpickeru hodnotami
    for (var i = 0; i < $ingredientsArray.length; i++) {
        console.log("Pridavam2 -> " + $ingredientsArray[i]);
        newOption = document.createElement("option");
        selectpickerID.appendChild(newOption);
        newOption.innerHTML = $ingredientsArray[i];
        $('#selectPickerID').selectpicker('refresh');
    }

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
                var table = document.getElementById("ingredientsTable");
                var table_len = (table.rows.length) - 1;
                table.insertRow(table_len).outerHTML =
                    "<tr id='row" + table_len + "'>" +
                    "<td id='nameOfAlergen_row_" + table_len + "'>" + JsonObject[key].name + "</td>" +
                    "<td id='alergens_row_" + table_len + "' data-toggle='modal' data-target='#selectedAlergensCheckBoxModal' class='text-center' >" + JsonObject[key].allergens + "</td>" +
                    "<td>" +
                    "<div id='first' class='row justify-content-center'>" +
                    "<input type='button' id='save_button_index_" + table_len + "' value='Save' class='save btn btn-green' onclick='save_concrete_row(" + table_len + ")'></i>" +
                    "<i id='delete_button_index_" + table_len + "' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row(" + table_len + ")'></i>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";

                document.getElementById("delete_button_index_" + table_len).style.display = "inline-block";
                document.getElementById("save_button_index_" + table_len).style.display = "none";
            }
        }
    });
});








