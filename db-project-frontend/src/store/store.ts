import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "../components/CustomTable/store/tableSlice";

export default configureStore({
    reducer: {
        table: tableSlice,
    }
})