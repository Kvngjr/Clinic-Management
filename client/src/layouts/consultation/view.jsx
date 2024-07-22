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

// Data
import { useLayoutEffect, useState } from "react";
import { fetch_authenticated } from "utils/globals";
import { useNavigate, useParams } from "react-router-dom";

function Tables() {
  const [consultation, setConsultation] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    fetch_authenticated(`/consultation/${id}`)
      .then((res) => res.json())
      .then((consultation) => setConsultation(consultation));
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <MDTypography variant="h6" color="white">
                  Consultation
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="note"
                      label="Note"
                      defaultValue={consultation.note}
                      // onChange={(e) =>
                      //   setPatient((p) => ({ ...p, previous_operations: e.target.value }))
                      // }
                    />
                  </Grid>
                </Grid>
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
