import React from "react";
import {
  Button,
  //   Box,
  //   Button,
  Flex,
  Heading,
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
import WelcomeHeader from "./components/WelcomeHeader";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <WelcomeHeader />
      <Flex
        p="1rem 4rem"
        flexDir="column"
        height="70vh"
        justifyContent="center"
        gap="2rem"
        color={process.env.REACT_APP_SECONDARY_COLOR}
      >
        <Heading as="h1" fontFamily="Noto Nastaliq Urdu">
          اکاؤنٹ بنانے کی سمجھ نہ آئے تو میسج کریں
        </Heading>
        <Heading as="h2" fontSize="md" fontFamily="Noto Nastaliq Urdu">
          آ پ اپنا اکاؤنٹ خود بنائیں اور ٹینشن کے بغیر گھر بیٹھے پیسہ کمائیں۔
        </Heading>
        <Button
          onClick={() => {
            navigate("/register");
          }}
          bg={process.env.REACT_APP_BUTTON_COLOR}
          color="black"
          width="12rem"
          _hover={{
            background: "rgba(255,255,0,1)",
          }}
        >
          Register Now
        </Button>
      </Flex>
    </>
  );
}
