// GLOBALNA PREMENNA NA ID STOLA...
var $idOfTable;
var $tableId;

$regexForInputId = "^[0-9]+$";

function clickEditReservation() {
    console.log("EDIT FCE");
    var $idOfTheReservation = $("#idOfTheReservation").val();
    $('#idOfReservedTimes').empty();
    $('#idOfReservedTimes').removeClass("text-center text-default h5-responsive");

    // vycistenie alertu...
    $('#alertYourReservationNumber').empty();
    $('#alertYourReservationNumber').removeClass("alert alert-success text-success font-weight-bold text-center");

    console.log("Id rezervacie -> " + $idOfTheReservation);
    if ((!$idOfTheReservation.match($regexForInputId))) {
        // kontrola vstupov f.e : dasdas , eqw eqw,  tqrdsad, xzvhg , @fasd
        $("#idOfRezervationDoesNotExists").empty().append("Invalid id of reservation");
        $("#idOfRezervationDoesNotExists").addClass("alert alert-danger text-danger font-weight-bold text-center");
        $('#modalCreateReservationForm').removeAttr("data-dismiss");
        return;
    }
    $.ajax({
        url: "https://restaurant.memonil.com/reservate" + "?reservation_id=" + $idOfTheReservation,
        type: "GET",
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            var JsonObject = JSON.parse(response);
            console.log(response);
            console.log("GET method");
            // VYMAZANIE ERRORU
            $("#idOfRezervationDoesNotExists").removeClass("alert alert-danger text-danger font-weight-bold text-center");
            $("#idOfRezervationDoesNotExists").empty();
            if (JsonObject == null) {
                // PRIDANIE ERROR
                $("#idOfRezervationDoesNotExists").empty().append("Invalid number of reservation");
                $("#idOfRezervationDoesNotExists").addClass("alert alert-danger text-danger font-weight-bold text-center");
                $('#modalCreateReservationForm').removeAttr("data-dismiss");
                return 0;
            }
            else {
                $('#modalCreateReservationForm').modal('show');
                $('#modalCreateReservationForm').find('input#idOfModalName').val(JsonObject.name);
                $('#modalCreateReservationForm').find('input#idOfModalSurname').val(JsonObject.surname);
                $('#modalCreateReservationForm').find('input#idOfModalEmail').val(JsonObject.email);
                $('#modalCreateReservationForm').find('input#idOfModalTelephone').val(JsonObject.telephone);
                $('#modalCreateReservationForm').find('input#idOfSelectTime').val(JsonObject.date);
                $tableId = JsonObject.table_id;
                console.log("This is tableID ->" + $tableId);

                $('#modalCreateReservationForm').attr("data-dismiss", "modal");
                $('#modalChangeReservation').attr("data-dismiss", "modal");
                $('#idOfCreateReservationModal').addClass("data-dismiss");
            }
        }
    });

    $('#idOfCreateReservationModal').off().on('click', function () {
        var $idOfTheReservation = $("#idOfTheReservation").val();
        $usernameFromInput = $('#modalCreateReservationForm').find('input#idOfModalName').val();
        $surnameFromInput = $('#modalCreateReservationForm').find('input#idOfModalSurname').val();
        $emailFromInput = $('#modalCreateReservationForm').find('input#idOfModalEmail').val();
        $telephoneFromInput = $('#modalCreateReservationForm').find('input#idOfModalTelephone').val();
        $timeFromInput = $('#modalCreateReservationForm').find('input#idOfSelectTime').val();

        if (!$timeFromInput.match($regexForTime)
            || !$usernameFromInput.match($regexForInputUsername)
            || !$surnameFromInput.match($regexForInputSurname)
            || !$emailFromInput.match($regexForInputEmail)
            || !$telephoneFromInput.match($regexForInputTelephone)) {

            console.log("toto posielam" + "\n" +
                "U:" + $usernameFromInput + "\n" +
                "S:" + $surnameFromInput + "\n" +
                "E:" + $emailFromInput + "\n" +
                "Tel:" + $telephoneFromInput + "\n" +
                "Time:" + $timeFromInput + "\n");
            controlInputs($usernameFromInput, $surnameFromInput, $emailFromInput, $telephoneFromInput, $timeFromInput);
        }
        else {
            $.ajax({
                url: "https://restaurant.memonil.com/reservate",
                type: "PUT",
                data: JSON.stringify(
                    {
                        "name": $usernameFromInput,
                        "surname": $surnameFromInput,
                        "email": $emailFromInput,
                        "telephone_number": $telephoneFromInput,
                        "date": $timeFromInput,
                        "table_id": $tableId,
                        "reservation_id": $idOfTheReservation
                    }),
                contentType: 'application/json;charset=UTF-8',
                success: function (response) {
                    console.log("PUT method");
                    console.log(response);
                    $('#alertYourReservationNumber').removeClass("alert alert-danger text-danger font-weight-bold text-center");
                    $('#alertYourReservationNumber').addClass("alert alert-success text-success font-weight-bold text-center");
                    $('#alertYourReservationNumber').empty().append("Success");
                    $('#modalCreateReservationForm').data('hideInterval', setTimeout(function () {
                        $('#modalCreateReservationForm').modal('hide');
                        $('#modalChangeReservation').modal('hide');
                    }, 2000));
                }
            });
        }
    });
}

function clickDeleteReservation() {
    console.log("DELETE FCE");
    var $idOfTheReservation = $("#idOfTheDeletingReservation").val();

    $('#idOfReservedTimes').empty();
    $('#idOfReservedTimes').removeClass("text-center text-default h5-responsive");

    // vycistenie alertu...
    $('#alertYourReservationNumber').empty();
    $('#alertYourReservationNumber').removeClass("alert alert-success text-success font-weight-bold text-center");

    if (!($idOfTheReservation.match($regexForInputId))) {
        $("#idOfRezervationDoesNotExistsDelete").empty().append("Invalid id of reservation");
        $("#idOfRezervationDoesNotExistsDelete").addClass("alert alert-danger text-danger font-weight-bold text-center");
        $('#modalLoginForm').removeAttr("data-dismiss");
        return 0;
    }
    $.ajax({
        url: "https://restaurant.memonil.com/reservate" + "?reservation_id=" + $idOfTheReservation,
        type: "GET",
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            var JsonObject = JSON.parse(response);
            console.log(response);
            console.log("GET method");
            // VYMAZANIE ERRORU
            $("#idOfRezervationDoesNotExistsDelete").removeClass("alert alert-danger text-danger font-weight-bold text-center");
            $("#idOfRezervationDoesNotExistsDelete").empty();
            if (JsonObject == null) {
                // PRIDANIE ERROR
                $("#idOfRezervationDoesNotExistsDelete").empty().append("Invalid id of reservation");
                $("#idOfRezervationDoesNotExistsDelete").addClass("alert alert-danger text-danger font-weight-bold text-center");
                $('#modalLoginForm').removeAttr("data-dismiss");
            }
            else {
                $('#modalCreateReservationForm').modal('show');
                $('#modalCreateReservationForm').find('input#idOfModalName').val(JsonObject.name);
                $('#modalCreateReservationForm').find('input#idOfModalSurname').val(JsonObject.surname);
                $('#modalCreateReservationForm').find('input#idOfModalEmail').val(JsonObject.email);
                $('#modalCreateReservationForm').find('input#idOfModalTelephone').val(JsonObject.telephone);
                $('#modalCreateReservationForm').find('input#idOfSelectTime').val(JsonObject.date);

                $('#modalCreateReservationForm').attr("data-dismiss", "modal");
                $('#idDeleteReservationButton').attr("data-dismiss", "modal");

                $('#idOfCreateReservationModal').off().on('click', function () {
                    // TODO: ziskanie si aktualnych hodnot (done)
                    var $usernameFromInput = $("#idOfModalName").val();
                    var $surnameFromInput = $("#idOfModalSurname").val();
                    var $emailFromInput = $("#idOfModalEmail").val();
                    // 10-01-2018 12:00
                    var $telephoneFromInput = $("#idOfModalTelephone").val();
                    var $timeFromInput = $("#idOfSelectTime").val();
                    $tableId = JsonObject.table_id;

                    console.log("Send " + $usernameFromInput + "|" + $surnameFromInput + "|" + $emailFromInput + "|" + $telephoneFromInput + "|"
                        + $timeFromInput + "|" + $idOfTheReservation + "|" + $tableId);
                    // TODO: ulozenie do modalLoginForm + zavolanie metody PUT do url....
                    $.ajax({
                        url: "https://restaurant.memonil.com/reservate",
                        type: "DELETE",
                        data: JSON.stringify(
                            {
                                "name": $usernameFromInput,
                                "surname": $surnameFromInput,
                                "email": $emailFromInput,
                                "telephone_number": $telephoneFromInput,
                                "date": $timeFromInput,
                                "table_id": $tableId,
                                "reservation_id": $idOfTheReservation
                            }),
                        contentType: 'application/json;charset=UTF-8',
                        success: function (response) {
                            console.log(response);
                            console.log("DELETE method");
                            $('#alertYourReservationNumber').removeClass("alert alert-danger text-danger font-weight-bold text-center");
                            $('#alertYourReservationNumber').addClass("alert alert-success text-success font-weight-bold text-center");
                            $('#alertYourReservationNumber').empty().append("Success");
                            $('#modalCreateReservationForm').data('hideInterval', setTimeout(function () {
                                $('#modalCreateReservationForm').modal('hide');
                                $('#modalDeleteReservation').modal('hide');
                            }, 2000));
                        }
                    });
                });
            }
        }
    });
}

$regexForInputUsername = "^.{3}.*$";
$regexForInputSurname = "^.{3}.*$";
$regexForInputEmail = "^.+\\@.+\\..+$";
$regexForInputTelephone = "^[0-9]{3}[0-9]*$";
$regexForTime = "^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\\d\\d\\d\\d [012]{0,1}[0-9]:[0-9][0-9]$";


/**
 * Function which getting id of the clicked table -> and then sends id to the SERVER -> and then parsing or returning bad message..
 */
function clickTable(clicked_id) {
    console.log("CLICK FCE");
    // pridanie class na vsetky rezervovane casy...
    $('#idOfReservedTimes').addClass("text-center text-default h5-responsive");

    // vycistenie alertu...
    $('#alertYourReservationNumber').empty();
    $('#alertYourReservationNumber').removeClass("alert alert-success text-success font-weight-bold text-center");

    console.log("Id ktore sa bude posielat -> " + clicked_id);
    $.ajax({
        url: "https://restaurant.memonil.com/reservation" + "?table=" + clicked_id,
        type: "GET",
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            console.log(response);
            console.log("GET method");
            var JsonObject = JSON.parse(response);
            // PRECISTENIE HODNOT
            clearInputModalValues();

            $('#idOfReservedTimes').empty().append("Reserved times" + "<br>");
            for (var key in JsonObject) {
                $('#idOfReservedTimes').append(JsonObject[key].start_date + "->" + JsonObject[key].end_date + "<br>");
            }
        },
    });
    // posielanie modalu...
    $('#idOfCreateReservationModal').off().on('click', function () {
        var $usernameFromInput = $("#idOfModalName").val();
        var $surnameFromInput = $("#idOfModalSurname").val();
        var $emailFromInput = $("#idOfModalEmail").val();
        // 10-01-2018 12:00
        var $telephoneFromInput = $("#idOfModalTelephone").val();
        var $timeFromInput = $("#idOfSelectTime").val();

        console.log("Send " + $usernameFromInput + "|" + $surnameFromInput + "|" + $emailFromInput + "|" + $telephoneFromInput + "|"
            + $timeFromInput + "|" + clicked_id);
        // this regex matches 01-11-2015 13:20 and also 01-11-2015 13:20
        if (!$timeFromInput.match($regexForTime)
            || !$usernameFromInput.match($regexForInputUsername)
            || !$surnameFromInput.match($regexForInputSurname)
            || !$emailFromInput.match($regexForInputEmail)
            || !$telephoneFromInput.match($regexForInputTelephone)) {

            controlInputs($usernameFromInput, $surnameFromInput, $emailFromInput, $telephoneFromInput, $timeFromInput);
            return;
        }

        $.ajax({
            url: "https://restaurant.memonil.com/reservation",
            type: "POST",
            data: JSON.stringify(
                {
                    "name": $usernameFromInput,
                    "surname": $surnameFromInput,
                    "email": $emailFromInput,
                    "telephone_number": $telephoneFromInput,
                    "date": $timeFromInput,
                    "table_id": clicked_id
                }),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                console.log("POST method");
                var JsonObject = JSON.parse(response);
                if (JsonObject.success === false) {
                    // osetrenie ak pride zly...
                    $('#alertYourReservationNumber').empty().append("Table has been already reserved at that time");
                    $('#alertYourReservationNumber').removeClass("alert alert-success text-danger font-weight-bold text-center");
                    $('#alertYourReservationNumber').addClass("alert alert-danger text-danger font-weight-bold text-center");
                }
                else {
                    // prejde do adminHomePage.html...4
                    $('#alertYourReservationNumber').removeClass("alert alert-danger text-danger font-weight-bold text-center");
                    $('#alertYourReservationNumber').addClass("alert alert-success text-success font-weight-bold text-center");
                    $('#alertYourReservationNumber').empty().append("Correct your reservation number is -> " + JsonObject.reservationId);
                    $('idOfCreateReservationModal').off().on('click', function () {
                        $('#modalCreateReservationForm').modal('hide');
                    });
                }
            },
        });
    });
}

/**
 *
 */
function clearInputModalValues() {
    document.getElementById("idOfModalName").value = "";
    document.getElementById("idOfModalSurname").value = "";
    document.getElementById("idOfModalEmail").value = "";
    document.getElementById("idOfModalTelephone").value = "";
    document.getElementById("idOfSelectTime").value = "";
}

/**
 * Function which cotrols whole inputs with help of regexes
 */
function controlInputs(username, surname, email, telephone, time) {
    // TODO: tuto kontrolu tam potom daj naspat
    // vycistenie
    $('#alertYourReservationNumber').empty();

    if (!username.match($regexForInputUsername)) {
        $('#alertYourReservationNumber').append("Wrong Username (at least 3 chars long)" + '<br>');
        $('#alertYourReservationNumber').addClass("alert alert-danger text-danger font-weight-bold text-center");
    }
    if (!surname.match($regexForInputSurname)) {
        $('#alertYourReservationNumber').append("Wrong Surname (at least 3 chars long)" + '<br>');
        $('#alertYourReservationNumber').addClass("alert alert-danger text-danger font-weight-bold text-center");
    }
    if (!email.match($regexForInputEmail)) {
        $('#alertYourReservationNumber').append("Wrong Email (must contains @)" + '<br>');
        $('#alertYourReservationNumber').addClass("alert alert-danger text-danger font-weight-bold text-center");
    }
    if (!telephone.match($regexForInputTelephone)) {
        $('#alertYourReservationNumber').append("Wrong Telephone number (at least 3 digits long)" + '<br>');
        $('#alertYourReservationNumber').addClass("alert alert-danger text-danger font-weight-bold text-center");
    }
    if (!time.match($regexForTime)) {
        $('#alertYourReservationNumber').append("Wrong date has to be -> 01-11-2018 13:00" + '<br>');
        $('#alertYourReservationNumber').addClass("alert alert-danger text-danger font-weight-bold text-center");
    }
}






