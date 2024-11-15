import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Icon } from "../@uikit/Icon";
import { ViewMemberModal, EditMemberModal } from "./components/Modals";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/get-users`,
          {
            withCredentials: true,
          }
        );
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
        toast({
          title: "Error fetching members.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchMembers();
  }, [toast]);

  const handleDelete = async (username) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/${username}`, {
        withCredentials: true,
      });
      setMembers(members.filter((member) => member.username !== username));
      toast({
        title: "Member deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting member:", error);
      toast({
        title: "Error deleting member.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (username) => {
    const member = members.find((member) => member.username === username);
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedMember) => {
    window.location.reload();
    setMembers(
      members.map((member) =>
        member.username === updatedMember.username ? updatedMember : member
      )
    );
  };

  const handleView = (member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const approvedMembers = members.filter(
    (member) => member.accountStatus === "approved"
  );
  const unapprovedMembers = members.filter(
    (member) => member.accountStatus === "unapproved"
  );

  return (
    <Flex flexDir="column" gap="1rem" p="2rem">
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab color="white">Approved Accounts</Tab>
          <Tab color="white">Unapproved Accounts</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <MembersTable
              members={approvedMembers}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabPanel>
          <TabPanel>
            <MembersTable
              members={unapprovedMembers}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <ViewMemberModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        member={selectedMember}
      />

      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={selectedMember}
        allMembers={members}
        onSave={handleSave}
      />
    </Flex>
  );
}

function MembersTable({ members, onEdit, onDelete, onView }) {
  return (
    <Table variant="striped" colorScheme="navyblue" color="white">
      <Thead>
        <Tr>
          <Th color="white">Username</Th>
          <Th color="white">Name</Th>
          <Th color="white">Phone Number</Th>
          <Th color="white">Role</Th>
          <Th color="white">Status</Th>
          <Th color="white">Assigned Agent</Th> {/* New Column */}
          <Th color="white">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {members.map((member) => (
          <Tr key={member.username}>
            <Td>{member.username}</Td>
            <Td>
              {member.firstName} {member.lastName}
            </Td>
            <Td>{member.phoneNumber}</Td>
            <Td>{member.role}</Td>
            <Td>{member.accountStatus}</Td>
            <Td>
              {/* Display assigned agent's name */}
              {member.assignedAgent
                ? `${member.assignedAgent.firstName} ${member.assignedAgent.lastName} (${member.assignedAgent.username})`
                : "Not Assigned"}
            </Td>
            <Td>
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
                onClick={() => onView(member)}
              />
              <IconButton
                icon={
                  <Icon
                    color={process.env.REACT_APP_PRIMARY_COLOR}
                    fontSize={18}
                    name="pencil-line"
                  />
                }
                aria-label="Edit Account"
                mr="2"
                onClick={() => onEdit(member.username)}
              />
              <IconButton
                icon={
                  <Icon
                    color={process.env.REACT_APP_PRIMARY_COLOR}
                    fontSize={18}
                    name="delete-bin-line"
                  />
                }
                aria-label="Delete Account"
                colorScheme="red"
                onClick={() => onDelete(member.username)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
