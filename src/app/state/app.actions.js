import { ActionTypes } from './app.types';

export const showLoadingSpinner = () => ({
  type: ActionTypes.SHOW_LOADER,
});

export const hideLoadingSpinner = () => ({
  type: ActionTypes.HIDE_LOADER,
});
