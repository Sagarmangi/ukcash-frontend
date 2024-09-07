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
  IconButton,
} from "@chakra-ui/react";
import { Icon } from "../@uikit/Icon";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DepositHistory() {
  const [deposits, setDeposits] = useState([]);
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/submissions/${data.username}`,
          {
            withCredentials: true,
          }
        );
        setDeposits(response.data);
      } catch (error) {
        console.error("Failed to fetch deposit history", error);
      }
    };

    if (data && data.username) {
      fetchDeposits();
    }
  }, [data]);

  return (
    <Flex direction="column" p="2rem" gap="2rem" overflowY="auto">
      <Table variant="striped" colorScheme="navyblue" color="white">
        <TableCaption
          placement="top"
          color="white"
          fontSize="1.8rem"
          fontWeight="700"
        >
          Deposit History
        </TableCaption>
        <Thead>
          <Tr>
            <Th color="white">Payment Method</Th>
            <Th color="white">Date of Deposit</Th>
            <Th color="white">Amount</Th>
            <Th color="white">Status</Th>
            <Th color="white">Screenshot</Th>
            <Th color="white">Reason</Th>
          </Tr>
        </Thead>
        <Tbody>
          {deposits.map((deposit) => (
            <Tr key={deposit._id}>
              <Td>{deposit.paymentMethod}</Td>
              <Td>{deposit.updatedAt}</Td>
              <Td>${deposit.amount}</Td>
              <Td>{deposit.status}</Td>
              <Td>
                {deposit.file && (
                  <a
                    href={`${process.env.REACT_APP_API_URL}/uploads/${deposit.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button colorScheme="blue" size="sm">
                      <Icon color="white" fontSize={18} name="image-line" />
                      View
                    </Button>
                  </a>
                )}
              </Td>
              <Td>{deposit.reason}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
