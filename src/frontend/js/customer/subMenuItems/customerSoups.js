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
                if (JsonObject[key].type === "soup") {
                    $(".soupItems").append("<div class=\"soupItem\">\n" +
                        "                    <div class=\"soupNamePriceDescription\">\n" +
                        "                        <p class=\"soupNamePrice\"><b>" + JsonObject[key].description + "</b>....................................................." + JsonObject[key].price + " EUR</p>\n" +
                        "                        <p class=\"soupDescription\">(" + JsonObject[key].ingredients + ")</p>\n" +
                        "                    </div>\n" +
                        "                </div>" +
                        "                <br>");
                }
            }
        },
    });
});