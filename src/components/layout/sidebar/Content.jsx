import { NavLink } from "react-router-dom";
import style from "./sidebar.module.css";
import React, { useState, useEffect, useContext } from "react";
import classes from "./Content.module.css";
import { useLocation } from "react-router-dom";
import LoadingContext from "../../../context/LoadingContext";

const Content = () => {
  const activeNav = ({ isActive }) => (isActive ? style.active : undefined);

  const [openAF, setOpenAF] = useState(false);
  const [openPro, setOpenPro] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const { setIsLoading } = useContext(LoadingContext)

  let location = useLocation();

  useEffect(() => {
    if (
      location.pathname.includes("apv") ||
      location.pathname.includes("ap_aging") ||
      location.pathname.includes("cv") ||
      location.pathname.includes("rfp") ||
      location.pathname.includes("account-center")
    ) {
      setOpenAF(true);
      setOpenPro(false);
      setOpenUser(false);
    } else if (
      location.pathname.includes("role-management") ||
      location.pathname.includes("module-management") ||
      location.pathname.includes("permission-management") ||
      location.pathname.includes("user-management")
    ) {
      setOpenPro(false);
      setOpenAF(false);
      setOpenUser(true);
    } else if (
      location.pathname.includes("purchase-request") ||
      location.pathname.includes("purchase-order") ||
      location.pathname.includes("receiving-receipt") ||
      location.pathname.includes("supplier-center") ||
      location.pathname.includes("item-center")
    ) {
      setOpenUser(false);
      setOpenAF(false);
      setOpenPro(true);
    }
  }, [location]);

  // useEffect(() => {
  //   if (hasItems(permission)) {
  //     // console.log('permission',permission);
  //     // console.log('module_id',permission['module_id']);
  //     // console.log('hasView',permission['hasView']);
  //   }
  // }, [permission])

  const onOpenAFHandler = () => {
    setOpenAF(!openAF);
  };

  const onOpenProHandler = () => {
    setOpenPro(!openPro);
  };

  const onOpenUserHandler = () => {
    setOpenUser(!openUser);
  };

  const loadingHandler = () => {
    setIsLoading(true)
  }

  return (
    <nav>
      <>
        <ul>
          <li>
            <NavLink to="/dashboard" className={activeNav}>
              <span className={style.fontawesome_icon}>
                <i className="fa-solid fa-house"></i>
              </span>
              Home
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <button onClick={onOpenAFHandler}>
              <span className={style.fontawesome_icon}>
                <i className="fa-solid fa-calculator"></i>
              </span>{" "}
              Accounting and Finance
              {!openAF ? (
                <i className={classes.i_icon}>
                  <i className="fa-solid fa-caret-down"></i>
                </i>
              ) : (
                <i className={classes.i_icon}>
                  <i className="fa-solid fa-caret-up"></i>
                </i>
              )}
            </button>
          </li>
          {openAF && (
            <ul className={classes.dropdown_content}>
              <li>
                <NavLink to="/account-center" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-money-bill-transfer"></i>
                  </span>
                  Account Center
                </NavLink>
              </li>

              <li>
                <NavLink to="/apv" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-money-bill-wave"></i>
                  </span>
                  Accounts Payable Voucher
                </NavLink>
              </li>

              <li>
                <NavLink to="/ap_aging" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-sign-hanging"></i>
                  </span>
                  AP Aging
                </NavLink>
              </li>

              <li>
                <NavLink to="/cash-voucher" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-wallet"></i>
                  </span>
                  Cash Voucher
                </NavLink>
              </li>

              <li>
                <NavLink to="/rfp" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-money-check-dollar"></i>
                  </span>
                  Request for Payment
                </NavLink>
              </li>

              <li>
                <NavLink to="/jv" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-money-check-dollar"></i>
                  </span>
                  Journal Voucher
                </NavLink>
              </li>
            </ul>
          )}

          <li>
            <button onClick={onOpenUserHandler}>
              <span className={style.fontawesome_icon}>
                <i className="fa-solid fa-user-pen"></i>
              </span>
              Identity Management
              {!openUser ? (
                <i className={classes.i_icon}>
                  <i className="fa-solid fa-caret-down"></i>
                </i>
              ) : (
                <i className={classes.i_icon}>
                  <i className="fa-solid fa-caret-up"></i>
                </i>
              )}
            </button>
          </li>

          {openUser && (
            <div className={classes.dropdown_content}>
              <li>
                <NavLink to="/role-management" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-user-shield"></i>
                  </span>
                  Role Management
                </NavLink>
              </li>

              <li>
                <NavLink to="/module-management" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-cubes"></i>
                  </span>
                  Module Management
                </NavLink>
              </li>

              <li>
                <NavLink to="/permission-management" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-user-lock"></i>
                  </span>
                  Permission Management
                </NavLink>
              </li>

              <li>
                <NavLink to="/user-management" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-users-gear"></i>
                  </span>
                  User Management
                </NavLink>
              </li>
            </div>
          )}

          <li>
            <button onClick={onOpenProHandler}>
              <span className={style.fontawesome_icon}>
                <i className="fa-solid fa-cart-flatbed"></i>
              </span>
              Procurement
              {!openPro ? (
                <i className={classes.i_icon}>
                  <i className="fa-solid fa-caret-down"></i>
                </i>
              ) : (
                <i className={classes.i_icon}>
                  <i className="fa-solid fa-caret-up"></i>
                </i>
              )}
            </button>
          </li>

          {openPro && (
            <div className={classes.dropdown_content}>
              <li>
                <NavLink to="/supplier-center" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-truck-ramp-box"></i>
                  </span>
                  Supplier Center
                </NavLink>
              </li>

              <li>
                <NavLink to="/item-center" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-boxes-packing"></i>
                  </span>
                  Item Center
                </NavLink>
              </li>

              <li>
                <NavLink to="/purchase-request" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-file-invoice-dollar"></i>
                  </span>
                  Purchase Request
                </NavLink>
              </li>

              <li>
                <NavLink to="/purchase-order" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                  </span>
                  Purchase Order
                </NavLink>
              </li>

              <li>
                <NavLink to="/receiving-receipt" className={activeNav} onClick={loadingHandler}>
                  <span
                    className={`${style.fontawesome_icon} ${style.fi_margin}`}
                  >
                    <i className="fa-solid fa-file-invoice"></i>
                  </span>
                  Receiving Receipt
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </>
    </nav>
  );
};

export default React.memo(Content);
