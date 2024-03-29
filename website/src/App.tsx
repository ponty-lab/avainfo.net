import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global.style";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lightTheme } from "./styles/theme.style";
import Navbar from "./components/navbar/Navbar";
import Map from "./pages/map";
import About from "./pages/about";
import Docs from "./pages/docs";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";

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
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
