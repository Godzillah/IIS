// minimalne jeden znak pre zadanie mena a hesla
$regexForInputLoginUsername = "^.+$";
$regexForInputLoginPassword = "^.+$";


$(document).ready(function (){
    $("#loginSubmitButton").click(function() {
        var usernameFromInput = $("#usernameID").val();
        var passwordFromInput = $("#passwordID").val();
        console.log("Toto su prihlasovacie udaje ---> " + usernameFromInput + "," +  passwordFromInput);
        if(!usernameFromInput.match($regexForInputLoginUsername)
            || !passwordFromInput.match($regexForInputLoginPassword)){
            wrongRegistrationsInputs();
        }
        else{
            $.ajax({
                url: "https://restaurant.memonil.com/login",
                type: "POST",
                data: JSON.stringify(
                    { "username":   usernameFromInput,
                        "password":   passwordFromInput}),
                contentType: 'application/json;charset=UTF-8',
                success: function (response) {
                    console.log(response);
                    var JsonObject= JSON.parse(response);
                    // prejde do adminHomePage.html...
                    if(JsonObject.success == false){
                        wrongRegistrationsInputs();
                        return;
                    }

                    console.log("Ukladam jwtToken do sessionStorage");
                    sessionStorage.setItem("jwtToken", JsonObject.payload.jwt);
                    sessionStorage.setItem("privilegesOfUser", JsonObject.payload.privileges);
                    console.log("this is -> "  + sessionStorage.getItem("jwtToken"));
                    // wait 0.1s because of sessionStorage...
                    setTimeout(function () {
                        location.href = "/~xorsak02/IIS/src/frontend/html/admin/bookings.html"
                    }, 100);
                },
            });
        }
    });
});

function wrongRegistrationsInputs(){
    $("#alert").addClass("alert alert-danger");
    $("#pOnWrongLogin").empty().append("username does not exists");
}


