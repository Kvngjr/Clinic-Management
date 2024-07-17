import React from "react";
import MDBox from "components/MDBox";
import { getUser } from "./auth";
import { Avatar } from "@mui/material";
import MDTypography from "components/MDTypography";

export const baseUrl = "http://127.0.0.1:8000/";

export const fetch_authenticated = (route, options) => {
  const { token } = getUser();
  return fetch(`${baseUrl}${route}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};

export const patch_authenticated = (route, options) => {
  const { token } = getUser();
  return fetch(`${baseUrl}${route}/`, {
    ...options,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};

export const post_authenticated = (route, options) => {
  const { token } = getUser();
  return fetch(`${baseUrl}${route}/`, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
};

export const User = ({ user, patient }) => {
  if (!user) return "--";
  return (
    <>
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <Avatar src={user.passport} />
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {`${user.first_name} ${user.last_name}`} ({user.type})
          </MDTypography>
          <MDTypography variant="caption">{user.username}</MDTypography>
        </MDBox>
      </MDBox>
      {patient && <MDTypography variant="caption">{patient.medical_history}</MDTypography>}
    </>
  );
};

export const FormattedTime = ({ time }) => {
  return (
    <MDTypography sx={{ textAlign: "right", fontSize: 11 }}>
      {new Date(time).toDateString() + ", " + new Date(time).toLocaleTimeString()}
    </MDTypography>
  );
};
