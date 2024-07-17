import { Button, Grid, TextField, Typography } from "@mui/material";
import { SearchContext } from "context/index";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { fetch_authenticated, patch_authenticated, post_authenticated, User } from "utils/globals";

export default function MedicalRecord({ patient_id }) {
  const [patient, setPatient] = useState<any>();
  const { setItem } = useContext(SearchContext);
  const alert = useAlert();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    fetch_authenticated(`patient/${patient_id}`)
      .then((res) => res.json())
      .then((patient) => setPatient(patient));
  }, [patient_id]);

  if (!patient) return null;

  const handleSubmit = async () => {
    try {
      const data = { ...patient };
      delete data.user;
      console.log(patient);
      const res = await patch_authenticated(`patient/${patient_id}`, {
        body: JSON.stringify(data),
      });
      const res_data = await res.json();
      if (res.status === 200 || res.status === 201) {
        alert.show("Updated Successfully", { type: "success" });
        setItem(undefined);
      } else {
        console.log(res_data);
        alert.show("Something went wrong");
      }
    } catch (e) {
      console.log(e);
      alert.show("Something went wrong");
    }
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12}>
        <User user={patient.user} />
      </Grid>
      <Grid item xs={12}>
        <Typography>Personal Information</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="previous_operations"
          label="Previous Operations"
          defaultValue={patient.previous_operations}
          onChange={(e) => setPatient((p) => ({ ...p, previous_operations: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="previous_injuries"
          label="Previous Injuries"
          defaultValue={patient.previous_injuries}
          onChange={(e) => setPatient((p) => ({ ...p, previous_injuries: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="small_pox"
          label="Small Pox"
          defaultValue={patient.small_pox}
          onChange={(e) => setPatient((p) => ({ ...p, small_pox: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="triple_vaccine"
          label="Triple Vaccine"
          defaultValue={patient.triple_vaccine}
          onChange={(e) => setPatient((p) => ({ ...p, triple_vaccine: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="polio"
          label="Polio"
          defaultValue={patient.polio}
          onChange={(e) => setPatient((p) => ({ ...p, polio: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="typhoid"
          label="Typhoid"
          defaultValue={patient.typhoid}
          onChange={(e) => setPatient((p) => ({ ...p, typhoid: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="yellow_fever"
          label="Yellow Fever"
          defaultValue={patient.yellow_fever}
          onChange={(e) => setPatient((p) => ({ ...p, yellow_fever: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="cholera"
          label="Cholera"
          defaultValue={patient.cholera}
          onChange={(e) => setPatient((p) => ({ ...p, cholera: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="any_others"
          label="Any Others"
          defaultValue={patient.any_others}
          onChange={(e) => setPatient((p) => ({ ...p, any_others: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="heart_disease"
          label="Heart Disease"
          defaultValue={patient.heart_disease}
          onChange={(e) => setPatient((p) => ({ ...p, heart_disease: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="kidney_disease"
          label="Kidney Disease"
          defaultValue={patient.kidney_disease}
          onChange={(e) => setPatient((p) => ({ ...p, kidney_disease: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="high_blood_pressure"
          label="High Blood Pressure"
          defaultValue={patient.high_blood_pressure}
          onChange={(e) => setPatient((p) => ({ ...p, high_blood_pressure: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="diabetes"
          label="Diabetes"
          defaultValue={patient.diabetes}
          onChange={(e) => setPatient((p) => ({ ...p, diabetes: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="nervous_ill_health"
          label="Nervous Ill Health"
          defaultValue={patient.nervous_ill_health}
          onChange={(e) => setPatient((p) => ({ ...p, nervous_ill_health: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="mental_ill_health"
          label="Mental Ill Health"
          defaultValue={patient.mental_ill_health}
          onChange={(e) => setPatient((p) => ({ ...p, mental_ill_health: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="any_other_health_defect"
          label="Any Other Health Defect"
          defaultValue={patient.any_other_health_defect}
          onChange={(e) => setPatient((p) => ({ ...p, any_other_health_defect: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="nervous_or_mental_ill_health_treatment"
          label="Nervous Or Mental Ill health Treatment"
          defaultValue={patient.nervous_or_mental_ill_health_treatment}
          onChange={(e) =>
            setPatient((p) => ({ ...p, nervous_or_mental_ill_health_treatment: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>Completed by Doctor</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="height"
          label="Height"
          defaultValue={patient.height}
          onChange={(e) => setPatient((p) => ({ ...p, height: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="Weight"
          label="Weight"
          defaultValue={patient.Weight}
          onChange={(e) => setPatient((p) => ({ ...p, Weight: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="special_senses"
          label="Special Senses"
          defaultValue={patient.special_senses}
          onChange={(e) => setPatient((p) => ({ ...p, special_senses: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="heart_size_and_position"
          label="Heart Size and Position"
          defaultValue={patient.heart_size_and_position}
          onChange={(e) => setPatient((p) => ({ ...p, heart_size_and_position: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="bp"
          label="BP"
          defaultValue={patient.bp}
          onChange={(e) => setPatient((p) => ({ ...p, bp: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="pulse"
          label="Pulse"
          defaultValue={patient.pulse}
          onChange={(e) => setPatient((p) => ({ ...p, pulse: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="liver"
          label="Liver"
          defaultValue={patient.liver}
          onChange={(e) => setPatient((p) => ({ ...p, liver: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="spleen"
          label="Spleen"
          defaultValue={patient.spleen}
          onChange={(e) => setPatient((p) => ({ ...p, spleen: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="hernia"
          label="Hernia"
          defaultValue={patient.hernia}
          onChange={(e) => setPatient((p) => ({ ...p, hernia: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="hemorrhoid"
          label="Hemorrhoid"
          defaultValue={patient.hemorrhoid}
          onChange={(e) => setPatient((p) => ({ ...p, hemorrhoid: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="with_glasses"
          label="With Glasses"
          defaultValue={patient.with_glasses}
          onChange={(e) => setPatient((p) => ({ ...p, with_glasses: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="without_glasses"
          label="Without Glasses"
          defaultValue={patient.without_glasses}
          onChange={(e) => setPatient((p) => ({ ...p, without_glasses: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="genito_urinary_system_kidneys"
          label="Genito Urinary System Kidneys"
          defaultValue={patient.genito_urinary_system_kidneys}
          onChange={(e) =>
            setPatient((p) => ({ ...p, genito_urinary_system_kidneys: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="hearing_left"
          label="Hearing Left"
          defaultValue={patient.hearing_left}
          onChange={(e) => setPatient((p) => ({ ...p, hearing_left: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="hearing_right"
          label="Hearing Right"
          defaultValue={patient.hearing_right}
          onChange={(e) => setPatient((p) => ({ ...p, hearing_right: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="eyes_ears_nose_sinuses"
          label="Eyes Ears Nose Sinuses"
          defaultValue={patient.eyes_ears_nose_sinuses}
          onChange={(e) => setPatient((p) => ({ ...p, eyes_ears_nose_sinuses: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="throat"
          label="Throat"
          defaultValue={patient.throat}
          onChange={(e) => setPatient((p) => ({ ...p, throat: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="lymphatic_glands"
          label="Lymphatic Glands"
          defaultValue={patient.lymphatic_glands}
          onChange={(e) => setPatient((p) => ({ ...p, lymphatic_glands: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="muscular_skeletal_system"
          label="Muscular Skeletal System"
          defaultValue={patient.muscular_skeletal_system}
          onChange={(e) => setPatient((p) => ({ ...p, muscular_skeletal_system: e.target.value }))}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography>Lab examinations</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="blood_group"
          label="Blood Group"
          defaultValue={patient.blood_group}
          onChange={(e) => setPatient((p) => ({ ...p, blood_group: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="genotype"
          label="Genotype"
          defaultValue={patient.genotype}
          onChange={(e) => setPatient((p) => ({ ...p, genotype: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="pcv"
          label="PCV"
          defaultValue={patient.pcv}
          onChange={(e) => setPatient((p) => ({ ...p, pcv: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="chest_xray"
          label="Chest X-ray"
          defaultValue={patient.chest_xray}
          onChange={(e) => setPatient((p) => ({ ...p, chest_xray: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="tuberculin_test"
          label="Tuberculin_test"
          defaultValue={patient.tuberculin_test}
          onChange={(e) => setPatient((p) => ({ ...p, tuberculin_test: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="hiv_aids"
          label="HIV / AIDS"
          defaultValue={patient.hiv_aids}
          onChange={(e) => setPatient((p) => ({ ...p, hiv_aids: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="hepatitis"
          label="Hepatitis"
          defaultValue={patient.hepatitis}
          onChange={(e) => setPatient((p) => ({ ...p, hepatitis: e.target.value }))}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="assessment_of_mental_health"
          label="Assessment Of Mental Health"
          defaultValue={patient.assessment_of_mental_health}
          onChange={(e) =>
            setPatient((p) => ({ ...p, assessment_of_mental_health: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="additional_observations"
          label="Additional Observations / Remarks"
          defaultValue={patient.additional_observations}
          onChange={(e) => setPatient((p) => ({ ...p, additional_observations: e.target.value }))}
        />
      </Grid>
      <Grid container item xs={12} justifyContent={"center"}>
        <Button variant="contained" sx={{ color: "#fff" }} onClick={handleSubmit}>
          Update
        </Button>
      </Grid>
    </Grid>
  );
}
