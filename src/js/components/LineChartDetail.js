import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as d3 from "d3";

class LineChartDetail extends React.Component {
   constructor(props, context) {
      super(props, context);

    } // constructor

    componentDidMount() {
      if (this.props.data.length > 0)
        this.drawLineChart();
    }

    componentDidUpdate() {
      if (this.props.data.length > 0)
        this.drawLineChart();
    }

    drawLineChart() {

      let data = Object.assign([], this.props.data);

      // 2. Use the margin convention practice
      let margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 600,
        height = 400;

      let n = data.length;
      let xdomain = [];
      data.forEach(d =>
        xdomain.push(d.monyr)
      );

      let ydomain = [];
      data.forEach(d =>
        ydomain.push(d[this.props.valueType])
      );

      // X scale
      let xScale = d3.scaleLinear()
        .domain([0, n-1]) // data
        .range([0, width]); // svg

      // Y scale
      let yScale = d3.scaleLinear()
        .domain([0, this.props.ymax]) // data
        .range([height, 0]); // svg

      // line generator
      let line = d3.line()
        .x(function(d, i) { return xScale(i); }) // x values
        .y(function(d) { return yScale(d.y); }) // y values
        .curve(d3.curveMonotoneX); // apply smoothing to the line

      // Y datapoints
      let dataset = d3.range(n).map(function(d) { return {"y": ydomain[d] }; });


      // Add the SVG to page
      d3.select("svg").html("");

      let svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // X axis
      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)
        .ticks(5)
        .tickFormat(function(d, i) {
          return xdomain[i];
        })
      );

      // Y axis
      svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

      // Append the path, bind the data, and call the line generator
      svg.append("path")
      .datum(dataset) // Bind data to line
      .attr("class", "line") // Assign a class for styling
      .attr("d", line); // Call the line generator

      // Append a circle for each datapoint
      svg.selectAll(".dot")
      .data(dataset)
      .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d, i) { return xScale(i); })
      .attr("cy", function(d) { return yScale(d.y); })
      .attr("r", 5);


    } // draw line chart

    render() {
        return (
         <svg className="line-chart" />
      );
    }

}


LineChartDetail.propTypes = {
   data: PropTypes.array.isRequired,
   valueType: PropTypes.string.isRequired,
   ymax: PropTypes.number.isRequired
  };

export default LineChartDetail;
