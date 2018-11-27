// array of unique ID (description)
var $descriptionsArray = [];
// array of selected items...
var $selected = [];
// array of all ingrediencies
var $ingredientsArray = [];

// regexes
$regexForInputType = "^.{3}.*$";
$regexForInputDescription = "^.{3}.*$";
$regexForInputPrice = "^[0-9].[0-9]{2}$";
$regexForInputIngredients = "^.{3}.*$";


function edit_concrete_row(counterOfTheRows)
{
    console.log("edit here");
    document.getElementById("edit_button_index_"+counterOfTheRows).style.display="none";
    document.getElementById("delete_button_index_"+counterOfTheRows).style.display="none";
    document.getElementById("save_button_index_"+counterOfTheRows).style.display="inline-block";

    var meal=document.getElementById("meal_row_"+counterOfTheRows);
    var description=document.getElementById("description_row_"+counterOfTheRows);
    var price=document.getElementById("price_row_"+counterOfTheRows);
    var ingredients=document.getElementById("ingredients_row_"+counterOfTheRows);

    var meal_data=meal.innerHTML;
    var description_data=description.innerHTML;
    var price_data=price.innerHTML;
    var ingredients_data=ingredients.innerHTML;

    meal.innerHTML="<input class='form-control' type='text' id='meal_text"+counterOfTheRows+"' value='"+meal_data+"'>";
    price.innerHTML="<input class='form-control' type='text' id='price_text"+counterOfTheRows+"' value='"+price_data+"'>";
    description.innerHTML="<input class='form-control' type='text' id='description_text"+counterOfTheRows+"' value='"+description_data+"' disabled>";
    ingredients.innerHTML="<input class='form-control' type='text' id='ingredients_text"+counterOfTheRows+"' value='"+ingredients_data+"'>";


    // TODO: editacia daneho riadku s selectorom...
    // $('#ingredients_row_'+counterOfTheRows+'').empty();
    // $('#ingredients_row_'+counterOfTheRows+'').append("<div id='selectZone'></div>");
    // $('#selectZone').append("<select id='selectID' ></select>");

    // $('#selectID').addClass('selectpicker');
    // $('#selectID').prop('multiple',true);
    // $('#selectID').attr('data-selected-text-format','count');
    // $('#selectID').append("<option>mustard</option>");
    // $('#selectID').append("<option>ketchup</option>");
    // $('#selectID').append("<option>ham</option>");
    // $('#selectID').append("<option>mozzarela</option>");
    // $('#selectID').append("<option>tomatoes</option>");
}


function save_concrete_row(counterOfTheRows) {

    console.log("save here");
    var meal_val = document.getElementById("meal_text" + counterOfTheRows).value;
    var description_val = document.getElementById("description_text" + counterOfTheRows).value;
    var price_val = document.getElementById("price_text" + counterOfTheRows).value;
    var ingredients_val = document.getElementById("ingredients_text" + counterOfTheRows).value;

    if (!meal_val.match($regexForInputType)
        || !description_val.match($regexForInputDescription)
        || !price_val.match($regexForInputPrice)
        || !ingredients_val.match($regexForInputIngredients)) {
        console.log("here");

        controlFoodInputs(meal_val, description_val, price_val, counterOfTheRows, ingredients_val);
    }
    else {
            var ingredientsArray = ingredients_val.split(",");
            console.log(ingredientsArray);
            $.ajax({
                url: "https://restaurant.memonil.com/meal",
                headers: {
                    "Authorization": sessionStorage.getItem("jwtToken")
                },
                type: "PUT",
                data: JSON.stringify(
                    {
                        "type": meal_val,
                        "description": description_val,
                        "price": price_val,
                        "ingredients": ingredientsArray,
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
        document.getElementById("meal_row_"+counterOfTheRows).innerHTML=meal_val;
        document.getElementById("description_row_"+counterOfTheRows).innerHTML=description_val;
        document.getElementById("price_row_"+counterOfTheRows).innerHTML=price_val;
        document.getElementById("ingredients_row_"+counterOfTheRows).innerHTML=ingredients_val;

        document.getElementById("edit_button_index_"+counterOfTheRows).style.display="inline-block";
        document.getElementById("delete_button_index_"+counterOfTheRows).style.display="inline-block";
        document.getElementById("save_button_index_"+counterOfTheRows).style.display="none";
        }
}

function add_concrete_row()
{
    console.log("add here");
    var new_type=document.getElementById("new_type").value;
    var new_description=document.getElementById("new_description").value;
    var new_price=document.getElementById("new_price").value;
    var new_ingredients=document.getElementById("new_ingredients").value;

    // kontrola existujuceho description
    for(var i = 0; i < $descriptionsArray.length; i++){
        console.log("array -> " +  $descriptionsArray[i]);
        if($descriptionsArray[i] === new_description){
            $('#badDescription').empty().append("Wrong description (already exists)" + '<br>');
            $('#badDescription').addClass("alert alert-danger text-danger font-weight-bold text-center");
            return;
        }
    }

    // sem bude kontrola
    if(!new_type.match($regexForInputType)
        || !new_description.match($regexForInputDescription)
        || !new_price.match($regexForInputPrice)
        || $selected.length < 1){

        console.log("wrong");
        controlFoodInputs(new_type, new_description, new_price, 0, $selected.length);
    }
    else{
        $.ajax({
            url: "https://restaurant.memonil.com/meal",
            headers:{
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "POST",
            data: JSON.stringify(
                {   "type":   new_type,
                    "description":   new_description,
                    "price":      new_price,
                    "ingredients": $selected,
                } ),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);

                var table=document.getElementById("foodTable");
                var table_len=(table.rows.length)-1;
                table.insertRow(table_len).outerHTML=
                    "<tr id='row"+table_len+"' class='text-center'>" +
                    "<td id='meal_row_"+table_len+"'>"+new_type+"</td>" +
                    "<td id='description_row_"+table_len+"'>"+new_description+"</td>" +
                    "<td id='price_row_"+table_len+"'>"+new_price+"</td>" +
                    "<td id='ingredients_row_"+table_len+"'>"+$selected+"" +
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
                removeAlertTextForFood(table_len);
                removeAlertClassesForFood(table_len);

                document.getElementById("new_type").value="";
                document.getElementById("new_description").value="";
                document.getElementById("new_price").value="";
                document.getElementById("new_ingredients").value="";

                document.getElementById("edit_button_index_"+table_len).style.display="inline-block";
                document.getElementById("save_button_index_"+table_len).style.display="none";
            },
        });
    }
}

function delete_concrete_row(counterOfTheRows)
{
    console.log("delete here");

    // vycistenie
    $('#responseMessageDeleteEmployee').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#responseMessageDeleteEmployee').empty();

    var meal_val=document.getElementById("meal_row_"+counterOfTheRows).innerHTML;
    var description_val=document.getElementById("description_row_"+counterOfTheRows).innerHTML;
    var price_val=document.getElementById("price_row_"+counterOfTheRows).innerHTML;
    var ingredients_val=document.getElementById("ingredients_row_"+counterOfTheRows).innerHTML;

    var ingredientsArrayn = ingredients_val.split(",");
    console.log(ingredientsArrayn);


    console.log("toto posielam" + "\n" +
        "M:" + meal_val + "\n" +
        "D:" + description_val + "\n" +
        "P:" + price_val + "\n" +
        "I:" + ingredientsArrayn + "\n");

    $('#confirmDeleteModalYes').off().on('click',function(){
        $.ajax({
            url: "https://restaurant.memonil.com/meal",
            headers:{
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "DELETE",
            data: JSON.stringify(
                {   "type":   meal_val,
                    "description":      description_val,
                    "price":      price_val,
                    "ingredients":      ingredientsArrayn,
                } ),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("DELETE method");

                $('#responseMesssageDeleteFood').addClass("alert alert-success text-success font-weight-bold text-center");
                $('#responseMesssageDeleteFood').empty().append("Success");
                console.log("delete row");
                document.getElementById("row"+counterOfTheRows+"").outerHTML="";
                $('#confirmDeleteModal').data('hideInterval', setTimeout(function(){
                    $('#confirmDeleteModal').modal('hide');
                }, 1000));
                document.getElementById("row"+counterOfTheRows+"").outerHTML="";
            },
        });
    });
}

$( document ).ready(function()  {
    $('.selectpicker').on('change', function(){
        $selected = $('.selectpicker').val();
        console.log($selected); // ziskanie vsetkych hodnot z select pickeru..
        // console.log($selected.length); // vypisanie  dlzky array
        console.log("This is out of ->" + $selected); // ziskanie vsetkych hodnot z select pickeru..
        // TODO: treba obnovit neselectnute..
        // $('.selectpicker').selectpicker('deselectAll');
    });


    var selectpickerID = document.getElementById('selectPickerID');

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
                console.log("Pridavam2 -> " + $ingredientsArray[i]);
                newOption = document.createElement("option");
                selectpickerID.appendChild(newOption);
                newOption.innerHTML = $ingredientsArray[i];
                $('.selectpicker').selectpicker('refresh');
            }
        }
    });

    $.ajax({
        url: "https://restaurant.memonil.com/meals",
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
            var rowFormatCounter = 0;
            for (var key in JsonObject) {
                var table=document.getElementById("foodTable");
                var table_len=(table.rows.length)-1;
                table.insertRow(table_len).outerHTML=
                    "<tr id='row"+table_len+"' class='text-center'>" +
                    "<td id='meal_row_"+table_len+"'>"+JsonObject[key].type+"</td>" +
                    "<td id='description_row_"+table_len+"'>"+JsonObject[key].description+"</td>" +
                    "<td id='price_row_"+table_len+"'>"+JsonObject[key].price+"</td>" +
                    "<td id='ingredients_row_"+table_len+"'>"+JsonObject[key].ingredients+"</td>" +
                    "<td>" +
                    "<div id=first class='row justify-content-center'>" +
                    "<input type='button' id='save_button_index_"+table_len+"' value='Save' class='save btn btn-green' onclick='save_concrete_row("+table_len+")'>" +
                    "<i id='edit_button_index_"+table_len+"' style='font-size: 40px;color:teal;' class='fa fa-edit edit' aria-hidden='true' onclick='edit_concrete_row("+table_len+")'></i>" +
                    "<i id='delete_button_index_"+table_len+"' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row("+table_len+")'></i>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";

                document.getElementById("delete_button_index_"+table_len).style.display="inline-block";
                document.getElementById("save_button_index_"+table_len).style.display="none";

                // ulozim si taktiez vsetky username do sessionStorage...
                $descriptionsArray.push(JsonObject[key].description);
                rowFormatCounter++;
            }
        },
    });


});


function controlFoodInputs(new_type, new_description, new_price, counterOfTheRows, $selectedLength){
    removeAlertTextForFood(counterOfTheRows);
    removeAlertClassesForFood(counterOfTheRows);

    console.log("Pocet riadkov -> " + counterOfTheRows );
    if(counterOfTheRows < 1){
        if(!new_type.match($regexForInputType)){
            $('#badType').empty().append("Wrong type (at least 3 chars long)" + '<br>');
            $('#badType').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!new_description.match($regexForInputDescription)){
            $('#badDescription').empty().append("Wrong description (at least 3 chars long)" + '<br>');
            $('#badDescription').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!new_price.match($regexForInputPrice)){
            $('#badPrice').empty().append("Wrong format (example: 0.00)" + '<br>');
            $('#badPrice').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if($selectedLength < 1){
            console.log("Pocet selektnutych -> " + $selectedLength);
            $('#badSelect').empty().append("Wrong select (at least 1 select)" + '<br>');
            $('#badSelect').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
    }
    else{
        console.log("This is $selectedLength ->"  + new_price);

        if(!new_type.match($regexForInputType)){
            $('#meal_row_' + counterOfTheRows+'').append("<div " + "id='badType"+counterOfTheRows+"'>Wrong type (at least 3 chars long)</div>");
            $('#badType' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center")
        }
        if(!new_description.match($regexForInputDescription)){
            $('#description_row_' + counterOfTheRows+'').append("<div " + "id='badDescription"+counterOfTheRows+"'>Wrong description (at least 3 chars long)</div>");
            $('#badDescription' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!new_price.match($regexForInputPrice)){
            $('#price_row_' + counterOfTheRows+'').append("<div " + "id='badPrice"+counterOfTheRows+"'>Wrong format (example: 0.00)</div>");
            $('#badPrice' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
        if(!$selectedLength.match($regexForInputIngredients)){
            $('#ingredients_row_' + counterOfTheRows+'').append("<div " + "id='badSelect"+counterOfTheRows+"'>Wrong select (at least 1 select)</div>");
            $('#badSelect' + counterOfTheRows+'').addClass("alert alert-danger text-danger font-weight-bold text-center");
        }
    }
}

function removeAlertTextForFood(counterOfTheRows){
    // removing text
    // for first only
    $('#badType').empty();
    $('#badDescription').empty();
    $('#badPrice').empty();
    $('#badSelect').empty();
    if(counterOfTheRows > 0){
        $('#badType' + counterOfTheRows+'').remove();
        $('#badDescription' + counterOfTheRows+'').remove();
        $('#badPrice' + counterOfTheRows+'').remove();
        $('#badSelect' + counterOfTheRows+'').remove();
    }
}

function removeAlertClassesForFood(counterOfTheRows){
    // removing alert classes
    $('#badType').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badDescription').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badPrice').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#badSelect').removeClass("alert alert-success text-success font-weight-bold text-center");
    if(counterOfTheRows > 0){
        $('#badType' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badDescription' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badPrice' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
        $('#badSelect' + counterOfTheRows+'').removeClass("alert alert-success text-success font-weight-bold text-center");
    }
}

