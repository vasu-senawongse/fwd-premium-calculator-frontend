import {
  IModel,
  CalculatorActionInterface,
  CalculatorActionType,
} from './interfaces';

export function addTodo(model: IModel): CalculatorActionInterface {
  return {
    type: CalculatorActionType.ADD_TODO,
    payload: model,
  };
}

export function deleteTodo(index: number): CalculatorActionInterface {
  return {
    type: CalculatorActionType.DELETE_TODO,
    payload: index,
  };
}

export function checkTodo(index: number): CalculatorActionInterface {
  return {
    type: CalculatorActionType.CHECK_TODO,
    payload: index,
  };
}
