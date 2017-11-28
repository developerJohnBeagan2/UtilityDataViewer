import utilityDataApi from '../api/utilityDataApi';
import * as types from './actionTypes';
import axios from 'axios';

export function getUtilityData() {
  return function (dispatch) {
    return axios({
      method:'get',
      url:'/api/data'
    })
    .then(response => {
      dispatch({
        type: types.GET_UTILITY_DATA_SUCCESS,
        data: response.data
      });
    })
    .catch((error) => {
      throw(error);
    });
  };
}

export function adminSaveData(data) {
  return function (dispatch) {
    dispatch({
      type: types.ADMIN_SAVE_DATA,
      data: data
    });
  };
}

