import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Results = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  extraChars,
  graphData,
}) => {
  const { uid } = auth.currentUser;

  const pushDataToDB = async () => {
    console.log(accuracy);
    if (isNaN(accuracy)) {
      toast.error("Test not taken. Data not saved");
      return;
    }

    try {
      const resultsRef = doc(db, "Results", uid);
      await updateDoc(resultsRef, {
        results: arrayUnion({
          wpm,
          accuracy,
          timeStamp: new Date(),
          characters: `${correctChars}/${incorrectChars}/${extraChars}`,
          userId: uid
        }),
      });
      toast.success("Results saved");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (uid) {
      pushDataToDB();
    } else {
      toast.warning("Login to Save Results");
    }
  }, []);

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
