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
import { fetch_authenticated, patch_authenticated } from "utils/globals";
import { getUser } from "utils/auth";
import { Avatar, Box, Button, Divider, Icon, TextField, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

function Tables() {
  const [consultation, setConsultation] = useState();
  const { item } = useContext(SearchContext);
  const { user } = getUser();
  const alert = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await patch_authenticated(`consultation/${item}`, {
      body: JSON.stringify(consultation),
    });
    if (res.status === 200 || res.status === 201) {
      const res_data = await res.json();
      alert.show("Record Updated", { type: "success" });
      navigate("/records");
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
    fetch_authenticated(`consultation/${item}`)
      .then((res) => res.json())
      .then((consultation) => setConsultation(consultation));
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
                  View {user.type === "patient" && "Your"} Consultations
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {consultation && (
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, mx: "auto", px: 1 }}
                    maxWidth={440}
                  >
                    <Typography>Patient</Typography>
                    <User user={consultation.patient.user} />
                    <Typography sx={{ mt: 2 }}>Medical professional(s)</Typography>
                    {consultation.staffs.map((staff) => (
                      <User user={staff.user} />
                    ))}
                    <MDTypography sx={{ textAlign: "right", fontSize: 14 }}>
                      {consultation.time}
                    </MDTypography>
                    <Divider />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      multiline
                      disabled={user.type === "patient"}
                      variant="standard"
                      label="Brief"
                      name="brief"
                      value={consultation.brief}
                      onChange={(e) =>
                        setConsultation((prev) => ({ ...prev, brief: e.target.value }))
                      }
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={user.type === "patient"}
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
