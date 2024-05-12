import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice ({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register:{
            isFetching: false,
            error: false,
            success: false
        },
    },
    reducers: {
        loginStart: (state) => {
            console.log("start login");
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            console.log("login success");
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            console.log("login failed ");            
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        logOutStart: (state) => {
            state.login.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.success = null;
            state.login.error = false;
            state.login.currentUser = null;
        },
        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        }
    }
});
 
export const {
    loginStart,
    loginFailed, 
    loginSuccess,
    registerStart,
    registerFailed, 
    registerSuccess,
    logOutStart,
    logOutSuccess,
    logOutFailed
} = authSlice.actions;

export default authSlice.reducer;