import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as d3 from "d3";
import BarChartDetail from "./BarChartDetail";

class BarChart extends React.Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
        data: this.prepareData(this.props.utilityData),
        valueTypeParam: "kwh",
        valueTypeDisplay: "kWh",
        kwhClass: "btn btn-success",
        billClass: "btn btn-outline-success",
        savingsClass: "btn btn-outline-success"
      };

      this.clickKwh = this.clickKwh.bind(this);
      this.clickBill = this.clickBill.bind(this);
      this.clickSavings = this.clickSavings.bind(this);

    } // constructor



    componentWillReceiveProps(nextProps) {
      this.setState({data: Object.assign([], this.prepareData(nextProps.utilityData))});
    }

    prepareData(dataArray) {
      let returnData = [];
      dataArray.forEach(d =>
        {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          let r = Object.assign({}, d);
          r.yearmo = (d.year * 100) + d.month;
          r.monyr = months[d.month-1] + "-" + (d.year-2000);
          returnData.push(r);
        }
      );
      return returnData.sort( (first, second) => {
        return (first.yearmo - second.yearmo);
      });
    }

    clickKwh(e) {
      this.setState({
        valueTypeParam: "kwh",
        valueTypeDisplay: "kWh",
        kwhClass: "btn btn-success",
        billClass: "btn btn-outline-success",
        savingsClass: "btn btn-outline-success"
      });
    }

    clickBill(e) {
      this.setState({
        valueTypeParam: "bill",
        valueTypeDisplay: "Bill",
        kwhClass: "btn btn-outline-success",
        billClass: "btn btn-success",
        savingsClass: "btn btn-outline-success"
      });
    }

    clickSavings(e) {
      this.setState({
        valueTypeParam: "savings",
        valueTypeDisplay: "Savings",
        kwhClass: "btn btn-outline-success",
        billClass: "btn btn-outline-success",
        savingsClass: "btn btn-success"
      });
    }

    render() {

        return (
        <div>
          <div className="chart-header">
            <table><tbody><tr>
              <td width="160px"><span id="chartTitle">{this.state.valueTypeDisplay}</span> by Month</td>
            <td>
            <button id="kwh" type="button" className={this.state.kwhClass}
              onClick={this.clickKwh}
            >
              kWh</button>

            <button id="bill" type="button" className={this.state.billClass}
              onClick={this.clickBill}
              >
              Bill</button>

            <button id="savings" type="button" className={this.state.savingsClass}
              onClick={this.clickSavings}
              >
              Savings</button>
            </td>

            </tr></tbody></table>
          </div>

          <BarChartDetail data={this.state.data} valueType={this.state.valueTypeParam} />

        </div>
      );
    }


}


BarChart.propTypes = {
  utilityData: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    utilityData: state.utilityData
  };
}

export default connect(mapStateToProps)(BarChart);
