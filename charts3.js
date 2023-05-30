
const options7 = {

    chart: {
        type: 'line',
        height: "100%"
    },

    series: [
    ],
    noData: {
        text: "no Data reached"
    },
    
}

const chart7 = new ApexCharts(document.querySelector("#chart7"), options7)
chart7.render()

// will be using {x : data1, y : data2} format

async function loadData(){

    let response = await axios.get("data.json")
    return response.data.yearly

}

window.addEventListener('DOMContentLoaded', async function(){

    let data1 = await loadData();
    let filteredData = data1.filter(item => item.x >=2008 && item.x <=2015)
    chart7.updateSeries([{
        'name' : 'yearly',
        'data' : filteredData
    }])
   
}
)

const options8 = {

    chart: {
        type: 'line',
        height: "100%"
    },

    series: [
    ],
    noData: {
        text: "Awaiting your selection"
    },
    
}

const chart8 = new ApexCharts(document.querySelector("#chart8"), options8)
chart8.render()

let radio1 = document.querySelector('#dataGen1').addEventListener('click', async function(){

    let response = await axios.get("https://raw.githubusercontent.com/kunxin-chor/dwad-apexcharts/master/09-hands-axios-and-synchronized/meteors.json")
    let radio1Data = response.data
    chart8.updateSeries([{
    'name': 'first',
    'data': radio1Data
    }])

    document.querySelector('#message').innerHTML = "Ok!"
}
)

let radio2 = document.querySelector('#dataGen2').addEventListener('click', async function(){

    let response = await axios.get("https://raw.githubusercontent.com/kunxin-chor/dwad-apexcharts/master/09-hands-axios-and-synchronized/sightings.json")
    let radio2Data = response.data
    chart8.updateSeries([{
    'name': 'second',
    'data': radio2Data
    }])

    document.querySelector('#message').innerHTML = "Ok!"

}
)

//note the parenthesis need to follow Apexchart format {} in a [] for each data series
//Now with radio buttons we can toggle between data, woohoo!

