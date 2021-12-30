/**
 *
 * Login reducer
 *
 */

import { ActionTypes } from './login.types';

const initialState = {
  data: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SAVE_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default reducer;
