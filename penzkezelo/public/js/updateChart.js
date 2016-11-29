function getChartData() {
  $.get('/ajax/getChartData', (res) => {
    chart.data.datasets[0].data = res.incomeData;
    chart.data.datasets[1].data = res.expenseData;
    chart.data.labels = res.labels;
    chart.update();
  });
}

$(() => {

  setInterval(getChartData, 5000);

});
