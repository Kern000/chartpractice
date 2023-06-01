options1 = {
    chart: {
        type: 'bar',
        height: '100%'
    },
    title: {
        text: 'Birth Rate'
    },
    series: []
    ,
    noData:{
        text: "Finding Data or data not reached"
    }
}

let chart1 = new ApexCharts((document.querySelector('#container1')), options1)
chart1.render()

async function loadData (url) {
    let response = await axios.get(url)
    let json = await csv().fromString(response.data)
    return json
}

function dataTransform (data1, ethnicity){
    
    let filteredData1 = data1.filter(dataItem => {
        return dataItem.ethnic_group == ethnicity;
        }
    )
    
    let mappedData1 = filteredData1.map(dataItem2 => {
        return {
            x: parseFloat(dataItem2.year),
            y: parseFloat(dataItem2.live_births)
        }
    })
    
    console.log(filteredData1)
    console.log(mappedData1)

    return mappedData1
}

document.querySelectorAll('.radio').forEach(radio => {radio.addEventListener("click", async function(){

    let jsonData1 = await loadData('crude-birth.csv')
    console.log(jsonData1)

    
    let ethnicity1 = document.querySelector(".radio:checked").value
    console.log(ethnicity1)

    let series= await dataTransform(jsonData1, ethnicity1)

    console.log(series)
    chart1.updateSeries([{
        name: 'hello',
        data: series
    }])
})
})