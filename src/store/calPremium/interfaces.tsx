export interface ICalPremiumModel {
  name: string;
  genderCd: string;
  dob: string;
  planCode: string;
  saPerYear: number;
  paymentFrequency: string;
  baseAnnualPremium: number;
}

export interface calPremiumState {
  models: ICalPremiumModel[];
}

export enum calPremiumActionType {
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
}

export type calPremiumAction = calPremiumActionType;

export interface calPremiumInterface {
  type: calPremiumAction;
  payload: any;
}
