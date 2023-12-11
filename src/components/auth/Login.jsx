import style from "./LoginPage.module.css";
import logo from "../../assets/barapido_logo_square_blue.jpg";
import LoginPage from "./LoginPage";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { redirect } from "react-router-dom";

import { AUTH_LINK, AUTH_API_KEY } from "../../utils/env_config";
import axios from "axios";
import { encryptData } from "../../utils/encryption";
import { notification } from "antd";

const Login = () => {
  const [toggleUI, setToggleUI] = useState(false);



  return (
    <div className={style.container}>
      <div className={style.loginContent}>
        <div className={style.loginText}>
          <div className={style.imgContainer}>
            <img src={logo} alt="BEST Home"></img>
          </div>
          <div className={style.textContainer}>
            <p>Barapido Enterprise System and Technologies</p>
          </div>
        </div>
        <div id="login_form" className={style.loginForm}>
          {toggleUI ? (
            <ForgotPassword setToggleUI={setToggleUI} />
          ) : (
            <LoginPage setToggleUI={setToggleUI} method="post" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

//Action
export async function action({ request, params }) {
  const data = await request.formData();

  const loginData = {
    email_address: data.get("email_address"),
    password: data.get("password"),
  };

  try{
    const response =   await axios({
      url: `${AUTH_LINK}/api/auth/login`,
      data: JSON.stringify(loginData),
      method: request.method,
      headers: {
        "x-api-key": AUTH_API_KEY,
        "Content-Type": "text/plain",
      },
    })

    const token = response.data.data.token;
    const expirationTime = response.data.data.tokenExpiresAt;
    const name = response.data.data.firstname + " " + response.data.data.lastname;
    // encrypt data
    const encryptedName = encryptData(
      name,
      process.env.REACT_APP_ENCRYPTION_KEY
    );
    const encryptedToken = encryptData(
      token,
      process.env.REACT_APP_ENCRYPTION_KEY
    );

    localStorage.setItem("t", JSON.stringify(encryptedToken), expirationTime);
    localStorage.setItem("n", JSON.stringify(encryptedName), expirationTime);
    localStorage.setItem("time", expirationTime);

    notification.open({
      message: "Success",
      description: `Login successful!`,
      duration: 1.5,
      type: "success",
      style: {
        backgroundColor: "#bbff99",
      },
    });

    return redirect("/dashboard");
  } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
      return error;
    };

}
