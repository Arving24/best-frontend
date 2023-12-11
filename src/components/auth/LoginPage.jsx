import style from "./LoginPage.module.css";
import { Input, notification } from "antd";
import { Link, useSubmit, Form, useActionData } from "react-router-dom";
import { useState, useEffect } from "react";

import useInput from "../../helpers/useInput";
import useEmailValidation from "../../helpers/useEmailValidate";

const LoginPage = ({ setToggleUI }) => {
  const submit = useSubmit();
  const [disable, setDisable] = useState(false);
  const error = useActionData();

  useEffect(() => {
    if (error) {
      setDisable(false)
    }
  }, [error])

  const {
    email: email_address,
    isValid: emailIsValid,
    handleChange,
    onBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    setIsTouched: emailIsTouched,
  } = useEmailValidation("");

  const {
    value: password,
    hasError: passHasError,
    onChangeHandler: passChangeHandler,
    onBlurHandler: passBlurHandler,
    setIsTouched: setPassIsTouched,
  } = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    setPassIsTouched(true);
    emailIsTouched(true)

    if (email_address.trim() === "" || password.trim() === "") {
      setDisable(false);
      notification.open({
        message: "Error",
        description: `Email or Password is empty.`,
        duration: 3,
        type: "error",
        style: {
          backgroundColor: "#ffcccc",
        },
      });
    } else if (!emailIsValid) {
      setDisable(false);
      notification.open({
        message: "Error",
        description: `Invalid Email Address.`,
        duration: 3,
        type: "error",
        style: {
          backgroundColor: "#ffcccc",
        },
      });
    } else {
      const formData = {
        email_address: email_address,
        password: password,
      };

      submit(formData, { method: "POST" });
    }
  };

  //navigate to forgot password
  const showForgotPassUIHandler = () => {
    setToggleUI(true)
  }

  // input error
  const emailInputClasses = emailHasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  const passInputClasses = passHasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  return (
    <div className={style.loginFormContainer}>
      <Form onSubmit={onSubmit}>
        <div className={style.loginFormText}>
          <p>Login</p>
        </div>

        <div className={emailInputClasses}>
          <label htmlFor="email">Email Address</label>
          <Input
            type="text"
            name="email"
            value={email_address}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={emailBlurHandler}
            placeholder="Enter your email"
          />
          { emailHasError && (
            <p>Invalid email. Please enter a valid email address.</p>
          )}
        </div>
        <div className={passInputClasses}>
          <label htmlFor="password">Password</label>
          <Input.Password
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
          />
          {passHasError && <p>Please fill out this field!</p>}
        </div>
        <div className={style.forgotPassContainer}>
          {error && <div name="invalidCreds" className={style.invalidEmailPass}>Invalid email or password</div>}
          <Link
            to=""
            onClick={showForgotPassUIHandler}
          >
            <p>Forgot password?</p>
          </Link>
        </div>
        <div>
          <button disabled={disable} name="login" className={style.loginBtn} type="submit">
            {disable ? "Logging in..." : "Login"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
