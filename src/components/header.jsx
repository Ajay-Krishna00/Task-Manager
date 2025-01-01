import { Box, IconButton, Image,Button, Tooltip, } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { StyledText } from "./StyledComponenets";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  function handleMenu() {
    
  }

  return (
    <Box width={"100vw"} boxShadow={"sm"} zIndex={100}>
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
        <div style={{ marginLeft: "20px" }}>
          <Tooltip >
            <IconButton
              onClick={handleMenu}
              variant={"ghost"}
              aria-label="menu"
              rounded="full"
              boxSize={"38px"}
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
        <div>
          <StyledText fSize="22px">Task Manager</StyledText>
        </div>
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
            {colorMode === "light" ? <FiSun /> : <FaMoon />}
          </IconButton>
          <Image
            src="https://bit.ly/naruto-sage"
            boxSize="45px"
            borderRadius="full"
            fit="cover"
            alt="Profile Pic"
          />
          <StyledText fSize="18px">Ajay Krishna D</StyledText>
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
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default Header;
