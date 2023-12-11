import style from "./LoginPage.module.css";
import Barapido from "./Barapido";
import ResetPassword from "./ResetPassword";

const ResetPass = () => {
  return (
    <div className={style.container}>
      <div className={style.loginContent}>
        <div className={style.loginText}>
          <Barapido />
        </div>
        <div className={style.loginForm}>
          <ResetPassword />
        </div>
      </div>
    </div>
  )
}

export default ResetPass
