import { createStore, combineReducers } from 'redux';

import { calculatorReducer } from './calculator/reducers';

const rootReducer = combineReducers({
  calculatorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer);

  return store;
}
