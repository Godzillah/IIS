// after ten minutes of inactivity logout a redirect to loginPage.html
var inactiveSessionAllowedTime = 600; // 10 minutes (600s)
var counterOfInactiveSeconds = 0;

// on key press reseting timer
$(function () {
    $("body").on('click keypress', function () {
        counterOfInactiveSeconds = 0;
    });
});
// on mouse move reseting timer
$(function () {
    $("body").mousemove(function () {
        counterOfInactiveSeconds = 0;
    });
});

// redirect and alert..
function redirectAndAlert() {
    location.href = "http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/loginPage.html";
    alert("For inactive 10 minutes you were redirected to loginPage");
}

// logout session starts
function startLogoutSession() {
    counterOfInactiveSeconds++;
    // var timeToLeft = inactiveSessionAllowedTime - counterOfInactiveSeconds;

    if (counterOfInactiveSeconds > inactiveSessionAllowedTime) {
        clearTimeout(secondTimer);
        redirectAndAlert();
        return;
    }
    // logout session repeating every second
    secondTimer = setTimeout("startLogoutSession()", 1000);
    // console.log("Zbýva ---> " + timeToLeft);
}

// calling concrete method to start session
startLogoutSession();