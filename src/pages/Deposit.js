import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
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

export default function Deposit() {
  const navigate = useNavigate();
  const toast = useToast();
  const { data } = useSelector((state) => state.user);

  const [values, setValues] = useState({
    paymentMethod: "",
    username: "",
    amount: "",
    file: "",
  });
  const [accountDetails, setAccountDetails] = useState({
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
    easypaisaAccountName: "",
    easypaisaAccountNumber: "",
    jazzcashAccountName: "",
    jazzcashAccountNumber: "",
  });

  useEffect(() => {
    if (data && data.username) {
      setValues((prevValues) => ({
        ...prevValues,
        username: data.username,
      }));
    }
  }, [data]);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/account-details`,
          { withCredentials: true }
        );
        setAccountDetails(response.data);
      } catch (error) {
        console.error("Error fetching account details:", error);
        toast({
          title: "Error fetching account details",
          position: "top-right",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchAccountDetails();
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/deposit`,
        { ...values },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
            title: "Deposit request sent",
            position: "top-right",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setValues((prevValues) => ({
            ...prevValues,
            paymentMethod: "",
            amount: "",
            file: "",
          }));
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleFileChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      file: e.target.files[0], // Use e.target.files[0] to get the first file
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const paymentDetails = () => {
    switch (values.paymentMethod) {
      case "bank-transfer":
        return (
          <Text>
            <b>Bank Transfer Details:</b> <br />
            <b>Bank:</b> {accountDetails.bankName} <br />
            <b>Account Name:</b> {accountDetails.bankAccountName} <br />
            <b>Account Number:</b> {accountDetails.bankAccountNumber} <br />
          </Text>
        );
      case "easypaisa":
        return (
          <Text>
            <b>Easypaisa Details: </b>
            <br />
            <b>Account Number:</b> {accountDetails.easypaisaAccountNumber}{" "}
            <br />
            <b>Account Name:</b> {accountDetails.easypaisaAccountName}
          </Text>
        );
      case "jazzcash":
        return (
          <Text>
            <b>Jazzcash Details:</b> <br />
            <b>Account Number:</b> {accountDetails.jazzcashAccountNumber} <br />
            <b>Account Name:</b> {accountDetails.jazzcashAccountName}
          </Text>
        );
      default:
        return null;
    }
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
            Deposit
          </Heading>
        </Flex>
        <Flex gap="1rem">
          <form onSubmit={handleSubmit} id="deposit-form">
            <Stack direction="column" spacing={4}>
              <FormLabel textTransform="uppercase" fontSize="12px">
                Payment Method
              </FormLabel>
              <Select
                placeholder="Select Payment Method"
                value={values.paymentMethod}
                name="paymentMethod"
                color="black"
                bgColor="white"
                onChange={handleChange}
              >
                <option value="bank-transfer">Bank Transfer</option>
                <option value="easypaisa">Easypaisa</option>
                <option value="jazzcash">Jazzcash</option>
              </Select>

              {values.paymentMethod && (
                <Flex direction="column" mb="1rem" color="white.600">
                  {paymentDetails()}
                </Flex>
              )}

              <FormLabel textTransform="uppercase" fontSize="12px">
                Username
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Icon
                      color={process.env.REACT_APP_PRIMARY_COLOR}
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

              <FormLabel textTransform="uppercase" fontSize="12px">
                Amount
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={
                    <Icon
                      color={process.env.REACT_APP_PRIMARY_COLOR}
                      fontSize={18}
                      name="money-line"
                    />
                  }
                />
                <Input
                  type="number"
                  value={values.amount}
                  name="amount"
                  placeholder="Enter amount"
                  onChange={handleChange}
                />
              </InputGroup>

              <FormLabel textTransform="uppercase" fontSize="12px">
                Screenshot
              </FormLabel>
              <InputGroup>
                <input
                  type="file"
                  id="fileInput"
                  name="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput">
                  <Button borderEndRadius="0" as="span" colorScheme="blue">
                    Upload File
                  </Button>
                </label>
                <Input
                  borderStartRadius="0"
                  value={values.file ? values.file.name : ""}
                  readOnly
                  type="text"
                />
              </InputGroup>

              <Button
                type="submit"
                form="deposit-form"
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
