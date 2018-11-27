$(document).ready(function (){
    $("#loginSubmitButton").click(function() {
        var usernameFromInput = $("#usernameID").val();
        var passwordFromInput = $("#passwordID").val();
        console.log("Toto su prihlasovacie udaje ---> " + usernameFromInput + "," +  passwordFromInput);
        $.ajax({
            url: "https://restaurant.memonil.com/login",
            type: "POST",
            data: JSON.stringify(
                { "username":   usernameFromInput,
                  "password":   passwordFromInput}),
            contentType: 'application/json;charset=UTF-8',
            success: function (response) {
                // handle the response
                console.log(response);
                var JsonObject= JSON.parse(response);
                if(JsonObject.success === false){
                    // osetrenie ak pride zly...
                    wrongRegistrationsInputs();
                }
                //TODO: if(usernameFromInput === 'test' && passwordFromInput === 'test') { location.href = /IIS/src/frontend/html/admin/adminHomePage.html
                //TODO: else {   location.href = /IIS/src/frontend/html/admin/employeeHomePage.html }
                else{
                    // prejde do adminHomePage.html...
                    console.log("Ukladam jwtToken do sessionStorage");
                    sessionStorage.setItem("jwtToken", JsonObject.payload.jwt);
                    console.log("this is -> "  + sessionStorage.getItem("jwtToken"));
                    location.href = "/~xorsak02/IIS/src/frontend/html/admin/adminHomePage.html"
                }
            },
        });
    });
});

function wrongRegistrationsInputs(){
    $("#alert").addClass("alert alert-danger");
    $("#pOnWrongLogin").empty().append("username does not exists");
}


