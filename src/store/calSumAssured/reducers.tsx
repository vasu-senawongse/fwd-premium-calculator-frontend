import {
  calSumAssuredState,
  calSumAssuredActionInterface,
  calSumAssuredActionType,
} from './interfaces';

const initialState: calSumAssuredState = {
  models: [],
};

export function calSumAssuredReducer(
  state = initialState,
  action: calSumAssuredActionInterface
): calSumAssuredState {
  switch (action.type) {
    case calSumAssuredActionType.ADD_TODO:
      return { models: [...state.models, action.payload] };
    case calSumAssuredActionType.DELETE_TODO:
      return {
        models: state.models.filter((todo, index) => index !== action.payload),
      };

    default:
      return state;
  }
}
