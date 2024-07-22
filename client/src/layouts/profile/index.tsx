import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { getUser, signInUser, updateUser, User } from "utils/auth";
import { useNavigate } from "react-router-dom";
import { baseUrl, fetch_authenticated, post_authenticated_form } from "utils/globals";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { DatePicker } from "@mui/x-date-pickers";
import { useAlert } from "react-alert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";

export default function SignUp() {
  const [image, setImage] = React.useState<File | null>(null);
  const { user } = getUser();
  const type = user.type;
  const [imageDataUri, setImageDataUri] = React.useState<string | ArrayBuffer | null>(
    user.passport
  );
  const [imageError, setImageError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const alert = useAlert();

  const handleImageChange = (event) => {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file);
        setImageError(null);
        const reader = new FileReader();
        reader.onload = () => {
          const dataUri = reader.result;
          setImageDataUri(dataUri);
          // Do something with the data URI, such as sending it to a server
        };
        reader.readAsDataURL(file);
      } else {
        setImage(null);
        setImageError("Invalid file type. Please select an image file.");
      }
    } else {
      setImage(null);
      setImageError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = new FormData(event.currentTarget);
    const res = await post_authenticated_form(`update-profile`, {
      body,
    });
    if (res.status === 200 || res.status === 201) {
      const user = await res.json();
      alert.show("Update Successful", { type: "success" });
      updateUser(user);
      // navigate("/");
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
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <MDTypography variant="h6" color="white">
                  Profile
                </MDTypography>
              </MDBox>
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2} sx={{ maxWidth: "444px" }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="first_name"
                          required
                          fullWidth
                          id="first_name"
                          label="First Name"
                          defaultValue={user.first_name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="last_name"
                          defaultValue={user.last_name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="username"
                          label={type === "patient" ? "Matric Number" : "Username"}
                          name="username"
                          defaultValue={user.username}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          defaultValue={user.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl sx={{ width: "100%" }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password">Passport</InputLabel>
                          <Typography sx={{ position: "absolute", p: 2, fontSize: 14 }}>
                            {image?.name}
                          </Typography>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type="file"
                            label="Passport"
                            name="passport"
                            inputProps={{ style: { opacity: 0, zIndex: 1 } }}
                            onChange={handleImageChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <img
                                  alt={image?.name}
                                  src={imageDataUri as string}
                                  style={{ width: 30, aspectRatio: 1, objectFit: "cover" }}
                                />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      {type === "patient" && (
                        <>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="level"
                              label="Level"
                              defaultValue={user.patient?.level}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="gender"
                              label="Gender"
                              defaultValue={user.patient?.gender}
                              select
                              SelectProps={{ sx: { height: "45px" } }}
                            >
                              <MenuItem value="male">Male</MenuItem>
                              <MenuItem value="female">Female</MenuItem>
                            </TextField>
                          </Grid>
                          {/* <Grid item xs={12}>
                            <DatePicker
                              sx={{ width: "100%" }}
                              label="Date of Birth"
                              name="dob"
                              defaultValue={user.patient?.dob}
                              format="YYYY-MM-DD"
                            />
                          </Grid> */}
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="age"
                              label="Age"
                              type="number"
                              defaultValue={user.patient?.age}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="faculty"
                              label="Faculty"
                              defaultValue={user.patient?.faculty}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="department"
                              label="Department"
                              defaultValue={user.patient?.department}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="phone_number"
                              label="Phone Number"
                              autoComplete="phone"
                              defaultValue={user.patient?.phone_number}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="address"
                              label="Address"
                              id="address"
                              autoComplete="address"
                              defaultValue={user.patient?.address}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="next_of_kin"
                              label="Next of Kin"
                              defaultValue={user.patient?.next_of_kin}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="phone_number_of_next_of_kin"
                              label="Next of Kin Phone Number"
                              defaultValue={user.patient?.phone_number_of_next_of_kin}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="address_of_next_of_kin"
                              label="Next of kin Address"
                              defaultValue={user.patient?.address_of_next_of_kin}
                            />
                          </Grid>
                        </>
                      )}
                      {type === "staff" && (
                        <>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="role"
                              label="Role"
                              defaultValue={user.staff?.role}
                              select
                              SelectProps={{ sx: { height: "45px" } }}
                            >
                              <MenuItem value="doctor">Doctor</MenuItem>
                              <MenuItem value="nurse">Nurse</MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="department"
                              label="Department"
                              id="department"
                              autoComplete="department"
                              defaultValue={user.staff?.department}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="specialization"
                              label="Specialization"
                              id="specialization"
                              autoComplete="specialization"
                              defaultValue={user.staff?.specialization}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>
                    <input name="is_active" value={true} hidden />
                    <input name="user" value={user.id} hidden />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, color: "#fff" }}
                    >
                      Update
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}
