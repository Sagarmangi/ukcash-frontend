import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Icon } from "../../@uikit/Icon";
import { Link, useNavigate } from "react-router-dom";

export default function WelcomeHeader() {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        bgImage="https://www.transparenttextures.com/patterns/checkered-pattern.png"
        bgColor="#191970"
        color="white"
        p="0.1rem 1rem"
        boxShadow="md"
        justifyContent="space-between"
      >
        <Flex>
          <Text fontFamily="cursive" fontSize="3xl" as={Link} to="/" my="1rem">
            <Icon name="cash-line" fontSize="3xl" /> UK Cash 24
          </Text>
        </Flex>
        <Flex gap="0.5rem">
          <Button
            m="auto"
            onClick={() => {
              navigate("/login");
            }}
            bg={process.env.REACT_APP_BUTTON_COLOR}
            color="black"
            _hover={{
              background: "rgba(255,255,0,1)",
            }}
          >
            Login
          </Button>
          <Button
            m="auto"
            onClick={() => {
              navigate("/register");
            }}
            bg={process.env.REACT_APP_BUTTON_COLOR}
            color="black"
            _hover={{
              background: "rgba(255,255,0,1)",
            }}
          >
            Register
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
