import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    


export const cantidadCursos =
    async (params: any, thunkAPI) => {
        const response = await axios.get(
            `https://pqxb3e-3000.csb.app/api/curso-empleado/count-state`
        );
        return response.data;
    }

export const promedioCalificaciones =
    async (params: any, thunkAPI) => {
        const response = await axios.get(
            `https://pqxb3e-3000.csb.app/api/empleados/prom-country/`, { country: params }
        );
        return response.data;
    }

export const dataEmpleados =
    async (params: any, thunkAPI) => {
        const response = await axios.get(
            `http://localhost:3000/api/empleados/some/10`,
        );
        return response.data;
    }

export const dataCursos =
    async (params: any, thunkAPI) => {
        const response = await axios.get(
            `https://pqxb3e-3000.csb.app/api/cursos/some/10`,
        );
        return response.data;
    }

export const bestEmployees =
    async (params: any, thunkAPI) => {
        const response = await axios.get(
            `https://pqxb3e-3000.csb.app/api/curso-empleado/country`, { country: params.country, limit: 10 }
        );
        return response.data;
    }

export const bestCourses =
    async (params: any, thunkAPI) => {
        const response = await axios.get(
            `https://pqxb3e-3000.csb.app/api/curso-empleado/country-modal`, { country: params.country, limit: 10, modal: params.modal }
        );
        return response.data;
    }

    export const bestCoursesFinal =
    async (params: any, thunkAPI) => {
        const response = await axios.get(
            `https://pqxb3e-3000.csb.app/api/curso-empleado/best`, { limit: 10 }
        );
        return response.data;
    }

export const HomeSlice = createSlice({
    name: "homeData",
    initialState: {
    },
    reducers: {

    }
});


export const selectData = (state: any) => state.table.data;


export default HomeSlice.reducer;