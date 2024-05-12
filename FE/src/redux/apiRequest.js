import axios from "axios";
import {loginStart, loginSuccess, loginFailed, 
    registerStart, registerSuccess, registerFailed,
    logOutStart, logOutSuccess, logOutFailed
} from "./authSlice";

import {getUsersStart, getUsersFailed, getUsersSuccess, deleteUsersStart, deleteUsersSuccess, deleteUsersFailed} from "./userSlice";

export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        // console.log("user login")
        const res = await axios.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch(e){
        dispatch(loginFailed());
    }
}

export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        // console.log("user login")
        await axios.post("/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch(e){
        dispatch(registerFailed());
    }
}

export const getAllUsers = async(accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try{
        const res = await axiosJWT.get("/v1/user", {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (e) {
        dispatch(getUsersFailed());
    }
};

export const deleteUser = async(accessToken, dispatch, id) => {
    dispatch(deleteUsersStart());
    try {
        const res = await axios.delete("/v1/user/" + id, {
            headers: { token: `Bearer ${accessToken}`},
        });

        dispatch(deleteUsersSuccess(res.data));
    }catch(e){
        console.log(e)
        dispatch(deleteUsersFailed(e.response.data));
    }
}

export const logOut = async(dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        let access_token = 'Bearer ' + accessToken;
        await axiosJWT.post("v1/auth/logout", id, {
            headers: {token: access_token}
        });
        dispatch(logOutSuccess());
        navigate("/login");
        console.log("Logged out")
    } catch(e) {
        console.log(e)
        dispatch(logOutFailed());
    }
}
