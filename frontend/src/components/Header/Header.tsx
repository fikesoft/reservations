import styles from "./header.module.scss";
import classNames from "classnames";
import { MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
// React-icons
import { IoCartOutline } from "react-icons/io5";
import { IoIosLogOut, IoIosMenu } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";

// Custom hooks
import useAppDispatch from "../../store/hooks/useDispach";
import useAppSelector from "../../store/hooks/useSelector";

// Reducer
import { logout } from "../../store/slices/userSlice";
// Static asset
import Logo from "../Logo/Logo";

const Header = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleOpenMenu: MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.header}>
      {/* Left: Logo and Navigation */}
      <div className={styles.logoAndNav}>
        <Logo/>

        {/* Navigation Menu */}
        <div className={classNames(styles.nav_menu, {
          [styles.show]: isMenuOpen,
        })}>
          <ul className={styles.navMenuList}>
            <li className={styles.nav_item}>Home</li>
            <li className={styles.nav_item}>Events</li>
            <li className={styles.nav_item}>About us</li>
            <li className={styles.logout_item}>
              {isAuthenticated && (
                <button className={styles.button} onClick={() => dispatch(logout())}>
                  Logout<IoIosLogOut className={styles.icon} />
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Right: Actions Section */}
      <div className={styles.actions}>
        <CiViewList className={styles.icon} />

        <button className={styles.button} onClick={() => { isAuthenticated ? navigate("/home") : navigate("/") }}>
          {user?.picture == null ? (
            <AiOutlineUser className={styles.iconSmall} />
          ) : (
            <img className={styles.imgUser} src={user?.picture || ""} alt="User" />
          )}


          {!isAuthenticated ? "Login/Register" : (user ? user.name : "Guest")}
        </button>

        {isAuthenticated && (
          <button className={classNames(styles.button, styles.buttonLogout)} onClick={() => dispatch(logout())}>
            Logout<IoIosLogOut className={styles.icon} />
          </button>
        )}



        <IoCartOutline className={styles.icon} />

        {/* Toggle Button for Mobile */}
        <button onClick={toggleOpenMenu} className={styles.toggleButton}>
          <IoIosMenu className={styles.toggleNavMenu} />
        </button>
      </div>
    </div>
  );
};

export default Header;
