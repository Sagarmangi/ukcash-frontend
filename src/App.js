import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/AppStore";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider bgColor="blue">
        <BrowserRouter>
          <Switch>
            <Route path="/*" element={<Routes />} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
