import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { InputRow } from "../../components";
import style from "./register.module.scss";
import { FcGoogle } from "react-icons/fc";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoMailOutline } from "react-icons/io5";
import { GoEyeClosed } from "react-icons/go";
import { CiLock } from "react-icons/ci";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimedPassword, setConfirmedPassowrd] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  return (
    <div className={style.register_wrapper}>
      <div className={style.register_box}>
        <div className={style.register_container}>
          <div className={style.google_register}>
            <button>
              <FcGoogle /> Register with Google
            </button>
            <div className={style.line}>
              <div className={style.first_line}></div>
              <p>or</p>
              <div className={style.second_line}></div>
            </div>
          </div>
          <form className={style.register_form}>
            <InputRow
              labelText="Name"
              placeHolderText="Enter your name"
              typeInput="text"
              value={name}
              onChangeFunction={(e) => setName(e.target.value)}
              name="name"
              iconStartInput={LiaUserEditSolid}
              hasError={hasError}
              errorText={errorText}
            />
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
            <InputRow
              labelText="Confirm Password"
              placeHolderText="Re-enter your password"
              typeInput="password"
              value={confrimedPassword}
              onChangeFunction={(e) => setConfirmedPassowrd(e.target.value)}
              name="confirmed-password"
              iconEndInput={GoEyeClosed}
              iconStartInput={CiLock}
              hasError={hasError}
              errorText={errorText}
            />
          </form>
          <button type="submit" className={style.submit_btn}>
            Create your account
          </button>
          <div className={classNames(style.text_login, "d-flex justify-content-center")}>
            <p>Already have an account?</p>
            <span onClick={() => navigate("/")}>
              <b>Log in</b>
            </span>
          </div>
        </div>
        <div className={style.register_img}>
          <h1>Be part of us</h1>
          <h2>Do not be afraid</h2>
        </div>
      </div>
    </div>
  );
};

export default Register;
