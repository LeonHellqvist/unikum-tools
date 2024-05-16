import {
  Paper,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React from "react";

const GlobalAlternatives = (props: any) => {
  const handleSettingsChange = (e: any) => {
    const { name, checked } = e.target;
    let newSettings = { ...props.settings };
    newSettings.same[name] = checked;
    props.setSettings(newSettings);
  };

  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ marginBottom: 2, textAlign: "center" }}
      >
        Alternativ för alla
      </Typography>
      <Divider sx={{ margin: 1 }} />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          onChange={handleSettingsChange}
          name="bgColor"
          checked={props.settings.same.bgColor}
          label="Samma backgrundsfärg"
        />
        <FormControlLabel
          control={<Checkbox />}
          onChange={handleSettingsChange}
          name="radius"
          checked={props.settings.same.radius}
          label="Samma radius"
        />
        <FormControlLabel
          control={<Checkbox />}
          onChange={handleSettingsChange}
          name="boxShadow"
          checked={props.settings.same.boxShadow}
          label="Samma höjd"
        />
      </FormGroup>
    </Paper>
  );
};

export default GlobalAlternatives;
