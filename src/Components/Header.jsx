import React from "react";
import Select from "react-select";
import { themes } from "../Utils/themes.js";
import { useTheme } from "../Context/ThemeContext.jsx";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const handleChange = (e) => {
    setTheme(e.value);
    // localStorage.setItem("theme", JSON.stringify(e.value));
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      color: theme.textColor,
    }),
    menu: (styles) => ({
      ...styles,
    }),
  
  };

  return (
    <div className="header">
      <div className="logo">Logo</div>
      <div>
        <div className="themeButton">
          <Select
            onChange={handleChange}
            options={themes}
            defaultValue={{ label: theme.label, value: theme }}
            styles={{
              customStyles,
              // placeholder: (styles) => ({...styles,color:theme.theme.textColor}),
              // menu: (styles) => ({...styles, backgroundColor:theme.background}),
              // option: (styles) => ({...styles, color:theme.textColor}),
            }}
          />
        </div> 
      </div>
    </div>
  );
};

export default Header;
