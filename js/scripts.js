// This file is intentionally left blank.
document.addEventListener('DOMContentLoaded', function () {
  // Reset all income and expenses input values on page load
  var months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  months.forEach(function(month) {
    ['income', 'expenses'].forEach(function(type) {
      var el = document.getElementById(type + '-' + month);
      if (el) el.value = '';
    });
  });
  var ctx = document.getElementById('barChart');
  if (ctx) {
    // Get all months
    var months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];

    // Function to get values from inputs
    function getValues(type) {
      return months.map(function (month) {
        var el = document.getElementById(type + '-' + month);
        var val = el ? parseInt(el.value) : 0;
        return isNaN(val) ? 0 : val;
      });
    }

    // Initial chart
    var barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months.map(m => m.charAt(0).toUpperCase() + m.slice(1)),
        datasets: [
          {
            label: 'Income',
            data: getValues('income'),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Expenses',
            data: getValues('expenses'),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // Update chart when any input changes
    months.forEach(function (month) {
      ['income', 'expenses'].forEach(function (type) {
        var el = document.getElementById(type + '-' + month);
        if (el) {
          el.addEventListener('input', function () {
            barChart.data.datasets[0].data = getValues('income');
            barChart.data.datasets[1].data = getValues('expenses');
            barChart.update();
          });
        }
      });
    });
  }
});
