// array of foood
$foodArray = [];
// array of orderNumbers
$orderArray = [];
// array of selected items...
var $selected = [];

// regexes
$regexForInputTableID= "^[0-9]+$";
$regexForInputOrderID = "^[0-9]+$";
$regexForInputMeals = "^.{3}.*$";

function add_concrete_row()
{
    console.log("ADD here");
    var new_tableOrder=document.getElementById("new_table_order").value;
    var new_tableNumber=document.getElementById("new_table_number").value;
    var new_meals=document.getElementById("new_meals").value;

    // kontrola existujuceho description
    for(var i = 0; i < $orderArray.length; i++){
        console.log("array -> " +  $orderArray[i]);
        if($orderArray[i] == new_tableOrder){
            $('#badTableOrder').empty().append("Wrong order number (already exists)" + '<br>');
            $('#badTableOrder').addClass("alert alert-danger text-danger font-weight-bold text-center");
            return;
        }
    }
    console.log("posiela sa : " +
        "\nTO:" + new_tableOrder +
    "\nTN:" + new_tableNumber+
        "\nMEALS:" + new_meals);

    // sem bude kontrola
    // if(!new_tableOrder.match($regexForInputTableID)
    //     || !new_tableNumber.match($regexForInputOrderID)
    //     || $selected.length < 1){
    //
    //     console.log("wrong");
    //     controlOrderInputs(new_tableOrder, new_tableNumber,  0, $selected.length);
    // }
    // else{
    //     $.ajax({
    //         url: "https://restaurant.memonil.com/meal",
    //         headers:{
    //             "Authorization": sessionStorage.getItem("jwtToken")
    //         },
    //         type: "POST",
    //         data: JSON.stringify(
    //             {   "id":   new_tableOrder,
    //                 "table_id":   new_tableNumber,
    //                 "meals": $selected,
    //             } ),
    //         contentType: 'application/json;charset=UTF-8',
    //         success: function (response) {
    //             // handle the response
    //             console.log(response);
    //
    //
    //         },
    //     });
    // }
    var table=document.getElementById("foodTable");
    var table_len=(table.rows.length)-1;
    table.insertRow(table_len).outerHTML=
        "<tr id='row"+table_len+"' class='text-center'>" +
        "<td id='order_row_"+table_len+"'>"+new_tableOrder+"</td>" +
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
    // removeAlertTextForOrder(table_len);
    // removeAlertClassesForOrder(table_len);

    document.getElementById("new_tableOrder").value="";
    document.getElementById("new_tableNumber").value="";
    document.getElementById("new_meals").value="";

    document.getElementById("save_button_index_"+table_len).style.display="none";
    document.getElementById("edit_button_index_"+table_len).style.display="inline-block";
    console.log("som tu...");
}




$( document ).ready(function()  {
    $('.selectpicker').on('change', function(){
        $selected = $('.selectpicker').val();
        console.log($selected); // ziskanie vsetkych hodnot z select pickeru..
        console.log("Toto je dlzka " +$selected.length);
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
                var table=document.getElementById("foodTable");
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

                $orderArray.push(JsonObject[key].id);

                document.getElementById("delete_button_index_"+table_len).style.display="inline-block";
                document.getElementById("save_button_index_"+table_len).style.display="none";

            }
        },
    });
});


function controlOrderInputs(new_tableOrder, new_tableNumber , counterOfTheRows, $selectedLength){
    // removeAlertTextForFood(counterOfTheRows);
    // removeAlertClassesForFood(counterOfTheRows);

    console.log("Pocet riadkov -> " + counterOfTheRows );
    if(counterOfTheRows < 1){
        if(!new_tableOrder.match($regexForInputTableID)){
            $('#badTableOrder').empty().append("Wrong table number (must be number)" + '<br>');
            $('#badTableOrder').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
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
    // else{
    //
    //     if(!new_tableOrder.match($regexForInputTableID)){
    //         $('#order_row_' + counterOfTheRows+'').append("<div " + "id='badTableOrder"+counterOfTheRows+"'>Wrong table number (must be number)</div>");
    //         $('#badTableOrder' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center")
    //     }
    //     if(!new_tableNumber.match($regexForInputOrderID)){
    //         $('#table_row_' + counterOfTheRows+'').append("<div " + "id='badTableNumber"+counterOfTheRows+"'>Wrong table number (must be number)</div>");
    //         $('#badTableNumber' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
    //     }
    //     if(!$selectedLength.match($regexForInputMeals)){
    //         $('#meal_row_' + counterOfTheRows+'').append("<div " + "id='badSelectItems"+counterOfTheRows+"'>Wrong select (at least 1 select)</div>");
    //         $('#badSelectItems' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
    //     }
    // }
}

function removeAlertTextForOrder(counterOfTheRows){
    // removing text
    // for first only
    $('#badTableOrder').empty();
    $('#badTableNumber').empty();
    $('#badSelectItems').empty();
    if(counterOfTheRows > 0){
        $('#badTableOrder' + counterOfTheRows+'').remove();
        $('#badTableNumber' + counterOfTheRows+'').remove();
        $('#badSelectItems' + counterOfTheRows+'').remove();
    }
}

function removeAlertClassesForOrder(counterOfTheRows){
    // removing alert classes
    $('#badTableOrder').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badTableNumber').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badSelectItems').removeClass("alert alert-success text-success font-weight-bold text-center");
    if(counterOfTheRows > 0){
        $('#badTableOrder' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badTableNumber' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badSelectItems' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
    }
}