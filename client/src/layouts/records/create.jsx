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

// Data
import { SearchContext } from "context/index";
import React, { useContext, useLayoutEffect, useState } from "react";
import { fetch_authenticated, patch_authenticated, post_authenticated, User } from "utils/globals";
import { getUser } from "utils/auth";
import { Avatar, Box, Button, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

function Tables() {
  const [patients, setPatients] = useState();
  const [staffs, setStaffs] = useState();
  const { user } = getUser();
  // form inputs
  const [patient, setPatient] = useState("");
  const [staff, setStaff] = useState("");
  const [brief, setBrief] = useState("");

  const alert = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      patient,
      brief,
      staffs: Array.from(new Set([staff, user.id])),
    };
    try {
      const res = await post_authenticated(`create-consultation`, {
        body: JSON.stringify(data),
      });
      if (res.status === 200 || res.status === 201) {
        const res_data = await res.json();
        alert.show("New Record Created", { type: "success" });
        navigate("/records");
      } else {
        alert.show("Something went wrong");
      }
    } catch {
      alert.show("Something went wrong");
    }
  };

  useLayoutEffect(() => {
    fetch_authenticated(`patient`)
      .then((res) => res.json())
      .then((patients) => setPatients(patients));
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
                  New Record
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1, mx: "auto", px: 1 }}
                  maxWidth={440}
                >
                  {patients && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      multiline
                      disabled={user.type === "patient"}
                      variant="standard"
                      label="Patient"
                      name="patient"
                      helperText="Choose a patient"
                      select
                      value={patient}
                      onChange={(e) => setPatient(e.target.value)}
                    >
                      {patients.map((patient) => (
                        <MenuItem key={patient.id} value={patient.id}>
                          <User user={patient.user} />
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  {staffs && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      multiline
                      disabled={user.type === "patient"}
                      variant="standard"
                      label="Doctor"
                      name="staff"
                      helperText="Choose a Doctor"
                      select
                      value={staff}
                      onChange={(e) => setStaff(e.target.value)}
                    >
                      {staffs.map((staff) => (
                        <MenuItem key={staff.id} value={staff.id}>
                          <User user={staff.user} />
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    disabled={user.type === "patient"}
                    variant="standard"
                    label="Brief"
                    name="brief"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={user.type === "patient"}
                    sx={{ mt: 3, mb: 2, color: "#fff" }}
                  >
                    Create
                  </Button>
                </Box>
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
