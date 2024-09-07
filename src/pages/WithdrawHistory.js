import React, { useEffect, useState } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";
import { Icon } from "../@uikit/Icon";
import axios from "axios";
import { useSelector } from "react-redux";

export default function WithdrawHistory() {
  const [withdrawals, setWithdrawals] = useState([]);
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/submissions/w/${data.username}`,
          {
            withCredentials: true,
          }
        );

        setWithdrawals(response.data);
      } catch (error) {
        console.error("Failed to fetch withdrawal history", error);
      }
    };

    if (data && data.username) {
      fetchWithdrawals();
    }
  }, [data]);

  return (
    <Flex direction="column" p="2rem" gap="2rem">
      <Table variant="striped" colorScheme="navyblue" color="white">
        <TableCaption
          placement="top"
          color="white"
          fontSize="1.8rem"
          fontWeight="700"
        >
          Withdrawal History
        </TableCaption>
        <Thead>
          <Tr>
            <Th color="white">Bank Name</Th>
            <Th color="white">Account Name</Th>
            <Th color="white">Account Number</Th>
            <Th color="white">Initiated</Th>
            <Th color="white">Amount</Th>
            <Th color="white">Status</Th>
            <Th color="white">Reason</Th>
          </Tr>
        </Thead>
        <Tbody>
          {withdrawals.map((withdrawal) => (
            <Tr key={withdrawal._id}>
              <Td>{withdrawal.bankName}</Td>
              <Td>{withdrawal.accountName}</Td>
              <Td>{withdrawal.accountNumber}</Td>
              <Td>{new Date(withdrawal.createdAt).toLocaleString()}</Td>
              <Td>${withdrawal.amount}</Td>
              <Td>{withdrawal.status}</Td>
              <Td>{withdrawal.reason || "N/A"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
