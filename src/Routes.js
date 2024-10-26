import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Footer from "./pages/components/Footer";
import { Flex } from "@chakra-ui/react";
import DashboardLayout from "./layouts/DashboardLayout";
import ThankYou from "./pages/ThankYou";

export default function Routes() {
  return (
    <>
      <Flex
        minH="100vh"
        flexDir="column"
        bgColor="#00008B"
        justifyContent="space-between"
      >
        <Flex flexDir="column">
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/404" element={<Page404 />} /> */}
            <Route path="/*" element={<DashboardLayout />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Switch>
        </Flex>
        <Footer />
      </Flex>
    </>
  );
}
