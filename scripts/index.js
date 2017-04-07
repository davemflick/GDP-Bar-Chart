

const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
d3.json(URL, (error, data) => {
	if(error) {
		return console.error(error)
	};

	var dataArr = data.data;
	var GDPMIN = d3.min(dataArr, (d)=> d[1])
	var GDPMAX = d3.max(dataArr, (d)=> d[1])
	
	var yearMin = d3.min(dataArr, (d)=> d[0])
	var yearMax = d3.max(dataArr, (d)=> d[0])

	const w = 800;
    const h = 500;
    const p = 50;


    d3.select('.graphContainer')
						.style("width", "100%")
						.style("height", "90%")
						.style("padding", p)
    
    const svg = d3.select(".graphContainer")
                  .append("svg")
                  .attr("width", "90%")
                  .attr("height", "90%")



   const xScale = d3.scaleTime()
   					.domain([new Date(yearMin), new Date(yearMax)])
   					.range([p, w-(p*2)])

   const xAxis = d3.axisBottom(xScale)
   					.tickFormat(d3.timeFormat("%Y"));

   const yScale = d3.scaleLinear()
   					.domain([GDPMIN, GDPMAX])
   					.range([h-p, p])

   const yAxis = d3.axisLeft(yScale);

   var formatTime = d3.timeFormat("%B %Y");

 
    
    svg.selectAll("rect")
       .data(dataArr)
       .enter()
       .append("rect")
       .attr("id", (d, i)=> i)
       .attr("x", (d, i)=> (i * ((w-100)/295)) + p)
       .attr("y", (d, i)=> (h - d[1]/42) - p)
       .attr("height", (d, i)=> d[1]/42)
       .attr('width', (d)=> ((w-100)/dataArr.length))
       .attr('class', 'bar')
       .on('mouseover', handleMouseOver)
       .on('mouseout', handleMouseOut)
  		.append('title')
  		.text((d)=>d)

  	svg.append('g')
  		.attr("class", "axisBar")
    	.attr("transform", "translate(" + p + ",0)")
    	.call(yAxis)
		
    
    svg.append("g")
    	.attr("class", "axisBar")
		.attr("transform", "translate(0," + (h - p) + ")")
		.attr("transfrom", "rotate(45)")
		.call(xAxis);
    
	svg.append("text")
		.attr("class","ytext")
		.attr("transform","rotate(-90)")
		.attr("y", 0 + 70)
		.attr("x", 0-(h/2) - p)
		.attr("dy","1em")
		.text("Gross Domestic Product");

	svg.append("text")
	   .attr("class","xtext")
	   .attr("x",w/2 - p)
	   .attr("y",h - 5)
	   .attr("text-anchor","middle")
	   .text("Year");

	 svg.append("text")
	 	.attr("class", "title")
	 	.attr('x', w/5)
	 	.attr('y', 50)
	 	.text("GDP for the USA")

	function handleMouseOver (d, i) {
 	d3.select(this).classed('filled', true)
 		svg.append("text")
 		.attr("class", 'stats')
 		.attr('id', (d)=> 'td' + this.id)
 		.style("font-size", 25)
 		.attr('x', 165)
 		.attr('y', 150)
 		.text((d)=> `Date: ${formatTime(new Date (dataArr[this.id][0]))}`)
 		svg.append("text")
 		.attr("class", 'stats')
 		.attr('id', (d)=> 'tg' + this.id)
 		.style("font-size", 35)
 		.attr('x', 115)
 		.attr('y', 200)
 		.text((d)=> `GDP: $${dataArr[this.id][1]} Billion`)
 	}

 	function handleMouseOut (d, i) {
 	d3.select(this).classed('filled', false)
 	d3.select("#td" + this.id).remove();
 	d3.select("#tg" + this.id).remove();
 	}
  
	
  })



 

       











