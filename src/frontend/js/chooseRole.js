function chooseRole(){
    // employee
    if (sessionStorage.getItem("privilegesOfUser") == 1){
    // TODO: este spravit GET food ale urobit ho ako /employee/food.html a bez upravovania iba zobrazit co je....
    $('#sidebarForRoles').append("<ul class=\"nav nav-sidebar btn-group-vertical\">\n" +
        "    <li>\n" +
        "        <div id=\"loginLogo\">\n" +
        "            <a href=\"/~xorsak02/IIS/src/frontend/html/admin/bookings.html\"><img class=\"img-fluid\" src=\"/~xorsak02/IIS/src/frontend/images/logoOfTheRestaurant.png\" alt=\"Chania\"></a>\n" +
        "        </div>\n" +
        "    </li>\n" +
        "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/bookings.html\">Bookings</a></li>\n" +
        "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/orders.html\">Orders</a></li>\n" +
        "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/food.html\">Food</a></li>\n" +
        "</ul>");
    }
    // head
    else if(sessionStorage.getItem("privilegesOfUser") == 2){
        $('#sidebarForRoles').append("<ul class=\"nav nav-sidebar btn-group-vertical\">\n" +
            "    <li>\n" +
            "        <div id=\"loginLogo\">\n" +
            "            <a href=\"/~xorsak02/IIS/src/frontend/html/admin/bookings.html\"><img class=\"img-fluid\" src=\"/~xorsak02/IIS/src/frontend/images/logoOfTheRestaurant.png\" alt=\"Chania\"></a>\n" +
            "        </div>\n" +
            "    </li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/bookings.html\">Bookings</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/orders.html\">Orders</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/food.html\">Food</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/ingredients.html\">Ingredients</a></li>\n" +
            "</ul>");
    }
    // admin
    else{
        $('#sidebarForRoles').append("<ul class=\"nav nav-sidebar btn-group-vertical\">\n" +
            "    <li>\n" +
            "        <div id=\"loginLogo\">\n" +
            "            <a href=\"/~xorsak02/IIS/src/frontend/html/admin/bookings.html\"><img class=\"img-fluid\" src=\"/~xorsak02/IIS/src/frontend/images/logoOfTheRestaurant.png\" alt=\"Chania\"></a>\n" +
            "        </div>\n" +
            "    </li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/bookings.html\">Bookings</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/orders.html\">Orders</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/employees.html\">Employees</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/food.html\">Food</a></li>\n" +
            "    <li class=\"active w-100 text-center\"><a href=\"/~xorsak02/IIS/src/frontend/html/admin/ingredients.html\">Ingredients</a></li>\n" +
            "</ul>")
    }
}

chooseRole();