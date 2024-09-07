import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Icon } from "../@uikit/Icon";

export default function Withdraw() {
  const navigate = useNavigate();
  const toast = useToast();
  const { data } = useSelector((state) => state.user); // Fetching user data from Redux state

  const [values, setValues] = useState({
    paymentGateway: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    username: "",
    amount: "",
  });

  useEffect(() => {
    if (data && data.username) {
      setValues((prevValues) => ({
        ...prevValues,
        username: data.username,
      }));
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/withdraw`,
        { ...values },
        {
          withCredentials: true,
        }
      );

      if (data) {
        if (data.errors) {
          console.log(data.errors);
          toast({
            title: "Request Failed!",
            position: "top-right",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          console.log(data);
          toast({
            title: "Withdraw request sent",
            position: "top-right",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setValues((prevValues) => ({
            ...prevValues,
            paymentGateway: "",
            bankName: "",
            accountName: "",
            accountNumber: "",
            amount: "",
          }));
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <Flex
        p="1rem 1rem"
        flexDir="column"
        height="70vh"
        gap="2rem"
        color={process.env.REACT_APP_SECONDARY_COLOR}
      >
        <Flex gap="1rem">
          <Heading as="h2" fontSize="3xl">
            Withdraw
          </Heading>
        </Flex>
        <Flex gap="1rem">
          <form onSubmit={handleSubmit} id="withdraw-form">
            <Stack direction="column" spacing={4}>
              <Flex gap="2rem" flexDir={{ base: "column", md: "row" }}>
                <Box>
                  <FormLabel textTransform="uppercase" fontSize="12px">
                    Payment Gateway
                  </FormLabel>
                  <Select
                    placeholder="Select Payment Gateway"
                    value={values.paymentGateway}
                    bgColor="white"
                    color="black"
                    name="paymentGateway"
                    onChange={handleChange}
                  >
                    <option value="bank-transfer">Bank Transfer</option>
                    <option value="easypaisa">Easypaisa</option>
                    <option value="jazzcash">Jazzcash</option>
                  </Select>
                </Box>
                <Box>
                  <FormLabel textTransform="uppercase" fontSize="12px">
                    Bank Name
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon
                          color={process.env.REACT_APP_SECONDARY_COLOR}
                          fontSize={18}
                          name="bank-line"
                        />
                      }
                    />
                    <Input
                      type="text"
                      value={values.bankName}
                      name="bankName"
                      placeholder="Enter Bank Name"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Box>
              </Flex>
              <Flex gap="2rem" flexDir={{ base: "column", md: "row" }}>
                <Box>
                  <FormLabel textTransform="uppercase" fontSize="12px">
                    Account Name
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon
                          color={process.env.REACT_APP_SECONDARY_COLOR}
                          fontSize={18}
                          name="account-circle-line"
                        />
                      }
                    />
                    <Input
                      type="text"
                      value={values.accountName}
                      name="accountName"
                      placeholder="Enter Account Name"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel textTransform="uppercase" fontSize="12px">
                    Account Number
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon
                          color={process.env.REACT_APP_SECONDARY_COLOR}
                          fontSize={18}
                          name="hashtag"
                        />
                      }
                    />
                    <Input
                      type="text"
                      value={values.accountNumber}
                      name="accountNumber"
                      placeholder="Enter Account Number"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Box>
              </Flex>
              <Box>
                <FormLabel textTransform="uppercase" fontSize="12px">
                  Username
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon
                        color={process.env.REACT_APP_SECONDARY_COLOR}
                        fontSize={18}
                        name="user-line"
                      />
                    }
                  />
                  <Input
                    type="text"
                    value={values.username}
                    name="username"
                    isReadOnly
                  />
                </InputGroup>
              </Box>

              <Box>
                <FormLabel textTransform="uppercase" fontSize="12px">
                  Amount
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon
                        color={process.env.REACT_APP_SECONDARY_COLOR}
                        fontSize={18}
                        name="money-dollar-circle-line"
                      />
                    }
                  />
                  <Input
                    type="number"
                    value={values.amount}
                    name="amount"
                    placeholder="Enter Amount"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Box>

              <Button
                type="submit"
                form="withdraw-form"
                bg={process.env.REACT_APP_BUTTON_COLOR}
                color="black"
                _hover={{
                  background: process.env.REACT_APP_ACCENT_COLOR,
                }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
    </>
  );
}
