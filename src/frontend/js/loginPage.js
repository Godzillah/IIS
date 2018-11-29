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
                    //TODO: if(usernameFromInput === 'test' && passwordFromInput === 'test') { location.href = /IIS/src/frontend/html/admin/adminHomePage.html
                    //TODO: else {   location.href = /IIS/src/frontend/html/admin/employeeHomePage.html }
                    // prejde do adminHomePage.html...
                    console.log("Ukladam jwtToken do sessionStorage");
                    sessionStorage.setItem("jwtToken", JsonObject.payload.jwt);
                    console.log("this is -> "  + sessionStorage.getItem("jwtToken"));
                    location.href = "/~xorsak02/IIS/src/frontend/html/admin/bookings.html"
                },
            });
        }
    });
});

function wrongRegistrationsInputs(){
    $("#alert").addClass("alert alert-danger");
    $("#pOnWrongLogin").empty().append("username does not exists");
}


