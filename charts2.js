const campaigns = [3, 5, 1, 8, 4, 10];
const reach = [5000, 17000, 2400, 25000, 14000, 55000];
const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const campaignChartOptions = {
    chart: {
        id: 'campaign',
        type: 'line',
        group: 'campaign-charts',

    },

    title: {
        text: 'campaign data'
    },

    series: [
        {
            name: 'campaigns',
            data: campaigns,
        },
    ],
    
    xaxis: {
        categories: categories
    },
    yaxis: {
        labels: {
          minWidth: 40
        }
      }

}

const campaignChart = new ApexCharts(document.querySelector('#chart5'),campaignChartOptions)
campaignChart.render()


const reachChartOptions = {

    chart: {
        id: 'reach',
        type: 'line',
        group: 'campaign-charts'
    },

    title: {
        text: 'reach data'
    },

    series: [{

        name: 'Reach',
        data: reach
    }],

    xaxis: {
        categories: categories,
    },

    yaxis: {
        labels: {
          minWidth: 40
        }
      }

}

const reachChart = new ApexCharts(document.querySelector('#chart6'),reachChartOptions)
reachChart.render()


// Synchronous charts created