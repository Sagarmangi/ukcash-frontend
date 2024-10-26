import React from "react";
import WelcomeHeader from "./components/WelcomeHeader";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
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
        <Heading as="h1">
          Thank You For Registering.
          <br />
          You will be notified when your account gets approved.
        </Heading>
        <Heading as="h2" fontSize="xl" fontFamily="Noto Nastaliq Urdu">
          رجسٹریشن کے لیے آپ کا شکریہ۔ جب آپ کا اکاؤنٹ منظور ہو جائے گا تو آپ کو
          مطلع کیا جائے گا۔
        </Heading>
        <Button
          onClick={() => {
            navigate("/");
          }}
          bg={process.env.REACT_APP_BUTTON_COLOR}
          color="black"
          width="12rem"
          _hover={{
            background: "rgba(255,255,0,1)",
          }}
        >
          Back to Home
        </Button>
      </Flex>
    </>
  );
}
