import { createStore, combineReducers } from 'redux';
import userReducer from '../Redux/reducer';
import profileReducer from '../Redux/profileReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;