import {
  Input,
  Box,
  FormLabel,
  FormHelperText,
  Heading,
  FormControl,
  Card,
  Button,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
  Alert,
  AlertIcon,
  CloseButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { StyledText } from "./StyledComponenets";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineEmail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import AccountPicModal from "./accountpicmodal";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import { setAuthToken } from "../utils/auth";
import { signUp } from "../utils/api";

export default function Login() {
  const [log, setLog] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [profile_Img, setProfile_Img] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login(email, password);
      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setError(
            "Email not confirmed. Please check your inbox for a confirmation email.",
          );
        } else {
          setError("Invalid email or password");
        }
        return;
      }
      setAuthToken(token);
      navigate("/Dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, name, profile_Img);
      navigate("/"); // Redirect to login page
    } catch (error) {
      setError("Failed to sign up");
    }
  };

  const handleProfileImage = (img) => {
    setProfile_Img(img);
  };

  return (
    <>
      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => {
              setError("");
              setSuccess("");
            }}
          />
        </Alert>
      )}
      {success && (
        <Alert status="success" borderRadius="md">
          <AlertIcon />
          {success}
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => {
              setError("");
              setSuccess("");
            }}
          />
        </Alert>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="gray.50"
      >
        {log === "" && (
          <Card
            w={{ base: "300px", sm: "400px", md: "520px" }}
            p={6}
            boxShadow="lg"
            borderRadius="lg"
          >
            <StyledText
              fSize="38px"
              textAlign="center"
              mb="20px"
              lineHeight="40px"
            >
              Welcome to TodoMate
            </StyledText>
            <StyledText fSize="19px" textAlign="center" Color="gray" mb="30px">
              Your ultimate task management solution
            </StyledText>
            <StyledText fSize="19px" textAlign="center" mb="10px">
              Login to get started
            </StyledText>
            <Button
              mb="20px"
              variant={"outline"}
              color={"white"}
              bg={"Black"}
              width={"100%"}
              fontSize={"18px"}
              p={"4px"}
              _hover={{ bg: "blue.500" }}
              onClick={() => {
                setLog("login");
              }}
            >
              Login
            </Button>
            <StyledText fSize="19px" textAlign="center" mb="10px">
              Don't have an account? Sign up
            </StyledText>
            <Button
              variant={"outline"}
              color={"white"}
              bg={"Black"}
              width={"100%"}
              fontSize={"18px"}
              p={"4px"}
              _hover={{ bg: "blue.500" }}
              onClick={() => {
                setLog("signup");
              }}
            >
              Sign Up
            </Button>
          </Card>
        )}

        {log === "login" && (
          <Card
            w={{ base: "350px", sm: "500px", md: "600px" }}
            p={5}
            boxShadow="lg"
            borderRadius="lg"
          >
            <form onSubmit={handleLogin}>
              <Heading>
                <StyledText fSize="40px" mb="30px">
                  Login
                </StyledText>{" "}
              </Heading>

              <FormControl>
                <FormLabel>
                  <StyledText>Email</StyledText>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineEmail />
                  </InputLeftElement>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>

              <FormControl mt="20px">
                <FormLabel>
                  <StyledText fSize="18px">Password</StyledText>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdPassword />
                  </InputLeftElement>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isRequired
                  />
                </InputGroup>
              </FormControl>

              <Button
                mt="20px"
                type="submit"
                variant={"outline"}
                color={"white"}
                bg={"Black"}
                width={"100%"}
                fontSize={"18px"}
                p={"4px"}
                _hover={{ bg: "blue.500" }}
              >
                Login
              </Button>
              <StyledText fSize="18px" mt="20px">
                Don't have an account?
                <Button
                  variant="link"
                  color={"blue"}
                  onClick={() => {
                    setLog("signup");
                  }}
                >
                  <Text fontSize="18px" pl={"6px"}>
                    Sign Up
                  </Text>
                </Button>
              </StyledText>
            </form>
          </Card>
        )}
        {log === "signup" && (
          <Card
            w={{ base: "350px", sm: "500px", md: "600px" }}
            p={5}
            boxShadow="lg"
            borderRadius="lg"
          >
            <form onSubmit={handleSignUp}>
              <Heading>
                <StyledText fSize="40px" mb="30px">
                  Sign UP
                </StyledText>{" "}
              </Heading>

              <FormControl isInvalid={!name}>
                <FormLabel>
                  <StyledText fSize="18px">Name</StyledText>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <VscAccount />
                  </InputLeftElement>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
                {!name && (
                  <FormErrorMessage>Name is required.</FormErrorMessage>
                )}
              </FormControl>
              <Button
                mt="20px"
                variant={"outline"}
                color={"Black"}
                bg={"white"}
                fontSize={"18px"}
                p={"4px"}
                _hover={{ bg: "gray.50" }}
                onClick={onOpen}
              >
                <Text>Select Profile Picture</Text>
              </Button>
              <FormControl mt="20px">
                <FormLabel>
                  <StyledText>Email</StyledText>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineEmail />
                  </InputLeftElement>

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>

              <FormControl mt="20px">
                <FormLabel>
                  <StyledText fSize="18px">Password</StyledText>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdPassword />
                  </InputLeftElement>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt="20px">
                <FormLabel>
                  <StyledText fSize="18px">Confirm Password</StyledText>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdPassword />
                  </InputLeftElement>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <Button
                mt="20px"
                type="submit"
                variant={"outline"}
                color={"white"}
                bg={"Black"}
                width={"100%"}
                fontSize={"18px"}
                p={"4px"}
                _hover={{ bg: "blue.500" }}
              >
                Sign Up
              </Button>
              <StyledText fSize="18px" mt="20px">
                Already have an account?
                <Button
                  variant="link"
                  color={"blue"}
                  onClick={() => {
                    setLog("login");
                  }}
                >
                  <Text fontSize="18px" pl={"6px"}>
                    Login
                  </Text>
                </Button>
              </StyledText>
            </form>
          </Card>
        )}

        <AccountPicModal
          isOpen={isOpen}
          onclose={onClose}
          pic={handleProfileImage}
        />
      </Box>
    </>
  );
}
