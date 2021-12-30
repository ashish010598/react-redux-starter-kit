/**
 *
 * Login actions
 *
 */

import { ActionTypes } from './login.types';

export function getDataFromAPI(payload) {
  return {
    type: ActionTypes.GET_DATA,
    payload,
  };
}

export function saveDatainStore(payload) {
  return {
    type: ActionTypes.SAVE_DATA,
    payload,
  };
}
