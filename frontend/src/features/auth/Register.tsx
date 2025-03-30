import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { InputRow, AuthGoogleBtn, AuthManualBtn } from "../../components";
import style from "./register.module.scss";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoMailOutline } from "react-icons/io5";
import { GoEyeClosed } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import photoRegister from "../../assets/img/register_photo.png"
import { registerUser } from "../../api/authApi";
import useAppDispatch from "../../store/hooks/useDispach";
import { showToast } from "../../store/slices/toastSlice";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [disabled] = useState(isLoading)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: ""
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleUserRegister = async () => {
    let newErrors = { name: "", email: "", password: "", confirmedPassword: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      dispatch(showToast({ type: "error", message: "Name is required" }));
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      dispatch(showToast({ type: "error", message: "Email is required" }));
    }
    if (!password) {
      newErrors.password = "Password is required";
      dispatch(showToast({ type: "error", message: "Password is required" }));
    }
    if (password !== confirmedPassword) {
      newErrors.confirmedPassword = "Passwords do not match";
      dispatch(showToast({ type: "error", message: "Passwords do not match" }));
    }

    // If there are errors, set the errors and clear them after 3 seconds
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      setTimeout(() => {
        setErrors({ name: "", email: "", password: "", confirmedPassword: "" });
      }, 3000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser(name, email, password);

      if (response.status === 400) {
        dispatch(showToast({ type: "error", message: response.data.error }));
        return;
      }

      // Clear form fields after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setConfirmedPassword("");
      setErrors({ name: "", email: "", password: "", confirmedPassword: "" });

      dispatch(showToast({ type: "success", message: "Registration successful!" }));
      navigate("/");

    } catch (error) {
      dispatch(showToast({ type: "error", message: "An error occurred during registration." }));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <div className="container">
      <div className="row d-flex justify-content-center p-5">
        <div
          className={classNames(style.customBorder, "col-md-6 d-flex flex-column align-items-center justify-content-center p-5 custom-border")}
          style={{ border: "1px solid #4D194D" }}
        >
          <form
            className="row d-flex flex-column align-items-center gap-4"
            style={{ maxWidth: "400px" }}
          >
            {/* Google Login Button */}
            <AuthGoogleBtn />

            {/* OR Separator */}
            <div
              className={classNames(style.line, "d-flex justify-content-center w-100 gap-2")}
              style={{ maxWidth: "400px" }}
            >
              <div className={style.first_line}></div>
              <p>or</p>
              <div className={style.second_line}></div>
            </div>

            <InputRow
              labelText="Name"
              placeHolderText="Enter your name"
              typeInput="text"
              value={name}
              onChangeFunction={(e) => setName(e.target.value)}
              name="name"
              iconStartInput={LiaUserEditSolid}
              hasError={!!errors.name}
              errorText={errors.name}
            />
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
            <InputRow
              labelText="Confirm Password"
              placeHolderText="Re-enter your password"
              typeInput="password"
              value={confirmedPassword}
              onChangeFunction={(e) => setConfirmedPassword(e.target.value)}
              name="confirmed-password"
              iconEndInput={GoEyeClosed}
              iconStartInput={CiLock}
              hasError={!!errors.confirmedPassword}
              errorText={errors.confirmedPassword}
            />

            {/* Error Message 
              {hasError && (
                <p style={{ color: "red", textAlign: "center" }}>{errorText}</p>
              )}
            */}
            {/* Submit Button */}
            <div className="d-flex flex-column w-100 gap-2" style={{ maxWidth: "400px" }}>
              <AuthManualBtn
                textButton={!isLoading ? "Create your account" : "Loading..."}
                typeButton="submit"
                handleOnClick={handleUserRegister}
                disabled={disabled}
              />
            </div>

          </form>
          <div className={classNames(style.text_login, "d-flex flex-column align-items-center mt-3 gap-1 text-center")}>
            <p>Already have an account?</p>
            <span onClick={() => navigate("/")}>
              <b>Log in</b>
            </span>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-5 p-0">
          <img className="img-fluid h-100" src={photoRegister} alt="Register" />
        </div>
      </div>
    </div>
  );
};

export default Register;