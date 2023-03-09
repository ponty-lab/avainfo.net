import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global.style";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lightTheme } from "./styles/theme";
import Navbar from "./components/navbar/Navbar";
import Map from "./pages/map";
import About from "./pages/about";
import Docs from "./pages/docs";
import Privacy from "./pages/privacy";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
