import React, { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Modal, Tab, Tabs } from "@mui/material";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import DescriptionIcon from "@mui/icons-material/Description";
import LoginIcon from "@mui/icons-material/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const AccountCircle = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [user] = useAuthState(auth);
  const detailsRef = useRef(null);
  const navigate = useNavigate();
  console.log(user);

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target)) {
      detailsRef.current.removeAttribute("open");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    //popUp with local google login accounts
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google SignIn successful!");
      setOpenModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleTabValueChange = (e, v) => {
    setTabValue(v);
  };

  const handleLogout = () => {
    auth.signOut();
    detailsRef.current.removeAttribute("open");
    toast.success("User Logged Out!");
  };

  const openDashBoard = () => {
    navigate('/user')
  };

  return (
    <div>
      <details ref={detailsRef}>
        <summary>
          <AccountCircleIcon sx={{ fontSize: 30 }} />
        </summary>

        {user ? (
          <ul>
            <li onClick={openDashBoard}>
              <DescriptionIcon />
              Dashboard
            </li>
            <li onClick={handleLogout}>
              <LogoutIcon /> <span>Logout</span>
            </li>
          </ul>
        ) : (
          <ul>
            <li
              onClick={() => {
                setOpenModal(true);
                detailsRef.current.removeAttribute("open");
              }}
            >
              <LoginIcon />
              <span>LogIn</span>
            </li>
          </ul>
        )}
      </details>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="modal"
      >
        <div className="modalContent">
          <AppBar position="static" className="appBar">
            <Tabs
              variant="fullWidth"
              value={tabValue}
              onChange={handleTabValueChange}
            >
              <Tab label="login" className="tab"></Tab>
              <Tab label="signup" className="tab"></Tab>
            </Tabs>
          </AppBar>
          {tabValue === 0 && <LoginForm setOpenModal={setOpenModal} />}
          {tabValue === 1 && <SignUpForm setOpenModal={setOpenModal} />}
          <span>OR</span>
          <button className="google-signin" onClick={handleGoogleSignIn}>
            <img src="/images/google.png" alt="" />
            Sign in with Google
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AccountCircle;
