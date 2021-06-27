import { RootState } from '..';

export function getPmState(state: RootState) {
  return state.calPremiumReducer.models;
}
