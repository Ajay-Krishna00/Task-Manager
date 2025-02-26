import {
  Box,
  IconButton,
  Image,
  Button,
  Tooltip,
  useToast,
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
import { logout } from "../utils/api";
import { removeAuthToken } from "../utils/auth";
import { fetchTasks } from "../utils/api";
import { fetchUser } from "../utils/api";
import { getAuthToken } from "../utils/auth";
import { isAuthenticated } from "../utils/auth";

function Header({ onToggle }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const token = getAuthToken();
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleLogout = async () => {
    const success = await logout();
    removeAuthToken();
    if (success) {
      console.log("Logged out successfully");
    }
    navigate("/");
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { userInfos, error } = await fetchUser();
        setData(userInfos.user);
        if (error) {
          if (error.error == "Token expired, please log in again") {
            toast({
              title: "Session Expired",
              description: "Please login again",
              status: "error",
              duration: 6000,
              isClosable: true,
              position: "top",
            });
            if (success) {
              console.log("Logged out successfully");
            }
            navigate("/");
          }
        }
      } catch (error) {
        console.log(`Failed to fetch tasks`);
      }
    };
    loadTasks();
  }, [token]);

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
            {colorMode === "light" ? <FiSun fontSize={"20px"} /> : <FaMoon />}
          </IconButton>
          <Avatar
            src={
              data.profile_Img ||
              "https://cdn-icons-png.flaticon.com/512/3276/3276535.png"
            }
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
