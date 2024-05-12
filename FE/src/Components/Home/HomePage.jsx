import "./home.css";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { createAxios } from "../../createInstance";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers, deleteUser} from "../../redux/apiRequest";
// import axios from "axios";
import {loginSuccess} from "../../redux/authSlice";
import axios from "axios";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  //dau hoi: optional chaining
  const userList = useSelector((state) => state.users.users?.allUsers);
  const msg = useSelector((state) => state.users?.msg);
  // let axiosJWT = createAxios(user, dispatch)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  // let axiosJWT = axios.create();



  axios.get('/v1/auth/fetchToken').then((response) =>{
    console.log("token fetched");
  }).catch((err) =>{
    console.log("error fetching token");
  })
  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id);
  };

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post("/v1/auth/refresh", {
  //       withCredentials: true,
  //     })
  //     return res.data;
  //   }catch(e){
  //     console.log(e);
  //   }
  // }

  // axiosJWT.interceptors.request.use (
  //   async(config) => {
  //     let date = new Date();
  //     const decodedToken = jwtDecode(user?.accessToken);
  //     if(decodedToken.exp < date.getTime()/1000){
  //       const data = await refreshToken();
  //       const refreshUser = {
  //         ...user,
  //         accessToken: data.accessToken,
  //         refreshToken: data.refreshToken,
  //       };
  //       dispatch(loginSuccess(refreshUser));
  //       config.headers["token"] = "Bearer " + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (e) => {
  //     return Promise.reject(e);
  //   }
  // );
  useEffect(() => {
    if(!user){
      navigate("/login");
    }
    if(user?.accessToken){
      // alert(user?.accessToken);
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);
  return (
      <main className="home-container">
        <div className="home-title">User List</div>
        <div className="home-role">
          {`Your role: ${user?.admin? `Admin` : `User`}`}
        </div>
        <div className="home-userlist">
          {userList?.map((user) => {
            return (
              <div className="user-container">
                <div className="home-user">{user.username}</div>
                <div 
                  className="delete-user"
                  onClick = {() => handleDelete(user._id)}>
                Delete </div>
              </div>
            );
          })}
        </div>
        <div className="errorMessage"><h1>{msg}</h1></div>
      </main>
  );
};

export default HomePage;
