import { Link } from "react-router-dom";
import { Box, Icon } from "@chakra-ui/react";
import { TbCalendarDue } from "react-icons/tb";
import { TiHomeOutline } from "react-icons/ti";
import { StyledText } from "./StyledComponenets";
import { useColorMode } from "@chakra-ui/react";

function Sidebar() {
  const { colorMode } = useColorMode();
  return (
    <Box width={"250px"} boxShadow={"sm"} zIndex={100} mt={0.1}>
      <Box
        as={"nav"}
        border={"1px"}
        p={4}
        display="flex"
        flexDirection={"column"}
        justifyContent="space-between"
        alignItems={"center"}
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
        height={"90vh"}
        bg={colorMode === "dark" ? "#151b23" : "white"}
      >
        <ul style={{ padding: 0, listStyleType: "none" }}>
          <li style={{ margin: "10px 0" }}>
            <Link to="/home">
              <Box display="flex" flexDirection={"row"}>
                <Icon mt={1} mr={3} boxSize={"23px"} fontSize={"20px"}>
                  <TiHomeOutline />
                </Icon>
                <StyledText>Home</StyledText>
              </Box>
            </Link>
          </li>
          <li style={{ margin: "10px 0" }}>
            <Link to="/due">
              <Box display="flex" flexDirection={"row"}>
                <Icon mt={1} mr={3} boxSize={"23px"} fontSize={"20px"}>
                  <TbCalendarDue />
                </Icon>
                <StyledText>Due</StyledText>
              </Box>
            </Link>
          </li>
        </ul>
        <div>
          <StyledText id="calender">Calender</StyledText>
        </div>
      </Box>
    </Box>
  );
}
export default Sidebar;
