import { RootState } from '..';

export function getTodoState(state: RootState) {
  return state.calSumAssuredReducer.models;
}
