import { combineReducers } from 'redux';
import profile from './profile';
import match from './match';
import alert from './alert';
import auth from './auth';

export default combineReducers({ alert, auth, profile, match });
