import { configureStore } from "@reduxjs/toolkit";
import basket from './BasketSlice'
export const store = configureStore({
    reducer:{
     basket
    }
})
export default store;