const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2],
      borderWidth: 0.3
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});




// https://www.chartjs.org/docs/latest/charts/doughnut.html