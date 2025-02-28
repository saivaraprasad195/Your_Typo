import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import Menu from "./Menu";
import { useTestMode } from "../Context/TestModeContext";
import Results from "./Results";

const TypingBox = () => {
  const [wordsArray, setWordsArray] = useState(generate(40));
  const [inputFocused, setInputFocused] = useState(true);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const { testTime } = useTestMode();
  const [resetSameTest,setResetSameTest] = useState(false);
  const [countDown, setCountDown] = useState(testTime);
  const [intervalId, setIntervalId] = useState(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const inputRef = useRef(null);

  const wordSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, []);

  function handlekeyPress(e) {
    //startTimer only after user starts typing
    if (!testStart) {
      stratTimer();
      setTestStart(true);
    }
    const currWordChars = wordSpanRef[currWordIndex].current.childNodes;

    //handling SPACE
    if (currCharIndex === currWordChars.length && e.keyCode === 32) {
      // calculating if all the chars in word are correct to measure accuracy
      let correctCharsInPreviousWord =
        wordSpanRef[currWordIndex].current.querySelectorAll(".correct");
      if (correctCharsInPreviousWord.length === currWordChars.length) {
        setCorrectWords(correctWords + 1);
      }

      //On Pressign SPACE making required changes to styles and index values
      currWordChars[currCharIndex - 1].classList.remove("current-right");
      wordSpanRef[currWordIndex + 1].current.childNodes[0].className +=
        " current";
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      return;
    }

    //handling BACKSPACE
    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (currCharIndex === currWordChars.length) {
          //removing extra letters
          if (currWordChars[currCharIndex - 1].className.includes("extra")) {
            currWordChars[currCharIndex - 1].remove();
            currWordChars[currCharIndex - 2].className += " current-right";
          } else {
            currWordChars[currCharIndex - 1].className = "current";
          }
          setCurrCharIndex(currCharIndex - 1);
          return;
        }
        currWordChars[currCharIndex].className = "";
        currWordChars[currCharIndex - 1].className = "current";
        setCurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    //inserting extra letters
    if (currCharIndex === currWordChars.length) {
      const newSpan = document.createElement("span");
      newSpan.textContent = e.key;
      newSpan.className = "incorrect extra current-right";
      currWordChars[currCharIndex - 1].classList.remove("current-right");
      wordSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    //correct typo
    if (e.key === currWordChars[currCharIndex].innerText) {
      currWordChars[currCharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } //incorrect typo
    else {
      currWordChars[currCharIndex].className = "incorrect";
      setIncorrectChars(incorrectChars + 1);
    }
    //handling end of the word case
    if (currCharIndex + 1 === currWordChars.length) {
      currWordChars[currCharIndex].className += " current-right";
    } else {
      currWordChars[currCharIndex + 1].className += " current";
    }

    setCurrCharIndex(currCharIndex + 1);
  }

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(()=>{
    resetWordSpanRefClassName();
  },[resetSameTest])

  const stratTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      setCountDown((latestCountDown) => {
        //calculating wpm at particular time gor graphData
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - latestCountDown + 1,
                (correctChars / 5 / ((testTime - latestCountDown + 1) / 60)).toFixed(2),
              ],
            ];
          });
          return correctChars;
        });
        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };

  //resetting current test
  const resetTest = () => {
    clearInterval(intervalId);
    setWordsArray(generate(40));
    setCountDown(testTime);
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setCorrectChars(0);
    setCorrectWords(0);
    setIncorrectChars(0);
    setExtraChars(0);
    setTestStart(false);
    setTestEnd(false);
    setGraphData([]);
    focusInput();
  };

  const resetWordSpanRefClassName = () => {
    wordSpanRef.map((word) => {
      Array.from(word.current.childNodes).map((letter) => {
        letter.className = "";
      });
    });
    wordSpanRef[0].current.childNodes[0].className = "current";
  };

  //runs only once to set cursor at starting letter
  useEffect(() => {
    focusInput();
    const firstLetter = wordSpanRef[0].current.childNodes[0];
    if (
      !(
        firstLetter.classList.contains("correct") ||
        firstLetter.classList.contains("incorrect")
      )
    ) {
      firstLetter.className = "current";
    }
  }, [wordsArray]);

  const focusInput = () => {
    inputRef.current.focus();
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  return (
    <div className="typingbox-container">
      <Menu countDown={countDown} resetTest={resetTest} setResetSameTest={setResetSameTest}/>
      <div className="typingbox" onClick={focusInput}>
        {!inputFocused && !testEnd && (
          <div className="typingbox-overlay">
            <span className="overlaySpan">Click here to Start Typing</span>
          </div>
        )}
        {testEnd ? (
          <Results
            wpm={calculateWPM()}
            accuracy={calculateAccuracy()}
            correctChars={correctChars}
            incorrectChars={incorrectChars}
            extraChars={extraChars}
            graphData={graphData}
          />
        ) : (
          <div className="textBox">
            {wordsArray.map((word, index) => (
              <span key={index} className="wordSpan" ref={wordSpanRef[index]}>
                {word.split("").map((char, charIndex) => (
                  <span key={charIndex}>{char}</span>
                ))}
              </span>
            ))}
          </div>
        )}
        <input
          className="typeInput"
          ref={inputRef}
          onKeyDown={(e) => {
            if (!testEnd) handlekeyPress(e);
          }}
          onBlur={handleBlur}
          type="text"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default TypingBox;
