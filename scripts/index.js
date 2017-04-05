const width = 800;
const height = 350;
const padding = 40;

var svgContainer = d3.select('.graphContainer')
						.append('svg')
						.attr('id', 'svgCont')
						.attr('width', width + padding*2)
						.attr('height', height + padding*2);


var dataSet = d3.select('.graphContainer')
					.select('.dataSet')
					.style('width', width + padding*2);

var visual = svgContainer.append('dataPoint')
							.attr('id', 'visual')
							.attr('transform',
                                  'translate(' + padding + ','
                                               + padding + ')');

const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
d3.json(URL, (error, data) => {
	if(error) {
		return console.error(error)
	};
	var dates = [];
	var GDP = [];
	var datArr = data.data;
	datArr.forEach((arg) => {dates.push(arg[0])})
	datArr.forEach((arg) => {GDP.push(arg[1])})
	var GDPMIN = d3.min(data.data)
	var GDPMAX = d3.sum(data.data)
	console.log(dates, GDP);
})

