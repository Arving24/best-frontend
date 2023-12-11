import React from "react";
import style from "./navbar.module.css";
import user from "./user.png";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { ENCRYPTION_KEY } from "../../../utils/env_config";
import { decryptData } from "../../../utils/encryption";
import '@fortawesome/fontawesome-free/css/all.css'

const NavigationBar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [name, setName] = useState('');
  const containerRef = useRef(null);

  const getName = () => {
    // getting stored value
    const saved = localStorage.getItem("n");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
    // console.log('name',decryptData(initialValue, ENCRYPTION_KEY));
  };

  const navigate = useNavigate();

  const handleClickOutside = event => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    const name = getName();
    if (name) {
      const decryptName = decryptData(name, ENCRYPTION_KEY);
      setName(decryptName);
    } else {
      setName('No User');
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownHandler = () => {
    setOpenDropdown(prevOpen => !prevOpen);
  };

  const logoutHandler = () => {
    // localStorage.removeItem("Permission");
    console.log('logout')
    localStorage.clear();
    Cookies.remove('token', { path: '/' });
    Cookies.remove('temp', { path: '/' });
    Cookies.remove('name', { path: '/' });
    navigate('/')

    // notification.open({
    //   message: "Success",
    //   description: `Successfully logged out.`,
    //   duration: 2,
    //   type: "success",
    //   style: {
    //     backgroundColor: '#ccffcc',
    //   },
    // });
    
  }

  return (
    <nav className={style.navbar}>
      <div className={style.profileContainer}>
        <div className={style.profileContainerDropdown}>
          <div className={style.container} ref={containerRef}>
            <button className={style.button} onClick={dropdownHandler}>
              <span className={style.fontawesome_icon}>
                <i className="fa-solid fa-caret-down fa-xl"></i>
              </span>
            </button>
            {openDropdown && (
              <div className={style.dropdown}>
                <ul>
                  <li>View Profile</li>
                  <li>Change Password</li>
                  <li onClick={logoutHandler}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={style.profileContainerName}>
          <p>{name}</p>
        </div>
        <div className={style.profileContainerImg}>
          <img src={user} alt="profile" className={style.logo} />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
