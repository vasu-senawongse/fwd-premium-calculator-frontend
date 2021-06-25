import {
  ICalSumAssuredModel,
  calSumAssuredActionInterface,
  calSumAssuredActionType,
} from './interfaces';

export function addTodo(
  model: ICalSumAssuredModel
): calSumAssuredActionInterface {
  return {
    type: calSumAssuredActionType.ADD_TODO,
    payload: model,
  };
}

export function deleteTodo(index: number): calSumAssuredActionInterface {
  return {
    type: calSumAssuredActionType.DELETE_TODO,
    payload: index,
  };
}
