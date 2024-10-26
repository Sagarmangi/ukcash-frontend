import React, { useEffect } from "react";
import { Routes as Switch, Route, useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/UserSlice";
import Dashboard from "../pages/Dashboard";
import Header from "../pages/components/Header";
import Deposit from "../pages/Deposit";
import Withdraw from "../pages/Withdraw";
import Submissions from "../pages/Submissions";
import AccountDetails from "../pages/AccountDetails";
import MembersPage from "../pages/MembersPage";
import DepositHistory from "../pages/DepositHistory ";
import WithdrawHistory from "../pages/WithdrawHistory";
import Profile from "../pages/Profile";
import ThankYou from "../pages/ThankYou";

function DashboardLayout() {
  const { data } = useSelector((state) => state.user);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies([]);

  useEffect(() => {
    if (cookies.jwt) {
      dispatch(fetchUserData(cookies.jwt));
    } else {
      navigate("/login");
    }
  }, [dispatch, cookies.jwt, navigate]);

  // Second useEffect for handling data change
  useEffect(() => {
    if (data && data.status === false) {
      console.log(data);
      setCookie("jwt", "", { path: "/", maxAge: 0 });
      navigate("/login");
    }
    if (data && data.accountStatus === "unapproved") {
      toast({
        title: "Login Failed",
        description: `${data.firstName}! Your account has not been approved yet.`,
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setCookie("jwt", "", { path: "/", maxAge: 0 });
      navigate("/login");
    }
  }, [data, navigate, setCookie]);

  return (
    <>
      <Box display="flex" h="100%" overflow="hidden">
        <Sidebar isOpen={isOpen} />
        <Box
          overscrollX="none"
          overflowY="auto"
          display="flex"
          flexDirection="column"
          h="91.7vh"
          transition="all 0.3s linear"
          flex={1}
        >
          <Header onOpen={isOpen ? onClose : onOpen} isOpen={isOpen} />
          <Box p="0.8rem 1rem" overflowY="auto">
            <Switch>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/submissions" element={<Submissions />} />
              <Route path="/account-details" element={<AccountDetails />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/deposit-history" element={<DepositHistory />} />
              <Route path="/withdraw-history" element={<WithdrawHistory />} />
              <Route path="/profile" element={<Profile />} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DashboardLayout;
