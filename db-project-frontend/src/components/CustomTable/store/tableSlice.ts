import { createSlice } from "@reduxjs/toolkit";


export const TableSlice = createSlice({
  name: "dataTable",
  initialState: {
    data: [],
  },
  reducers: {
    // SET_CANALES: (state, action) => {
    //   state.canales = action.payload;
    // },
    // SET_CANAL: (state, action) => {
    //     state.canal = action.payload;
    //   },
    //   SET_CAPITULOS: (state, action) => {
    //     state.capitulos = action.payload;
    //   },
    //   SET_CAPITULO: (state, action) => {
    //     state.capitulo = action.payload;
    //   },
  },
});

// export const { SET_CANALES, SET_CANAL, SET_CAPITULOS, SET_CAPITULO } = CanalesSlice.actions;

export const selectData = (state: any) => state.table.data;

export default TableSlice.reducer;