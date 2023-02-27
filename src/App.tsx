import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global.style";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lightTheme } from "./styles/theme";
import Navbar from "./components/Navbar";
import Home from "./pages";
import Docs from "./pages/docs";
import About from "./pages/about";
//import Contact from './pages/contact';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route exact path='/index' element={<Home />} /> */}
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
