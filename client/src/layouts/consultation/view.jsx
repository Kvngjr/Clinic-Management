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
import { fetch_authenticated, patch_authenticated_form, User } from "utils/globals";
import { useNavigate, useParams } from "react-router-dom";
import { Button, MenuItem, TextField } from "@mui/material";
import { useAlert } from "react-alert";

function Tables() {
  const [consultation, setConsultation] = useState();
  const [staffs, setStaffs] = useState();
  const [patients, setPatients] = useState();

  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();

  useLayoutEffect(() => {
    fetch_authenticated(`/consultation/${id}`)
      .then((res) => res.json())
      .then((consultation) => setConsultation(consultation));
    fetch_authenticated(`/patient`)
      .then((res) => res.json())
      .then((patients) => setPatients(patients));
    fetch_authenticated(`/staff`)
      .then((res) => res.json())
      .then((staffs) => setStaffs(staffs));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = new FormData(event.currentTarget);
    const res = await patch_authenticated_form(`create-consultation/${id}`, { body });
    if (res.status === 200) {
      alert.show("Updated Successfully", { type: "success" });
      navigate("/consultations");
    }
  };
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
              {consultation && (
                <MDBox pt={3} component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="note"
                        label="Note"
                        defaultValue={consultation.note}
                        onChange={(e) => setConsultation((p) => ({ ...p, note: e.target.value }))}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="medical_issue"
                        label="Medical Issue"
                        defaultValue={consultation.medical_issue}
                        onChange={(e) =>
                          setConsultation((p) => ({ ...p, medical_issue: e.target.value }))
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="prescription"
                        label="Prescription"
                        defaultValue={consultation.prescription}
                        onChange={(e) =>
                          setConsultation((p) => ({ ...p, prescription: e.target.value }))
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="status"
                        label="Status"
                        defaultValue={consultation.status}
                        onChange={(e) => setConsultation((p) => ({ ...p, status: e.target.value }))}
                        select
                        SelectProps={{ sx: { height: "45px" } }}
                      >
                        <MenuItem value="undergoing_treatment">Undergoing Treatment</MenuItem>
                        <MenuItem value="fully_recovered">Fully Recovered</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="patient"
                        label="Patient"
                        defaultValue={consultation.patient.id}
                        onChange={(e) =>
                          setConsultation((p) => ({ ...p, patient: e.target.value }))
                        }
                        select
                        SelectProps={{ sx: { height: "55px" } }}
                      >
                        {patients?.map((patient) => (
                          <MenuItem value={patient.id}>
                            <User user={patient.user} />
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="staff"
                        label="Staff"
                        defaultValue={consultation.staff.id}
                        onChange={(e) => setConsultation((p) => ({ ...p, staff: e.target.value }))}
                        select
                        SelectProps={{ sx: { height: "55px" } }}
                      >
                        {staffs?.map((staff) => (
                          <MenuItem value={staff.id}>
                            <User user={staff.user} />
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} container justifyContent="center">
                      <Button type="submit" variant="contained" sx={{ color: "#fff" }}>
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
