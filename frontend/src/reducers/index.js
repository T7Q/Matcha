import { combineReducers } from 'redux';
import profile from './profile';
import match from './match';
import auth from './auth';
import snackbar from './snackbar';
import chat from './chat';
import notifications from './notifications';

export default combineReducers({ auth, chat, notifications, profile, match, snackbar });
