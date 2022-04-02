import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './user/user';
import { EnrollmentReducer } from './enroll/enroll';
import fetchClasses, { classReducer } from './classes/DanceClasses';

const rootReducer = combineReducers({
  user: userReducer,
  EnrollmentReducer,
  class: classReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(fetchClasses());

export default store;
