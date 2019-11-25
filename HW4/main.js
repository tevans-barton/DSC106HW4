'use strict';
const bubbleChartJSON = 'jonah_hill_movies.json'
//Bubble Chart Section

let bubbleChartConfig = {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Jonah Hills Top Grossing Movies'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: []
};


function onSuccessCb(jsonData) {
    let bubbleChartData = jsonData.map(function(elm) {
        return {
            name: elm['Movie'],
            data: elm['Domestic']
        };
    });
    bubbleChartConfig['series'] = bubbleChartData;
    Highcharts.chart('BubbleChart', bubbleChartConfig);
}

// Utility function to fetch any file from the server
function fetchJSONFile(filePath, callbackFunc) {
    console.debug("Fetching file:", filePath);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 0) {
                console.info("Loaded file:", filePath);
                var data = JSON.parse(httpRequest.responseText);
                console.log(data)
                console.debug("Data parsed into valid JSON!");
                console.debug(data);
                if (callbackFunc) callbackFunc(data);
            } else {
                console.error("Error while fetching file", filePath, 
                    "with error:", httpRequest.statusText);
            }
        }
    };
    httpRequest.open('GET', filePath);
    httpRequest.send();
}

function doMain() {
    Highcharts.chart('BubbleChart', bubbleChartConfig);
    fetchJSONFile(bubbleChartJSON, onSuccessCb);
}

document.onload = doMain();