// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import { useContext, useLayoutEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { getUser } from "utils/auth";
import { SearchContext } from "context/index";
import { useNavigate } from "react-router-dom";
import { FormattedTime, User } from "utils/globals";

export default function data(fetch) {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const { search, setItem } = useContext(SearchContext);
  const user = getUser().user;

  useLayoutEffect(() => {
    fetch(setPatients);
  }, []);

  const onButtonPress = (id) => {
    setItem(id);
  };
  const columns = [
    { Header: "Patient", accessor: "patient", width: "90%", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
  ];
  return {
    columns,
    rows: patients
      .filter(
        (patient) =>
          patient.user.first_name.toLowerCase().includes(search?.toLowerCase() || "") ||
          patient.user.last_name.toLowerCase().includes(search?.toLowerCase() || "")
      )
      .map((patient) => ({
        patient: <User user={patient.user} />,
        action: (
          <Button
            variant="contained"
            size="small"
            sx={{ color: "#fff" }}
            onClick={() => onButtonPress(patient.id)}
          >
            View
          </Button>
        ),
      })),
  };
}
