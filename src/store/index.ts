import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import chartSlices from './slices/chartSlices';


export const store = configureStore({
  reducer: {
    chartSlices,
  },
  devTools: true,
});

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>