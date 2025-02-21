import { createContext, useContext, useState } from "react";
import { themes } from "../Utils/themes";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const localTheme =
    JSON.parse(localStorage.getItem("theme")) || themes[0].value;
  const [theme, setTheme] = useState(localTheme);
  const values = {
    theme,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
