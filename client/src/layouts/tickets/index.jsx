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
import { useContext } from "react";
import { fetch_authenticated } from "utils/globals";
import { getUser } from "utils/auth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Tables() {
  const { columns, rows } = ticketsTableData((setTickets) => {
    fetch_authenticated(`/ticket`)
      .then((res) => res.json())
      .then((tickets) => setTickets(tickets));
  });
  const { search } = useContext(SearchContext);
  const { user } = getUser();
  const navigate = useNavigate();

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
                  {user.type === "patient" && "Your"} Tickets
                </MDTypography>
                {user.type === "patient" && (
                  <Button
                    variant="outlined"
                    color="white"
                    onClick={() => navigate("/tickets/create")}
                  >
                    New
                  </Button>
                )}
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
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
