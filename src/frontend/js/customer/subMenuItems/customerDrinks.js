$( document ).ready(function()  {
    console.log("Ahoj customerDrinks.js");
    $.ajax({
        url: "https://restaurant.memonil.com/meals",
        type: "GET",
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            console.log(response);
            var JsonObject = JSON.parse(response);

            for (var key in JsonObject) {
                console.log(JsonObject[key].type);
                // ak je jedno meal tak budeme appendovat
                if(JsonObject[key].type === "drink"){
                    $(".drinkItems").append("<div class=\"drinkItem\">\n" +
                        "                    <div class=\"drinkNamePriceDescription\">\n" +
                        "                        <p class=\"drinkNamePrice\"><b>"+JsonObject[key].description+"</b>....................................................."+JsonObject[key].price+" EUR</p>\n" +
                        "                        <p class=\"drinkDescription\">("+JsonObject[key].ingredients+")</p>\n" +
                        "                    </div>\n" +
                        "                </div>" +
                        "                <br>");

                }
            }
            console.log("GET method");
        },
    });
});