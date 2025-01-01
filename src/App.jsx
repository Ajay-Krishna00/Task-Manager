import Navbar from "./components/navbar.jsx";
import { ChakraProvider,  } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Due from "./components/Due.jsx";
import Header from "./components/header.jsx";
import { Box } from "@chakra-ui/react";
import  ErrorBoundary from './components/ErrorBounty.jsx';

function App() {
  return (
    // Router needs to wrap everything that uses routing functionality
    <Router>
      <ErrorBoundary>
        <ChakraProvider>
          <Box display="flex" flexDirection={"column"}>
            <Header />
            <Box display={"flex"} flexDirection={"row"}>
              {/* Navbar is rendered once, outside of Routes */}
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/due" element={<Due />} />
              </Routes>
            </Box>
          </Box>
        </ChakraProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
