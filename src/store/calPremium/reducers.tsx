import {
  calPremiumState,
  calPremiumInterface,
  calPremiumActionType,
} from './interfaces';

const initialState: calPremiumState = {
  models: [],
};

export function calPremiumReducer(
  state = initialState,
  action: calPremiumInterface
): calPremiumState {
  switch (action.type) {
    case calPremiumActionType.ADD_PM:
      return { models: [...state.models, action.payload] };
    case calPremiumActionType.DELETE_PM:
      return {
        models: state.models.filter((todo, index) => index !== action.payload),
      };

    default:
      return state;
  }
}
