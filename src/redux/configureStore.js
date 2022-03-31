// import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './user/user';
import { EnrollementReducer } from '../enroll/enroll';

const rootReducer = combineReducers({
  user: userReducer,
  EnrollementReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
