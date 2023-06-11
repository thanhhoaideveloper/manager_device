import { configureStore } from '@reduxjs/toolkit';
import reducres from './reducer';

const store = configureStore({
    reducer: reducres
})

const { dispatch } = store;

export { dispatch, store };