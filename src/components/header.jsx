import { Box, IconButton, Image,Button, } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { TiThMenuOutline } from "react-icons/ti";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box width={"100vw"} boxShadow={'sm'} zIndex={100}>
      <Box
        as={"nav"}
        bg="white"
        border={"1px"}
        p={3}
        display="flex"
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems={"center"}
        borderColor={"gray.200"}
        width={"100vw"}
      >
        <div style={{ marginLeft: "10px" }}>
          <IconButton variant={"ghost"} aria-label="menu" rounded="full">
            <TiThMenuOutline />
          </IconButton>
        </div>
        <div>
          <h1>Task Manager</h1>
        </div>
        <Box display="flex" flexDirection={"row"} alignItems={"center"} gap={3}>
          <IconButton
            variant={"ghost"}
            aria-label="color mode"
            rounded="full"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <FaMoon /> : <FiSun />}
          </IconButton>
          <Image
            src="https://bit.ly/naruto-sage"
            boxSize="45px"
            borderRadius="full"
            fit="cover"
            alt="Profile Pic"
          />
          <h3>Ajay Krishna D</h3>
          <Button
            variant="outline"
            color="red.500"
            border="2px solid red"
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
