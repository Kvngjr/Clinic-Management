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
import courseTableData from "layouts/records/data/medicalRecordsTableData";
import { SearchContext } from "context/index";
import { useContext } from "react";
import { fetch_authenticated } from "utils/globals";
import { getUser } from "utils/auth";
import { Button, Icon, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddOutlined } from "@mui/icons-material";
import MedicalRecord from "./data/MedicalRecord";

function Tables() {
  const { user } = getUser();
  const navigate = useNavigate();
  const { item } = useContext(SearchContext);

  const { columns, rows } = courseTableData((setPatients) => {
    fetch_authenticated(`/patient`)
      .then((res) => res.json())
      .then((patients) => setPatients(patients));
  });
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
                  {user.type === "patient" && "Your"} Medical Records
                </MDTypography>
                {/* {user.type === "staff" && (
                  <Button
                    variant="outlined"
                    color="white"
                    onClick={() => navigate("/records/create")}
                  >
                    New
                  </Button>
                )} */}
              </MDBox>
              <MDBox pt={3}>
                {(item || user.type === "patient") && (
                  <MedicalRecord patient_id={user.type === "patient" ? user.patient : item} />
                )}
                {!item && (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
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
