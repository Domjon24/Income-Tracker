const ctx = document.getElementById('chart1');

const myChart1 = new Chart(ctx, {

  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Paycheck Total',
      data: [],
      borderWidth: 2,
      pointRadius: 10,
      fill: {
        target: 'origin',
        above: 'rgba(255, 0, 0, 0.31)',   // Area will be red above the origin
        below: 'rgba(0, 0, 255, 0.91)'
      }
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
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
