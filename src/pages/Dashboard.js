import React, { useEffect, useState } from "react";
import { Button, Flex, IconButton, Input, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Icon } from "../@uikit/Icon";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [data, setData] = useState();
  const { data: userData } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [linkData, setLinkData] = useState({ linkOne: "", linkTwo: "" });

  useEffect(() => {
    if (cookies.jwt) {
      const fetchTransactions = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/transactions`,
            { withCredentials: true }
          );
          setData(response.data);
        } catch (err) {
          console.error("Error fetching notifications:", err);
        }
      };
      const fetchLinks = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/get-btn-links`,
            { withCredentials: true }
          );
          setLinkData(response.data.buttonLinks);
        } catch (err) {
          console.error("Error fetching button links:", err);
        }
      };

      fetchLinks();
      fetchTransactions();
    } else {
      navigate("/login");
    }
  }, [cookies.jwt, navigate]);

  const handleSaveLinks = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/btn-link-edit`,
        linkData,
        {
          withCredentials: true,
        }
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving button links:", err);
    }
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setLinkData((prevData) => ({ ...prevData, [name]: value }));
  };

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
          {isEditing ? (
            <>
              <Input
                value={linkData.linkOne}
                name="linkOne"
                onChange={handleLinkChange}
                placeholder="Enter link for button one"
                width="12rem"
                mb={{ base: "1rem", md: "0" }}
              />
              <Input
                value={linkData.linkTwo}
                name="linkTwo"
                onChange={handleLinkChange}
                placeholder="Enter link for button two"
                width="12rem"
              />
              <IconButton
                icon={<Icon color="#f5ba13" fontSize={18} name="check-line" />}
                onClick={handleSaveLinks}
                colorScheme="blue"
                ml="1rem"
              />
            </>
          ) : (
            <>
              <Link href={`https://${linkData.linkOne}`}>
                <Button
                  bg={process.env.REACT_APP_BUTTON_COLOR}
                  color="black"
                  width="12rem"
                  _hover={{
                    background: "yellow",
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href={`https://${linkData.linkTwo}`}>
                <Button
                  bg={process.env.REACT_APP_BUTTON_COLOR}
                  color="black"
                  width="12rem"
                  _hover={{
                    background: "yellow",
                  }}
                >
                  Login
                </Button>
              </Link>
              {userData?.role === "admin" && (
                <IconButton
                  icon={<Icon color="#f5ba13" fontSize={18} name="edit-line" />}
                  onClick={() => setIsEditing(true)}
                  colorScheme="blue"
                />
              )}
            </>
          )}
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
                  background: "yellow",
                }}
              >
                View All
              </Button>
            </Flex>
            <Text fontSize="2xl">Rs. {data?.totalDeposit} </Text>
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
                  background: "yellow",
                }}
              >
                View All
              </Button>
            </Flex>
            <Text fontSize="2xl">Rs. {data?.totalWithdraw}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
