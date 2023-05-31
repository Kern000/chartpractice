
const url1 = 'https://raw.githubusercontent.com/kunxin-chor/data-files-and-stuff/master/bigger-sales.json'
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


option1 = {
    chart : {
        type: 'line',
        height: '100%'
    },
    series: []
    ,
    noData: {
        text: 'no data',
    }
}

let chart1 = new ApexCharts((document.querySelector('#chart1')), option1)
chart1.render()

async function loadData(url){

    let response = await axios.get(url)
    return response.data 

}

function dataTransformer(data, year, customerCountry){

    let revenue = data.map(function(object) {
        return {
            'amount': object.payment.amount,
            'date': new Date(object.completed_at),
            'country': object.customer.country
        }
    })

    let filtered = revenue.filter(function(object) {
        return object.date.getFullYear() == year
    })

    let filtered2 = filtered.filter(function(object){
        return object.country.toLowerCase().includes(customerCountry.toLowerCase())
    })

    let toGroupByMonths = filtered2.map(function(object){
        return {
            'amount': object.amount,
            'month': object.date.getMonth(),
            'country': object.country
        }
    })

    function sortingByMonths(dataset, key) {

        return dataset.reduce(function(storage, object){

           var group = object[key]
           storage[group] = storage[group] || []
           storage[group].push(object)
           return storage
            }, {})
    }

    let sorted = sortingByMonths(toGroupByMonths, 'month')

    let series = Object.values(sorted).map(function(group, month){
        return {
            x: monthNames[month],
            y: group.reduce((accum, object) => accum + object.amount, 0)
        }})
    
    chart1.updateSeries([{
        'name': 'revenue',
        'data': series,
}])
    //.map 2nd argument is Index (optional): This represents the index of the current element being processed.
    // so it iterate from zero
}

let searchButton = document.querySelector('#search-Btn').addEventListener('click', async function(){

    let data1 = await loadData(url1)
    let year1 = document.querySelector("#searchBar").value
    let customerCountry1 = document.querySelector("#searchBar2").value
    let transformedData = dataTransformer(data1, year1, customerCountry1)   

})


