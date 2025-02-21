import { ThemeProvider } from "styled-components";
import Header from "./Components/Header";
import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./styles/global";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="canvas">
        <GlobalStyles />
        <Header />
        <TypingBox />
      </div>
    </ThemeProvider>
  );
}

export default App;
