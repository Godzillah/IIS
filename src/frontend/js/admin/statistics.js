// global variables
$arrayOfIncomes = [];
$arrayOfOrders = [];
$arrayOfMonths = [];


/**
 * On ready function which fetch all data from API  https://restaurant.memonil.com/ with GET method
 * getting whole staticstics about year
 */
$(document).ready(function () {
    // take all ingredients
    $.ajax({
        url: "https://restaurant.memonil.com/statistics",
        type: "GET",
        headers: {
            "Authorization": sessionStorage.getItem("jwtToken")
        },
        contentType: 'application/json;charset=UTF-8',
        success: function (response) {
            // handle the response
            console.log(response);
            var JsonObject = JSON.parse(response);
            for (var key in JsonObject) {
                console.log("Toto je Json prijmov  -> " + JsonObject[key].income);
                console.log("Toto je Json objednavok -> " + JsonObject[key].orders);
                console.log("This is a key -> " + key);
                $arrayOfIncomes.push(JsonObject[key].income);
                $arrayOfOrders.push(JsonObject[key].orders);
                $arrayOfMonths.push(key);
            }
            console.log("This is a array -> " + JSON.stringify($arrayOfMonths));
            var chartForIncome = document.getElementById("incomeChart").getContext('2d');
            var incomeChart = new Chart(chartForIncome, {
                type: 'bar',
                data: {
                    labels: $arrayOfMonths,
                    datasets: [{
                        label: 'Income(EUR) ',
                        data: $arrayOfIncomes,
                        backgroundColor: [
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)'
                        ],
                        borderColor: [
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            var chartForOrders = document.getElementById("orderChart").getContext('2d');
            var orderChart = new Chart(chartForOrders, {
                type: 'bar',
                data: {
                    labels: $arrayOfMonths,
                    datasets: [{
                        label: 'Orders(count) ',
                        data: $arrayOfOrders,
                        backgroundColor: [
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)',
                            'rgba(121, 85, 72, .4)'
                        ],
                        borderColor: [
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                            'rgba(121, 85, 72, .8)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    });
});


// chart woking ...
// chart for income and orders overview
// var chartForIncome = document.getElementById("incomeChart").getContext('2d');
// // in Json format
// var incomeChart = new Chart(chartForIncome, {
//     type: 'line',
//     data: {
//         labels: $arrayOfMonths,
//         datasets: [
//             {
//                 label: "Income",
//                 data: $arrayOfIncomes,
//                 backgroundColor: 'rgba(121, 85, 72, .4)',
//                 borderColor:'rgba(121, 85, 72, .7)',
//                 borderWidth: 2
//             },
//             {
//                 label: "Orders",
//                 data: $arrayOfOrders,
//                 backgroundColor: 'rgba(121, 85, 72, .4)',
//                 borderColor:'rgba(121, 85, 72, .7)',
//                 borderWidth: 2
//             }
//         ]
//     },
//     options: {
//         responsive: true,
//     }
// });




// var charForOrders = document.getElementById("orderChart").getContext('2d');
// var orderChart = new Chart(charForOrders, {
//     type: 'line',
//     data: {
//         labels: $arrayOfMonths,
//         datasets: [
//             {
//                 label: "Income",
//                 data: $arrayOfIncomes,
//                 backgroundColor: 'rgba(121, 85, 72, .4)',
//                 borderColor:'rgba(121, 85, 72, .7)',
//                 borderWidth: 2
//             },
//             {
//                 label: "Orders",
//                 data: $arrayOfOrders,
//                 backgroundColor: 'rgba(121, 85, 72, .4)',
//                 borderColor:'rgba(121, 85, 72, .7)',
//                 borderWidth: 2
//             }
//         ]
//     },
//     options: {
//         responsive: true,
//     }
// });