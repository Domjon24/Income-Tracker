const ctx = document.getElementById('chart1');

const myChart1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Orange',],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3],
      borderWidth: 1,
    
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

const pushValue = document.getElementById('pushValue');
const push = document.getElementById('push');
const pushLabel = document.getElementById('pushLabel');

push.addEventListener('click', pushValueChart)
console.log(pushValue.value)


function pushValueChart() {
  myChart1.data.datasets[0].data.push(pushValue.value)
  myChart1.data.labels.push(pushLabel.value);
  
  myChart1.update()

  console.log(myChart1.data.datasets[0].data);
}

