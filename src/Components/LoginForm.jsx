import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const LoginForm = ({setOpenModal}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please Fill all Details");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged In!");
      setOpenModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="loginForm">
      <input
        ref={inputRef}
        type="email"
        name="email"
        placeholder="Email"
        className="inputField"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="inputField"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
