import React, { useContext, useState } from "react";
import login_robot from "./Assests/login_robot.png";
import "./Login.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { signinGoogle } from "../../services/operations/googleLogin";
import { LogIN } from "../../services/operations/authAPI";
import UserContext from "../../ContextApi/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGoogleLoginSuccess = async (tokenResponse) => {
    try {
      const accessToken = tokenResponse.access_token;
      console.log(accessToken);
      await signinGoogle(accessToken);
  
    } catch (error) {
      toast.error("error while signing in with google");
    }
	};
	const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {email, password};
    const response = await LogIN(data, navigate);
    setUser(response.data.user)
    if(response){
      toast.success("Login Successful!")
      const date = new Date();
      date.setDate(date.getDate() + 30)
      // const token = response.data.userToReturn.token;
      // setCookie("token", token, {path:'/', expires:date});
    }
    else{
      toast.error("Failed Login!")
    }
  }
  return (
    <form onSubmit={submitHandler} className="loginContainer" id="login">
      <div className="backgroundImg"></div>
      <img src={login_robot} alt="left robot" />
      <div className="login_box">
        <div className="heading">
          <h2>Login</h2>
          <span>.</span>
        </div>
        <div className="emailDiv">
          <input id="email" name="email" type="email" value={email}
            onChange={(e)=>{setEmail(e.target.value)}} placeholder="    Email" />
          <MdOutlineMailOutline className="emailIcon" />
        </div>
        <div className="passwordDiv">
          <input
            type="password"
            id="pass"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required
            placeholder="    Password"
          />
          <AiFillEye className="eyeIcon" />
          <div />
          <div className="forgotPassword">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type='submit' className="loginBtn">Login</button>
          <div className="line">----</div>
          <div className="signGoogle">
            <button className="googleBtn" onClick={login}>
              <FcGoogle />
              <a to="/sign-in-with-google">Sign in with Google</a>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
