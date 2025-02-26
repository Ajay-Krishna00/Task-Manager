import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import OverDue from "./components/Due.jsx";
import Header from "./components/header.jsx";
import { Box,useMediaQuery } from "@chakra-ui/react";
import Sidebar from "./components/sidebar.jsx";
import AllTasks from "./components/AllTask.jsx";
import CompletedTasks from "./components/Completed.jsx";
import Upcoming from "./components/Upcoming.jsx";
import Today from "./components/Today.jsx";
import { useState,useEffect} from "react";
import ProtectedRoute from "./components/protectedRoute.jsx";

function TaskManager() {
  const [isBase] = useMediaQuery("(max-width: 48em)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isBase) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }
  ,[isBase]);

  return (
    <Box display="flex" flexDirection={"column"}>
      <Header onToggle={toggleMenu} />
      <Box display={"flex"} flex={1}>
        <Box>
          <Sidebar isOpen={isMenuOpen} />
        </Box>
        <Box flex={1} overflow={"auto"} p={3}>
          <Routes>
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/OverDue"
              element={
                <ProtectedRoute>
                  <OverDue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Upcoming"
              element={
                <ProtectedRoute>
                  <Upcoming />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Today"
              element={
                <ProtectedRoute>
                  <Today />
                </ProtectedRoute>
              }
            />
            <Route
              path="/allTasks"
              element={
                <ProtectedRoute>
                  <AllTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/completedTasks"
              element={
                <ProtectedRoute>
                  <CompletedTasks />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default TaskManager;
