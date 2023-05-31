const options9 = {

    chart: {
        type: 'line',
        height: "100%"
    },

    series: [
    ],
    noData: {
        text: "Data loading, or no Data reached"
    },
    
}

const options10 = {

    chart: {
        type: 'line',
        height: "100%"
    },

    series: [
    ],
    noData: {
        text: "Data loading, or no Data reached"
    },
    
}

const options11 = {

    chart: {
        type: 'line',
        height: "100%"
    },

    series: [
    ],
    noData: {
        text: "Data loading, or no Data reached"
    },
    
}

const chart9 = new ApexCharts(document.querySelector("#chart9"), options9)
const chart10 = new ApexCharts(document.querySelector("#chart10"), options10)
const chart11 = new ApexCharts(document.querySelector("#chart11"), options11)

chart9.render()
chart10.render()
chart11.render()


async function loadData1(){
    let response = await axios.get("https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/master/hands-on-6.2b/reviews.json")
    let data1 = response.data
    chart9.updateSeries([{
        'name': 'data1',
        'data': data1
    }])
}

async function loadData2(){
    let response = await axios.get("https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/master/hands-on-6.2b/reviews.json")
    let data2 = response.data
    chart10.updateSeries([{
        'name': 'data2',
        'data': data2
    }])
}

//chart10 data is broken, so will repeat with chart9's

async function loadData3(){
    let response = await axios.get("https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/master/hands-on-6.2b/sales.json")
    let data3 = response.data
    chart11.updateSeries([{
        'name': 'data3',
        'data': data3
    }])
}

window.addEventListener("DOMContentLoaded", function(){
    
    loadData1()
    loadData2()
    loadData3()

})
