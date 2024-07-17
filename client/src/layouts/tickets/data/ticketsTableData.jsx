// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import { useContext, useLayoutEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { getUser } from "utils/auth";
import { SearchContext } from "context/index";
import { useNavigate } from "react-router-dom";

export default function data(fetch) {
  const [tickets, setTickets] = useState([]);
  const { search, setItem } = useContext(SearchContext);
  const navigate = useNavigate();
  const user = getUser().user;

  useLayoutEffect(() => {
    fetch(setTickets);
  }, []);

  const User = ({ user }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <Avatar src={user.passport} />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {`${user.first_name} ${user.last_name}`}
        </MDTypography>
        <MDTypography variant="caption">{user.email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const onButtonPress = (id) => {
    setItem(id);
    navigate("/tickets/view");
  };
  return {
    columns: [
      { Header: "Patient", accessor: "patient", width: "30%", align: "left" },
      { Header: "Complaint", accessor: "complaint", width: "40%", align: "left" },
      { Header: "Time", accessor: "time", width: "20%", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: tickets
      .filter(
        (ticket) =>
          ticket.patient.user.first_name.toLowerCase().includes(search?.toLowerCase() || "") ||
          ticket.patient.user.last_name.toLowerCase().includes(search?.toLowerCase() || "") ||
          `${ticket.patient.user.first_name} ${ticket.patient.user.last_name} `
            .toLowerCase()
            .includes(search?.toLowerCase() || "") ||
          ticket.complaint.toLowerCase().includes(search?.toLowerCase() || "")
      )
      .map((ticket) => ({
        patient: <User user={ticket.patient.user} />,
        complaint: (
          <MDTypography fontSize={16} color="text">
            {ticket.complaint}
          </MDTypography>
        ),
        time: (
          <MDTypography fontSize={14} color="text">
            {new Date(ticket.time).toLocaleString()}
          </MDTypography>
        ),
        action: (
          <Button
            variant="contained"
            size="small"
            sx={{ color: "#fff" }}
            onClick={() => onButtonPress(ticket.id)}
          >
            View
          </Button>
        ),
      })),
  };
}
