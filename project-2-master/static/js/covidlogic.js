
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 1000,
    delay: (el, i) => 0 * (i+1)
  });

covid_url = 'https://covidtracking.com/api/states/daily'

function getPlots() 
    {
    d3.json(covid_url).then(function(data)
    {   
        var state = []
        var data = data.slice(0,56);
        console.log(data)

        for (i=0; i<data.length; i++)
        {
            state.push(data[i]['state']);
        } 
        console.log(state);
        var dropdown_list = Object.values(state);
        var dropdown = d3.select("#selDataset").selectAll("select");
        dropdown.data(dropdown_list)
        .enter()
        .append("option")
        .html(function(d)
        {
          return `<option value = "${d}">${d}</option>`
        });
        
        var currentState = d3.select("#selDataset").node().value
        
        optionChanged(currentState)
    })
};
function optionChanged(inputState)
{
    d3.json(covid_url).then(function(data)
    {   
        var recentData = data.slice(0,56);
        for (i=0; i<recentData.length; i++) {
            if (recentData[i].state === inputState) {
                console.log(recentData[i].positive);
                var graphData = [{
                    values: [recentData[i].positive, recentData[i].negative, recentData[i].pending],
                    labels: ['Positive', 'Negative', 'Pending'],
                    type: 'pie'
                }];
                var layout = {
                    title: `Total Cases of Covid-19 in ${inputState}`,
                    height: 600,
                    width: 600
                    };
                    Plotly.newPlot('pie', graphData, layout);  
            }
        }  

        var twoWeeksData = data.slice(0,771)

        var dateChecked = []
        var positive = []
        var recovered = []
        var death = []

        for (j=0; j<twoWeeksData.length; j++) {

            if (twoWeeksData[j].state === inputState) {
                dateChecked.push(twoWeeksData[j]['dateChecked']);
                positive.push(twoWeeksData[j]['positive']);
                recovered.push(twoWeeksData[j]['recovered']);
                death.push(twoWeeksData[j]['death']);
                
                var tracePositive = {
                    x: dateChecked,
                    y: positive,
                    mode: 'lines+markers',
                    name: 'Total Positive'
                };
                var traceRecovered = {
                    x: dateChecked,
                    y: recovered,
                    mode: 'lines+markers',
                    name: 'Recovered'
                };
                var traceDeath = {
                    x: dateChecked,
                    y: death,
                    mode: 'lines+markers',
                    name: 'Deceased'
                };
                    
                    var lineGraph = [ tracePositive, traceRecovered, traceDeath ];
                    
                    var lineLayout = {
                    title: `${inputState} Recovered vs Deceased`,
                    height: 600,
                    width: 800
                    };
                    
                    Plotly.newPlot('line', lineGraph, lineLayout); 
                    
            }
        }
    }  
)};
getPlots();




