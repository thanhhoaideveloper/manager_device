import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';

const reducres = combineReducers({ userReducer });

export default reducres;