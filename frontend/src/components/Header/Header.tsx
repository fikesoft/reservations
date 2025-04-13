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
import { showToast } from "../../store/slices/toastSlice";

const Header = () => {
  const { isAuthenticated, user ,role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { tickets } = useAppSelector ((state) => state.ticket) ;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleOpenMenu: MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = ( )=>{ 
    if(role !== "guest"){
      if (tickets.length > 0) {
            navigate("/cart");
          } else {
            dispatch(showToast({type:"error",message:"To access the cart please select at least one ticket "}))
      }
    }else{
      dispatch(showToast({type:"error",message:"Create an account and login "}))
    }
  }
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
            <li className={styles.nav_item} onClick={()=>{navigate("/home")}}>Home</li>
            <li className={styles.nav_item }onClick={()=>{navigate("/events")}} >Events</li>
            <li className={styles.nav_item}  onClick={()=>{navigate("/about")}}>About us</li>
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

        <button className={styles.button} onClick={() => { isAuthenticated ? navigate("/home") : navigate("/") }}>
          {user?.picture == null ? (
            <AiOutlineUser className={styles.iconSmall} />
          ) : (
            <img className={styles.imgUser} src={ user?.picture || "" } alt="User" />
          )}


          {!isAuthenticated ? "Login/Register" : (user ? user.name : "Guest")}
        </button>

        {isAuthenticated && (
          <button className={classNames(styles.button, styles.buttonLogout)} onClick={() => dispatch(logout())}>
            Logout<IoIosLogOut className={styles.icon} />
          </button>
        )}


        <div>
          <IoCartOutline className={styles.icon} onClick={()=>handleCartClick()} style={{position:"absolute"}}/>
          {
          <p  className="text-center mt-2"style={{
            position:"relative" ,
            top:"15px", left:"20px", 
            backgroundColor:"white", 
            borderRadius:"50px", 
            width:"30px",  
            height:"25px",
            color: '#4d194d'}}>{tickets.length}</p>
          } 
        </div>


        {/* Toggle Button for Mobile */}
        <button onClick={toggleOpenMenu} className={styles.toggleButton}>
          <IoIosMenu className={styles.toggleNavMenu} />
        </button>
      </div>
    </div>
  );
};

export default Header;
