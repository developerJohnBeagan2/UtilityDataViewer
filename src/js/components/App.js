// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import HeaderNav from './HeaderNav'; //eslint-disable-line import/no-named-as-default
import BarChart from './BarChart'; //eslint-disable-line import/no-named-as-default
import LineChart from './LineChart'; //eslint-disable-line import/no-named-as-default
import Admin from './Admin'; //eslint-disable-line import/no-named-as-default
import { connect } from 'react-redux';

const App = () => {
    return (
        <div className="container">

          <div className="jumbotron">
              <h1>Utility Data Viewer</h1>
              <p className="lead" />
          </div>

          <HeaderNav />
          <Route exact path="/" component={BarChart} />
          <Route exact path="/barChart" component={BarChart} />
          <Route path="/lineChart" component={LineChart} />
          <Route path="/admin" component={Admin} />
        </div>
    );
};


App.propTypes = {
  match: PropTypes.object.isRequired,
  utilityData: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    utilityData: state.utilityData
  };
}

export default connect(mapStateToProps)(App);

