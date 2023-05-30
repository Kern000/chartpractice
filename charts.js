
// define chart parameters
const options1 = {

    title: {
        text: 'Chicken Rice Index',
        align: 'left',
    },
    
    subtitle: {

        text: 'Price Inflation of Chicken Rice',
        align: 'left'
    },

    chart: {
        type: 'area',
        zoom: {
            enabled: true
        }
    },

    series: [
        {
            name: 'Price of Chicken Rice',
            data: [1.5, 1.8, 1.9, 2.0, 2.1, 2.4, 2.5, 3, 3.5, 4]
        },
        {
            name: 'Roast chicken rice',
            data: [1.7, 1.8, 2.0, 2.1, 2.3, 2.7, 2.9, 3, 3.8, 4.5]
        }
    ],

    xaxis: {
        
        categories: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    },

    yaxis: {

        opposite: true
    }

}

// create chart, selecting container destination w defined height and options
const chart1 = new ApexCharts(document.querySelector('#chart1'), options1)
chart1.render()

const options2 = {

    chart : {
        type: 'pie',

    },

    title : {
        text: 'income spent on chick rice'
    },

    series : [23, 100],
    labels: ['chicken rice', 'non-chicken rice'],
    colors: ['#043380', '#9ae3aa']
    
}

const chart2 = new ApexCharts(document.querySelector('#chart2'), options2)
chart2.render()

const sightings = [10, 13, 15, 22, 34, 23, 55, 78, 44, 31];
const temperature = [33, 21, 22, 24, 25, 26, 26, 21, 31, 44];

const options3 = {
    chart: {
        type: 'line',
    },

    series: [
        {
            name: 'sightings',
            data: sightings
        },
        {
            name: 'temperature',
            data: temperature
        }
    ],

    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct']
    }
}

// dataset with disparity in numbers

const chart3 = new ApexCharts(document.querySelector('#chart3'),options3)
chart3.render()

const options4 = {
    
    chart : {
        type: 'line',
    },

    series: [{
        name: 'Reach',
        data: [5000, 17000, 2400, 25000, 14000,55000]
    },
    
    {
        name: 'Facebook Campaigns Ran',
        data: [3, 5, 1, 8 , 4, 10]
    }
    ],

    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
}

const chart4 = new ApexCharts(document.querySelector('#chart4'), options4)

chart4.render()

// charts2.js will address this with synchronous charts
// flex on main container (width 90vh, flex column), then div class/id containers. 
// Prevent CSS clashing of formatting on main container, chart container, and chart
// As usual, the less code used in Flex and organizing CSS (e.g. adjusting on one dimension like width or height only), the lesser the clash in CSS formatting. Construct from mobile view up. Create one more set of rules for non-mobile with @media (min-width: 600px){}




