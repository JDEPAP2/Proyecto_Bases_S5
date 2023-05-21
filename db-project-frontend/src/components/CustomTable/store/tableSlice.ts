import { createSlice } from "@reduxjs/toolkit";


export const TableSlice = createSlice({
    name: "dataTable",
    initialState: {
        data: [],
        loadingSync: false,
        page: 0,
        rowsPerPage: 10,
        total: 0
    },
    reducers: {
        setRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLoadingSync: (state, action) => {
            state.loadingSync = !state.loadingSync;
        },
    },
});

export const { setRowsPerPage, setPage, setLoadingSync } = TableSlice.actions;

export const selectData = (state: any) => state.table.data;

export const selectLoading = (state: any) => state.table.loadingSync;
export const selectPage = (state: any) => state.table.page;
export const selectRowsPerPage = (state: any) => state.table.rowsPerPage;
export const selectTotal = (state: any) => state.table.total;


export default TableSlice.reducer;