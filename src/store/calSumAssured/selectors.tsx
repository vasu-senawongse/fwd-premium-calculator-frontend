import { RootState } from '..';

export function getSaState(state: RootState) {
  return state.calSumAssuredReducer.models;
}
