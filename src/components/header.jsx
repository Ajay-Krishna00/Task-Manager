import {
  Box,
  IconButton,
  Image,
  Button,
  Tooltip,
  Avatar,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useColorMode } from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { StyledText } from "./StyledComponenets";
import { useNavigate } from "react-router-dom";
import { use, useEffect, useState } from "react";

function Header({ onToggle }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    async function checkToken() {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
      const res = await fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setData(data);
      if (data.error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    checkToken();
  }, []);

  return (
    <Box
      width={"100vw"}
      boxShadow={"sm"}
      zIndex={100}
      position={"sticky"}
      top={0}
    >
      <Box
        as={"nav"}
        border={"1px"}
        p={3}
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems={"center"}
        borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
        width={"100vw"}
        bg={colorMode === "dark" ? "#151b23" : "white"}
      >
        <div style={{ marginLeft: "10px" }}>
          <Tooltip label="Menu" aria-label="menu">
            <IconButton
              onClick={onToggle}
              variant={"ghost"}
              aria-label="menu"
              rounded="full"
              fontSize={"22px"}
              bg={colorMode === "dark" ? "#151b23" : "white"}
              _hover={{
                bg: colorMode === "dark" ? "gray.800" : "white",
              }}
            >
              <TiThMenu />
            </IconButton>
          </Tooltip>
        </div>
        <Box position={"absolute"} left={"45%"}>
          <StyledText fSize="26px">TodoMate</StyledText>
        </Box>
        <Box display="flex" flexDirection={"row"} alignItems={"center"} gap={6}>
          <IconButton
            variant={"ghost"}
            aria-label="color mode"
            rounded="full"
            onClick={toggleColorMode}
            bg={colorMode === "dark" ? "#151b23" : "white"}
            _hover={{
              bg: colorMode === "dark" ? "gray.800" : "white",
            }}
          >
            {colorMode === "light" ? <FaMoon /> : <FiSun fontSize={"20px"} />}
          </IconButton>
          <Avatar
            src="https://bit.ly/naruto-sage"
            boxSize="45px"
            borderRadius="full"
            fit="cover"
            alt="Profile Pic"
          />
          <StyledText fSize="18px">{data.name}</StyledText>
          <Button
            variant="outline"
            color="red.500"
            border="2px solid red"
            mr={2}
            _hover={{
              bg: "red.500",
              color: "white",
            }}
            _active={{
              bg: "red.600",
              transform: "scale(0.98)",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
Header.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default Header;
