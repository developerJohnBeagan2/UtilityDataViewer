import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as d3 from "d3";

class BarChartDetail extends React.Component {
   constructor(props, context) {
      super(props, context);

    } // constructor

    componentDidMount() {
      if (this.props.data.length > 0)
        this.drawBarChart();
    }

    componentDidUpdate() {
      if (this.props.data.length > 0)
        this.drawBarChart();
    }

    chartValueCalc(valueType = "kwh", datarow) {
      let r = 0;
      switch(valueType) {
        case "bill":
            r = Math.round(datarow.bill);
            break;
        case "savings":
            r = Math.round(datarow.savings * 5);
            break;
        default:
            r = Math.round((datarow.kwh/5));
      }
      return r;
    }

    chartValueDisplay(valueType = "kwh", datarow) {
      let r = 0;
      switch(valueType) {
        case "bill":
            r = datarow.bill;
            break;
        case "savings":
            r = datarow.savings;
            break;
        default:
            r = Math.round((datarow.kwh));
      }
      return r;
    }

    drawBarChart() {
      let valueType = this.props.valueType;
      let cvc = this.chartValueCalc;
      let cvd = this.chartValueDisplay;
      let data = Object.assign([], this.props.data);
      const chartXoff = 80;
      const barHeight = 40;
      const padding = 4;
      let viewHeight = (data.length * barHeight) +
        ((data.length - 1) * padding);
      let viewWidth = 600;

      d3.select("svg").html("");

      let svg = d3.select("svg")
        .attr("width", viewWidth)
        .attr("height", viewHeight);

      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .style("fill", "#28a745")
        .attr('y', function(d, i) {
            let p = (i > 0) ? padding : 0;
            return (i * (barHeight + p));
          })
        .attr('x', chartXoff)
        .attr('height', barHeight)
        .attr('width', function(d) {
            return cvc(valueType, d);
          });

      svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) { return d.monyr; })
        .style("fill", "black")
        .attr('y', function(d, i) {
            let p = (i > 0) ? padding : 0;
            return (i * (barHeight + p) + (barHeight / 2) + 5);
          })
        .attr('x', function(d, i) {
          return 10;
          });

      svg.selectAll("g")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) { return cvd(valueType, d); })
        .style("fill", "black")
        .attr('y', function(d, i) {
            let p = (i > 0) ? padding : 0;
            return (i * (barHeight + p) + (barHeight / 2) + 5);
          })
          .attr('x', function(d, i) {
            return (cvc(valueType, d) + chartXoff + 10 );
          });
        } //drawBarChart()

    render() {
        return (
         <svg className="bar-chart" />
      );
    }

}


BarChartDetail.propTypes = {
   data: PropTypes.array.isRequired,
   valueType: PropTypes.string.isRequired
};

export default BarChartDetail;
