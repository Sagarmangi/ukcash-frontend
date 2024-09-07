import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
// import { Icon } from "../../@uikit/Icon";

export default function Footer() {
  return (
    <>
      <Flex
        bgImage="https://www.transparenttextures.com/patterns/checkered-pattern.png"
        bgColor="#191970"
        color={process.env.REACT_APP_SECONDARY_COLOR}
        p="0.1rem 1rem"
        boxShadow="md"
        justifyContent="space-between"
      >
        <Flex>
          <Text fontFamily="cursive" fontSize="xs" my="1rem">
            © Visit UK 24. All rights reserved.
          </Text>
        </Flex>
        <Flex gap="1.5rem" marginY="auto">
          <Text
            color="#fff"
            fontSize="sm"
            variant="link"
            as={Link}
            to="/register"
          >
            Terms & Conditions
          </Text>
          <Text
            color="#fff"
            fontSize="sm"
            variant="link"
            as={Link}
            to="/register"
          >
            Privacy Policy
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
