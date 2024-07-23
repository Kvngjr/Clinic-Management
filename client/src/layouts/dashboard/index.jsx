// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useLayoutEffect, useState } from "react";
import { fetch_authenticated } from "utils/globals";
import { getUser } from "utils/auth";
import { Box, Button } from "@mui/material";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const { user } = getUser();

  useLayoutEffect(() => {
    fetch_authenticated("patient")
      .then((res) => res.json())
      .then((patients) => setPatients(patients));
    fetch_authenticated("consultation")
      .then((res) => res.json())
      .then((consultations) => setConsultations(consultations));
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} alignItems="stretch">
          {user.type === "staff" && (
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Number of Patients"
                  count={patients.length}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          )}
          <Grid container item xs={12} md={6} lg={4} alignItems="stretch">
            <MDBox mb={1.5} flex={1}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title={user.type === "patient" ? "Previous Visits" : "Visitors Today"}
                count={
                  user.type === "patient"
                    ? consultations.filter((cons) => cons.patient.id === user.patient.id).length
                    : consultations.filter((cons) => {
                        const consultationDate = new Date(cons.time).toDateString();
                        const todayDate = new Date().toDateString();
                        return consultationDate === todayDate;
                      }).length
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} alignItems="stretch" height="100%">
            <Box mb={1.5} height="100%">
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title={
                  user.type === "patient" ? "Treatment Status" : "Patients Undergoing Treatment"
                }
                count={
                  user.type === "patient"
                    ? consultations.filter((cons) => cons.patient.id === user.patient.id)[0]
                        ?.status === "undergoing_treatment"
                      ? "Undergoing Treatment"
                      : "Fully Recovered"
                    : consultations.filter((cons) => cons.status === "undergoing_treatment").length
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </Box>
          </Grid>
          {user.type === "staff" && (
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title={"Patients Fully Treated"}
                  count={consultations.filter((cons) => cons.status === "fully_recovered").length}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          )}
        </Grid>
      </MDBox>
      {user.type === "staff" && (
        <Button variant="contained" sx={{ color: "#fff", display: "block", ml: "auto " }}>
          Print Report
        </Button>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
