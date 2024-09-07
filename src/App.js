import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/AppStore";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Routes from "./Routes";
// import Page404 from "./pages/Page404";
// import ForgetPassword from "./pages/ForgetPassword";
// import ResetPassword from "./pages/ResetPassword";
// import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider bgColor="blue">
        <BrowserRouter>
          <Switch>
            <Route path="/*" element={<Routes />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="/*" element={<DashboardLayout />} /> */}
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
