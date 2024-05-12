import axios from "axios";
import {jwtDecode} from "jwt-decode";
// import {loginSuccess} from "./redux/authSlice";

const refreshToken = async () => {
    try {
      const res = await axios.post("/v1/auth/refresh", {
        withCredentials: true,
      })
      return res.data;
    }catch(e){
      console.log("Error when refreshing token")
      console.log(e);
    }
}

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use (
        async(config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if(decodedToken.exp < date.getTime()/1000){
                const data = await refreshToken();
                const refreshUser = {
                ...user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers["token"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (e) => {
            return Promise.reject(e);
        }
    );

    return newInstance;
}