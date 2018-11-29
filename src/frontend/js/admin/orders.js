// array of foood
$foodArray = [];
// array of selected items...
var $selected = [];

// regexes
$regexForInputTableID= "^[0-9]+$";
$regexForInputOrderID = "^[0-9]+$";
$regexForInputMeals = "^.{3}.*$";

function add_concrete_row()
{
    console.log("ADD here");
    var new_tableNumber=document.getElementById("new_table_number").value;
    var new_meals=document.getElementById("new_meals").value;

    // vycistenie existujuceho order id ...
    $('#badTableOrder').empty();
    $('#badTableOrder').removeClass("alert alert-danger text-danger font-weight-bold text-center");

    console.log("posiela sa : " +
    "\nTable number:" + new_tableNumber+
        "\nMEALS:" + $selected);

    // sem bude kontrola
    if(!new_tableNumber.match($regexForInputOrderID)
        || $selected.length < 1){

        console.log("wrong");
        controlOrderInputs(new_tableNumber,  0, $selected.length);
        return;
    }
    else{
        $.ajax({
            url: "https://restaurant.memonil.com/order",
            headers:{
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "POST",
            data: JSON.stringify(
                {   "table_id":   new_tableNumber,
                    "meals": $selected,
                } ),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                var table=document.getElementById("orderTable");
                var table_len=(table.rows.length)-1;
                table.insertRow(table_len).outerHTML=
                    "<tr id='row"+table_len+"' class='text-center'>" +
                    "<td></td>" +
                    "<td id='table_row_"+table_len+"'>"+new_tableNumber+"</td>" +
                    "<td id='meal_row_"+table_len+"'>"+$selected+"" +
                    "<td></td>" +
                    "<td></td>" +
                    "<td></td>" +
                    "</td>" +
                    "<td>" +
                    "<div id=first class='row justify-content-center'>" +
                    "<input type='button' id='save_button_index_"+table_len+"' value='Save' class='save btn btn-green' onclick='save_concrete_row("+table_len+")'>" +
                    "<i id='edit_button_index_"+table_len+"' style='font-size: 40px;color:teal;' class='fa fa-edit edit' aria-hidden='true' onclick='edit_concrete_row("+table_len+")'></i>" +
                    "<i id='delete_button_index_"+table_len+"' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row("+table_len+")'></i>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";

                console.log("POST method");
                removeAlertTextForOrder(table_len);
                removeAlertClassesForOrder(table_len);

                document.getElementById("new_table_number").value="";
                document.getElementById("new_meals").value="";

                document.getElementById("edit_button_index_"+table_len).style.display="inline-block";
                document.getElementById("delete_button_index_"+table_len).style.display="inline-block";
                document.getElementById("save_button_index_"+table_len).style.display="none";
                location.reload(true);
            },
        });
    }
}

function delete_concrete_row(counterOfTheRows)
{
    console.log("delete here");

    // vycistenie
    $('#responseMesssageDeleteOrder').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#responseMesssageDeleteOrder').empty();

    var order_val=document.getElementById("order_row_"+counterOfTheRows).innerHTML;
    var meal_val=document.getElementById("meal_row_"+counterOfTheRows).innerHTML;

    var foddArrays = meal_val.split(",");
    console.log(foddArrays);


    console.log("toto posielam" + "\n" +
        "ORDER:" + order_val + "\n" +
        "MEAL:" + meal_val + "\n");

    $('#confirmDeleteModalYes').off().on('click',function(){
        $.ajax({
            url: "https://restaurant.memonil.com/order",
            headers:{
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "DELETE",
            data: JSON.stringify(
                {   "order_id":   order_val,
                    "meals":      foddArrays,
                } ),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("DELETE method");

                $('#responseMesssageDeleteOrder').addClass("alert alert-success text-success font-weight-bold text-center");
                $('#responseMesssageDeleteOrder').empty().append("Success");
                console.log("delete row");
                document.getElementById("row"+counterOfTheRows+"").outerHTML="";
                $('#confirmDeleteModal').data('hideInterval', setTimeout(function(){
                    $('#confirmDeleteModal').modal('hide');
                }, 1000));
            },
        });
    });
}

function edit_concrete_row(counterOfTheRows)
{
    console.log("edit here");
    document.getElementById("edit_button_index_"+counterOfTheRows).style.display="none";
    document.getElementById("delete_button_index_"+counterOfTheRows).style.display="none";
    document.getElementById("save_button_index_"+counterOfTheRows).style.display="inline-block";

    var table=document.getElementById("table_row_"+counterOfTheRows);
    var meal=document.getElementById("meal_row_"+counterOfTheRows);

    var table_data=table.innerHTML;
    var meal_data=meal.innerHTML;


    table.innerHTML="<input class='form-control' type='text' id='table_text"+counterOfTheRows+"' value='"+table_data+"'>";
    meal.innerHTML="<input class='form-control' type='text' id='meal_text"+counterOfTheRows+"' value='"+meal_data+"' disabled>";
}

function save_concrete_row(counterOfTheRows)
{
    console.log("save here");
    var table_val=document.getElementById("table_text"+counterOfTheRows).value;
    var meal_val=document.getElementById("meal_text"+counterOfTheRows).value;

    document.getElementById("table_row_"+counterOfTheRows).innerHTML=table_val;
    document.getElementById("meal_row_"+counterOfTheRows).innerHTML=meal_val;

    document.getElementById("edit_button_index_"+counterOfTheRows).style.display="inline-block";
    document.getElementById("delete_button_index_"+counterOfTheRows).style.display="inline-block";
    document.getElementById("save_button_index_"+counterOfTheRows).style.display="none";
}

$( document ).ready(function()  {
    $('.selectpicker').on('change', function(){
        $selected = $('.selectpicker').val();
        console.log($selected); // ziskanie vsetkych hodnot z select pickeru..
        console.log("This is out of ->" + $selected); // ziskanie vsetkych hodnot z select pickeru..
    });

    var selectpickerID = document.getElementById('selectPickerID');

    // zobrat si vsetky jedla
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
                $foodArray.push(JsonObject[key].description);
            }
            console.log("This is the array -> " + $foodArray);
            for (var i = 0; i < $foodArray.length; i++) {
                console.log("Pridavam2 -> " + $foodArray[i]);
                newOption = document.createElement("option");
                selectpickerID.appendChild(newOption);
                newOption.innerHTML = $foodArray[i];
                $('.selectpicker').selectpicker('refresh');
            }
        }
    });

    $.ajax({
        url: "https://restaurant.memonil.com/order",
        type: "GET",
        headers:{
            "Authorization": sessionStorage.getItem("jwtToken")
        },
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            var JsonObject = JSON.parse(response);
            console.log(response);
            console.log("GET method");
            for (var key in JsonObject) {
                var table=document.getElementById("orderTable");
                var table_len=(table.rows.length)-1;
                table.insertRow(table_len).outerHTML=
                    "<tr id='row"+table_len+"' class='text-center'>" +
                    "<td id='order_row_"+table_len+"'>"+JsonObject[key].id+"</td>" +
                    "<td id='table_row_"+table_len+"'>"+JsonObject[key].table_id+"</td>" +
                    "<td id='meal_row_"+table_len+"'>"+JsonObject[key].meals+"</td>" +
                    "<td id='price_row_"+table_len+"'>"+JsonObject[key].price+" EUR</td>" +
                    "<td id='ingredients_row_"+table_len+"'>"+JsonObject[key].date+"</td>" +
                    "<td id='ingredients_row_"+table_len+"'>"+JsonObject[key].served_by+"</td>" +
                    "<td>" +
                    "<div id=first class='row justify-content-center'>" +
                    "<input type='button' id='save_button_index_"+table_len+"' value='Save' class='save btn btn-green' onclick='save_concrete_row("+table_len+")'>" +
                    "<i id='edit_button_index_"+table_len+"' style='font-size: 40px;color:teal;' class='fa fa-edit edit' aria-hidden='true' onclick='edit_concrete_row("+table_len+")'></i>" +
                    "<i id='delete_button_index_"+table_len+"' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row("+table_len+")'></i>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";

                document.getElementById("edit_button_index_"+table_len).style.display="inline-block";
                document.getElementById("delete_button_index_"+table_len).style.display="inline-block";
                document.getElementById("save_button_index_"+table_len).style.display="none";

            }
        },
    });
});


function controlOrderInputs(new_tableOrder, new_tableNumber , counterOfTheRows, $selectedLength){
    removeAlertTextForOrder(counterOfTheRows);
    removeAlertClassesForOrder(counterOfTheRows);

    console.log("Pocet riadkov -> " + counterOfTheRows );
    if(counterOfTheRows < 1){
        if(!new_tableNumber.match($regexForInputOrderID)){
            $('#badTableNumber').empty().append("Wrong table number (must be number)" + '<br>');
            $('#badTableNumber').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if($selectedLength < 1){
            console.log("Pocet selektnutych -> " + $selectedLength);
            $('#badSelectItems').empty().append("Wrong select (at least 1 select)" + '<br>');
            $('#badSelectItems').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
    }
    else{
        if(!new_tableNumber.match($regexForInputOrderID)){
            $('#table_row_' + counterOfTheRows+'').append("<div " + "id='badTableNumber"+counterOfTheRows+"'>Wrong table number (must be number)</div>");
            $('#badTableNumber' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!$selectedLength.match($regexForInputMeals)){
            $('#meal_row_' + counterOfTheRows+'').append("<div " + "id='badSelectItems"+counterOfTheRows+"'>Wrong select (at least 1 select)</div>");
            $('#badSelectItems' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
    }
}

function removeAlertTextForOrder(counterOfTheRows){
    // removing text
    // for first only
    $('#badTableNumber').empty();
    $('#badSelectItems').empty();
    if(counterOfTheRows > 0){
        $('#badTableNumber' + counterOfTheRows+'').remove();
        $('#badSelectItems' + counterOfTheRows+'').remove();
    }
}

function removeAlertClassesForOrder(counterOfTheRows){
    // removing alert classes
    $('#badTableNumber').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badSelectItems').removeClass("alert alert-success text-success font-weight-bold text-center");
    if(counterOfTheRows > 0){
        $('#badTableNumber' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badSelectItems' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
    }
}