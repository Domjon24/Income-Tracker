const ctx = document.getElementById('chart1');

const myChart1 = new Chart(ctx, {

  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Paycheck Total',
      data: [],
      borderWidth: 3,
      pointRadius: 10,
      fill: {
        target: 'origin',
        above: 'rgba(255, 196, 0, 1)',   // Area will be red above the origin
        below: 'rgba(6, 98, 187, 1)'
      }
    }]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }}
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
          font: {
            size: 12,
            weight: '500'
          }
        }}
      }
  }
});


function updateMyChart() {
  const table = document.getElementById('groceryList');
  const thisRow = table.getElementsByTagName('tr');
  const object = myChart1;
  object.data.datasets[0].data = [];
  object.data.labels = [];  //reset after each iteration & button press

  for (let i = 0; i < thisRow.length; i++) {

    const cells = thisRow[i].getElementsByTagName('td');

    if (cells.length > 0) {
      let thisDate = cells[0].textContent; 
      let thisNetPay = cells[1].textContent; 

      object.data.datasets[0].data.push(thisNetPay)
      object.data.labels.push(thisDate)

    }
  }

    console.log(`Chart Updated.\nPay: ${object.data.datasets[0].data} \nDate: ${object.data.labels}`)
    myChart1.update()
    return object;
}