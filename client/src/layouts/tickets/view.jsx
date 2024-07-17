// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Datax
import ticketsTableData from "layouts/tickets/data/ticketsTableData";
import { SearchContext } from "context/index";
import React, { useContext, useLayoutEffect, useState } from "react";
import { fetch_authenticated, patch_authenticated } from "utils/globals";
import { getUser } from "utils/auth";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

function Tables() {
  const [ticket, setTicket] = useState();
  const { item } = useContext(SearchContext);
  const { user } = getUser();
  const alert = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await patch_authenticated("ticket/1", { body: JSON.stringify(ticket) });
    if (res.status === 200 || res.status === 201) {
      const res_data = await res.json();
      alert.show("Ticket Updated", { type: "success" });
      navigate("/tickets");
    } else {
      alert.show("Something went wrong");
    }
  };

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

  useLayoutEffect(() => {
    fetch_authenticated(`ticket/${item}`)
      .then((res) => res.json())
      .then((ticket) => setTicket(ticket));
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar nosearch />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  View {user.type === "patient" && "Your"} Ticket
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {ticket && (
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, mx: "auto", px: 1 }}
                    maxWidth={440}
                  >
                    <User user={ticket.patient.user} />
                    <MDTypography sx={{ textAlign: "right", fontSize: 14 }}>
                      {ticket.time}
                    </MDTypography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      variant="standard"
                      label="Complaint"
                      name="complaint"
                      disabled={user.type === "staff"}
                      value={ticket.complaint}
                      onChange={(e) =>
                        setTicket((prev) => ({ ...prev, complaint: e.target.value }))
                      }
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={user.type === "staff"}
                      sx={{ mt: 3, mb: 2, color: "#fff" }}
                    >
                      Update
                    </Button>
                  </Box>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
