export interface ICalSumAssuredModel {
  name: string;
  genderCd: string;
  dob: string;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: string;
  baseSumAssured: number;
}

export interface calSumAssuredState {
  models: ICalSumAssuredModel[];
}

export enum calSumAssuredActionType {
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
}

export type calSumAssuredAction = calSumAssuredActionType;

export interface calSumAssuredActionInterface {
  type: calSumAssuredAction;
  payload: any;
}
