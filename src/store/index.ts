import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import chartSlices from './slices/chartSlices';
import urlSlice from './slices/urlSlices';

const reducer = combineReducers({
  chartSlices,
  urlSlice,
})

export const store = configureStore({
  reducer, 
  devTools: true,
});

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>