import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogoutModalOpen : false,
}


export const LogoutModalSlice = createSlice({
    name:'logout',
    initialState,
    reducers:{
        openLogoutModal:(state, action) => {
           state.isLogoutModalOpen = true
        },
        closeLogoutModal:(state, action) => {
           state.isLogoutModalOpen=false
        },
    }
})

export const {openLogoutModal, closeLogoutModal} = LogoutModalSlice.actions

export default LogoutModalSlice.reducer