import React from "react";
import { Grid } from "@mui/material";
import { CustomTextField } from "../Form/Form.styled";

interface SandwichInputsProps {
  noOfBreadSlices: string;
  inputNoOfBreadSlicesHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const SandwichInputs = (props: SandwichInputsProps) => (
  <Grid item xs={12} sm={6}>
    <CustomTextField
      label='No Of Bread Slices'
      type='text'
      value={props.noOfBreadSlices}
      onChange={props.inputNoOfBreadSlicesHandler}
      required
    />
  </Grid>
);

export default SandwichInputs;
