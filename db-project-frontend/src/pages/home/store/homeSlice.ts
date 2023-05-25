import { createSlice } from "@reduxjs/toolkit";


export const HomeSlice = createSlice({
    name: "homeData",
    initialState: {
        data: [],
        loadingSync: false,
        page: 0,
        rowsPerPage: 10,
        total: 0
    },
    reducers: {
    }
});


export const selectData = (state: any) => state.table.data;


export default HomeSlice.reducer;