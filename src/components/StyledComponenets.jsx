import { Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import PropTypes from 'prop-types';

const StyledText = forwardRef(({ children, ...props }, ref) => {
  const { colorMode } = useColorMode();
  return (
    <Text
      ref={ref}
      position={"relative"}
      {...props}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      color={colorMode === "light" ? "#04050B" : "white"}
      fontSize="16px"
      lineHeight="20px"
      letterSpacing="10%"
      textAlign="left"
    >
      {children}
    </Text>
  );
});
StyledText.displayName = 'StyledText';

StyledText.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.object
};

export { StyledText };
