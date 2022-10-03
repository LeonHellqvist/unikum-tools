import { Paper, Typography, Divider, Collapse } from "@mui/material";
import React from "react";
import { HexColorPicker } from "react-colorful";

const BackgroundColor = (props: any) => {

  const saveColor = React.useCallback(
    props.debounce((color: any) => {
      props.setColor(color);
    }, 200),
    []
  );

  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ marginBottom: 2, textAlign: "center" }}
      >
        Bakgrundsfärg
      </Typography>
      <Divider />
      <Collapse in={props.selectedBookmark.notYetSelected ? false : true}>
        <HexColorPicker
          color={props.color}
          onChange={saveColor}
          style={{ width: "100%", marginTop: 10, height: 158 }}
        />
      </Collapse>
    </Paper>
  );
};

export default BackgroundColor;
