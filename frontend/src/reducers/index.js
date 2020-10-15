import { combineReducers } from 'redux';
import profile from './profile';
import match from './match';
import alert from './alert';
import auth from './auth';
import snackbar from './snackbar';
import chat from './chat';

export default combineReducers({ alert, auth, chat, profile, match, snackbar });
