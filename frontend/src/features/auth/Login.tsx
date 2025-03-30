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
import { AuthGoogleBtn, AuthManualBtn } from '../../components';
import { loginUser } from '../../api/authApi';
import useAppDispatch from "../../store/hooks/useDispach";
import { showToast } from "../../store/slices/toastSlice";

const Login = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })
  const dispatch = useAppDispatch();

  const handleUserLogin = async () => {
    let newErrors = { email: "", password: "" }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      dispatch(showToast({ type: "error", message: "Email is required" }));
    }
    if (!password) {
      newErrors.password = "Password is required";
      dispatch(showToast({ type: "error", message: "Password is required" }));
    }
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      setTimeout(() => {
        setErrors({ email: "", password: "" });
      }, 3000);
      return;
    }
    try {
      const response = await loginUser(email, password); // Ensure this returns the correct response

      if (response.status === 200) {
        console.log(response)
        console.log(response.data.data.name)
        dispatch(login({
          user: {
            name: response.data.data.name,
            email: email,
            picture: response.data.picture
          },
          role: response.data.data.isAdmin ? "admin" : "user"
        }));
        dispatch(showToast({ type: "success", message: response.data.message }));
        nav("/home");
      } else {
        dispatch(showToast({ type: "error", message: response.data.error || "Login failed" }));
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(showToast({ type: "error", message: "An unexpected error occurred" }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    dispatch(login({
      user: {
        name: 'guest', email: 'guest@guest',
        picture: null
      },
      role: "guest"
    }));
    nav("/home");
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center p-2">
        <div className={classNames(style.customBorder, "col-md-6 d-flex flex-column justify-content-center pb-1")} >

          <div className="row d-flex flex-column align-items-center gap-4 p-5" >

            <div className=" input-group input-group-md d-flex flex-column gap-1 w-100" style={{ maxWidth: "400px" }}>
              <InputRow
                labelText="Email"
                placeHolderText="Enter your email"
                typeInput="text"
                value={email}
                onChangeFunction={(e) => setEmail(e.target.value)}
                name="email"
                iconStartInput={IoMailOutline}
                hasError={!!errors.email}
                errorText={errors.email}
              />
            </div>

            <div className="input-group input-group-md d-flex flex-column gap-1 w-100" style={{ maxWidth: "400px" }}>
              <InputRow
                labelText="Password"
                placeHolderText="Enter your password"
                typeInput="password"
                value={password}
                onChangeFunction={(e) => setPassword(e.target.value)}
                name="password"
                iconEndInput={GoEyeClosed}
                iconStartInput={CiLock}
                hasError={!!errors.password}
                errorText={errors.password}
              />
            </div>

            <div className="d-flex justify-content-end w-100 " style={{ maxWidth: "400px" }}>
              <p >Forgot password</p>
            </div>

            <div className="d-flex flex-column w-100 gap-2" style={{ maxWidth: "400px" }} >
              <AuthGoogleBtn />
              <AuthManualBtn textButton='Log in' typeButton="submit" handleOnClick={handleUserLogin} disabled={isLoading} />
            </div>
            <div className='d-flex  flex-column  align-items-center w-100  text-center gap-2' style={{ maxWidth: "400px" }}>
              <p>If you don't have an account <span className={style.spanStyle} onClick={() => { nav("/register") }}>Register</span></p>

              <div className={classNames(style.line, "d-flex justify-content-center w-100 gap-2")} style={{ maxWidth: "400px" }}>
                <div className={style.first_line}></div>
                <p>or</p>
                <div className={style.second_line}></div>
              </div>

              <p>Enter as  <span className={style.spanStyle} onClick={() => { handleGuestLogin() }}>Guest</span></p>
            </div>

          </div>
        </div>
        <div className="col-md-5 p-0  ">
          <img className="img-fluid  h-100" src={loginPhoto} />
        </div>
      </div>
    </div>
  );
};

export default Login;
