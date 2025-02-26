import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import UserDataTable from "../Components/UserDataTable";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import { CircularProgress } from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import { toast } from "react-toastify";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  //useAuthState hook returns user and the state of auth object
  //wheather it is loading or not while loading user will be empty

  const fetchUserData = async () => {
    if (!user) return;
    const { uid } = user;
    let tempData = [];
    let tempGraphData = [];
    try {
      const resultRef = doc(db, "Results", uid);
      const docSnap = await getDoc(resultRef);
      tempData = docSnap.data().results;
      tempData.reverse();
      tempData.forEach((result) => {
        tempGraphData.push([
          new Date(result.timeStamp.seconds * 1000).toLocaleDateString(),
          result.wpm,
        ]);
      });

      setData(tempData);
      setGraphData(tempGraphData);
      setDataLoading(false)
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        fetchUserData();
      } else {
        navigate("/");
      }
    }
  }, [loading]);

  if (loading || dataLoading) {
    return (
      <div className="userpage-loader">
          <CircularProgress size="7rem" sx={{ color: theme.textColor }} />
      </div>
    );
  }

  return data ? (
    <div className="userpage">
      <UserInfo totalTests={data.length} />
      <div className="userpage-results">
        <Graph graphData={graphData} />
        <UserDataTable data={data} />
      </div>
    </div>
  ) : (
    <h3>No data found</h3>
  );
};

export default UserPage;
