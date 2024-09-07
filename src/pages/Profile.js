import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Icon } from "../@uikit/Icon";
import { EditMemberModal } from "./components/Modals"; // Import the modal component

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for modal visibility
  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/`,
          { auth_token: "cookie.jwt" },
          {
            withCredentials: true, // Include cookies with the request
          }
        );
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please try again later.");
        toast({
          title: "Error fetching profile data.",
          description: "Unable to fetch profile data. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const handleEditProfileClick = () => {
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleSaveChanges = (updatedData) => {
    // Update the userData state with the new data from the modal
    setUserData(updatedData);
    setEditModalOpen(false);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex direction="column" align="center" p={5} color="white">
        <Avatar
          size="2xl"
          name={`${userData?.firstName} ${userData?.lastName}`}
          src={userData?.picture}
          bg={process.env.REACT_APP_BUTTON_COLOR}
        />
        <Heading
          mt={4}
        >{`${userData?.firstName} ${userData?.lastName}`}</Heading>
        <Text fontSize="lg" color="white.600">
          {userData?.email}
        </Text>
        <Box mt={5}>
          <Flex direction="column" align="center">
            <Text fontSize="md">
              <Icon name="user-line" mr={2} />
              Username: {userData?.username}
            </Text>
            <Text fontSize="md" mt={2}>
              <Icon name="user-2-line" mr={2} />
              Role: {userData?.role}
            </Text>
            {/* Add more profile details as needed */}
          </Flex>
        </Box>
        <Button
          mt={8}
          bg={process.env.REACT_APP_BUTTON_COLOR}
          color="black"
          onClick={handleEditProfileClick}
        >
          Edit Profile
        </Button>
      </Flex>

      {/* Include the EditMemberModal */}
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        member={userData}
        onSave={handleSaveChanges}
      />
    </>
  );
}
