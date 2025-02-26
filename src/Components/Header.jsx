import React from "react";
import Select from "react-select";
import { themes } from "../Utils/themes.js";
import { useTheme } from "../Context/ThemeContext.jsx";
import AccountCircle from "./AccountCircle.jsx";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const handleChange = (e) => {
    setTheme(e.value);
    // localStorage.setItem("theme", JSON.stringify(e.value));
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      height: 30,
      backgroundColor: theme.background,
      borderColor: theme.textColor,
    }),
    singleValue: (styles) => ({ ...styles, color: theme.textColor }),
    menu: (styles) => ({ ...styles, backgroundColor: theme.background }),
    option: (styles) => ({
      ...styles,
      backgroundColor: theme.background,
      color: theme.textColor,
      border: `1px dotted ${theme.textColor}`,
    }),
    indicatorSeparator : (styles) => ({...styles,color: theme.textColor}),
    Svg : (styles) => ({...styles,color: theme.textColor}),
  };

  return (
    <div className="header">
      <div className="logo">
        <svg
          width="100"
          height="200"
          viewBox="0 0 500 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <!-- Keyboard Background --> */}
          <rect
            width="498"
            height="200"
            rx="20"
            fill="#222"
            stroke="#ccc"
            strokeWidth="2"
          />

          {/* <!-- Keys --> */}
          <rect x="30" y="40" width="40" height="40" rx="5" fill="#444" />
          <rect x="80" y="40" width="40" height="40" rx="5" fill="#444" />
          <rect x="130" y="40" width="40" height="40" rx="5" fill="#444" />
          <rect x="180" y="40" width="40" height="40" rx="5" fill="#444" />
          <rect x="230" y="40" width="40" height="40" rx="5" fill="#444" />
          <rect x="280" y="40" width="40" height="40" rx="5" fill="#444" />
          <rect x="330" y="40" width="40" height="40" rx="5" fill="#444" />
          <rect x="380" y="40" width="40" height="40" rx="5" fill="#444" />
          <rect x="430" y="40" width="40" height="40" rx="5" fill="#444" />

          <rect x="50" y="90" width="40" height="40" rx="5" fill="#444" />
          <rect x="100" y="90" width="40" height="40" rx="5" fill="#444" />
          <rect x="150" y="90" width="40" height="40" rx="5" fill="#444" />
          <rect x="200" y="90" width="40" height="40" rx="5" fill="#444" />
          <rect x="250" y="90" width="40" height="40" rx="5" fill="#444" />
          <rect x="300" y="90" width="40" height="40" rx="5" fill="#444" />
          <rect x="350" y="90" width="40" height="40" rx="5" fill="#444" />
          <rect x="400" y="90" width="40" height="40" rx="5" fill="#444" />

          {/* <!-- Spacebar --> */}
          <rect
            x="120"
            y="140"
            width="260"
            height="40"
            rx="10"
            fill="#ffcc00"
          />
        </svg>

      </div>
      <div className="header">
        <div className="themeButton">
          <Select
            onChange={handleChange}
            options={themes}
            defaultValue={{ label: theme.label, value: theme }}
            styles={customStyles}
          />
        </div>
        <AccountCircle />
      </div>
    </div>
  );
};

export default Header;
