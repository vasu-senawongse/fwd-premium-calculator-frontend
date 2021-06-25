import {
  ICalPremiumModel,
  calPremiumInterface,
  calPremiumActionType,
} from './interfaces';

export function addTodo(model: ICalPremiumModel): calPremiumInterface {
  return {
    type: calPremiumActionType.ADD_TODO,
    payload: model,
  };
}

export function deleteTodo(index: number): calPremiumInterface {
  return {
    type: calPremiumActionType.DELETE_TODO,
    payload: index,
  };
}
