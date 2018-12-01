//line
var ctxL = document.getElementById("incomeChart").getContext('2d');
var incomeChart = new Chart(ctxL, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: "Income overview ",
                data: [28, 48, 40, 19, 86, 27, 90, 100, 120, 150, 240, 20],
                backgroundColor: [
                    'rgba(121, 85, 72, .4)',
                ],
                borderColor: [
                    'rgba(121, 85, 72, .7)',
                ],
                borderWidth: 6
            }
        ]
    },
    options: {
        responsive: true
    }
});