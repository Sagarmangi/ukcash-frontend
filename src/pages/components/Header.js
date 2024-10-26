import { Flex, IconButton, Stack, Button, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Icon } from "../../@uikit/Icon";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { SidebarModal, NotificationsModal } from "./Modals"; // Import NotificationModal
import { fetchUserData } from "../../redux/UserSlice";

export default function Header({ loggedIn, onOpen, isOpen }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([]);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const [isSidebarModalOpen, setIsSidebarModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false); // State for notification modal visibility

  useEffect(() => {
    if (cookies.jwt) {
      dispatch(fetchUserData(cookies.jwt));
    } else {
      navigate("/login");
    }
  }, [dispatch, cookies.jwt, navigate]);

  useEffect(() => {
    if (data && data.status === false) {
      console.log(data);
      setCookie("jwt", "", { path: "/", maxAge: 0 });
      navigate("/login");
    }
  }, [data, navigate, setCookie]);

  const handleSidebarModalOpen = () => {
    setIsSidebarModalOpen(true);
  };

  const handleSidebarModalClose = () => {
    setIsSidebarModalOpen(false);
  };

  const handleNotificationModalOpen = () => {
    setIsNotificationModalOpen(true);
  };

  const handleNotificationModalClose = () => {
    setIsNotificationModalOpen(false);
  };

  return (
    <>
      <Flex
        bgImage="https://www.transparenttextures.com/patterns/checkered-pattern.png"
        bgColor="#191970"
        color="white"
        p="0.4rem 1rem"
        mb="1rem"
        boxShadow="md"
        justifyContent="space-between"
      >
        {/* Hamburger Icon for Mobile */}
        <IconButton
          icon={<Icon name={isOpen ? "close-line" : "menu-line"} />}
          display={{ base: "flex", md: "none" }}
          onClick={handleSidebarModalOpen}
          variant="ghost"
          colorScheme="white"
          fontSize="24px"
        />

        {/* Notification Icon */}
        <Flex gap="0.5rem">
          <Link m="auto 0" to="#" onClick={handleNotificationModalOpen}>
            <Icon name="notification-2-line" fontSize="2xl" />
          </Link>
        </Flex>
      </Flex>

      <SidebarModal
        isOpen={isSidebarModalOpen}
        onClose={handleSidebarModalClose}
        member={data}
      />

      <NotificationsModal
        isOpen={isNotificationModalOpen}
        onClose={handleNotificationModalClose}
      />
    </>
  );
}
