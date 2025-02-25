import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./styles/global";
import Notification from "./Components/Notification";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Notification />
      <Routes>
        <Route path="/" element={<HomePage />}>
          {" "}
        </Route>
        <Route path="/user" element={<UserPage />}>
          {" "}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
