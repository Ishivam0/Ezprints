import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    darkModeOn : false,
}


export const darkModeSlice = createSlice({
    name:'darkmode',
    initialState,
    reducers:{
        toggleMode:(state, action) => {
           state.darkModeOn = !state.darkModeOn
        },
        
    }
})

export const {toggleMode} = darkModeSlice.actions

export default darkModeSlice.reducer