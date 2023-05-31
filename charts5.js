async function loadData(url){

    let response = await axios.get(url);
    let json = await csv().fromString(response.data)
    console.log (json)
    return (json);

}

function dataTransformer(rawData){

    let filteredData = []
    for (let item of rawData){

        if(item.ethnic_group == "Others"){
            filteredData.push(item)
        }
    }

    let formattedData = []
    for (let data of filteredData) {

        formattedData.push(
            {
                'x': parseFloat(data.year),
                'y': parseFloat(data.live_births)
            }
        )
    }
    console.log(formattedData)
    return formattedData
}

function dataTransformer2(rawData){

    let filteredData2 = []
    for (let item of rawData){

        if(item.ethnic_group == "Chinese"){
            filteredData2.push(item)
        }
    }

    let formattedData2 = []
    for (let data of filteredData2) {

        formattedData2.push(
            {
                'x': parseFloat(data.year),
                'y': parseFloat(data.live_births)
            }
        )
    }
    console.log(formattedData2)
    return formattedData2
}

const options1 = {
    
        chart: {
            type: 'line',
            height: "100%"
        },

        title: {
            text: 'Live birth of \'others\' ethnic group'
            
        },

        series: [
        ],
        noData: {
            text: "Data loading, or no Data received"
        }       
    }

window.addEventListener("DOMContentLoaded", async function(){

    let jsonData = await loadData('crude-birth.csv');
    let series1 = await dataTransformer(jsonData)
    let series2 = await dataTransformer2(jsonData)

// It is important to note that need to await loadData first here, csv().fromString() returns a promise, not the object itself.
// Rather than use await dataTransformer(loadData('crude-birth.csv))
// correctly using await when calling loadData inside the DOMContentLoaded event listener. This ensures that the promise is resolved before proceeding with the next steps.
// By using the await keyword, the code waits for the promise to resolve, and then assigns the resolved value to the data variable.

    chart1.updateSeries([{
        'name' : 'Crude Birth Rates - Others',
        'data' : series1
        },
        {
        'name' : 'Crude Birth Rates - Chinese',
        'data' : series2
    }
])
}
)

let chart1 = new ApexCharts((document.querySelector('#chart1')), options1)
chart1.render()






















// by passing an argument, the data retrieval is made more dynamic


// Example from File
// /** csv file
// a,b,c
// 1,2,3
// 4,5,6
// */
// const csvFilePath='<path to csv file>'
// const csv=require('csvtojson')
// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
// 	console.log(jsonObj);
// 	/**
// 	 * [
// 	 * 	{a:"1", b:"2", c:"3"},
// 	 * 	{a:"4", b:"5". c:"6"}
// 	 * ]
// 	 */ 
// })

// // Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);