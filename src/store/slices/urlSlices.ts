import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUrlState {
  url: string;
}

const initialState: IUrlState = { url: "http://localhost:3001" };

export const urlSlice = createSlice({
  name: "url",
  initialState: initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});
export const urlSelector = (reducer: { urlSlice: IUrlState }) => {
  return reducer.urlSlice.url;
};

export const { setUrl } = urlSlice.actions;
export default urlSlice.reducer;
