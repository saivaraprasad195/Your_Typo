import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpForm = ({ setOpenModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.warning("Please Fill all Details");
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Password mismatch");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User created!");
      setOpenModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className="signupForm">
      <input
        ref={inputRef}
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="inputField"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="inputField"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        placeholder="Confirm Password"
        className="inputField"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button className="signup-btn" onClick={handleSignUp}>
        Signup
      </button>
    </form>
  );
};

export default SignUpForm;
