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
  const [consultations, setConsultations] = useState([]);
  const navigate = useNavigate();
  const { search, setItem } = useContext(SearchContext);
  const user = getUser().user;

  useLayoutEffect(() => {
    fetch(setConsultations);
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

  const Course = ({ title, code }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {code}
      </MDTypography>
      <MDTypography variant="caption">{title}</MDTypography>
    </MDBox>
  );

  const onButtonPress = (id) => {
    setItem(id);
    navigate("/records/view");
  };
  const columns =
    user.type === "staff"
      ? [
          { Header: "Doctor", accessor: "doctor", width: "25%", align: "left" },
          { Header: "Patient", accessor: "patient", width: "25%", align: "left" },
          { Header: "Brief", accessor: "brief", width: "25%", align: "left" },
          { Header: "Time", accessor: "time", width: "15%", align: "left" },
          { Header: "action", accessor: "action", align: "center" },
        ]
      : [
          { Header: "Doctor", accessor: "doctor", width: "30%", align: "left" },
          { Header: "Brief", accessor: "brief", width: "35%", align: "left" },
          { Header: "Time", accessor: "time", width: "20%", align: "left" },
          { Header: "action", accessor: "action", align: "center" },
        ];
  return {
    columns,
    rows: consultations
      .filter(
        (record) =>
          record.staffs[0].user.first_name.toLowerCase().includes(search?.toLowerCase() || "") ||
          record.staffs[0].user.last_name.toLowerCase().includes(search?.toLowerCase() || "") ||
          record.patient.user.first_name.toLowerCase().includes(search?.toLowerCase() || "") ||
          record.patient.user.last_name.toLowerCase().includes(search?.toLowerCase() || "") ||
          record.brief.toLowerCase().includes(search?.toLowerCase() || "")
      )
      .map((record) => ({
        doctor: <User user={record.staffs[0].user} />,
        patient: <User user={record.patient.user} />,
        brief: (
          <MDTypography fontSize={16} color="text">
            {record.brief}
          </MDTypography>
        ),
        time: (
          <MDTypography fontSize={14} color="text">
            {new Date(record.time).toLocaleString()}
          </MDTypography>
        ),
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
