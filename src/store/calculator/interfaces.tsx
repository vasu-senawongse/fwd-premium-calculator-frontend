export interface IModel {
  name: string;
  genderCd: string;
  dob: string;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: string;
  saPerYear: number;
}

export interface IResponse {
  benefitTable: Array<Object>;
  deathBenefitList: Array<Object>;
  dividendBenefitList: Array<Object>;
  modalRatesList: Array<Object>;
  otherBenefitList: Array<Object>;
  quotationProductList: Array<any>;
  survivalBenefitList: Array<Object>;
}

export interface CalculatorState {
  models: IModel[];
}

export enum CalculatorActionType {
  ADD_TODO = 'ADD_TODO',
  CHECK_TODO = 'CHECK_TODO',
  DELETE_TODO = 'DELETE_TODO',
}

export type CalculatorAction = CalculatorActionType;

export interface CalculatorActionInterface {
  type: CalculatorAction;
  payload: any;
}
