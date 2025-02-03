import { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskManager from "./TaskManager";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) localStorage.removeItem("token");
  }, [token]);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/Dashboard" /> : <Login />}
          />
          <Route
            path="/Dashboard"
            element={token ? <TaskManager /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
