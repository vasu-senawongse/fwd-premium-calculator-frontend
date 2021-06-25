import {
  CalculatorState,
  CalculatorActionInterface,
  CalculatorActionType,
} from './interfaces';

const initialState: CalculatorState = {
  models: [],
};

export function calculatorReducer(
  state = initialState,
  action: CalculatorActionInterface
): CalculatorState {
  switch (action.type) {
    case CalculatorActionType.ADD_TODO:
      return { models: [...state.models, action.payload] };
    case CalculatorActionType.DELETE_TODO:
      return {
        models: state.models.filter((todo, index) => index !== action.payload),
      };

    default:
      return state;
  }
}
