import style from "./ForgotPassword.module.css";
import { Input } from "antd";
import { useState, useEffect } from "react";

function ForgotPassword({ setToggleUI }) {
  const [disable, setDisable] = useState(false);

  const submitHandler = () => {
    setDisable(true);
  };

  useEffect(() => {
    if (disable) {
      const timer = setTimeout(() => {
        console.log("timer")
        setDisable(false);
      }, 1000);

      return () => clearTimeout(timer);
    }

  }, [disable]);

  const backToLoginHandler = () => {
    setToggleUI(false);
  };

  return (
    <div>
      <div className={style.forgotPassFormText}>
        <p>Forgot Password</p>
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="email">Email Address</label>
        <Input
          type="email"
          placeholder="Email"
        // value={email}
        // onChange={handleEmailChange}
        />
      </div>
      <div>
        <button
          disabled={disable}
          className={style.submitBtn}
          onClick={submitHandler}
        // type="submit"
        >
          {disable ? "Submitting..." : "Submit"}
        </button>
      </div>
      <div>
        <button onClick={backToLoginHandler} className={style.backBtn}>
          Back to login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
