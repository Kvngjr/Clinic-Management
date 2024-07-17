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
  const { user } = getUser();
  // form inputs
  const [complaint, setComplaint] = useState("");

  const alert = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      patient: user.patient,
      complaint,
    };
    try {
      const res = await post_authenticated(`create-ticket`, {
        body: JSON.stringify(data),
      });
      if (res.status === 200 || res.status === 201) {
        const res_data = await res.json();
        alert.show("New Ticket Created", { type: "success" });
        navigate("/tickets");
      } else {
        alert.show("Something went wrong");
      }
    } catch {
      alert.show("Something went wrong");
    }
  };

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
                  New Ticket
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
                  <User user={user} />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    disabled={user.type === "staff"}
                    variant="standard"
                    label="Complaint"
                    name="complaint"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={user.type === "staff"}
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
