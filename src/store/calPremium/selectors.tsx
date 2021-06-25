import { RootState } from '..';

export function getTodoState(state: RootState) {
  return state.calPremiumReducer.models;
}
