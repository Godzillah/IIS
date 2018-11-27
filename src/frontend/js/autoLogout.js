// TODO: prevziate prepisat...
// https://forums.asp.net/t/1899214.aspx?If+no+activity+for+15+minutes+display+an+alert+on+web+page+and+then+either+continue+or+logout

// Set timeout variables.
var timoutWarning = 840000; // Display warning in 14 Mins.
var timoutNow = 900000; // Timeout in 15 mins.
var logoutUrl = 'http://domain.com/logout.aspx'; // URL to logout page.

var warningTimer;
var timeoutTimer;

// Start timers.
function StartTimers() {
    warningTimer = setTimeout("IdleWarning()", timoutWarning);
    timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
}

// Reset timers.
function ResetTimers() {
    clearTimeout(warningTimer);
    clearTimeout(timeoutTimer);
    StartTimers();
    $("#timeout").dialog('close');
}

// Show idle timeout warning dialog.
function IdleWarning() {
    $("#timeout").dialog({
        modal: true
    });
}

// Logout the user.
function IdleTimeout() {
    window.location = logoutUrl;
}