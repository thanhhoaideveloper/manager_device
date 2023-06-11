import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import authReducer from './auth';

const reducres = combineReducers({ userReducer, authReducer });

export default reducres;