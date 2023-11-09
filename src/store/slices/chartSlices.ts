import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getChartApi } from '../../api/chart';
import { IChart } from '../../ChartController/IChart';

interface IChartState {
    coord: Array<IChart>;
  }

const initialState: IChartState = {coord: []} 

export const getData = createAsyncThunk(
    'getData',
    async () => {
      const response = await getChartApi()
      console.log(response)
  
      return await response.json()
    }
  )
  


export const chartSlice = createSlice ({
    name: 'chart',
    initialState: initialState,
    reducers: {
        createChart: (state) => {             
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.coord = action.payload['data']
        })
        builder.addCase(getData.rejected, (state, action) => {
          console.log(action)
      })
    },
  })
export const chartSelector = (reducer: {chartSlices: IChartState}) => {
  return reducer.chartSlices
}

export const { createChart } = chartSlice.actions;
export default chartSlice.reducer;
