let options2 = {
    chart: {
        type: 'bar',
        height: '100%',
    },

    series: [
    
    ],
    noData: {
        text: 'Data is pending or loading'
    },
    xaxis: {
        labels: {
            minWidth: 40,
        }
    }
}

async function loadData2 (url) {

    let response = await axios.get(url)
    let loadedData2 = response.data
    return loadedData2
}


window.addEventListener('DOMContentLoaded', async function(){

    let chart2 = new ApexCharts((document.querySelector('#chart2')), options2)
    chart2.render()

    let rawData2 = await loadData2('https://raw.githubusercontent.com/kunxin-chor/sales-data/main/data/sales.json')
    
    // getting earnings in year 2020:
    // step 1: narrow down data to retrieve to payment amount and year

    let earnings = rawData2.map((item) => {
        
        return {
            amount: item.payment.amount,
            date: new Date(item.completed_at)
        }
    })

    // This create array with new objects with properties: amount and date based on the API endpoint data
    // new Date() creates new Date object and give it item.completed_at -> converting string from JSON to date object
    // .map then return this as an array with this object

    console.log(earnings)

    // step 2: filter based on year

    let filteredEarnings = earnings.filter((item) => 
        item.date.getFullYear() == 2020)

    console.log(filteredEarnings)
    // now we only have 2020 data. Can see that it is in x: year, y: amount format needed by ApexCharts
    // Note that .filter() needs to be boolean, so it needs return => or use (function(item) { return criteria == criteria })
    // .filter() also return array of objects that meet the Boolean criteria

    // step 3: one more round of processing to pave way to grouping by month

    let byMonth = filteredEarnings.map(function(item) {
        return {
            amount: parseInt(item.amount),
            month: item.date.getMonth()
            }
        })
    
    console.log(byMonth)
    // note the amount does not change, we are just zooming in to look at the month that the amount belongs to
    // The map method is used on the filteredEarnings array to create a new array called ByMonth, which will contain objects representing the earnings grouped by month.
    // When using an arrow function with curly braces {}, you need to explicitly use the return keyword to return the object literal. Otherwise, the arrow function treats the curly braces as a block of code and does not automatically return a value. 

    // right now is [{amount: x, month: Feb}, {amount: x1, month: Dec},...]

    // step 4: group by months first

    function groupBy(data, key) {
        // data is data array, key is key of nested object
        // creating an empty object and pushing in
        return data.reduce(function(accum, indexItem){
            var group = indexItem[key]   // we are accessing by value we want to group by which is the month value (not the key which says 'month')
            accum[group] = accum[group] || []    

            // This is reduce sorting method.
            // accum[group] will become the key, and be initialized as [] if falsy, or existing key value which is an array of objects that will be pushed in based on month.
            // accum is object, it search for group which is value of month key, in other words, specific month
            // accum[group] can be falsy here or truthy
            // Note the short hand here: accum[group] = accum[group] || []
            // accum[group] attempts to access the value of accum using the group as the key. If the group key does not exist in the accum object, it will return undefined.
            // The logical OR operator (||) is used to provide a default value in case the left-hand side of the expression (storage[group]) evaluates to a falsy value (undefined, null, 0, empty string, etc.).
            // When the left-hand side is falsy (since not in accum), the right-hand side of the expression ([], an empty array) is evaluated and assigned to accum[group]. This initializes accum[group] as an empty array.
            // If it is falsy, it assigns an empty array to accum[group]. Otherwise, if accum[group] already exists, it keeps its current value.

            accum[group].push(indexItem)              // add the item being iterated to that grouping key
            
            console.log(accum)
            return accum
        }, {}) // set empty object as initial value for 2nd argument of reduce.
    }

    let groups = groupBy(byMonth, 'month')   //call the function
    console.log(groups)

    // pass in dataset of the filtered list of object byMonth, and the key's value to group by which is 'month'
    // it will look like this:
    // {0 : [{amount: 2336, month: 0}, {amount: 7041, month: 0}],
    // {1 : [{amount: blah, month: 1}, {amount: blah, month: 1}], 

    // step 5: we now want to combine all the amounts in the array of objects sorted into months

    let monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

    let series = Object.values(groups).map(function(indivGroup, month){ // note .map iteration need array, object.value return the array in this object from reduce.
        // argument one of function is the iterable item, which in this case is each object in the list

        return {
            x: monthNames[month], // x-ref monthName array based on month from dataset (which is index number)
            y: indivGroup.reduce((accum, nestedObject) => accum + nestedObject.amount, 0)
        }
        // hence we transformed into {x: months, y: amount} format that ApexCharts need
    })

    chart2.updateSeries([
        {
            name: "Sales",
            data: series
        }
    ])
})

// can access specific components of the Date object, such as the year, month, day, hour, minute, and second, using various methods provided by the Date object (e.g., getFullYear(), getMonth(), getDate(), getHours(), getMinutes(), getSeconds()).
// be sure not to use same similar function name and variable name across sheets. Will clash like in this file. Had 2x loadData function. 

