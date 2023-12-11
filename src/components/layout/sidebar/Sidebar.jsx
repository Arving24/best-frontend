import style from "./sidebar.module.css";

import sidebar_logo from "../../../assets/barapido_logo_whole.png";
import Content from "./Content";
import AppVersion from "./Version";

const Sidebar = () => {
  return (
    <aside className={style.sidebar}>
      <div className={style.sidebar_header}>
        <img src={sidebar_logo} alt="Logo" />
        <p className={style.sidebar_header_title}>
          Barapido Enterprise Systems & Technologies
        </p>
      </div>
      <div className={style.sidebar_content}>
        <Content />
        {/* <App /> */}
      </div>
      <div className={style.sidebar_version}>
        <AppVersion />
      </div>
    </aside>
  );
};

export default Sidebar;
