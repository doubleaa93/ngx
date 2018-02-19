import {
  applyMiddleware,
  Store,
  createStore
} from 'redux';
import { NgRedux } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { IAppState } from './types';
import rootReducer from './reducers/root-reducer';

export default function configureStore() {
  return createStore<IAppState>(
    rootReducer,
    applyMiddleware(createLogger())
  );
}
