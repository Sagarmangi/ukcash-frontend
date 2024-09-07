import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

export default function AccountDetails() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
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
    // Fetch existing account details from the server
    const fetchAccountDetails = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/account-details`,
          { withCredentials: true }
        );
        setAccountDetails(data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, []);

  const handlePaymentMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setSelectedPaymentMethod(selectedMethod);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/account-details`,
        accountDetails,
        { withCredentials: true }
      );
      alert("Account details updated successfully");
    } catch (error) {
      console.error("Error updating account details:", error);
    }
  };

  return (
    <Flex flexDir="column" gap="1rem" p="2rem" color="white">
      <FormLabel fontSize="2xl">Change Account Details</FormLabel>
      <Stack direction="column" spacing={4}>
        <FormLabel>Select Payment Method</FormLabel>
        <Select
          placeholder="Select Payment Method"
          onChange={handlePaymentMethodChange}
          bgColor="white"
          color="black"
        >
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Easypaisa">Easypaisa</option>
          <option value="Jazzcash">Jazzcash</option>
        </Select>

        {selectedPaymentMethod && (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Text fontSize="lg" fontWeight="bold">
                {selectedPaymentMethod} Details
              </Text>

              {selectedPaymentMethod === "Bank Transfer" && (
                <>
                  <FormLabel>Bank Name</FormLabel>
                  <Input
                    type="text"
                    name="bankName"
                    value={accountDetails.bankName}
                    onChange={handleChange}
                    placeholder="Enter Bank Name"
                  />
                  <FormLabel>Account Name</FormLabel>
                  <Input
                    type="text"
                    name="bankAccountName"
                    value={accountDetails.bankAccountName}
                    onChange={handleChange}
                    placeholder="Enter Account Name"
                  />
                  <FormLabel>Account Number</FormLabel>
                  <Input
                    type="text"
                    name="bankAccountNumber"
                    value={accountDetails.bankAccountNumber}
                    onChange={handleChange}
                    placeholder="Enter Account Number"
                  />
                </>
              )}

              {(selectedPaymentMethod === "Easypaisa" ||
                selectedPaymentMethod === "Jazzcash") && (
                <>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name={`${selectedPaymentMethod.toLowerCase()}AccountName`}
                    value={
                      accountDetails[
                        `${selectedPaymentMethod.toLowerCase()}AccountName`
                      ]
                    }
                    onChange={handleChange}
                    placeholder="Enter Name"
                  />
                  <FormLabel>Account Number</FormLabel>
                  <Input
                    type="text"
                    name={`${selectedPaymentMethod.toLowerCase()}AccountNumber`}
                    value={
                      accountDetails[
                        `${selectedPaymentMethod.toLowerCase()}AccountNumber`
                      ]
                    }
                    onChange={handleChange}
                    placeholder="Enter Account Number"
                  />
                </>
              )}

              <Button
                type="submit"
                bg={process.env.REACT_APP_BUTTON_COLOR}
                color="black"
                _hover={{
                  background: process.env.REACT_APP_ACCENT_COLOR,
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </form>
        )}
      </Stack>
    </Flex>
  );
}
