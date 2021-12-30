import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { ActionTypes } from './app.types';

// The initial state of the App
const initialState = {
  isLoading: false,
  userInfo: {
    mobileNo: null,
    emailId: null,
    accessToken: null,
    userRoles: null,
    expiresIn: null,
    userUuid: null,
    grantType: null,
    iamUuid: null,
    userConfig: {},
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_LOADER:
      return { ...state, isLoading: true };
    case ActionTypes.HIDE_LOADER:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export default persistReducer(
  {
    key: 'global',
    storage,
    whitelist: [],
    stateReconciler: autoMergeLevel2,
  },
  reducer,
);
