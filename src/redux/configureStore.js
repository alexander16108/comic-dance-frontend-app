import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './user/user';
import { classReducer, fetchClasses } from './DanceClasses/DanceClasses';

const rootReducer = combineReducers({
  user: userReducer,
  class: classReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(fetchClasses());

export default store;
