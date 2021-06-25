import { createStore, combineReducers } from 'redux';

import { calSumAssuredReducer } from './calSumAssured/reducers';
import { calPremiumReducer } from './calPremium/reducers';

const rootReducer = combineReducers({
  calSumAssuredReducer,
  calPremiumReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer);

  return store;
}
