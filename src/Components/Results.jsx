import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const Results = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  extraChars,
  graphData,
}) => {
  const [user, loading] = useAuthState(auth);


  const pushDataToDB = async () => {
    if (isNaN(accuracy) || accuracy === 0) {
      toast.error("Test not taken. Data not saved");
      return;
    }

    try {
      const resultsRef = doc(db, "Results", user.uid);
      await updateDoc(resultsRef, {
        results: arrayUnion({
          wpm,
          accuracy,
          timeStamp: new Date(),
          characters: `${correctChars}/${incorrectChars}/${extraChars}`,
          userId: user.uid,
        }),
      });
      toast.success("Results saved");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (loading) return; 
    if (!user) {
      toast.warning("Login to Save Results");
      return;
    }
    pushDataToDB();
  }, [loading,user]);

  return (
    <div className="results-box">
      <div className="results">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">
          {isNaN(accuracy) ? "0%" : accuracy + "%"}
        </div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctChars} / {incorrectChars} / {extraChars}
        </div>
      </div>
      <div className="chart">
        <Graph graphData={graphData} />
      </div>
    </div>
  );
};

export default Results;
