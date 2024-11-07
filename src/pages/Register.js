import {
  Box,
  Button,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Grid,
  FormControl,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "../@uikit/Icon";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import WelcomeHeader from "./components/WelcomeHeader";

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookies, removeCookie] = useCookies(["auth_token"]);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.auth_token) {
        return navigate("/register");
      }

      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/`,
          { auth_token: cookies.auth_token },
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("auth_token");
          navigate("/register");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Token verification failed", err);
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const generateError = (error) => {
    toast({
      title: "Error",
      description: error,
      position: "top-right",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    toast({
      title: "Signing Up",
      position: "top-right",
      status: "loading",
      duration: 3000,
      isClosable: true,
    });

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        values,
        { withCredentials: true }
      );

      if (data.errors) {
        const { phoneNumber, password } = data.errors;
        if (phoneNumber) generateError(phoneNumber);
        if (password) generateError(password);
      } else {
        toast({
          title: "Thank You for Registering",
          description: `Welcome, ${data.firstName}!`,
          position: "top-right",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Registration failed", err);
      generateError("Registration failed, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <WelcomeHeader />
      <Box
        display="flex"
        minH="100vh"
        py="2rem"
        flex={1}
        alignItems="center"
        backgroundPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        justifyContent="center"
      >
        <Box
          minW="26rem"
          maxW="26rem"
          display={{ base: "none", md: "none", lg: "flex" }}
          minH="32.5rem"
          flexDir="column"
          bgImage="https://www.transparenttextures.com/patterns/checkered-pattern.png"
          bgColor={process.env.REACT_APP_PRIMARY_COLOR}
          color="white"
          boxShadow="xl"
          borderRadius="10px 0 0 10px"
          px="2rem"
          py="1.5rem"
        >
          <Text fontSize="xl">Welcome to</Text>
          <Text fontFamily="cursive" fontSize="3xl" my="1rem">
            <Icon name="file-text-line" fontSize="3xl" /> UK Cash 24
          </Text>
          <Text>Login to your account to earn money easily.</Text>
        </Box>
        <Box
          maxW={{ base: "20rem", md: "24rem", lg: "26rem" }}
          minH="32.5rem"
          display="flex"
          flexDir="column"
          py="2rem"
          bgImage="https://www.transparenttextures.com/patterns/checkered-pattern.png"
          bgColor={process.env.REACT_APP_PRIMARY_COLOR}
          color="white"
          borderRadius="0px 10px 10px 0"
          px="2rem"
        >
          <Heading size="lg" mb="1.5rem">
            Create a new account
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl>
                  <FormLabel>First Name:</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name:</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                </FormControl>
              </Grid>
              <FormControl>
                <FormLabel>Phone Number:</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon color="#f5ba13" name="phone-line" />}
                  />
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. +123456789"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Password:</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon color="#f5ba13" name="lock-password-line" />
                    }
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      bg="transparent"
                      onClick={handleShowPassword}
                      icon={
                        <Icon
                          name={showPassword ? "eye-off-line" : "eye-line"}
                        />
                      }
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                isLoading={loading}
                type="submit"
                bg={process.env.REACT_APP_BUTTON_COLOR}
                color="black"
                _hover={{ bg: "yellow.400" }}
              >
                Register
              </Button>
              <Text color="#126dfc" fontSize="sm" as={Link} to="/login">
                Already have an account?
              </Text>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
}
