// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import { useContext, useLayoutEffect, useState } from "react";
import { Avatar, Button, Typography } from "@mui/material";
import { getUser } from "utils/auth";
import { SearchContext } from "context/index";
import { useNavigate } from "react-router-dom";
import { FormattedTime, User } from "utils/globals";

export default function data(fetch) {
  const [consultations, setConsultations] = useState([]);
  const navigate = useNavigate();
  const { search } = useContext(SearchContext);
  const user = getUser().user;

  useLayoutEffect(() => {
    fetch(setConsultations);
  }, []);

  const onButtonPress = (id) => {
    navigate(`/consultations/${id}`);
  };
  const columns = [
    { Header: "Doctor", accessor: "doctor", align: "left" },
    { Header: "Patient", accessor: "patient", align: "left" },
    { Header: "Medical Issue", accessor: "medicalIssue", align: "left" },
    { Header: "Prescription", accessor: "prescription", align: "left" },
    { Header: "Time", accessor: "time", align: "left" },
    { Header: "Notes", accessor: "notes", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  return {
    columns,
    rows: consultations
      .filter(
        (record) =>
          record.patient.user.first_name.toLowerCase().includes(search?.toLowerCase() || "") ||
          record.patient.user.last_name.toLowerCase().includes(search?.toLowerCase() || "")
      )
      .map((record) => ({
        patient: <User user={record.patient.user} />,
        doctor: <User user={record.staff.user} />,
        medicalIssue: <Typography variant="caption">{record.medical_issue}</Typography>,
        prescription: <Typography variant="caption">{record.prescription}</Typography>,
        time: (
          <Typography variant="caption">
            <FormattedTime time={record.time} />
          </Typography>
        ),
        notes: <Typography variant="caption">{record.note}</Typography>,
        action: (
          <Button
            variant="contained"
            size="small"
            sx={{ color: "#fff" }}
            onClick={() => onButtonPress(record.id)}
          >
            View
          </Button>
        ),
      })),
  };
}
