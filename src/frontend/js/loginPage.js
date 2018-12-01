// regexes
$regexForInputLoginUsername = "^.+$";
$regexForInputLoginPassword = "^.+$";

/**
 * onload function which show form user passwd, and then checks if concrete user with pass matches
 * if yes -> redirected to IIS
 * if no -> dialog error is shown
 */
$(document).ready(function () {
    $("#loginSubmitButton").click(function () {
        var usernameFromInput = $("#usernameID").val();
        var passwordFromInput = $("#passwordID").val();
        if (!usernameFromInput.match($regexForInputLoginUsername)
            || !passwordFromInput.match($regexForInputLoginPassword)) {
            wrongRegistrationsInputs();
        }
        else {
            $.ajax({
                url: "https://restaurant.memonil.com/login",
                type: "POST",
                data: JSON.stringify(
                    {
                        "username": usernameFromInput,
                        "password": passwordFromInput
                    }),
                contentType: 'application/json;charset=UTF-8',
                success: function (response) {
                    var JsonObject = JSON.parse(response);
                    if (JsonObject.success == false) {
                        wrongRegistrationsInputs();
                        return;
                    }
                    sessionStorage.setItem("jwtToken", JsonObject.payload.jwt);
                    sessionStorage.setItem("privilegesOfUser", JsonObject.payload.privileges);
                    // wait 0.1s because of sessionStorage...
                    setTimeout(function () {
                        location.href = "/~xorsak02/IIS/src/frontend/html/admin/bookings.html"
                    }, 100);
                },
            });
        }
    });
});

/**
 * Helpful error function...
 */
function wrongRegistrationsInputs() {
    $("#alert").addClass("alert alert-danger");
    $("#pOnWrongLogin").empty().append("username does not exists");
}


