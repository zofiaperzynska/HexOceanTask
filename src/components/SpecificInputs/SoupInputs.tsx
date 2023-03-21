import React from "react";
import { Grid, Typography } from "@mui/material";
import { CustomSlider } from "../Form/Form.styled";
import { MARKS, DEFAULT_SLIDER_VALUE } from "../Form/Form.consts";

interface SoupInputsProps {
  changeSliderValueHandler: (
    event: {},
    value: number | number[],
    activeThumb: number
  ) => void;
  sliderValue: number;
}

const SoupInputs = (props: SoupInputsProps) => (
  <Grid item xs={12} marginTop='10px'>
    <Typography gutterBottom>Soup Spiciness</Typography>
    <CustomSlider
      defaultValue={DEFAULT_SLIDER_VALUE}
      step={1}
      marks={MARKS}
      min={1}
      max={10}
      onChange={props.changeSliderValueHandler}
      valueLabelDisplay='auto'
      value={props.sliderValue}
    />
  </Grid>
);

export default SoupInputs;
