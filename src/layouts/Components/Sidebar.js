import {
  Avatar,
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Icon } from "../../@uikit/Icon";
import { fetchUserData } from "../../redux/UserSlice";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { NavButton } from "../../@uikit/NavButton";

export default function Sidebar({ user }) {
  const [cookies, setCookie] = useCookies([]);
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookie("auth_token", "", { path: "/", maxAge: 0 });
    navigate("/login");
  };

  return (
    <Box
      h="91.7vh"
      px="0px"
      transition="all 0.3s linear"
      display={{ base: "none", md: "flex" }}
      color="#fff"
      // display="flex"
      bgImage="https://www.transparenttextures.com/patterns/checkered-pattern.png"
      bgColor={process.env.REACT_APP_PRIMARY_COLOR}
      flexDirection="row"
    >
      <Box
        transition="all 0.3s linear"
        whiteSpace="nowrap"
        overflowX="hidden"
        h="100%"
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" flexDirection="column" h="100%">
          <Box d="flex" flex="1" flexDirection="column">
            <Box p="1rem" py={3}>
              <Box pe={18} ps={1} pb={3}>
                <Text fontFamily="cursive" fontSize="3xl">
                  <Icon name="cash-line" fontSize="3xl" /> UK Cash 24
                </Text>
              </Box>
            </Box>
            <Flex flexDir="column">
              <NavButton
                color="white"
                to="/dashboard"
                icon="home-2-line"
                showIcon
                label="Dashboard"
              />
              <NavButton
                color="white"
                to="/deposit"
                icon="inbox-archive-line"
                showIcon
                label="Deposit"
              />
              <NavButton
                color="white"
                to="/withdraw"
                icon="cash-line"
                showIcon
                label="Withdraw"
              />
              {data?.role === "super admin" ? (
                <NavButton
                  color="white"
                  to="/submissions"
                  icon="folder-4-line"
                  showIcon
                  label="Submissions"
                />
              ) : data?.role === "admin" ? (
                <NavButton
                  color="white"
                  to="/submissions"
                  icon="folder-4-line"
                  showIcon
                  label="Submissions"
                />
              ) : data?.role === "agent" ? (
                <NavButton
                  color="white"
                  to="/submissions"
                  icon="folder-4-line"
                  showIcon
                  label="Submissions"
                />
              ) : null}
              {data?.role === "super admin" ? (
                <NavButton
                  color="white"
                  to="/account-details"
                  icon="money-dollar-circle-line"
                  showIcon
                  label="Account Details"
                />
              ) : null}
              {data?.role === "super admin" ? (
                <NavButton
                  color="white"
                  to="/members"
                  icon="group-line"
                  showIcon
                  label="Members"
                />
              ) : data?.role === "admin" ? (
                <NavButton
                  color="white"
                  to="/members"
                  icon="group-line"
                  showIcon
                  label="Members"
                />
              ) : data?.role === "agent" ? (
                <NavButton
                  color="white"
                  to="/members"
                  icon="group-line"
                  showIcon
                  label="Members"
                />
              ) : null}
              {data?.role === "user" ? (
                <NavButton
                  color="white"
                  to="/deposit-history"
                  icon="inbox-archive-line"
                  showIcon
                  label="Deposit History"
                />
              ) : null}
              {data?.role === "user" ? (
                <NavButton
                  color="white"
                  to="/withdraw-history"
                  icon="inbox-unarchive-line"
                  showIcon
                  label="Withdraw History"
                />
              ) : null}
            </Flex>
          </Box>

          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="flex-end"
            pb="5"
          >
            <Flex ps={3} gap={2}>
              <Menu placement="right-end" size="xs">
                <MenuButton borderRadius="100%">
                  <Flex ps={3} gap={2}>
                    <Avatar
                      size="md"
                      bgColor="white"
                      color={process.env.REACT_APP_ACCENT_COLOR}
                      name={data?.firstName + " " + data?.lastName}
                      src={data?.picture}
                    />
                    <Box>
                      <Text
                        fontSize="sm"
                        textAlign="start"
                        as="b"
                        // color="white"
                      >
                        {data?.firstName} {data?.lastName}
                      </Text>
                      <Text fontSize="sm" color="white">
                        {data?.phoneNumber}
                      </Text>
                    </Box>
                  </Flex>
                </MenuButton>
                <MenuList
                  size="sm"
                  shadow="lg"
                  rounded="0"
                  borderColor="gray.100"
                  color="black"
                >
                  <Box px="5" py="2">
                    <Heading color="#000" m={0} size="sm">
                      {data?.firstName} {data?.lastName}
                    </Heading>
                  </Box>
                  <MenuItem
                    fontSize="14px"
                    onClick={handleLogout}
                    icon={<Icon name="sign-out-alt-solid" />}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
