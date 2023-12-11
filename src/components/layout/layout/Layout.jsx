import style from "./layout.module.css";
import Sidebar from "../sidebar/Sidebar";
import NavigationBar from "../navbar/NavigationBar";
import LoadingContext from "../../../context/LoadingContext";
import { useContext } from "react";
import Loading from '../../../helpers/Loading'
import { Outlet } from "react-router-dom";

const Layout = (props) => {
  const { isLoading } = useContext(LoadingContext)

  return (
    <div className={style.layout}>
      {isLoading && <Loading /> }
      <header className={style.header}>
        <NavigationBar />
      </header>
      <aside className={style.aside}>
        <Sidebar />
      </aside>
      <main className={style.main}>
        {props.children}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
