import { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskManager from "./TaskManager";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(isAuthenticated());
    };
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/*" // This is a catch-all route
            element={isLoggedIn ? <TaskManager /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
