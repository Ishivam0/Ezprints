import {configureStore} from '@reduxjs/toolkit';
import LogoutModalReducer from '../features/slices/LogoutModalSlice'
import DarkModeReducer from '../features/slices/darkModeSlice'


export const store = configureStore({
    reducer:{
        logout:LogoutModalReducer,
        darkmode:DarkModeReducer,
    },
})