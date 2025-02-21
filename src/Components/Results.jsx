import React from "react";
import Graph from "./Graph";

const Results = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  extraChars,
  graphData,
}) => {
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
