import { Link } from "react-router-dom";
import { Box,Icon, } from "@chakra-ui/react";
import { TbCalendarDue } from "react-icons/tb";
import { TiHomeOutline } from "react-icons/ti";
import { StyledText } from "./StyledComponenets";

function Navbar() {
  return (
    <Box width={"250px"} boxShadow={"sm"} zIndex={100} mt={0.2}>
      <Box
        as={"nav"}
        bg="white"
        border={"1px"}
        p={4}
        display="flex"
        flexDirection={"column"}
        justifyContent="space-between"
        alignItems={"center"}
        borderColor={"gray.200"}
        height={"91vh"}
      >
        <ul style={{ padding: 0, listStyleType: "none" }}>
          <li style={{ margin: "10px 0" }}>
            <Link to="/home">
              <Box display="flex" flexDirection={"row"}>
                <Icon boxSize={"20px"} fontSize={"19px"}>
                  <TiHomeOutline />
                </Icon>
                <StyledText>Home</StyledText>
              </Box>
            </Link>
          </li>
          <li style={{ margin: "10px 0" }}>
            <Link to="/due">
              <Box display="flex" flexDirection={"row"}>
                <Icon boxSize={"20px"} fontSize={"19px"}>
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
export default Navbar;