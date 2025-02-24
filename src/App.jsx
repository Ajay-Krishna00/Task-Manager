import { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskManager from "./TaskManager";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={isAuthenticated() ? <TaskManager /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
