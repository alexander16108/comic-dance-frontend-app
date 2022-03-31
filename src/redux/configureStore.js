// import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './user/user';
import { EnrollmentReducer } from '../enroll/enroll';

const rootReducer = combineReducers({
  user: userReducer,
  EnrollmentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
