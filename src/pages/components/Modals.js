import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Flex,
  ModalCloseButton,
  Text,
  Image,
  Box,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { NavButton } from "../../@uikit/NavButton";
import { Icon } from "../../@uikit/Icon";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SubmissionDetailsModal({
  isOpen,
  onClose,
  submission,
}) {
  if (!submission) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submission Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap="1rem">
            <Text>
              <strong>Username:</strong> {submission.user.username}
            </Text>
            <Text>
              <strong>Name:</strong> {submission.user.firstName}{" "}
              {submission.user.lastName}
            </Text>
            <Text>
              <strong>Amount:</strong> ${submission.amount}
            </Text>
            <Text>
              <strong>Type:</strong> {submission.type}
            </Text>
            <Text>
              <strong>Status:</strong> {submission.status}
            </Text>
            {submission.type === "deposit" && (
              <>
                <Text>
                  <strong>Screenshot:</strong>
                </Text>
                <Image
                  src={`${process.env.REACT_APP_API_URL}/uploads/${submission.file}`}
                  alt={submission.file}
                />
              </>
            )}
            {submission.reason && (
              <Text>
                <strong>Reason:</strong> {submission.reason}
              </Text>
            )}
            <Text>
              <strong>Initiated:</strong>{" "}
              {new Date(submission.createdAt).toLocaleString()}
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function ViewMemberModal({ isOpen, onClose, member }) {
  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Member Details</ModalHeader>
        <ModalBody>
          <Flex direction="column" gap="1rem">
            <Text>
              <b>Username:</b> {member.username}
            </Text>
            <Text>
              <b>Name:</b> {member.firstName} {member.lastName}
            </Text>
            <Text>
              <b>Email:</b> {member.email}
            </Text>
            <Text>
              <b>Role:</b> {member.role}
            </Text>
            <Text>
              <b>Status:</b> {member.accountStatus}
            </Text>
            {/* Add more fields as needed */}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function EditMemberModal({ isOpen, onClose, member, onSave }) {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    accountStatus: "",
  });

  const { data } = useSelector((state) => state.user);

  const toast = useToast();
  useEffect(() => {
    if (member) {
      setFormData((prev) => ({
        userName: member.username,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        role: member.role,
        accountStatus: member.accountStatus,
      }));
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${member.username}`,
        formData,
        { withCredentials: true }
      );
      onSave(formData); // Notify parent component of changes
      toast({
        title: "Member updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error updating member:", error);
      toast({
        title: "Error updating member.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Member</ModalHeader>
        <ModalBody>
          <Flex direction="column" gap="1rem">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                isDisabled
                value={formData?.userName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                value={formData?.firstName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                isDisabled
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            {data?.role === "admin" ? (
              <>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    {/* Add more roles if needed */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    name="accountStatus"
                    value={formData.accountStatus}
                    onChange={handleChange}
                  >
                    <option value="approved">Approved</option>
                    <option value="unapproved">Unapproved</option>
                    {/* Add more statuses if needed */}
                  </Select>
                </FormControl>
              </>
            ) : null}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={process.env.REACT_APP_BUTTON_COLOR}
            color="black"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function SidebarModal({ isOpen, onClose, member }) {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([]);

  const handleLogout = () => {
    setCookie("auth_token", "", { path: "/", maxAge: 0 });
    navigate("/login");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={process.env.REACT_APP_PRIMARY_COLOR}>
        <ModalHeader>
          <Text fontFamily="cursive" fontSize="3xl" color="white">
            <Icon name="cash-line" fontSize="3xl" /> UK Cash 24
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />

        <ModalBody>
          <Flex flexDirection="column" color="white">
            <NavButton
              color="white"
              to="/dashboard"
              onClick={onClose}
              icon="home-2-line"
              showIcon
              label="Dashboard"
            />
            <NavButton
              color="white"
              to="/deposit"
              onClick={onClose}
              icon="inbox-archive-line"
              showIcon
              label="Deposit"
            />
            <NavButton
              color="white"
              to="/withdraw"
              onClick={onClose}
              icon="cash-line"
              showIcon
              label="Withdraw"
            />
            <NavButton
              color="white"
              to="/submissions"
              onClick={onClose}
              icon="folder-4-line"
              showIcon
              label="Submissions"
            />
            <NavButton
              color="white"
              to="/account-details"
              onClick={onClose}
              icon="money-dollar-circle-line"
              showIcon
              label="Account Details"
            />
            <NavButton
              color="white"
              to="/members"
              onClick={onClose}
              icon="group-line"
              showIcon
              label="Members"
            />
            <Button
              fontSize="14px"
              bg={process.env.REACT_APP_BUTTON_COLOR}
              color="black"
              onClick={handleLogout}
              icon={<Icon name="sign-out-alt-solid" />}
            >
              Logout
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export function NotificationsModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/notifications`,
            { withCredentials: true }
          );
          setNotifications(response.data);
        } catch (err) {
          console.error("Error fetching notifications:", err);
          setError("Failed to fetch notifications. Please try again later.");
          toast({
            title: "Error fetching notifications.",
            description:
              "Unable to fetch notifications. Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [isOpen, toast]);

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/delete-notification/${id}`,
        { withCredentials: true }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );
      toast({
        title: "Notification deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      console.error("Error deleting notification:", err);
      toast({
        title: "Error deleting notification.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notifications</ModalHeader>
        <ModalBody>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : notifications.length > 0 ? (
            <Flex direction="column" gap="1rem">
              {notifications.map((notification) => (
                <Box
                  key={notification.id}
                  p={4}
                  bg="gray.100"
                  borderRadius="md"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>{notification.notification}</Text>
                  <Flex>
                    <IconButton
                      icon={
                        <Icon
                          color={process.env.REACT_APP_PRIMARY_COLOR}
                          fontSize={18}
                          name="search-line"
                        />
                      }
                      aria-label="View Account"
                      mr="2"
                      as={NavLink}
                      to={
                        notification.type !== "account creation"
                          ? "/submissions"
                          : "/members"
                      }
                      onClick={onClose}
                    />
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteNotification(notification._id)}
                    >
                      <Icon
                        fontSize={18}
                        name="delete-bin-line"
                        color={process.env.REACT_APP_PRIMARY_COLOR}
                      />
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Flex>
          ) : (
            <Text>No notifications available.</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
