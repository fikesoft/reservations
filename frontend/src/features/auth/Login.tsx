import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/userSlice';

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (role: "user" | "admin" | "guest") => {
    dispatch(login({
      user: { name: '', email: '' },
      role
    }));
    nav("/home");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => handleLogin("admin")}>Admin</button>
      <button onClick={() => handleLogin("guest")}>Guest</button>
      <button onClick={() => handleLogin("user")}>User</button>
    </div>
  );
};

export default Login;
