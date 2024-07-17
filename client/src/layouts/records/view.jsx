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
import { fetch_authenticated, FormattedTime, patch_authenticated, User } from "utils/globals";
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
    const res_data = await res.json();
    if (res.status === 200 || res.status === 201) {
      alert.show("Record Updated", { type: "success" });
      navigate("/records");
    } else {
      console.log(res_data);
      alert.show("Something went wrong");
    }
  };

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
                    sx={{ mt: 1, mx: "auto", px: 1, display: "grid", gap: 2 }}
                    maxWidth={440}
                  >
                    <User user={consultation.patient.user} patient={consultation.patient} />
                    {consultation.staffs.map((staff) => (
                      <User user={staff.user} />
                    ))}
                    <FormattedTime time={consultation.time} />
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
