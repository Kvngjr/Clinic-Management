import "regenerator-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AlertTemplate from "react-alert-template-basic";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider, SearchContextProvider } from "./context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const container = document.getElementById("root")!;
const root = createRoot(container);
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
root.render(
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SearchContextProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <MaterialUIControllerProvider>
            <App />
          </MaterialUIControllerProvider>
        </AlertProvider>
      </SearchContextProvider>
    </LocalizationProvider>
  </BrowserRouter>
);
