import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/userSlice';
import loginPhoto from "../../assets/img/login_photo.png"
import classNames from 'classnames';
import style from "./login.module.scss"
import { useState } from 'react';
import { InputRow } from '../../components';
import { IoMailOutline } from 'react-icons/io5';
import { GoEyeClosed } from 'react-icons/go';
import { CiLock } from 'react-icons/ci';
import {AuthGoogleBtn, AuthManualBtn} from '../../components';

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const handleLogin = (role: "user" | "admin" | "guest") => {
    dispatch(login({
      user: { name: 'sorin', email: '' },
      role
    }));
    nav("/home");
  };
  return (
    <div className="container">
        <div className="row d-flex justify-content-center p-2">
            <div className={classNames(style.customBorder,"col-md-6 d-flex flex-column justify-content-center pb-1")} >

                <div className="row d-flex flex-column align-items-center gap-4 " >

                    <div className=" input-group input-group-md d-flex flex-column gap-1 w-100"  style={{ maxWidth: "400px" }}>
                        <InputRow
                          labelText="Email"
                          placeHolderText="Enter your email"
                          typeInput="text"
                          value={email}
                          onChangeFunction={(e) => setEmail(e.target.value)}
                          name="email"
                          iconStartInput={IoMailOutline}
                          hasError={hasError}
                          errorText={errorText}
                        />
                    </div>
    
                    <div className="input-group input-group-md d-flex flex-column gap-1 w-100"  style={{ maxWidth: "400px" }}>
                      <InputRow
                        labelText="Password"
                        placeHolderText="Enter your password"
                        typeInput="password"
                        value={password}
                        onChangeFunction={(e) => setPassword(e.target.value)}
                        name="password"
                        iconEndInput={GoEyeClosed}
                        iconStartInput={CiLock}
                        hasError={hasError}
                        errorText={errorText}
                      />
                    </div>

                    <div className="d-flex justify-content-end w-100 "   style={{ maxWidth: "400px" }}>
                        <p >Forgot password</p>
                    </div>

                    <div className="d-flex flex-column w-100 gap-2"  style={{ maxWidth: "400px" }} >
                        <AuthGoogleBtn/>
                        <AuthManualBtn textButton='Log in' typeButton="submit"/>   
                    </div>
                    <div className='d-flex  flex-column  align-items-center w-100 gap-2' style={{ maxWidth: "400px" }}>
                      <p>If you don't have an account <span className={style.spanStyle} onClick={()=>{navigate("/register")}}>Register</span></p>
                      <p>Or</p>
                      <p>Enter as  <span className={style.spanStyle} onClick={()=>{handleLogin("guest")}}>Guest</span></p>
                    </div>

                </div>
            </div>
            <div className="col-md-5 p-0">
                <img className="img-fluid" src={loginPhoto}/>
            </div>
        </div>
    </div>
  );
};

export default Login;
