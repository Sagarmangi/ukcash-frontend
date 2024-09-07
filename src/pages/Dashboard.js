import React from "react";
import {
  Box,
  Button,
  //   Box,
  //   Button,
  Flex,
  Heading,
  Text,
  //   FormLabel,
  //   Heading,
  //   IconButton,
  //   Input,
  //   InputGroup,
  //   InputLeftElement,
  //   InputRightElement,
  //   Stack,
  //   Text,
  //   useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        p="1rem 1rem"
        flexDir="column"
        height="70vh"
        justifyContent="center"
        gap="4rem"
        color={process.env.REACT_APP_SECONDARY_COLOR}
      >
        <Flex
          gap="1rem"
          mt={{ base: "22rem", md: "0" }}
          flexDir={{ base: "column", md: "row" }}
        >
          <Button
            onClick={() => {
              navigate("/register");
            }}
            bg={process.env.REACT_APP_BUTTON_COLOR}
            color="black"
            width="12rem"
            _hover={{
              background: process.env.REACT_APP_ACCENT_COLOR,
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            bg={process.env.REACT_APP_BUTTON_COLOR}
            color="black"
            width="12rem"
            _hover={{
              background: process.env.REACT_APP_ACCENT_COLOR,
            }}
          >
            Login
          </Button>
        </Flex>
        <Flex gap="1rem" flexDir={{ base: "column", md: "row" }}>
          <Flex
            gap="1rem"
            p="3rem 2rem"
            flexDir="column"
            bgColor={process.env.REACT_APP_PRIMARY_COLOR}
            bgImage="https://www.transparenttextures.com/patterns/checkered-pattern.png"
            borderRadius="8px"
          >
            <Flex gap="3rem">
              <Text m="auto 0">Total Deposit</Text>
              <Button
                onClick={() => {
                  navigate("/deposit-history");
                }}
                bg={process.env.REACT_APP_BUTTON_COLOR}
                color="black"
                width="6rem"
                _hover={{
                  background: process.env.REACT_APP_ACCENT_COLOR,
                }}
              >
                View All
              </Button>
            </Flex>
            <Text fontSize="2xl">Rs. 9900</Text>
          </Flex>
          <Flex
            gap="1rem"
            p="3rem 2rem"
            flexDir="column"
            bgColor={process.env.REACT_APP_PRIMARY_COLOR}
            bgImage="https://www.transparenttextures.com/patterns/checkered-pattern.png"
            borderRadius="8px"
          >
            <Flex gap="3rem">
              <Text m="auto 0">Total Withdraw</Text>
              <Button
                onClick={() => {
                  navigate("/withdraw-history");
                }}
                bg={process.env.REACT_APP_BUTTON_COLOR}
                color="black"
                width="6rem"
                _hover={{
                  background: process.env.REACT_APP_ACCENT_COLOR,
                }}
              >
                View All
              </Button>
            </Flex>
            <Text fontSize="2xl">Rs. 8800</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
