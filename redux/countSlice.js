import { createSlice} from "@reduxjs/toolkit";

const countSlice = createSlice({
    name:'count',
    initialState:{
        value:0
    },
    reducers:{
        increment : (state)=>{
            state.value=state.value+1;
        },
        decrement: (state)=>{
            state.value=state.value-1;
        }
    }
})

export const {increment,decrement} = countSlice.actions;

export default countSlice.reducer;