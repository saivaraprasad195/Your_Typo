import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import UserDataTable from "../Components/UserDataTable";
import Graph from "../Components/Graph";

const UserPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [graphData, setGraphData] = useState([]);
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

      tempData.forEach((result) => {
        tempGraphData.push([new Date(result.timeStamp.seconds*1000).toLocaleDateString(), result.wpm]);
      });

      setData(tempData);
      setGraphData(tempGraphData);
    } catch (error) {
      console.log(error);
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

  console.log(data);
  console.log(graphData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return data ? (
    <div className="canvas">
      <Graph graphData={graphData}/>
      <UserDataTable data={data} />
    </div>
  ) : (
    <h3>No data found</h3>
  );
};

export default UserPage;
