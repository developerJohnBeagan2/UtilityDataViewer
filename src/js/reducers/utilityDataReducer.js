import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function utilityData(state = initialState.utilityData, action) {

  switch (action.type) {

    case types.GET_UTILITY_DATA_SUCCESS:
      return Object.assign([], action.data);

    case types.ADMIN_SAVE_DATA:
      return Object.assign([], action.data);

    default:
      return state;
  }
}
