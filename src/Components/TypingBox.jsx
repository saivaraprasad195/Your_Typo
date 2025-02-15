import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { generate } from "random-words";
import "../styles/TypingBox.css";
import Menu from "./Menu";
import { useTestMode } from "../Context/TestModeContext";

const TypingBox = () => {
  console.log("Typong Box rendered...");
  const [wordsArray, setWordsArray] = useState(generate(50));
  const [inputFocused, setInputFocused] = useState(true);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const { testTime } = useTestMode();
  const [countDown, setCountDown] = useState(testTime);
  const [intervalId, setIntervalId] = useState(null);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
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
      return;
    }

    //correct typo
    if (e.key === currWordChars[currCharIndex].innerText) {
      currWordChars[currCharIndex].className = "correct";
    } //incorrect typo
    else {
      currWordChars[currCharIndex].className = "incorrect";
    }
    //handling end of the word case
    if (currCharIndex + 1 === currWordChars.length) {
      currWordChars[currCharIndex].className += " current-right";
    } else {
      currWordChars[currCharIndex + 1].className += " current";
    }

    setCurrCharIndex(currCharIndex + 1);
  }

  useEffect(() => {
    resetTest();
  }, [testTime]);

  const stratTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      setCountDown((latestCountDown) => {
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
    setCountDown(testTime);
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50));
    resetWordSpanRefClassName();
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
  }, []);

  const focusInput = () => {
    inputRef.current.focus();
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  return (
    <div>
      <Menu countDown={countDown} />
      <div
        className="relative h-fit bg-slate-500 mx-auto flex justify-center items-center"
        onClick={focusInput}
      >
        {!inputFocused && !testEnd && (
          <div className="absolute inset-0 flex justify-center items-center bg-transparent backdrop-blur-[3px] cursor-pointer">
            <span className="text-black font-semibold py-1 px-3 m-1 bg-slate-300">
              Click here to Start Typing
            </span>
          </div>
        )}
        {testEnd ? (
          <h1>Test Completed.</h1>
        ) : (
          <div className="flex flex-wrap justify-center items-center w-[85%] p-1 bg-gray-600">
            {wordsArray.map((word, index) => (
              <span
                key={index}
                className="m-1 tracking-wide text-2xl font-semibold"
                ref={wordSpanRef[index]}
              >
                {word.split("").map((char, charIndex) => (
                  <span key={charIndex}>{char}</span>
                ))}
              </span>
            ))}
          </div>
        )}
        <input
          className="opacity-0 w-0 h-0"
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
