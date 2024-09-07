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
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SubmissionDetailsModal from "./components/Modals"; // Import the new modal component

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/submissions`,
          { withCredentials: true }
        );
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/submissions/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      const updatedSubmissions = submissions.map((submission) =>
        submission._id === id
          ? { ...submission, status: newStatus }
          : submission
      );
      setSubmissions(updatedSubmissions);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteSubmission = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/submissions/${id}`, {
        withCredentials: true,
      });

      const updatedSubmissions = submissions.filter(
        (submission) => submission._id !== id
      );
      setSubmissions(updatedSubmissions);
    } catch (error) {
      console.error("Error deleting submission:", error);
    }
  };

  const filterSubmissions = (type) => {
    return submissions.filter((submission) => submission.type === type);
  };

  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission);
    console.log(submission);
    setIsModalOpen(true);
  };

  return (
    <Flex flexDir="column" gap="1rem" p="2rem" overflowY="auto">
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab color="white">Deposit</Tab>
          <Tab color="white">Withdraw</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SubmissionTabs
              submissions={filterSubmissions("deposit")}
              onStatusChange={handleStatusChange}
              onDeleteSubmission={handleDeleteSubmission}
              onViewDetails={handleViewDetails}
            />
          </TabPanel>
          <TabPanel>
            <SubmissionTabs
              submissions={filterSubmissions("withdrawal")}
              onStatusChange={handleStatusChange}
              onDeleteSubmission={handleDeleteSubmission}
              onViewDetails={handleViewDetails}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SubmissionDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submission={selectedSubmission}
      />
    </Flex>
  );
}

function SubmissionTabs({
  submissions,
  onStatusChange,
  onDeleteSubmission,
  onViewDetails,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const statuses = ["all", "approved", "pending", "declined"];

  const filteredSubmissions = submissions.filter((submission) =>
    tabIndex === 0 ? true : submission.status === statuses[tabIndex]
  );

  return (
    <Tabs variant="soft-rounded" colorScheme="green" onChange={setTabIndex}>
      <TabList>
        {statuses.map((status, index) => (
          <Tab key={index} color="white">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {statuses.map((status, index) => (
          <TabPanel key={index}>
            <SubmissionsTable
              submissions={filteredSubmissions}
              onStatusChange={onStatusChange}
              onDeleteSubmission={onDeleteSubmission}
              onViewDetails={onViewDetails}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

function SubmissionsTable({
  submissions,
  onStatusChange,
  onDeleteSubmission,
  onViewDetails,
}) {
  return (
    <Table
      variant="striped"
      colorScheme="navyblue"
      color="white"
      fontSize="12px"
    >
      <Thead>
        <Tr fontSize="12px">
          <Th color="white">Username</Th>
          <Th color="white">Name</Th>
          <Th color="white">Amount</Th>
          <Th color="white">Type</Th>
          <Th color="white">Status</Th>
          <Th color="white">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {submissions.map((submission) => (
          <Tr key={submission._id}>
            <Td>{submission.user.username}</Td>
            <Td>
              {submission.user.firstName} {submission.user.lastName}
            </Td>
            <Td>${submission.amount}</Td>
            <Td>{submission.type}</Td>
            <Td>
              <Select
                color="black"
                bgColor="white"
                fontSize="12px"
                value={submission.status}
                onChange={(e) => onStatusChange(submission._id, e.target.value)}
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </Select>
            </Td>
            <Td>
              <Flex gap="1rem">
                <Button
                  bg={process.env.REACT_APP_BUTTON_COLOR}
                  color="black"
                  width="6rem"
                  _hover={{
                    background: process.env.REACT_APP_ACCENT_COLOR,
                  }}
                  onClick={() => onViewDetails(submission)}
                >
                  View Details
                </Button>
                <Button
                  bgColor="red.500"
                  color="white"
                  width="5rem"
                  _hover={{
                    background: "red.700",
                  }}
                  onClick={() => onDeleteSubmission(submission._id)}
                >
                  Delete
                </Button>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
