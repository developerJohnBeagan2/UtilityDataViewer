import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as utilityDataAction from '../actions/utilityDataAction';

class Admin extends React.Component {
   constructor(props, context) {
      super(props, context);

      this.state = {
        data: JSON.stringify(this.props.utilityData, null, '\t'),
        saved: "save-check-hide"
      };

      this.updateField = this.updateField.bind(this);
      this.saveData = this.saveData.bind(this);

    } // constructor

    componentWillReceiveProps(nextProps) {
      this.setState({data: JSON.stringify(nextProps.utilityData, null, '\t')});
    }

    updateField(e) {
      let jsonString = e.target.value;
      return this.setState({
        data: jsonString,
        saved: "save-check-hide"
      });
    }

    saveData(e) {
      this.setState({saved: "save-check-show"});
      let jsonString = this.state.data;
      let jsonData = JSON.parse(jsonString);
      this.props.actions.adminSaveData(jsonData);
    }

    render() {

        return (
          <div>
            <h1>Admin</h1>

            <br />
            <textarea rows = "25" cols = "40"
              value={this.state.data}
              onChange={this.updateField}
              />

            <br /><br />
            <button type="button" style={{fontSize: "1.2rem"}}
              className="btn btn-outline-success"
              onClick={this.saveData}>
              Save Data
            </button>

            <span className={this.state.saved}><i className="fas fa-check" /></span>

          </div>
      );
    }


}


Admin.propTypes = {
  utilityData: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    utilityData: state.utilityData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(utilityDataAction, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin);
