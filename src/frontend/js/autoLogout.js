// after ten minutes of inactivity logout a redirect to loginPage.html
var startingSecondToLogout = 600; // 10 minutes (600s)
var sessionSeconds = 0;

// on key press reseting timer
$(function () {
    $("body").on('click keypress', function () {
        sessionSeconds = 0;
    });
});
// on mouse move reseting timer
$(function () {
    $("body").mousemove(function () {
        sessionSeconds = 0;
    });
});

// redirect and alert..
function redirectAndAlert() {
    location.href = "/~xorsak02/IIS/src/frontend/html/loginPage.html";
    alert("For inactive 10 minutes you were redirected to loginPage");
}

// logout session starts
function startLogoutSession() {
    sessionSeconds++;
    if (sessionSeconds > startingSecondToLogout) {
        clearTimeout(secondTimer);
        redirectAndAlert();
        return;
    }
    // logout session repeating every second
    secondTimer = setTimeout("startLogoutSession()", 1000);
}

// calling concrete method to start session
startLogoutSession();