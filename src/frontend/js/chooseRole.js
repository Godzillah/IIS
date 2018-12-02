/**
 * Function which chossing between roles 1, 2, 3 and nothing
 * 1 - employee -> will shown only 3 options in sidebar
 * 2 - head -> will shown 4 options in sidebar
 * 3 - manager -> will shown all options in sidebar with employee editing table...
 * nothing - non authorization user -> redirects him to loginPage.html
 */
var loginUrl = "http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/loginPage.html";

function chooseRole() {
    // clean
    $('#headerNameOfRole').empty();
    $('#sidebarForRoles').empty();

    if (sessionStorage.getItem("privilegesOfUser") == 1) {
        $('#headerNameOfRole').append("<h1 id=\"headerNameOfRole\" class=\"white-text mt-2 mb-2\">Employee View</h1>");
        $('#sidebarForRoles').append("<ul class=\"nav nav-sidebar btn-group-vertical\">\n" +
            "    <li>\n" +
            "        <div id=\"loginLogo\">\n" +
            "            <a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/bookings.html\"><img class=\"img-fluid\" src=\"/~xorsak02/IISimages/logoOfTheRestaurant.png\" alt=\"Chania\"></a>\n" +
            "        </div>\n" +
            "    </li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/bookings.html\">Bookings</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/orders.html\">Orders</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/employee/food.html\">Food</a></li>\n" +
            "</ul>");
    }
    else if (sessionStorage.getItem("privilegesOfUser") == 2) {
        $('#headerNameOfRole').append("<h1 id=\"headerNameOfRole\" class=\"white-text mt-2 mb-2\">Head View</h1>");
        $('#sidebarForRoles').append("<ul class=\"nav nav-sidebar btn-group-vertical\">\n" +
            "    <li>\n" +
            "        <div id=\"loginLogo\">\n" +
            "            <a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/bookings.html\"><img class=\"img-fluid\" src=\"/~xorsak02/IISimages/logoOfTheRestaurant.png\" alt=\"Chania\"></a>\n" +
            "        </div>\n" +
            "    </li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/bookings.html\">Bookings</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/orders.html\">Orders</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/food.html\">Food</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/ingredients.html\">Ingredients</a></li>\n" +
            "</ul>");
    }
    else if (sessionStorage.getItem("privilegesOfUser") == 3)  {
        $('#headerNameOfRole').append("<h1 id=\"headerNameOfRole\" class=\"white-text mt-2 mb-2\">Admin View</h1>");
        $('#sidebarForRoles').append("<ul class=\"nav nav-sidebar btn-group-vertical\">\n" +
            "    <li>\n" +
            "        <div id=\"loginLogo\">\n" +
            "            <a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/bookings.html\"><img class=\"img-fluid\" src=\"/~xorsak02/IISimages/logoOfTheRestaurant.png\" alt=\"Chania\"></a>\n" +
            "        </div>\n" +
            "    </li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/statistics.html\">Statistics</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/bookings.html\">Bookings</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/orders.html\">Orders</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/employees.html\">Employees</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/food.html\">Food</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"http://www.stud.fit.vutbr.cz/~xorsak02/IIS/src/frontend/html/admin/ingredients.html\">Ingredients</a></li>\n" +
            "</ul>")
    }
    else{
        // if there is no jwt token defined....
        window.location.replace(loginUrl);
    }
}

chooseRole();