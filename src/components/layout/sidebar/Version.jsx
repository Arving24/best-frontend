import style from "./Version.module.css";
import sidebar_logo from "../../../assets/barapido_logo_whole.png";

const AppVersion = () => {
  return (
    <div>
      <div className={style.sidebar_vcontent}>
        <div className={style.sidebar_vcontentP1}>
          <p style={{ paddingTop: '15px' }}>powered by:</p>
          <img src={sidebar_logo} alt="Logo" />
        </div>
        <div className={style.sidebar_vcontentBar}>
          <p style={{ fontSize: '15px', marginLeft: '90px' }}>v0.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default AppVersion;