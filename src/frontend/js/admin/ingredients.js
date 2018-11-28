$regexForInputNameOfIngredient= "^.{3}.*$";

function checkboxFce(new_alergens){

    var checkBoxMilk = document.querySelector('#milk_id').checked;
    var checkBoxEegs = document.querySelector('#eegs_id').checked;
    var checkBoxNuts = document.querySelector('#nuts_id').checked;
    var checkBoxPeanuts = document.querySelector('#peanuts_id').checked;
    var checkBoxWheat = document.querySelector('#wheat_id').checked;
    var checkBoxSoybeans = document.querySelector('#soybeans_id').checked;

    var arrayOfTrueAlergens = [];

    new_alergens.append("<p>");

    if(checkBoxMilk){
        new_alergens.append("milk, ");
        arrayOfTrueAlergens.push("milk")
    }
    if(checkBoxEegs){
        new_alergens.append("eggs, ");
        arrayOfTrueAlergens.push("eggs");
    }
    if(checkBoxNuts) {
        new_alergens.append("nuts, ");
        arrayOfTrueAlergens.push("nuts");
    }
    if(checkBoxPeanuts) {
        new_alergens.append("peanuts, ");
        arrayOfTrueAlergens.push("peanuts");
    }
    if(checkBoxWheat) {
        new_alergens.append("wheat, ");
        arrayOfTrueAlergens.push("wheat");
    }
    if(checkBoxSoybeans) {
        new_alergens.append("soybeans, ");
        arrayOfTrueAlergens.push("soybeans");
        }

    new_alergens.append("</p>");
    return arrayOfTrueAlergens;
}


function add_concrete_row()
{
    console.log("add here");

    var new_nameOfAlergen=document.getElementById("new_nameOfAlergen").value;

    // musi zadat nejaky input...
    if(!new_nameOfAlergen.match($regexForInputNameOfIngredient)){
        $('#badNameOfAlergen').empty().append("Wrong username (at least 3 chars long)" + '<br>');
        $('#badNameOfAlergen').addClass("alert alert-danger text-danger font-weight-bold text-center");
        return;
    }
    else{

        var table=document.getElementById("ingredientsTable");
        var table_len=(table.rows.length)-1;


        table.insertRow(table_len).outerHTML=
            "<tr id='row"+table_len+"'>" +
            "<td id='nameOfAlergen_row_"+table_len+"'>"+new_nameOfAlergen+"</td>" +
            "<td id='alergens_row_"+table_len+"' class='text-center'>" +
            "                            <div class='custom-control custom-checkbox custom-control-inline'>" +
            "                                <input type='checkbox' class='custom-control-input' id='milk_id_"+table_len+"''>" +
            "                                <label class='custom-control-label' for='milk_id_"+table_len+"'>Milk</label>" +
            "                            </div>" +
            "                            <div class='custom-control custom-checkbox custom-control-inline'>" +
            "                                <input type='checkbox' class='custom-control-input' id='eeg_id_"+table_len+"'>" +
            "                                <label class='custom-control-label' for='eeg_id_"+table_len+"'>Eggs</label>" +
            "                            </div>" +
            "" +
            "                            <div class='custom-control custom-checkbox custom-control-inline'>" +
            "                                <input type='checkbox' class='custom-control-input' id='nuts_id_"+table_len+"'>" +
            "                                <label class='custom-control-label' for='nuts_id_"+table_len+"'>Nuts</label>" +
            "                            </div>" +
            "                            <div class='custom-control custom-checkbox custom-control-inline'>" +
            "                                <input type='checkbox' class='custom-control-input' id='peanuts_id"+table_len+"'>" +
            "                                <label class='custom-control-label' for='peanuts_id"+table_len+"'>Peanuts</label>" +
            "                            </div>" +
            "                            <div class='custom-control custom-checkbox custom-control-inline'>" +
            "                                <input type='checkbox' class='custom-control-input' id='wheat_id"+table_len+"'>" +
            "                                <label class='custom-control-label' for='wheat_id"+table_len+"'>Wheat</label>" +
            "                            </div>" +
            "                            <div class='custom-control custom-checkbox custom-control-inline'>" +
            "                                <input type='checkbox' class='custom-control-input' id='soybeans_id"+table_len+"'>" +
            "                                <label class='custom-control-label' for='soybeans_id"+table_len+"'>Soybeans</label>" +
            "                            </div>" +
            "                        </td>" +
            "<td>" +
            "<div id=first class='row justify-content-center'>" +
            "<i id='delete_button_index_"+table_len+"' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row("+table_len+")'></i>" +
            "</div>" +
            "</td>" +
            "</tr>";

        // precistenie od checkboxov
        var new_alergens= $('#alergens_row_'+table_len+'');
        // vymazanie checkboxov
        new_alergens.empty();
        var arrayOfAlergens = checkboxFce(new_alergens);
        if(arrayOfAlergens != null){
            for(var i = 0; i < arrayOfAlergens.length; i++){
                console.log(arrayOfAlergens[i]);
            }
        }

        console.log("Toto posielam name:" + new_nameOfAlergen);
        console.log("Array -> :"+arrayOfAlergens);

        // TODO: spravit to s
        $.ajax({
            url: "https://restaurant.memonil.com/ingredient",
            headers:{
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "POST",
            data: JSON.stringify(
                {   "name":   new_nameOfAlergen,
                    "allergens":   arrayOfAlergens,
                } ),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("POST method");
                $('#badNameOfAlergen').empty();
                $('#badNameOfAlergen').removeClass("alert alert-danger text-danger font-weight-bold text-center");
            },
        });

        document.getElementById("new_nameOfAlergen").value="";
    }
}

function delete_concrete_row(counterOfTheRows)
{
    console.log("delete here");

    // vycistenie
    $('#responseMessageDeleteEmployee').removeClass("alert alert-success text-success font-weight-bold text-center");
    $('#responseMessageDeleteEmployee').empty();

    var nameOfAlergen_val=document.getElementById("nameOfAlergen_row_"+counterOfTheRows).innerHTML;
    var alergens_val=document.getElementById("alergens_row_"+counterOfTheRows).innerHTML;

    var res = alergens_val.split(",");
    console.log(res);


    console.log("toto posielam" + "\n" +
        "N:" + nameOfAlergen_val + "\n" +
        "A:" + JSON.stringify(res) + "\n");

    $('#confirmDeleteModalYes').off().on('click',function(){
        $.ajax({
            url: "https://restaurant.memonil.com/ingredient",
            headers:{
                "Authorization": sessionStorage.getItem("jwtToken")
            },
            type: "DELETE",
            data: JSON.stringify(
                {   "name":   nameOfAlergen_val,
                    "allergens":      res,
                } ),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("DELETE method");

                $('#responseMessageDeleteEmployee').addClass("alert alert-success text-success font-weight-bold text-center");
                $('#responseMessageDeleteEmployee').empty().append("Success");
                console.log("delete row");
                document.getElementById("row"+counterOfTheRows+"").outerHTML="";
                $('#confirmDeleteModal').data('hideInterval', setTimeout(function(){
                    $('#confirmDeleteModal').modal('hide');
                }, 1000));
                // precistenie od checkboxov
                var new_alergens= $('#alergens_row_'+counterOfTheRows+'');
                // vymazanie checkboxov
                new_alergens.empty();
            },
        });
    });
}

$( document ).ready(function()  {
    console.log("hi i am hrere...");
    $.ajax({
        url: "https://restaurant.memonil.com/ingredient",
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
                var table=document.getElementById("ingredientsTable");
                var table_len=(table.rows.length)-1;
                table.insertRow(table_len).outerHTML=
                    "<tr id='row"+table_len+"'>" +
                    "<td id='nameOfAlergen_row_"+table_len+"'>"+JsonObject[key].name+"</td>" +
                    "<td id='alergens_row_"+table_len+"' data-toggle='modal' data-target='#selectedAlergensCheckBoxModal' class='text-center' >"+JsonObject[key].allergens+"</td>" +
                    "<td>" +
                    "<div id=first class='row justify-content-center'>" +
                    "<input type='button' id='save_button_index_"+table_len+"' value='Save' class='save btn btn-green' onclick='save_concrete_row("+table_len+")'></i>" +
                    "<i id='delete_button_index_"+table_len+"' class='fa fa-times delete' data-toggle='modal' data-target='#confirmDeleteModal' style='font-size: 40px;color:darkred;' aria-hidden='true' onclick='delete_concrete_row("+table_len+")'></i>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";

                document.getElementById("delete_button_index_"+table_len).style.display="inline-block";
                document.getElementById("save_button_index_"+table_len).style.display="none";

                // ulozim si taktiez vsetky username do sessionStorage...
                // $ingredientsArray.push(JsonObject[key].name);
                rowFormatCounter++;
            }
        }
    });
});








