import { configureStore } from "@reduxjs/toolkit";
import countSlice from './countSlice'

const store = configureStore({
    reducer:{
       count1: countSlice
    }
})


export default store;