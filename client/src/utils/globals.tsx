import React, { useLayoutEffect, useState } from "react";
import MDBox from "components/MDBox";
import { getUser } from "./auth";
import { Avatar, Button } from "@mui/material";
import MDTypography from "components/MDTypography";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

export const patch_authenticated_form = (route, options) => {
  const { token } = getUser();
  return fetch(`${baseUrl}${route}/`, {
    ...options,
    method: "PATCH",
    headers: {
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
export const post_authenticated_form = (route, options) => {
  const { token } = getUser();
  return fetch(`${baseUrl}${route}/`, {
    ...options,
    method: "POST",
    headers: {
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

export const PrintReport = () => {
  const [consultations, setConsultations] = useState([]);
  useLayoutEffect(() => {
    fetch_authenticated(`/consultation`, {})
      .then((res) => res.json())
      .then((consultations) => {
        setConsultations(consultations);
      });
  }, []);

  const printPdf = () => {
    const docDefinition = {
      content: [
        { text: "Clinic Visits", style: "header" },
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,

            body: [["Doctor", "Patient", "Medical Issue", "Prescription", "Time", "status"]].concat(
              consultations.map((consultation) => [
                consultation.staff.user.first_name + " " + consultation.staff.user.last_name,
                consultation.patient.user.first_name + " " + consultation.patient.user.last_name,
                consultation.medical_issue,
                consultation.prescription,
                new Date(consultation.time).toUTCString(),
                consultation.status === "undergoing_treatment"
                  ? "Undergoing Treatment"
                  : "Fully Recovered",
              ])
            ),
          },
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: "center",
        },
      },
    };
    pdfMake.createPdf(docDefinition).open();
  };
  return (
    <Button
      variant="contained"
      sx={{ color: "#fff", display: "block", ml: "auto " }}
      onClick={printPdf}
    >
      Print Report
    </Button>
  );
};
