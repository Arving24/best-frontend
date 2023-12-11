import { Outlet } from "react-router-dom";

const AuthLayout = props => {
  const { children } = props;

  return (
    <div>
      <div>
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;