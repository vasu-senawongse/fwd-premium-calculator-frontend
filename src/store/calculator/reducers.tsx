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

    default:
      return state;
  }
}
