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
import { fetch_authenticated, FormattedTime, patch_authenticated, User } from "utils/globals";
import { getUser } from "utils/auth";
import { Avatar, Box, Button, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

function Tables() {
  const [ticket, setTicket] = useState();
  const [staffs, setStaffs] = useState();

  const { item } = useContext(SearchContext);
  const { user } = getUser();
  const alert = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    ticket.patient = ticket.patient.id;
    const res = await patch_authenticated(`create-ticket/${item}`, {
      body: JSON.stringify(ticket),
    });
    const res_data = await res.json();
    if (res.status === 200 || res.status === 201) {
      alert.show("Ticket Updated", { type: "success" });
      navigate("/tickets");
    } else {
      alert.show(Object.values(res_data)[0][0]);
    }
  };

  useLayoutEffect(() => {
    fetch_authenticated(`ticket/${item}`)
      .then((res) => res.json())
      .then((ticket) => {
        ticket.assigned_to = ticket.assigned_to?.id || "";
        setTicket(ticket);
      });
    fetch_authenticated("staff")
      .then((res) => res.json())
      .then((staffs) => setStaffs(staffs));
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
                    <User user={ticket.patient.user} patient={ticket.patient} />
                    <FormattedTime time={ticket.time} />
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
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      multiline
                      disabled={user.type === "patient"}
                      variant="standard"
                      helperText="Assign Someone this Ticket"
                      label="Assigned To"
                      name="assigned_to"
                      select
                      defaultValue={ticket.assigned_to}
                      onChange={(e) => setTicket((p) => ({ ...p, assigned_to: e.target.value }))}
                    >
                      {staffs?.map((staff) => (
                        <MenuItem key={staff.id} value={staff.id}>
                          <User user={staff.user} />
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
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
