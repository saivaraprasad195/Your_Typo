import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const UserInfo = ({totalTests}) => {
  const [user] = useAuthState(auth);
  const creationTime = user.metadata.creationTime;

  return (
    <div className="user-profile">
      <div className="user">
        <div className="picture">
          <AccountCircleIcon sx={{ fontSize: {xs:50, sm:80, md:100} }} />
        </div>
        <div className="info">
          <p>Email : {user.email}</p>
          <p>Started On: {creationTime}</p>
        </div>
      </div>
      <div className="total-tests">
        <span >Total tests - {totalTests}</span>
      </div>
    </div>
  );
};

export default UserInfo;
