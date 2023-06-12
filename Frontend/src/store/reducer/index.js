import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import categoryReducer from './category';

const reducres = combineReducers({ userReducer, categoryReducer });

export default reducres;