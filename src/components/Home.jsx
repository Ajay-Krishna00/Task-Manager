import { useColorMode } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const { colorMode } = useColorMode();
  return (
    <Box bg={colorMode === "dark" ? "#151b23" : "white"} width={'100%'} p={3}>
      <h1>hello from Home</h1>
    </Box>
  );
}