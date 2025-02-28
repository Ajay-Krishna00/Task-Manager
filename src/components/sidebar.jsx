import { Link } from "react-router-dom";
import { Box, Icon } from "@chakra-ui/react";
import { TbCalendarDue } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoTodayOutline } from "react-icons/io5";
import { MdDoneAll } from "react-icons/md";
import { PiSealWarning } from "react-icons/pi";
import { HiOutlineWallet } from "react-icons/hi2";
import { StyledText } from "./StyledComponenets";
import { useColorMode } from "@chakra-ui/react";
import Calendar from "./Calender";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen }) {
  const { colorMode } = useColorMode();
  return (
    <Box
      width={isOpen ? "255px" : "0"}
      boxShadow={"sm"}
      overflow={"hidden"}
      transition="width 0.3s ease"
      zIndex={99}
      position={"sticky"}
      top={"70.7px"}
      height={"90.7vh"}
    >
      <Box
        as={"nav"}
        border={"1px"}
        p={4}
        display="flex"
        flexDirection={"column"}
        justifyContent="space-between"
        alignItems={"center"}
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
        height={"100%"}
        bg={colorMode === "dark" ? "#151b23" : "white"}
      >
        <ul style={{ padding: 0, listStyleType: "none" }}>
          <li style={{ margin: "10px 0" }}>
            <NavLink
              to="/Dashboard"
              style={({ isActive }) => ({
                display: "flex",
                flexDirection: "row",
                background: isActive
                  ? colorMode === "light"
                    ? "#F6F6F6"
                    : "#252F3D"
                  : "transparent",
                borderRadius: "5px",
                paddingLeft: "15px",
                paddingRight: "15px",
              })}
            >
              <Box
                display="flex"
                flexDirection={"row"}
                _selected={{ background: "blue" }}
              >
                <Icon mt={1} mr={3} boxSize={"23px"} fontSize={"20px"}>
                  <LuLayoutDashboard />
                </Icon>
                <StyledText>Dashboard</StyledText>
              </Box>
            </NavLink>
          </li>
          <li style={{ margin: "10px 0" }}>
            <NavLink
              to="/Today"
              style={({ isActive }) => ({
                display: "flex",
                flexDirection: "row",
                background: isActive
                  ? colorMode === "light"
                    ? "#F6F6F6"
                    : "#252F3D"
                  : "transparent",
                borderRadius: "5px",
                paddingLeft: "15px",
                paddingRight: "15px",
              })}
            >
              <Box display="flex" flexDirection={"row"}>
                <Icon mt={1} mr={3} boxSize={"23px"} fontSize={"20px"}>
                  <IoTodayOutline />
                </Icon>
                <StyledText>Today</StyledText>
              </Box>
            </NavLink>
          </li>
          <li style={{ margin: "10px 0" }}>
            <NavLink
              to="/Upcoming"
              style={({ isActive }) => ({
                display: "flex",
                flexDirection: "row",
                background: isActive
                  ? colorMode === "light"
                    ? "#F6F6F6"
                    : "#252F3D"
                  : "transparent",
                borderRadius: "5px",
                paddingLeft: "15px",
                paddingRight: "15px",
              })}
            >
              <Box display="flex" flexDirection={"row"}>
                <Icon mt={1} mr={3} boxSize={"23px"} fontSize={"20px"}>
                  <TbCalendarDue />
                </Icon>
                <StyledText>Upcoming</StyledText>
              </Box>
            </NavLink>
          </li>
          <li style={{ margin: "10px 0" }}>
            <NavLink
              to="/OverDue"
              style={({ isActive }) => ({
                display: "flex",
                flexDirection: "row",
                background: isActive
                  ? colorMode === "light"
                    ? "#F6F6F6"
                    : "#252F3D"
                  : "transparent",
                borderRadius: "5px",
                paddingLeft: "15px",
                paddingRight: "15px",
              })}
            >
              <Box display="flex" flexDirection={"row"}>
                <Icon mt={1} mr={3} boxSize={"23px"} fontSize={"20px"}>
                  <PiSealWarning />
                </Icon>
                <StyledText>OverDue</StyledText>
              </Box>
            </NavLink>
          </li>
          <li style={{ margin: "10px 0" }}>
            <NavLink
              to="/completedTasks"
              style={({ isActive }) => ({
                display: "flex",
                flexDirection: "row",
                background: isActive
                  ? colorMode === "light"
                    ? "#F6F6F6"
                    : "#252F3D"
                  : "transparent",
                borderRadius: "5px",
                paddingLeft: "15px",
                paddingRight: "15px",
              })}
            >
              <Box display="flex" flexDirection={"row"}>
                <Icon mt={1} mr={3} boxSize={"23px"} fontSize={"20px"}>
                  <MdDoneAll />
                </Icon>
                <StyledText>Completed</StyledText>
              </Box>
            </NavLink>
          </li>
          <li style={{ margin: "10px 0" }}>
            <NavLink
              to="/allTasks"
              style={({ isActive }) => ({
                display: "flex",
                flexDirection: "row",
                background: isActive
                  ? colorMode === "light"
                    ? "#F6F6F6"
                    : "#252F3D"
                  : "transparent",
                borderRadius: "5px",
                paddingLeft: "15px",
                paddingRight: "15px",
              })}
            >
              <Box display="flex" flexDirection={"row"}>
                <Icon mt={1} mr={3} boxSize={"23px"} fontSize={"20px"}>
                  <HiOutlineWallet />
                </Icon>
                <StyledText>All Tasks</StyledText>
              </Box>
            </NavLink>
          </li>
        </ul>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Box display="flex" flexDirection={"row"} alignItems={"center"}>
            <Icon mt={1} mr={3} boxSize={"23px"} fontSize={"20px"}>
              <FaRegCalendarAlt />
            </Icon>
            <StyledText id="calender">Calender</StyledText>
          </Box>
          <Calendar />
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
