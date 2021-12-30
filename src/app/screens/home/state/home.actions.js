/**
 *
 * Home actions
 *
 */

import { ActionTypes } from './home.types';

export function defaultAction(payload) {
  return {
    type: ActionTypes.DEFAULT_ACTION,
    payload,
  };
}
