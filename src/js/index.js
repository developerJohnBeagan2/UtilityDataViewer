/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux';
//
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';
//
import App from './components/App'; //eslint-disable-line import/no-named-as-default
import configureStore from './store/configureStore';
import {getUtilityData} from './actions/utilityDataAction';
import initialState from './reducers/initialState';

const store = configureStore(initialState);
store.dispatch(getUtilityData());

render(
  <Provider store={store}>
    <Router>
        <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

