import { combineReducers } from 'redux';
import profile from './profile';
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({ alert, auth, profile });
