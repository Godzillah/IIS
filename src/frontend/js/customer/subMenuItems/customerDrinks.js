/**
 * On ready function which fetch all data from API  https://restaurant.memonil.com/ with GET method
 */
$(document).ready(function () {
    $.ajax({
        url: "https://restaurant.memonil.com/meals",
        type: "GET",
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            var JsonObject = JSON.parse(response);
            for (var key in JsonObject) {
                console.log(JsonObject[key].type);
                // if there is some drink we will append
                if (JsonObject[key].type === "drink") {
                    $(".drinkItems").append("<div class=\"drinkItem\">\n" +
                        "                    <div class=\"drinkNamePriceDescription\">\n" +
                        "                        <p class=\"drinkNamePrice\"><b>" + JsonObject[key].description + "</b>....................................................." + JsonObject[key].price + " EUR</p>\n" +
                        "                        <p class=\"drinkDescription\">(" + JsonObject[key].ingredients + ")</p>\n" +
                        "                    </div>\n" +
                        "                </div>" +
                        "                <br>");
                }
            }
        },
    });
});