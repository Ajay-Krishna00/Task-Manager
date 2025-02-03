import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import OverDue from "./components/Due.jsx";
import Header from "./components/header.jsx";
import { Box } from "@chakra-ui/react";
import Sidebar from "./components/sidebar.jsx";
import AllTasks from "./components/AllTask.jsx";
import CompletedTasks from "./components/Completed.jsx";
import Upcoming from "./components/Upcoming.jsx";
import Today from "./components/Today.jsx";
import { useState } from "react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Box display="flex" flexDirection={"column"}>
      <Header onToggle={toggleMenu} />
      <Box display={"flex"} flex={1}>
        <Box>
          <Sidebar isOpen={isMenuOpen} />
        </Box>
        <Box flex={1} overflow={"auto"} p={3}>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/OverDue" element={<OverDue />} />
            <Route path="/Upcoming" element={<Upcoming />} />
            <Route path="/Today" element={<Today />} />
            <Route path="/allTasks" element={<AllTasks />} />
            <Route path="/completedTasks" element={<CompletedTasks />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
