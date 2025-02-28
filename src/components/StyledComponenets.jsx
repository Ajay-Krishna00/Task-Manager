import { Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useColorMode } from "@chakra-ui/react";

const StyledText = forwardRef(
  ({ children, fSize, lineHeight, noOfLines, Color, ...props }, ref) => {
    const { colorMode } = useColorMode();
    return (
      <Text
        ref={ref}
        position={"relative"}
        {...props}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        lineHeight={lineHeight || "20px"}
        color={colorMode === "light" ? "#04050B" || Color : "white"}
        fontSize={fSize || "16px"}
        letterSpacing="10%"
        textAlign="left"
        noOfLines={noOfLines}
        // wordWrap="break-word"
        // wordBreak="break-word"
      >
        {children}
      </Text>
    );
  },
);
StyledText.displayName = "StyledText";



export { StyledText };
