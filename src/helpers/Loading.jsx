import { Spin } from "antd";
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.container}>
      <div className={style.spinClass}>
        <Spin size="large">
        </Spin>
      </div>
    </div>
  );
};

export default Loading;
