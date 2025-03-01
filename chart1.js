const ctx = document.getElementById('chart1');

const myChart1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Paycheck Total',
      data: [],
      borderWidth: 2,
    
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

const pushValue = document.getElementById('netPay');
const push = document.getElementById('Submit');
const pushLabel = document.getElementById('paycheckDate');

// push.addEventListener('click', pushValueChart)



function pushValueChart() {
  myChart1.data.datasets[0].data.push(pushValue.value)  //net total. Y axis values
  myChart1.data.labels.push(pushLabel.value);  //date. X Axis of chart
  
  myChart1.update()

  console.log(myChart1.data.datasets[0] +  myChart1.data.labels);
}

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
  // console.log(object.data.datasets[0].data + "  " + object.data.labels + "Chart Updated")
  console.log(`Chart Updated.\nPay: ${object.data.datasets[0].data} \nDate: ${object.data.labels}`)
  myChart1.update()
  return object;
}
