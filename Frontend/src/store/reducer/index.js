import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import categoryReducer from './category';
import authReducer from './auth';

const reducres = combineReducers({ userReducer,categoryReducer, authReducer });

export default reducres;