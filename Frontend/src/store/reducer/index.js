import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import categoryReducer from './category';
import departmentReducer from './department';
import deviceReducer from './device';
import authReducer from './auth';

const reducres = combineReducers({ userReducer,categoryReducer, authReducer, departmentReducer, deviceReducer });

export default reducres;